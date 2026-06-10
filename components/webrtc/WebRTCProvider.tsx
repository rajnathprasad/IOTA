"use client";

import { useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";

type WebRTCProviderProps = {
  children: React.ReactNode;
  roomCode: string;
  role: "INTERVIEWER" | "CANDIDATE";
};

export function WebRTCProvider({ children, roomCode, role }: WebRTCProviderProps) {
  const setLocalStream = useInterviewStore((s) => s.setLocalStream);
  const setRemoteStream = useInterviewStore((s) => s.setRemoteStream);
  const candidateConnected = useInterviewStore((s) => s.candidateConnected);
  const interviewerConnected = useInterviewStore((s) => s.interviewerConnected);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const offerCreatedRef = useRef(false);
  const setupCompleteRef = useRef(false);

  const iceCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);

  async function drainIceCandidates(pc: RTCPeerConnection) {
    const queue = iceCandidateQueueRef.current;
    iceCandidateQueueRef.current = [];
    for (const candidate of queue) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("Drained queued ICE candidate");
      } catch (err) {
        console.error("Failed to add queued ICE candidate", err);
      }
    }
  }

  useEffect(() => {
    const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.relay.metered.ca:80" },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    },
  ],
  iceCandidatePoolSize: 10,
});
    peerConnectionRef.current = peerConnection;

    peerConnection.ontrack = (event) => {
      console.log("Remote Stream Received", event.streams[0]);
      console.log("Video Tracks:", event.streams[0].getVideoTracks());
      console.log("Audio Tracks:", event.streams[0].getAudioTracks());

      setRemoteStream(new MediaStream(event.streams[0].getTracks()));
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", { roomCode, candidate: event.candidate });
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log("ICE state:", peerConnection.iceConnectionState);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
    };

    socket.on("webrtc-offer", async (offer) => {
      if (role !== "CANDIDATE") return;

      while (!setupCompleteRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      console.log("Offer Received");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));


      await drainIceCandidates(peerConnection);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("webrtc-answer", { roomCode, answer });
      console.log("Answer Sent");
    });

    socket.on("webrtc-answer", async (answer) => {
      if (role !== "INTERVIEWER") return;
      console.log("Answer Received");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));


      await drainIceCandidates(peerConnection);
    });


    socket.on("webrtc-ice-candidate", async (candidate) => {
      if (!peerConnection.remoteDescription) {
        
        console.log("Queuing ICE candidate (no remote description yet)");
        iceCandidateQueueRef.current.push(candidate);
        return;
      }
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("ICE Candidate Added");
      } catch (err) {
        console.error("ICE candidate error:", err);
      }
    });

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalStream(stream);
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

        setupCompleteRef.current = true;
        console.log("Peer Connection Ready — tracks added");

        peerConnection.dispatchEvent(new Event("setup-complete"));
      } catch (err) {
        console.error("getUserMedia failed:", err);
      }
    }

    setup();

    return () => {
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
      peerConnection.close();
    };
  }, [roomCode, role, setLocalStream, setRemoteStream]);

  useEffect(() => {
    if (role !== "INTERVIEWER") return;
    if (!interviewerConnected || !candidateConnected) return;
    if (offerCreatedRef.current) return;

    const pc = peerConnectionRef.current;
    if (!pc) return;

    async function createOffer() {
      if (!pc) return;
      console.log("Creating offer with tracks:", pc.getSenders().length);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("webrtc-offer", { roomCode, offer });
      console.log("Offer Sent");
    }

    if (setupCompleteRef.current) {
      offerCreatedRef.current = true;
      createOffer();
      return;
    }

    function onSetupComplete() {
      if (offerCreatedRef.current) return;
      offerCreatedRef.current = true;
      createOffer();
    }

    pc.addEventListener("setup-complete", onSetupComplete);
    return () => pc.removeEventListener("setup-complete", onSetupComplete);
  }, [role, roomCode, interviewerConnected, candidateConnected]);

  return <>{children}</>;
}
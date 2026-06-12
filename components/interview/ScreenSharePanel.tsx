"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";

type ScreenSharePanelProps = {
  role: "INTERVIEWER" | "CANDIDATE";
};

export function ScreenSharePanel({ role }: ScreenSharePanelProps) {
  const activeView = useInterviewStore((s) => s.activeView);
  const videoRef = useRef<HTMLVideoElement>(null);

  const localScreenStream = useInterviewStore((s) => s.localScreenStream);
  const remoteCandidateScreenStream = useInterviewStore((s) => s.remoteCandidateScreenStream);
  const remoteInterviewerScreenStream = useInterviewStore((s) => s.remoteInterviewerScreenStream);
  const peerConnection = useInterviewStore((s) => s.peerConnection);
  const setLocalScreenStream = useInterviewStore((s) => s.setLocalScreenStream);
  const setCandidateSharing = useInterviewStore((s) => s.setCandidateSharing);
  const setInterviewerSharing = useInterviewStore((s) => s.setInterviewerSharing);

  const canShare =
    (role === "INTERVIEWER" && activeView === "INTERVIEWER_SCREEN") ||
    (role === "CANDIDATE" && activeView === "CANDIDATE_SCREEN");


  const displayStream =
  activeView ===
  "CANDIDATE_SCREEN"
    ? (
        localScreenStream &&
        role ===
          "CANDIDATE"
      )
        ? localScreenStream
        : remoteCandidateScreenStream
    : (
        localScreenStream &&
        role ===
          "INTERVIEWER"
      )
        ? localScreenStream
        : remoteInterviewerScreenStream;

  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  if (!displayStream) {
    video.srcObject = null;
    return;
  }

  if (video.srcObject !== displayStream) {
  video.srcObject = displayStream;
}
}, [displayStream]);

  async function startSharing() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    const screenTrack = stream.getVideoTracks()[0];
    setLocalScreenStream(stream);

    const roomCode = window.location.pathname.split("/").pop();

    socket.emit("screen-share-state", {
      roomCode,
      role,
      sharing: true,
      streamId: stream.id,
    });

    peerConnection?.addTrack(screenTrack, stream);

    const offer = await peerConnection?.createOffer();
    if (offer && peerConnection) {
      await peerConnection.setLocalDescription(offer);
      socket.emit("webrtc-renegotiate-offer", { roomCode, offer });
    }

    if (role === "INTERVIEWER") {
      setInterviewerSharing(true);
    } else {
      setCandidateSharing(true);
    }

    screenTrack.addEventListener("ended", stopSharing);
  } catch (error) {
    console.error(error);
  }
}

  function stopSharing() {
    localScreenStream?.getTracks().forEach((track) => track.stop());
    setLocalScreenStream(null);

    const roomCode = window.location.pathname.split("/").pop();
    socket.emit("screen-share-state", { roomCode, role, sharing: false });

    if (role === "INTERVIEWER") {
      setInterviewerSharing(false);
    } else {
      setCandidateSharing(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-2">
        {canShare && (
          !localScreenStream ? (
            <Button onClick={startSharing}>Share Screen</Button>
          ) : (
            <Button variant="destructive" onClick={stopSharing}>
              Stop Sharing
            </Button>
          )
        )}
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border bg-card">
        {displayStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {canShare ? "Start sharing your screen" : "Waiting for screen share"}
          </div>
        )}
      </div>
    </div>
  );
}
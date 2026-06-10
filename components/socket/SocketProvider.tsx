"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";

type SocketProviderProps = {
  roomCode: string;
  role: "INTERVIEWER" | "CANDIDATE";
};

export function SocketProvider({ roomCode, role }: SocketProviderProps) {
  const addMessage = useInterviewStore((state) => state.addMessage);
  const setCode = useInterviewStore((state) => state.setCode);
  const setLanguage = useInterviewStore((state) => state.setLanguage);
  const setCandidateConnected = useInterviewStore((state) => state.setCandidateConnected);
  const setInterviewerConnected = useInterviewStore((state) => state.setInterviewerConnected);
  const setSharedQuestion = useInterviewStore((state) => state.setSharedQuestion);
  const setInterviewStatus = useInterviewStore((state) => state.setInterviewStatus);
  const setInterviewStartedAt = useInterviewStore((state) => state.setInterviewStartedAt);
  const setRemoteActiveView = useInterviewStore((state) => state.setRemoteActiveView);
  const setCandidateSharing = useInterviewStore((state) => state.setCandidateSharing);
  const setInterviewerSharing = useInterviewStore((state) => state.setInterviewerSharing);

  useEffect(() => {
    socket.connect();

    // Single connect handler — rejoins room on every connect/reconnect
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
      socket.emit("join-room", { roomCode, role });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket Error:", error);
    });

    socket.on("question-shared", (question) => {
      setSharedQuestion(question);
    });

    socket.on("code-updated", (code) => {
      setCode(code);
    });

    socket.on("language-updated", (language) => {
      setLanguage(language);
    });

    socket.on("chat-message-received", (message) => {
      addMessage(message);
    });

    socket.on("presence-updated", (presence) => {
      console.log("Presence:", presence);
      setCandidateConnected(presence.candidate);
      setInterviewerConnected(presence.interviewer);
    });

    socket.on("interview-started", () => {
      setInterviewStatus("ACTIVE");
      setInterviewStartedAt(Date.now());
    });

    socket.on("interview-ended", () => {
      setInterviewStatus("ENDED");
    });

    socket.on("remote-active-view", (view) => {
      setRemoteActiveView(view);
    });

    socket.on("screen-share-state-updated", ({ role, sharing }) => {
      if (role === "CANDIDATE") setCandidateSharing(sharing);
      if (role === "INTERVIEWER") setInterviewerSharing(sharing);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("question-shared");
      socket.off("code-updated");
      socket.off("language-updated");
      socket.off("chat-message-received");
      socket.off("presence-updated");
      socket.off("interview-started");
      socket.off("interview-ended");
      socket.off("remote-active-view");
      socket.off("screen-share-state-updated");
      socket.disconnect();
    };
  }, [
    roomCode,
    role,
    setSharedQuestion,
    setCode,
    setLanguage,
    addMessage,
    setCandidateConnected,
    setInterviewerConnected,
    setInterviewStatus,
    setInterviewStartedAt,
    setRemoteActiveView,
    setCandidateSharing,
    setInterviewerSharing,
  ]);

  return null;
}
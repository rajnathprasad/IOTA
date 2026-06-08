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
  const setCandidateConnected = useInterviewStore(
    (state) => state.setCandidateConnected,
  );

  const setInterviewerConnected = useInterviewStore(
    (state) => state.setInterviewerConnected,
  );

  const setSharedQuestion = useInterviewStore(
    (state) => state.setSharedQuestion,
  );

  const setInterviewStatus = useInterviewStore(
    (state) => state.setInterviewStatus,
  );

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", {
      roomCode,
      role,
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
      setCandidateConnected(presence.candidate);

      setInterviewerConnected(presence.interviewer);
    });
    socket.on("interview-started", () => {


  setInterviewStatus("ACTIVE");


});

    socket.on("interview-ended", () => {


  setInterviewStatus("ENDED");


});

    return () => {
      socket.off("question-shared");
      socket.off("code-updated");
      socket.off("language-updated");
      socket.off("chat-message-received");
      socket.off("presence-updated");
      socket.off("interview-started");

      socket.off("interview-ended");
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
]);

  return null;
}

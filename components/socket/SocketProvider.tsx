"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";

type SocketProviderProps = {
  roomCode: string;
};

export function SocketProvider({ roomCode }: SocketProviderProps) {
  console.log("SOCKET PROVIDER MOUNTED", roomCode);

  const setCode = useInterviewStore((state) => state.setCode);

  const setLanguage = useInterviewStore((state) => state.setLanguage);

  const setSharedQuestion = useInterviewStore(
    (state) => state.setSharedQuestion,
  );

  useEffect(() => {
    console.log("CONNECTING SOCKET");

    socket.connect();

    console.log("JOINING ROOM", roomCode);

    socket.emit("join-room", roomCode);

    socket.on("question-shared", (question) => {
      console.log("RECEIVED QUESTION", question.title);

      setSharedQuestion(question);
    });

    socket.on("code-updated", (code) => {
      setCode(code);
    });

    socket.on("language-updated", (language) => {
      setLanguage(language);
    });

    return () => {
      console.log("DISCONNECTING SOCKET");

      socket.off("question-shared");
      socket.off("code-updated");
      socket.off("language-updated");

      socket.disconnect();
    };
  }, [roomCode, setSharedQuestion]);

  return null;
}

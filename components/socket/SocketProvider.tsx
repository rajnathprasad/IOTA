"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";

type SocketProviderProps = {
  roomCode: string;
};

export function SocketProvider({ roomCode }: SocketProviderProps) {


  const addMessage = useInterviewStore((state) => state.addMessage);

  const setCode = useInterviewStore((state) => state.setCode);

  const setLanguage = useInterviewStore((state) => state.setLanguage);

  const setSharedQuestion = useInterviewStore(
    (state) => state.setSharedQuestion,
  );

  useEffect(() => {


    socket.connect();



    socket.emit("join-room", roomCode);

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

    return () => {

      socket.off("question-shared");
      socket.off("code-updated");
      socket.off("language-updated");
      socket.off("chat-message-received");
      socket.disconnect();
    };
  }, [roomCode,
  setSharedQuestion,
  setCode,
  setLanguage,
  addMessage,]);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";

import { socket } from "@/lib/socket";

import { useInterviewStore } from "@/store/interview-store";
type ChatPanelProps = {
  currentUserName: string;
};

export function ChatPanel({
  currentUserName,
}: ChatPanelProps) {
  const [text, setText] = useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const messages =
    useInterviewStore(
      (state) => state.messages
    );

  const addMessage =
    useInterviewStore(
      (state) => state.addMessage
    );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage() {
    if (!text.trim()) return;

    const message = {
  id: crypto.randomUUID(),
  sender: currentUserName,
  message: text,
  timestamp: Date.now(),
};

    addMessage(message);

    const roomCode =
      window.location.pathname
        .split("/")
        .pop();

    socket.emit(
      "chat-message",
      {
        roomCode,
        message,
      }
    );

    setText("");
  }

  return (
    <div className="flex h-80 flex-col">
      <div className="scrollbar-hide flex-1 overflow-y-auto space-y-3 pr-2">
  {messages.map((msg) => {
    const isMine =
  msg.sender === currentUserName;

    return (
      <div
        key={msg.id}
        className={`flex ${
          isMine
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] rounded-xl border px-3 py-2 text-sm ${
            isMine
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {!isMine && (
            <p className="mb-1 text-xs font-semibold">
              {msg.sender}
            </p>
          )}

          <p>{msg.message}</p>

          <p
            className={`mt-1 text-[10px] ${
              isMine
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            }`}
          >
            {new Date(
              msg.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  })}

  <div ref={messagesEndRef} />
</div>

      <div className="mt-3 flex gap-2 border-t pt-3">
        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="flex-1 rounded border px-2 py-1"
          placeholder="Type message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="rounded border px-3"
        >
          Send
        </button>
      </div>
    </div>
  );
}
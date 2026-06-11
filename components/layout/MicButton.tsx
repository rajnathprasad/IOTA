"use client";

import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInterviewStore } from "@/store/interview-store";
import { socket }
  from "@/lib/socket";

export function MicButton() {
  const localStream =
    useInterviewStore(
      (s) => s.localStream
    );

  const micEnabled =
    useInterviewStore(
      (s) => s.micEnabled
    );

  const setMicEnabled =
    useInterviewStore(
      (s) => s.setMicEnabled
    );

  function toggleMic() {
    if (!localStream) return;

    const nextState =
      !micEnabled;

    localStream
      .getAudioTracks()
      .forEach((track) => {
        track.enabled =
          nextState;
      });

    setMicEnabled(nextState);

    const roomCode =
  window.location.pathname
    .split("/")
    .pop();

if (roomCode) {
  socket.emit(
    "mic-state-change",
    {
      roomCode,
      enabled: nextState,
    }
  );
}
  }

  return (
    <Button
      size="icon"
      variant={
        micEnabled
          ? "secondary"
          : "destructive"
      }
      className="h-10 w-10 rounded-full"
      onClick={toggleMic}
    >
      {micEnabled ? (
        <Mic className="h-4 w-4" />
      ) : (
        <MicOff className="h-4 w-4" />
      )}
    </Button>
  );
}
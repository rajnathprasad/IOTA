"use client";

import {
  Video,
  VideoOff,
} from "lucide-react";
import { socket }
  from "@/lib/socket";

import { Button } from "@/components/ui/button";

import { useInterviewStore }
  from "@/store/interview-store";

export function CameraButton() {
  const localStream =
    useInterviewStore(
      (s) => s.localStream
    );

  const cameraEnabled =
    useInterviewStore(
      (s) => s.cameraEnabled
    );

  const setCameraEnabled =
    useInterviewStore(
      (s) =>
        s.setCameraEnabled
    );

  function toggleCamera() {
    if (!localStream) return;

    const nextState =
      !cameraEnabled;

    localStream
      .getVideoTracks()
      .forEach((track) => {
        track.enabled =
          nextState;
      });

      const roomCode =
  window.location.pathname
    .split("/")
    .pop();

if (roomCode) {
  socket.emit(
    "camera-state-change",
    {
      roomCode,
      enabled: nextState,
    }
  );
}

    setCameraEnabled(
      nextState
    );
  }

  return (
    <Button
      size="icon"
      variant={
        cameraEnabled
          ? "secondary"
          : "destructive"
      }
      className="h-10 w-10 rounded-full"
      onClick={toggleCamera}
    >
      {cameraEnabled ? (
        <Video className="h-4 w-4" />
      ) : (
        <VideoOff className="h-4 w-4" />
      )}
    </Button>
  );
}
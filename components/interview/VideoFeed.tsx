"use client";

import { useEffect, useRef } from "react";
import { useInterviewStore } from "@/store/interview-store";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

type VideoFeedProps = {
  label: string;
  streamType: "LOCAL" | "REMOTE";
};

export function VideoFeed({ label, streamType }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const localStream = useInterviewStore((s) => s.localStream);
  const remoteStream = useInterviewStore((s) => s.remoteStream);
  const remoteMicEnabled =
  useInterviewStore(
    (s) =>
      s.remoteMicEnabled
  );

const remoteCameraEnabled =
  useInterviewStore(
    (s) =>
      s.remoteCameraEnabled
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const stream = streamType === "LOCAL" ? localStream : remoteStream;
    if (!stream) return;

  
    if (video.srcObject === stream) return;

    video.srcObject = stream;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== "AbortError") {
          console.error(`${label} play failed`, err);
        }
      });
    }

    setTimeout(() => {
      console.log(`${label} dimensions`, {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        readyState: video.readyState,
        paused: video.paused,
      });
    }, 2000);
  }, [localStream, remoteStream, streamType, label]);

  return (
    <div className="relative h-full overflow-hidden rounded-xl border bg-card aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={streamType === "LOCAL"}
        onLoadedMetadata={() => console.log(`${label} metadata loaded`)}
        onCanPlay={() => console.log(`${label} can play`)}
        onPlay={() => console.log(`${label} play event`)}
        className="h-full w-full object-cover"
      />
      <div
  className="
    absolute
    left-3
    top-3

    rounded-md
    bg-black/60

    px-2
    py-1

    text-xs
    text-white
  "
>
  <div>{label}</div>

  {streamType ===
    "REMOTE" && (
    <div className="mt-1 flex gap-2">
      {remoteMicEnabled ? (
        <Mic className="h-3 w-3" />
      ) : (
        <MicOff className="h-3 w-3 text-red-400" />
      )}

      {remoteCameraEnabled ? (
        <Video className="h-3 w-3" />
      ) : (
        <VideoOff className="h-3 w-3 text-red-400" />
      )}
    </div>
  )}
</div>
    </div>
  );
}
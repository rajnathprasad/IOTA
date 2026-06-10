"use client";

import { useEffect, useRef } from "react";
import { useInterviewStore } from "@/store/interview-store";

type VideoFeedProps = {
  label: string;
  streamType: "LOCAL" | "REMOTE";
};

export function VideoFeed({ label, streamType }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const localStream = useInterviewStore((s) => s.localStream);
  const remoteStream = useInterviewStore((s) => s.remoteStream);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const stream = streamType === "LOCAL" ? localStream : remoteStream;
    if (!stream) return;

    // Only reassign if the stream actually changed
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
    <div className="relative h-full overflow-hidden rounded-xl border bg-card">
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
      <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
        {label}
      </div>
    </div>
  );
}
import { VideoFeed } from "../interview/VideoFeed";

export function VideoSection() {
  return (
    <div className="flex h-full items-center justify-center gap-6">
      <VideoFeed
        label="Your Camera"
        streamType="LOCAL"
      />

      <VideoFeed
        label="Remote Camera"
        streamType="REMOTE"
      />
    </div>
  );
}
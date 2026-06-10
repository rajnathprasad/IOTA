import { VideoFeed }
  from "../interview/VideoFeed";

export function VideoSection() {
  return (
    <div className="grid h-full grid-cols-2 gap-4">

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
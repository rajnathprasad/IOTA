import { VideoSection } from "./VideoSection";
import { EditorSection } from "./EditorSection";

export function MainContent() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-[35%]">
        <VideoSection />
      </div>

      <div className="flex-1">
        <EditorSection />
      </div>
    </div>
  );
}
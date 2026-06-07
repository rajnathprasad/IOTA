import { VideoSection } from "./VideoSection";

import { QuestionPanel } from "@/components/interview/QuestionPanel";
import { CodeEditorPanel } from "@/components/interview/CodeEditorPanel";
import { OutputPanel } from "@/components/interview/OutputPanel";

export function MainContent() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-[25%]">
        <VideoSection />
      </div>

      <div className="grid flex-1 grid-cols-[350px_1fr_350px] gap-4 overflow-hidden">
        <QuestionPanel />
        <CodeEditorPanel />
        <OutputPanel />
      </div>
    </div>
  );
}
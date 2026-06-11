"use client";

import { useInterviewStore }
  from "@/store/interview-store";

  import { ScreenSharePanel }
  from "@/components/interview/ScreenSharePanel";

import { VideoSection }
  from "./VideoSection";

import { WorkspaceTabs }
  from "@/components/interview/WorkspaceTabs";

import { QuestionPanel }
  from "@/components/interview/QuestionPanel";

import { CodeEditorPanel }
  from "@/components/interview/CodeEditorPanel";

import { OutputPanel }
  from "@/components/interview/OutputPanel";

type MainContentProps = {
  currentUserRole:
    | "INTERVIEWER"
    | "CANDIDATE";
};

export function MainContent({
  currentUserRole,
}: MainContentProps) {
  const activeView =
    useInterviewStore(
      (state) =>
        state.activeView
    );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-[25%]">
        <VideoSection />
      </div>

      <WorkspaceTabs />

      <div className="flex-1 overflow-hidden">
        {activeView ===
          "CODE" && (
          <div className="grid h-full grid-cols-[350px_1fr_350px] gap-4 overflow-hidden">
            <QuestionPanel />
            <CodeEditorPanel />
            <OutputPanel />
          </div>
        )}

        {activeView ===
  "INTERVIEWER_SCREEN" && (
  <ScreenSharePanel
  role={currentUserRole}
/>
)}

{activeView ===
  "CANDIDATE_SCREEN" && (
  <ScreenSharePanel
  role={currentUserRole}
/>
)}
      </div>
    </div>
  );
}
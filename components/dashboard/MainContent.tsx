"use client";

import { useInterviewStore }
  from "@/store/interview-store";

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

export function MainContent() {
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
          <div className="flex h-full items-center justify-center rounded-xl border bg-card">
            Interviewer Screen
          </div>
        )}

        {activeView ===
          "CANDIDATE_SCREEN" && (
          <div className="flex h-full items-center justify-center rounded-xl border bg-card">
            Candidate Screen
          </div>
        )}
      </div>
    </div>
  );
}
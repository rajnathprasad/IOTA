"use client";

import { useInterviewStore } from "@/store/interview-store";

export function ProctoringCompact() {
  // .length gives you the count from the array of TabSwitchEvent objects
  const tabSwitchCount = useInterviewStore((state) => state.tabSwitches?.length ?? 0);

  return (
    <section className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="font-medium">Proctoring</span>
      <span className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{tabSwitchCount}</span>
        {" "}Tab Switch{tabSwitchCount !== 1 ? "es" : ""}
      </span>
    </section>
  );
}
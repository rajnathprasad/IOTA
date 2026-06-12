"use client";

import { useInterviewStore }
  from "@/store/interview-store";

export function ProctoringPanel() {
  const tabSwitches =
    useInterviewStore(
      (state) =>
        state.tabSwitches
    );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">
          Switches
        </p>

        <p className="text-2xl font-bold">
          {tabSwitches.length}
        </p>
      </div>

      <div>
        <div className="space-y-1">
  {tabSwitches.length === 0 && (
    <p className="text-sm text-muted-foreground">
      No tab switches detected.
    </p>
  )}

  {tabSwitches.map(
    (event, index) => (
      <div
        key={index}
        className="
          text-sm
          text-muted-foreground
        "
      >
        • Tab switched for{" "}
        <span className="font-medium text-foreground">
          {event.duration}s
        </span>
      </div>
    )
  )}
</div>
      </div>
    </div>
  );
}
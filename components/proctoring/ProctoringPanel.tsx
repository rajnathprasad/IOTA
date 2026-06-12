"use client";

import { useInterviewStore }
  from "@/store/interview-store";

export function ProctoringPanel() {
  const tabSwitches =
  useInterviewStore(
    (state) =>
      state.tabSwitches
  ).slice(0, 5);

  return (
  <div className="space-y-2">
    <div>
      <p className="text-xs text-muted-foreground">
        Switches
      </p>

      <p className="text-xl font-bold leading-none">
        {tabSwitches.length}
      </p>
    </div>

    <div className="space-y-1">
      {tabSwitches.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No tab switches detected.
        </p>
      )}

      {tabSwitches.map(
        (event, index) => (
          <div
            key={index}
            className="text-xs text-muted-foreground"
          >
            • {event.duration}s
          </div>
        )
      )}
    </div>
  </div>
);
}
"use client";

import { useInterviewStore } from "@/store/interview-store";

export function OutputPanel() {
  const output = useInterviewStore(
    (state) => state.output
  );

  return (
    <div className="h-full overflow-y-auto rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Output
      </h2>

      <pre className="overflow-auto whitespace-pre-wrap text-sm font-mono">
        {output || "Run code to see output"}
      </pre>
    </div>
  );
}
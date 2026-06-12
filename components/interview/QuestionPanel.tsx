"use client";

import { useInterviewStore } from "@/store/interview-store";

export function QuestionPanel() {
  const question = useInterviewStore(
    (state) => state.sharedQuestion
  );

  if (!question) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border bg-card text-muted-foreground">
        No question shared yet
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card overflow-hidden">
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold">
          Question
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h1 className="text-xl font-bold">
            {question.title}
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {question.problem}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">
            Sample Input
          </h2>

          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-muted/30 p-3 text-sm font-mono">
            {question.sampleInput}
          </pre>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">
            Sample Output
          </h2>

          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-muted/30 p-3 text-sm font-mono">
            {question.sampleOutput}
          </pre>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">
            Constraints
          </h2>

          <ul className="list-disc space-y-1 pl-5 text-sm">
            {question.constraints.map(
              (constraint) => (
                <li key={constraint}>
                  {constraint}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
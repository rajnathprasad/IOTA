"use client";

import { useInterviewStore } from "@/store/interview-store";

export function QuestionPanel() {
  const question = useInterviewStore(
    (state) => state.sharedQuestion
  );

  if (!question) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No question shared yet
      </div>
    );
  }

  return (
  <div className="h-full overflow-y-auto p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold">
        {question.title}
      </h1>

      <p className="mt-4 text-muted-foreground">
        {question.problem}
      </p>
    </div>

    <div>
      <h2 className="mb-2 font-semibold">
        Sample Input
      </h2>

      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-md border bg-muted/30 p-3 text-sm font-mono">
        {question.sampleInput}
      </pre>
    </div>

    <div>
      <h2 className="mb-2 font-semibold">
        Sample Output
      </h2>

      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-md border bg-muted/30 p-3 text-sm font-mono">
        {question.sampleOutput}
      </pre>
    </div>

    <div>
      <h2 className="mb-2 font-semibold">
        Constraints
      </h2>

      <ul className="list-disc pl-5">
        {question.constraints.map((constraint) => (
          <li key={constraint}>
            {constraint}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
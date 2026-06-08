"use client";

import { useInterviewStore }
  from "@/store/interview-store";

type PresenceIndicatorProps = {
  role:
    | "INTERVIEWER"
    | "CANDIDATE";
};

export function PresenceIndicator({
  role,
}: PresenceIndicatorProps) {
  const candidateConnected =
    useInterviewStore(
      (state) =>
        state.candidateConnected
    );

  const interviewerConnected =
    useInterviewStore(
      (state) =>
        state.interviewerConnected
    );

  const isOnline =
    role === "INTERVIEWER"
      ? candidateConnected
      : interviewerConnected;

  const label =
    role === "INTERVIEWER"
      ? "Candidate"
      : "Interviewer";

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div
        className={`size-2 rounded-full ${
          isOnline
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      />

      <span>
        {label}{" "}
        {isOnline
          ? "Online"
          : "Offline"}
      </span>
    </div>
  );
}
"use client";

import { socket } from "@/lib/socket";
import { useInterviewStore }
  from "@/store/interview-store";

export function WorkspaceTabs() {
  const activeView =
    useInterviewStore(
      (state) =>
        state.activeView
    );

  const remoteActiveView =
    useInterviewStore(
      (state) =>
        state.remoteActiveView
    );

  const setActiveView =
    useInterviewStore(
      (state) =>
        state.setActiveView
    );

  const candidateSharing =
    useInterviewStore(
      (state) =>
        state.candidateSharing
    );

  const interviewerSharing =
    useInterviewStore(
      (state) =>
        state.interviewerSharing
    );

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

  const remoteConnected =
    candidateConnected &&
    interviewerConnected;

  const tabs = [
    {
      value: "CODE",
      label: "Code Workspace",
    },
    {
      value:
        "INTERVIEWER_SCREEN",
      label:
        "Interviewer Screen",
    },
    {
      value:
        "CANDIDATE_SCREEN",
      label:
        "Candidate Screen",
    },
  ];

  function handleTabChange(
    view:
      | "CODE"
      | "INTERVIEWER_SCREEN"
      | "CANDIDATE_SCREEN"
  ) {
    setActiveView(view);

    const roomCode =
      window.location.pathname
        .split("/")
        .pop();

    socket.emit(
      "active-view-change",
      {
        roomCode,
        view,
      }
    );
  }

  return (
    <div className="flex gap-2 border-b pb-2">
      {tabs.map((tab) => {
        const isActive =
          activeView ===
          tab.value;

        const isRemoteActive =
          remoteActiveView ===
          tab.value;

        const isSharing =
          (tab.value ===
            "CANDIDATE_SCREEN" &&
            candidateSharing) ||
          (tab.value ===
            "INTERVIEWER_SCREEN" &&
            interviewerSharing);

        return (
          <button
            key={tab.value}
            onClick={() =>
              handleTabChange(
                tab.value as
                  | "CODE"
                  | "INTERVIEWER_SCREEN"
                  | "CANDIDATE_SCREEN"
              )
            }
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <span>
              {tab.label}
            </span>

            {remoteConnected &&
              isRemoteActive && (
                <div className="size-2 rounded-full bg-green-500" />
              )}

            {isSharing && (
              <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500">
                Sharing
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
"use client";

import { createInterview } from "@/app/actions/create-interview";
import {
  startInterview,
  endInterview,
} from "@/app/actions/interview-status";

import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";
import { useRouter } from "next/navigation";

import { NetworkStatus } from "./NetworkStatus";
import { InterviewTimer } from "./InterviewTimer";
import { MicButton } from "./MicButton";
import { CameraButton } from "./CameraButton";

import { PhoneOff } from "lucide-react";

type BottomBarProps = {
  role: "INTERVIEWER" | "CANDIDATE";
  inInterviewRoom: boolean;
  interviewStatus:
    | "WAITING"
    | "ACTIVE"
    | "ENDED";
};

export function BottomBar({
  role,
  inInterviewRoom,
  interviewStatus,
}: BottomBarProps) {
  const router = useRouter();

  const liveInterviewStatus =
    useInterviewStore(
      (state) =>
        state.interviewStatus
    );

  const effectiveStatus =
    liveInterviewStatus ===
    "WAITING"
      ? interviewStatus
      : liveInterviewStatus;

  const resetInterviewState =
  useInterviewStore(
    (s) =>
      s.resetInterviewState
  );

  async function handleCreateInterview() {
    try {
      const interview =
        await createInterview();

      router.push(
        `/interview/${interview.roomCode}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStartInterview() {
    const roomCode =
      window.location.pathname
        .split("/")
        .pop();

    if (!roomCode) return;

    await startInterview(roomCode);

    useInterviewStore
      .getState()
      .setInterviewStatus(
        "ACTIVE"
      );

    useInterviewStore
      .getState()
      .setInterviewStartedAt(
        Date.now()
      );

    socket.emit(
      "interview-started",
      roomCode
    );
  }

 async function handleEndInterview() {
  const roomCode =
    window.location.pathname
      .split("/")
      .pop();

  if (!roomCode) return;

  await endInterview(roomCode);

  socket.emit(
    "interview-ended",
    roomCode
  );

  resetInterviewState();

  router.push(
    "/interviewer"
  );
}

function handleLeaveInterview() {
  resetInterviewState();

  router.push(
    "/candidate"
  );
}
  return (
    <footer
      className="
        fixed
        bottom-4
        left-1/2
        z-50
        -translate-x-1/2

        rounded-full
        border

        bg-background/95
        backdrop-blur

        shadow-lg

        px-5
        py-2
      "
    >
      <div className="flex items-center gap-6">
        {/* Left */}
        <div className="flex flex-col justify-center gap-0 w-fit">
          <NetworkStatus />
          <InterviewTimer />
        </div>

        {/* Center */}
        {role === "INTERVIEWER" &&
          !inInterviewRoom && (
            <Button
              onClick={
                handleCreateInterview
              }
              className="
                h-8
                px-4
                rounded-lg
                text-sm
                font-medium
              "
            >
              Create Room
            </Button>
          )}

        {role ===
          "INTERVIEWER" &&
          inInterviewRoom &&
          effectiveStatus ===
            "WAITING" && (
            <Button
              onClick={
                handleStartInterview
              }
              className="
                h-8
                px-4
                rounded-lg
                text-sm
                font-medium
              "
            >
              Start Interview
            </Button>
          )}

        {/* Right */}
        <div className="flex items-center gap-2">
          <MicButton />

          <CameraButton />

          {inInterviewRoom && (
            <Button
              size="icon"
              variant="destructive"
              className="
                h-10
                w-10
                rounded-full
              "
              onClick={
  role ===
  "INTERVIEWER"
    ? handleEndInterview
    : handleLeaveInterview
}
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
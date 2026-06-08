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

    socket.emit(
      "interview-started",
      roomCode
    );

    router.refresh();
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

    router.refresh();
  }

  return (
    <footer className="flex h-16 items-center justify-center border-t">
      {/* Dashboard */}
      {role === "INTERVIEWER" &&
        !inInterviewRoom && (
          <Button
            onClick={
              handleCreateInterview
            }
          >
            Create Interview
          </Button>
        )}

      {/* Interviewer Waiting */}
      {role === "INTERVIEWER" &&
        inInterviewRoom &&
        effectiveStatus ===
          "WAITING" && (
          <Button
            onClick={
              handleStartInterview
            }
          >
            Start Interview
          </Button>
        )}

      {/* Interviewer Active */}
      {role === "INTERVIEWER" &&
        inInterviewRoom &&
        effectiveStatus ===
          "ACTIVE" && (
          <Button
            variant="destructive"
            onClick={
              handleEndInterview
            }
          >
            End Interview
          </Button>
        )}

      {/* Candidate Waiting */}
      {role === "CANDIDATE" &&
        inInterviewRoom &&
        effectiveStatus ===
          "WAITING" && (
          <p className="text-sm text-muted-foreground">
            Waiting for interviewer to
            start...
          </p>
        )}

      {/* Candidate Active */}
      {role === "CANDIDATE" &&
        inInterviewRoom &&
        effectiveStatus ===
          "ACTIVE" && (
          <p className="text-sm font-medium text-green-600">
            Interview In Progress
          </p>
        )}

      {/* Ended */}
      {inInterviewRoom &&
        effectiveStatus ===
          "ENDED" && (
          <p className="text-sm text-muted-foreground">
            Interview Ended
          </p>
        )}
    </footer>
  );
}
"use client";

import { createInterview } from "@/app/actions/create-interview";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type BottomBarProps = {
  role: "INTERVIEWER" | "CANDIDATE";
  inInterviewRoom: boolean;
};

export function BottomBar({
  role,
  inInterviewRoom,
}: BottomBarProps){
  const router = useRouter();

  async function handleCreateInterview() {
    try {
      const interview = await createInterview();

      router.push(`/interview/${interview.roomCode}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <footer className="flex h-16 items-center justify-center border-t">
      {role === "INTERVIEWER" &&
  !inInterviewRoom && (
    <Button onClick={handleCreateInterview}>
      Create Interview
    </Button>
)}
    </footer>
  );
}
import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RightPanel } from "./RightPanel";
import { BottomBar } from "./BottomBar";
import { CandidateRightPanel } from "./CandidateRightPanel";

interface AppShellProps {
  children: ReactNode;
  role: "INTERVIEWER" | "CANDIDATE";
  roomCode?: string;
  inInterviewRoom?: boolean;
  currentUserName: string;
}

export function AppShell({
  children,
  role,
  roomCode,
  inInterviewRoom = false,
  currentUserName,
}: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden grid grid-rows-[4rem_1fr_4rem] bg-background text-foreground">
      <TopBar roomCode={roomCode} />
      <main className="grid grid-cols-[1fr_320px] overflow-hidden">
        <section className="overflow-hidden p-6">{children}</section>

        {
  role === "INTERVIEWER" ? (
    <RightPanel currentUserName={currentUserName} />
  ) : (
    <CandidateRightPanel
      currentUserName={currentUserName}
    />
  )
}
      </main>

      <BottomBar
  role={role}
  inInterviewRoom={inInterviewRoom}
/>
    </div>
  );
}

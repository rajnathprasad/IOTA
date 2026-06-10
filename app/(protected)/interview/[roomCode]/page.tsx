import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { AppShell } from "@/components/layout/AppShell";
import { MainContent } from "@/components/dashboard/MainContent";
import { SocketProvider } from "@/components/socket/SocketProvider";

import { WebRTCProvider }
  from "@/components/webrtc/WebRTCProvider";

type Props = {
  params: Promise<{
    roomCode: string;
  }>;
};

export default async function InterviewPage({
  params,
}: Props) {
  const { roomCode } = await params;

  const session = await auth();

  const interview =
    await prisma.interview.findUnique({
      where: {
        roomCode,
      },
    });

  if (!interview) {
    throw new Error(
      "Interview not found"
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session?.user?.email ?? "",
      },
    });

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const role =
    user.role ===
    "INTERVIEWER"
      ? "INTERVIEWER"
      : "CANDIDATE";

  return (
    <AppShell
      role={role}
      roomCode={roomCode}
      inInterviewRoom={true}
      currentUserName={
        user.name ?? "User"
      }
      interviewStatus={
        interview.status
      }
    >
      <SocketProvider
        roomCode={roomCode}
        role={role}
      />

      <WebRTCProvider
  roomCode={roomCode}
  role={role}
>
  <MainContent />
</WebRTCProvider>
    </AppShell>
  );
}
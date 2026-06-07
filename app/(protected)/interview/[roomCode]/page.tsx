import { AppShell } from "@/components/layout/AppShell";
import { MainContent } from "@/components/dashboard/MainContent";

type Props = {
  params: Promise<{
    roomCode: string;
  }>;
};

export default async function InterviewPage({
  params,
}: Props) {
  const { roomCode } = await params;

  return (
    <AppShell
      role="CANDIDATE"
      roomCode={roomCode}
    >
      <MainContent />
    </AppShell>
  );
}
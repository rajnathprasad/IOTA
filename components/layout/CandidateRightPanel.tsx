import { ChatPanel } from "@/components/chat/ChatPanel";
import { ProctoringCompact } from "@/components/proctoring/ProctoringCompact";

type CandidateRightPanelProps = {
  currentUserName: string;
};

export function CandidateRightPanel({
  currentUserName,
}: CandidateRightPanelProps) {
  return (
    <aside className="h-full overflow-hidden border-l border-border bg-card">
      <div className="flex h-full flex-col gap-3 p-3">

        <ProctoringCompact />

        <section className="flex min-h-0 flex-1 flex-col rounded-lg border">
          <div className="shrink-0 border-b px-4 py-3 font-medium">
            Chat
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-2">
            <ChatPanel currentUserName={currentUserName} />
          </div>
        </section>

      </div>
    </aside>
  );
}
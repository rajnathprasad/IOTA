import { ChatPanel } from "@/components/chat/ChatPanel";
import { AIQuestionPanel } from "../interview/AIQuestionPanel";
import { ProctoringCompact } from "@/components/proctoring/ProctoringCompact";

type RightPanelProps = {
  currentUserName: string;
};

export function RightPanel({ currentUserName }: RightPanelProps) {
  return (
    <aside className="h-full overflow-hidden border-l border-border bg-card">
      <div className="grid h-full overflow-hidden grid-rows-[1fr_auto_1fr] gap-3 p-3">

        <section className="flex min-h-0 flex-col rounded-lg border">
          <div className="shrink-0 border-b px-4 py-3 font-medium">
            Find Questions Through AI
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2 scrollbar-hide">
            <AIQuestionPanel />
          </div>
        </section>


        <ProctoringCompact />

        <section className="flex min-h-0 flex-col rounded-lg border">
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
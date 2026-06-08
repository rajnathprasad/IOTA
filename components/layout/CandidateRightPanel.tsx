import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChatPanel }
  from "@/components/chat/ChatPanel";

import { AIQuestionPanel } from "../interview/AIQuestionPanel";
type CandidateRightPanelProps = {
  currentUserName: string;
};

export function CandidateRightPanel({
  currentUserName,
}: CandidateRightPanelProps) {
  return (
    <aside className="h-full overflow-hidden border-l border-border bg-card">
      <div className="h-full overflow-y-auto p-4">
        <Accordion
          type="multiple"
          defaultValue={["proctoring", "chat"]}
          className="w-full"
        >

          <AccordionItem value="proctoring">
            <AccordionTrigger>
              Proctoring
            </AccordionTrigger>

            <AccordionContent>
              <div className="max-h-64 overflow-y-auto">
                <p className="text-sm text-muted-foreground">
                  Waiting for interview.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="chat">
            <AccordionTrigger>
              Chat
            </AccordionTrigger>

            <AccordionContent>
              <div className="h-105">
                <ChatPanel
  currentUserName={currentUserName}
/>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { AIQuestionPanel } from "../interview/AIQuestionPanel";

export function RightPanel() {
  return (
    <aside className="h-full overflow-hidden border-l border-border bg-card">
      <div className="h-full overflow-y-auto p-4">
        <Accordion
          type="multiple"
          className="w-full"
        >
          <AccordionItem value="ai">
            <AccordionTrigger>
              AI Questions
            </AccordionTrigger>

            <AccordionContent>
              <div className="max-h-64 overflow-y-auto pr-1">
                <AIQuestionPanel />
              </div>
            </AccordionContent>
          </AccordionItem>

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
              <div className="max-h-64 overflow-y-auto">
                <p className="text-sm text-muted-foreground">
                  No messages yet.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
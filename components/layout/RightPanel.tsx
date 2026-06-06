import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function RightPanel() {
  return (
    <aside className="border-l border-border bg-card p-4">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="ai">
          <AccordionTrigger>AI Questions</AccordionTrigger>
          <AccordionContent>
            No questions generated yet.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="chat">
          <AccordionTrigger>Chat</AccordionTrigger>
          <AccordionContent>
            No messages yet.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="proctoring">
          <AccordionTrigger>Proctoring</AccordionTrigger>
          <AccordionContent>
            Waiting for interview.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notes">
          <AccordionTrigger>Notes</AccordionTrigger>
          <AccordionContent>
            No notes yet.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details">
          <AccordionTrigger>Interview Details</AccordionTrigger>
          <AccordionContent>
            Interview not started.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
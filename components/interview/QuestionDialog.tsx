"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { InterviewQuestion } from "./types";

import { useInterviewStore } from "@/store/interview-store";

import { socket }
  from "@/lib/socket";

type QuestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: InterviewQuestion | null;
};

export function QuestionDialog({
  open,
  onOpenChange,
  question,
}: QuestionDialogProps) {
  

  const setSharedQuestion = useInterviewStore(
    (state) => state.setSharedQuestion
  );

  if (!question) return null;

  const handleShare = () => {
  setSharedQuestion(question);

  const roomCode =
    window.location.pathname
      .split("/")
      .pop();

  socket.emit(
    "question-share",
    {
      roomCode,
      question,
    }
  );

  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>{question.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">
              Problem Statement
            </h3>

            <p className="text-sm text-muted-foreground">
              {question.problem}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              Sample Input
            </h3>

            <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-md border bg-muted/30 p-3 text-sm font-mono">
              {question.sampleInput}
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              Sample Output
            </h3>

            <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-md border bg-muted/30 p-3 text-sm font-mono">
              {question.sampleOutput}
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              Constraints
            </h3>

            <ul className="list-disc pl-5 text-sm">
              {question.constraints.map((constraint) => (
                <li key={constraint}>
                  {constraint}
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={handleShare}
            className="w-full"
          >
            Share Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
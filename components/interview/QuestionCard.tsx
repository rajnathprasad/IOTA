"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { InterviewQuestion } from "./types";

type QuestionCardProps = {
  question: InterviewQuestion;
  onClick: () => void;
};

export function QuestionCard({
  question,
  onClick,
}: QuestionCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all hover:border-primary hover:bg-accent/30"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium">
            {question.title}
          </h3>

          <span
            className="
              shrink-0
              rounded-full
              border
              px-2
              py-0.5
              text-xs
            "
          >
            {question.difficulty}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
          {question.problem}
        </p>
      </CardContent>
    </Card>
  );
}
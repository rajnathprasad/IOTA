"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { InterviewQuestion } from "./types";

type QuestionCardProps = {
  question: InterviewQuestion;
  onClick: () => void;
};

function difficultyClass(difficulty: string) {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "border-green-500 text-green-500";
    case "MEDIUM":
      return "border-yellow-500 text-yellow-500";
    case "HARD":
      return "border-red-500 text-red-500";
    case "INFO":
      return "border-sky-400 text-sky-400";
    default:
      return "border-muted-foreground text-muted-foreground";
  }
}

export function QuestionCard({ question, onClick }: QuestionCardProps) {
  const isInfo = question.difficulty.toUpperCase() === "INFO";
  return (
    <Card
      onClick={isInfo ? undefined : onClick}
      className={`transition-all ${
        isInfo
          ? "cursor-default opacity-75"
          : "cursor-pointer hover:border-primary hover:bg-accent/30"
      }`}
    >
      <CardContent className="p-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium">
            {question.title}
          </h3>

          <span className={`shrink-0 rounded-full border px-1.5 py-0 text-[10px] ${difficultyClass(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
          {question.problem}
        </p>
      </CardContent>
    </Card>
  );
}
"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { QuestionDialog } from "./QuestionDialog";
import type { InterviewQuestion } from "./types";
import { generateQuestions } from "@/app/actions/generate-questions";

export function AIQuestionPanel() {
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleGenerateQuestions() {
    try {
      setLoading(true);
      const result = await generateQuestions(prompt);
      const cleaned = result.replace(/```json/g, "").replace(/```/g, "");
      try {
        const parsed = JSON.parse(cleaned);
        setQuestions(parsed);
      } catch (error) {
        console.error(error);
        setQuestions([{
          id: "parse-error",
          title: "Server Busy",
          difficulty: "INFO",
          problem: "Please try generating questions again.",
          sampleInput: "",
          sampleOutput: "",
          constraints: [],
        }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-2">

      <div className="shrink-0 flex flex-col gap-2">
        <Input
          className="h-8 text-xs"
          placeholder="e.g. Give me 4 medium sliding window questions..."
          value={prompt}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && prompt.trim()) {
              handleGenerateQuestions();
            }
          }}
        />

        <Button
          className="h-8 w-full text-xs"
          disabled={loading || !prompt.trim()}
          onClick={handleGenerateQuestions}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </Button>
      </div>


      {questions.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-1">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => {
                setSelectedQuestion(question);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <QuestionDialog
        open={open}
        onOpenChange={setOpen}
        question={selectedQuestion}
      />
    </div>
  );
}
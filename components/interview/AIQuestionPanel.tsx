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

  const [selectedQuestion, setSelectedQuestion] =
    useState<InterviewQuestion | null>(null);

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

        setQuestions([
          {
            id: "parse-error",
            title: "Failed to Parse AI Response",
            difficulty: "INFO",
            problem: "Please try generating questions again.",
            sampleInput: "",
            sampleOutput: "",
            constraints: [],
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="e.g. Give me 4 medium sliding window questions..."
        value={prompt}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrompt(e.target.value)
        }
      />

      <Button
        className="w-full"
        disabled={loading || !prompt.trim()}
        onClick={handleGenerateQuestions}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </Button>

      {questions.length > 0 && (
        <div className="space-y-1.5">
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

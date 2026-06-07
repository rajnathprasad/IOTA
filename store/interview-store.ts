import { create } from "zustand";
import type { InterviewQuestion } from "@/components/interview/types";

type InterviewStore = {
  sharedQuestion: InterviewQuestion | null;

  language: string;
  code: string;
  output: string;

  setSharedQuestion: (
    question: InterviewQuestion
  ) => void;

  setLanguage: (
    language: string
  ) => void;

  setCode: (
    code: string
  ) => void;

  setOutput: (
    output: string
  ) => void;
};

export const useInterviewStore =
  create<InterviewStore>((set) => ({
    sharedQuestion: null,

    language: "javascript",

    code: `function solve() {

}`,

    output: "",

    setSharedQuestion: (question) =>
      set({
        sharedQuestion: question,
      }),

    setLanguage: (language) =>
      set({
        language,
      }),

    setCode: (code) =>
      set({
        code,
      }),

    setOutput: (output) =>
      set({
        output,
      }),
  }));
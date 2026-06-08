import { create } from "zustand";

import type { InterviewQuestion }
  from "@/components/interview/types";

import type { ChatMessage }
  from "@/components/chat/types";

type InterviewStore = {
  sharedQuestion:
    InterviewQuestion | null;

  language: string;
  code: string;
  output: string;

  candidateConnected: boolean;
  interviewerConnected: boolean;

  interviewStatus:
    | "WAITING"
    | "ACTIVE"
    | "ENDED";

  messages: ChatMessage[];

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

  setMessages: (
    messages: ChatMessage[]
  ) => void;

  addMessage: (
    message: ChatMessage
  ) => void;

  setCandidateConnected: (
    connected: boolean
  ) => void;

  setInterviewerConnected: (
    connected: boolean
  ) => void;

  setInterviewStatus: (
    status:
      | "WAITING"
      | "ACTIVE"
      | "ENDED"
  ) => void;
};

export const useInterviewStore =
  create<InterviewStore>((set) => ({
    sharedQuestion: null,

    language: "javascript",

    code: `function solve() {

}`,

    output: "",

    candidateConnected: false,
    interviewerConnected: false,

    interviewStatus: "WAITING",

    messages: [],

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

    setMessages: (messages) =>
      set({
        messages,
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    setCandidateConnected: (
      connected
    ) =>
      set({
        candidateConnected:
          connected,
      }),

    setInterviewerConnected: (
      connected
    ) =>
      set({
        interviewerConnected:
          connected,
      }),

    setInterviewStatus: (
      status
    ) =>
      set({
        interviewStatus: status,
      }),
  }));
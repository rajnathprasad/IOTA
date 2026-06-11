import { create } from "zustand";
import type { InterviewQuestion } from "@/components/interview/types";
import type { ChatMessage } from "@/components/chat/types";

type InterviewStore = {
  sharedQuestion: InterviewQuestion | null;
  language: string;
  code: string;
  output: string;
  candidateConnected: boolean;
  interviewerConnected: boolean;
  candidateSharing: boolean;
  interviewerSharing: boolean;
  remoteScreenStreamId: string | null;
  peerConnection: RTCPeerConnection | null;
  interviewStatus: "WAITING" | "ACTIVE" | "ENDED";
  activeView: "CODE" | "INTERVIEWER_SCREEN" | "CANDIDATE_SCREEN";
  remoteActiveView: "CODE" | "INTERVIEWER_SCREEN" | "CANDIDATE_SCREEN";
  messages: ChatMessage[];
  interviewStartedAt: number | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  micEnabled: boolean;
  cameraEnabled: boolean;
  remoteMicEnabled: boolean;
  remoteCameraEnabled: boolean;
  localScreenStream: MediaStream | null;
  remoteInterviewerScreenStream: MediaStream | null;
  remoteCandidateScreenStream: MediaStream | null;

  setRemoteScreenStreamId: (id: string | null) => void;
  setPeerConnection: (peerConnection: RTCPeerConnection | null) => void;
  setLocalScreenStream: (stream: MediaStream | null) => void;
  setRemoteInterviewerScreenStream: (stream: MediaStream | null) => void;
  setRemoteCandidateScreenStream: (stream: MediaStream | null) => void;
  setMicEnabled: (enabled: boolean) => void;
  setCameraEnabled: (enabled: boolean) => void;
  setRemoteMicEnabled: (enabled: boolean) => void;
  setRemoteCameraEnabled: (enabled: boolean) => void;
  setInterviewStartedAt: (timestamp: number) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
  setSharedQuestion: (question: InterviewQuestion) => void;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setCandidateConnected: (connected: boolean) => void;
  setInterviewerConnected: (connected: boolean) => void;
  setCandidateSharing: (sharing: boolean) => void;
  setInterviewerSharing: (sharing: boolean) => void;
  setInterviewStatus: (status: "WAITING" | "ACTIVE" | "ENDED") => void;
  setActiveView: (view: "CODE" | "INTERVIEWER_SCREEN" | "CANDIDATE_SCREEN") => void;
  setRemoteActiveView: (view: "CODE" | "INTERVIEWER_SCREEN" | "CANDIDATE_SCREEN") => void;
  resetInterviewState: () => void;
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  sharedQuestion: null,
  language: "javascript",
  code: `function solve() {\n\n}`,
  output: "",
  candidateConnected: false,
  interviewerConnected: false,
  candidateSharing: false,
  interviewerSharing: false,
  remoteScreenStreamId: null,        // ← was missing
  peerConnection: null,
  interviewStatus: "WAITING",
  activeView: "CODE",
  remoteActiveView: "CODE",
  messages: [],
  interviewStartedAt: null,
  localStream: null,
  remoteStream: null,
  micEnabled: true,
  cameraEnabled: true,
  remoteMicEnabled: true,
  remoteCameraEnabled: true,
  localScreenStream: null,
  remoteInterviewerScreenStream: null,
  remoteCandidateScreenStream: null,

  setRemoteScreenStreamId: (id) => set({ remoteScreenStreamId: id }), 
  setPeerConnection: (peerConnection) => set({ peerConnection }),
  setSharedQuestion: (question) => set({ sharedQuestion: question }),
  setLanguage: (language) => set({ language }),
  setCode: (code) => set({ code }),
  setOutput: (output) => set({ output }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setCandidateConnected: (connected) => set({ candidateConnected: connected }),
  setInterviewerConnected: (connected) => set({ interviewerConnected: connected }),
  setCandidateSharing: (sharing) => set({ candidateSharing: sharing }),
  setInterviewerSharing: (sharing) => set({ interviewerSharing: sharing }),
  setInterviewStatus: (status) => set({ interviewStatus: status }),
  setActiveView: (view) => set({ activeView: view }),
  setRemoteActiveView: (view) => set({ remoteActiveView: view }),
  setInterviewStartedAt: (timestamp) => set({ interviewStartedAt: timestamp }),
  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setMicEnabled: (enabled) => set({ micEnabled: enabled }),
  setCameraEnabled: (enabled) => set({ cameraEnabled: enabled }),
  setRemoteMicEnabled: (enabled) => set({ remoteMicEnabled: enabled }),
  setRemoteCameraEnabled: (enabled) => set({ remoteCameraEnabled: enabled }),
  setLocalScreenStream: (stream) => set({ localScreenStream: stream }),
  setRemoteInterviewerScreenStream: (stream) => set({ remoteInterviewerScreenStream: stream }),
  setRemoteCandidateScreenStream: (stream) => set({ remoteCandidateScreenStream: stream }),

  resetInterviewState: () =>
    set({
      interviewStatus: "WAITING",
      interviewStartedAt: null,
      micEnabled: true,
      cameraEnabled: true,
      remoteMicEnabled: true,
      remoteCameraEnabled: true,
      localScreenStream: null,
      remoteInterviewerScreenStream: null,
      remoteCandidateScreenStream: null,
      remoteScreenStreamId: null,    // ← was missing
      candidateConnected: false,
      interviewerConnected: false,
      candidateSharing: false,
      interviewerSharing: false,
    }),
}));
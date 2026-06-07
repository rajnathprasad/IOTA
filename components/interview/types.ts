export type InterviewQuestion = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "INFO";
  problem: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
};
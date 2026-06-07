import { InterviewQuestion } from "./types";

export const MOCK_QUESTIONS: InterviewQuestion[] = [
  {
    id: "1",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    problem:
      "Given a string s, find the length of the longest substring without repeating characters.",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    constraints: [
      "1 <= s.length <= 50000",
      "s consists of English letters",
    ],
  },
  {
    id: "2",
    title: "Maximum Sum Subarray",
    difficulty: "Medium",
    problem:
      "Find the contiguous subarray with the largest sum.",
    sampleInput: "-2,1,-3,4,-1,2,1,-5,4",
    sampleOutput: "6",
    constraints: [
      "1 <= n <= 100000",
    ],
  },
];
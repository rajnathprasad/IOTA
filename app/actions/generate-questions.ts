"use server";

import { gemini } from "@/lib/gemini";

async function generateWithRetry(
  prompt: string,
  retries = 3
): Promise<string> {
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
Generate 4 coding interview questions based on:

"${prompt}"

Return ONLY a JSON array.

Format:

[
  {
    "id": "1",
    "title": "Question Title",
    "difficulty": "Easy | Medium | Hard",
    "problem": "Problem statement",
    "sampleInput": "input",
    "sampleOutput": "output",
    "constraints": [
      "constraint 1",
      "constraint 2"
    ]
  }
]
`,
    });

    return response.text ?? "[]";
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    return generateWithRetry(
      prompt,
      retries - 1
    );
  }
}

export async function generateQuestions(
  prompt: string
) {
  try {
    return await generateWithRetry(prompt);
  } catch (error) {
    console.error(error);

    return JSON.stringify([
      {
        id: "error",
        title: "AI Temporarily Busy",
        difficulty: "INFO",
        problem:
          "The AI service is currently under heavy load. Please try again in a few seconds.",
        sampleInput: "",
        sampleOutput: "",
        constraints: [],
      },
    ]);
  }
}
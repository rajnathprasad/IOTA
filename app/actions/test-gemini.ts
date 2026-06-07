"use server";

import { gemini } from "@/lib/gemini";

export async function testGemini() {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Give me one DSA interview question",
  });

  console.log(response.text);
return response.text ?? "";

}
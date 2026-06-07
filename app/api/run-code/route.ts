import { NextResponse } from "next/server";

const LANGUAGE_IDS = {
  javascript: 63,
  typescript: 74,
  python: 71,
  java: 62,
  cpp: 54,
};

export async function POST(req: Request) {
  const { code, language } = await req.json();

  const languageId =
    LANGUAGE_IDS[
      language as keyof typeof LANGUAGE_IDS
    ];

  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
      }),
    }
  );

  const result = await response.json();

  return NextResponse.json(result);
}
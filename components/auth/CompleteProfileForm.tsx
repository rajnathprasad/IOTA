"use client";

import { completeProfile } from "@/app/actions/complete-profile";
import { useState } from "react";

export function CompleteProfileForm() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSelect(
    role: "CANDIDATE" | "INTERVIEWER"
  ) {
    setLoading(role);

    await completeProfile(role);

    setLoading(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => handleSelect("CANDIDATE")}
        disabled={!!loading}
        className="rounded-md border px-3 py-3 text-left hover:bg-accent disabled:opacity-50"
      >
        <div className="font-medium">
          Candidate
        </div>

        <div className="text-sm text-muted-foreground">
          I am here to take technical interviews
        </div>
      </button>

      <button
        onClick={() => handleSelect("INTERVIEWER")}
        disabled={!!loading}
        className="rounded-md border px-3 py-3 text-left hover:bg-accent disabled:opacity-50"
      >
        <div className="font-medium">
          Interviewer
        </div>

        <div className="text-sm text-muted-foreground">
          I conduct and manage technical interviews
        </div>
      </button>

      {loading && (
        <p className="text-center text-sm text-muted-foreground">
          Setting up your account…
        </p>
      )}
    </div>
  );
}
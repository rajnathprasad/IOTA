"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinInterview } from "@/app/actions/join-interview";

export function CandidateJoinForm() {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleJoin() {
    if (!roomCode.trim() || loading) return;
    try {
      setLoading(true);
      const interview = await joinInterview(roomCode);
      router.push(`/interview/${interview.roomCode}`);
    } catch {
      alert("Invalid room code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="mb-6 text-2xl font-semibold">Join Interview</h1>

        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter Room Code"
          className="w-full rounded-md border px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleJoin();
          }}
        />

        <button
          onClick={handleJoin}
          disabled={loading || !roomCode.trim()}
          className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-primary-foreground
                     disabled:cursor-not-allowed disabled:opacity-50
                     hover:bg-primary/90 transition-colors"
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState }
  from "react";

import { Clock3 }
  from "lucide-react";

import { useInterviewStore }
  from "@/store/interview-store";

export function InterviewTimer() {
  const interviewStartedAt =
    useInterviewStore(
      (s) =>
        s.interviewStartedAt
    );

  const [time, setTime] =
    useState("00:00:00");

  useEffect(() => {
    if (
      !interviewStartedAt
    ) {
      setTime(
        "00:00:00"
      );
      return;
    }

    const interval =
      setInterval(() => {
        const elapsed =
          Math.floor(
            (Date.now() -
              interviewStartedAt) /
              1000
          );

        const hours =
          Math.floor(
            elapsed / 3600
          );

        const minutes =
          Math.floor(
            (elapsed %
              3600) /
              60
          );

        const seconds =
          elapsed % 60;

        setTime(
          [
            hours,
            minutes,
            seconds,
          ]
            .map((n) =>
              String(
                n
              ).padStart(
                2,
                "0"
              )
            )
            .join(":")
        );
      }, 1000);

    return () =>
      clearInterval(
        interval
      );
  }, [
    interviewStartedAt,
  ]);

  return (
    <div className="flex items-center gap-1">
      <Clock3 className="h-3 w-3" />

      <span className="text-[10px] font-medium">
        {time}
      </span>
    </div>
  );
}
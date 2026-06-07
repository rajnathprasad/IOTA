"use server";

import { prisma } from "@/lib/prisma";

export async function joinInterview(
  roomCode: string
) {
  const interview =
    await prisma.interview.findUnique({
      where: {
        roomCode: roomCode.toUpperCase(),
      },
    });

  if (!interview) {
    throw new Error("Interview not found");
  }

  return interview;
}
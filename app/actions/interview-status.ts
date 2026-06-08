"use server";

import { prisma } from "@/lib/prisma";

export async function startInterview(
  roomCode: string
) {
  await prisma.interview.update({
    where: {
      roomCode,
    },
    data: {
      status: "ACTIVE",
    },
  });
}

export async function endInterview(
  roomCode: string
) {
  await prisma.interview.update({
    where: {
      roomCode,
    },
    data: {
      status: "ENDED",
    },
  });
}
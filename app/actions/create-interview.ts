"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function createInterview() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const roomCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  const interview = await prisma.interview.create({
    data: {
      roomCode,
      interviewerId: user.id,
    },
  });

  return interview;
}
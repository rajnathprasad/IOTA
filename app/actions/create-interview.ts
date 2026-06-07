"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateRoomCode } from "@/lib/generate-room-code";
import { redirect } from "next/navigation";

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

  const roomCode = generateRoomCode();

  await prisma.interview.create({
    data: {
      roomCode,
      interviewerId: user.id,
    },
  });

  redirect(`/interview/${roomCode}`);
}
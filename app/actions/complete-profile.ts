"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/generated/prisma/client";


export async function completeProfile(
  role: "CANDIDATE" | "INTERVIEWER"
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validRoles: UserRole[] = ["CANDIDATE", "INTERVIEWER"];
  if (!validRoles.includes(role as UserRole)) {
    throw new Error("Invalid role");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role },
  });

  redirect("/dashboard");
}
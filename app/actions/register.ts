"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "CANDIDATE" | "INTERVIEWER"
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });


  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}
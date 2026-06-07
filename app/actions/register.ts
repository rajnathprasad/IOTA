"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: UserRole
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
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

  return {
    success: true,
  };
}
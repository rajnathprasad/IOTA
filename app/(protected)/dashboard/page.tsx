import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.role) {
    redirect("/complete-profile");
  }

  if (session.user.role === "INTERVIEWER") {
    redirect("/interviewer");
  }

  redirect("/candidate");
}
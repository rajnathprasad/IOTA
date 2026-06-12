import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CompleteProfileForm } from "@/components/auth/CompleteProfileForm";
import { TopBar } from "@/components/layout/TopBar";

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // If they already have a role, they don't belong here
  if (session.user.role) {
    redirect("/dashboard");
  }

  return (
  <div className="min-h-screen bg-background">
    <TopBar />

    <div className="flex items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">
          One last step
        </h1>

        <p className="text-sm text-muted-foreground">
          How will you be using IOTA?
        </p>

        <CompleteProfileForm />
      </div>
    </div>
  </div>
);
}
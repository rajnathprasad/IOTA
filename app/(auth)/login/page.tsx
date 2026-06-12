import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { TopBar } from "@/components/layout/TopBar";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    if (!session.user.role) redirect("/complete-profile");
    if (session.user.role === "INTERVIEWER") redirect("/interviewer");
    redirect("/candidate");
  }

  return (
  <div className="min-h-screen bg-background">
    <TopBar />

    <div className="flex items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border p-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-foreground underline underline-offset-4"
            >
              Sign up
            </a>
          </p>
        </div>

        <GoogleSignInButton />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            or continue with email
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <LoginForm />
      </div>
    </div>
  </div>
);
}
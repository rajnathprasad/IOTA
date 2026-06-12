import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { HeroLogo } from "@/components/common/HeroLogo";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    if (!session.user.role) redirect("/complete-profile");
    if (session.user.role === "INTERVIEWER") redirect("/interviewer");
    redirect("/candidate");
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />
      <section
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <HeroLogo />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          <b>Everything you need for technical interviews</b><br/> Live Coding, Video Communication, AI-Assisted Questions, and Proctoring.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { HeroLogo } from "@/components/common/HeroLogo";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />

      <section className="flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "calc(100vh - 120px)" }}>
        <HeroLogo />

        <p className="mt-4 max-w-2xl text-muted-foreground">
          AI-Powered Technical Interview Platform with collaborative coding,
          real-time communication, AI-generated questions, and proctoring.
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
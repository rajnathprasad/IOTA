import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          IOTA
        </h1>

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
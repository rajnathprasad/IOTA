import { Clock3 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/common/Logo";

export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
  <Logo />

  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
  <div className="size-2 rounded-full bg-green-500" />
  <span>Ready</span>
</div>

    <ThemeToggle />
  </div>
</header>
  );
}
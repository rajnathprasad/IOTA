import { Clock3 } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6">
      <div>
        <h1 className="font-semibold">IOTA</h1>
      </div>

      <div className="flex items-center gap-4">
        <Clock3 className="size-4" />
        <span>00:00</span>
      </div>
    </header>
  );
}
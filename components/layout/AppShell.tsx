import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RightPanel } from "./RightPanel";
import { BottomBar } from "./BottomBar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="grid min-h-screen grid-rows-[56px_1fr_64px] bg-background text-foreground">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content + Right Panel */}
      <main className="grid grid-cols-[1fr_320px] overflow-hidden">
        <section className="overflow-auto p-6">
          {children}
        </section>

        <RightPanel />
      </main>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
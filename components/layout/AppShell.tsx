import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RightPanel } from "./RightPanel";
import { BottomBar } from "./BottomBar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden grid grid-rows-[4rem_1fr_4rem] bg-background text-foreground">
      <TopBar />
      <main className="grid grid-cols-[1fr_320px] overflow-hidden">
        <section className="overflow-hidden p-6">
          {children}
        </section>

        <RightPanel />
      </main>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
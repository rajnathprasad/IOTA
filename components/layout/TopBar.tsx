import { auth } from "@/auth";
import { logout } from "@/app/actions/auth-actions";
import { Clock3 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type TopBarProps = {
  roomCode?: string;
};


export async function TopBar({
  roomCode,
}: TopBarProps) {
  const session = await auth();
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-4">
  <Logo />

  {roomCode && (
    <div className="rounded-md border px-3 py-1 text-sm text-muted-foreground">
      Room: {roomCode}
    </div>
  )}
</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-2 rounded-full bg-green-500" />
          <span>Ready</span>
        </div>
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-accent  focus:outline-none transition-colors ">
                <Avatar className="size-8">
                  <AvatarImage
                    src={session.user.image ?? undefined}
                    alt={session.user.name ?? "User"}
                  />

                  <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-40 truncate text-sm font-medium">
                  {session.user.name}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>

              <DropdownMenuItem>Settings</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full cursor-pointer text-left"
                  >
                    Logout
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}

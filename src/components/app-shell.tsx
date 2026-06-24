import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { Home, UtensilsCrossed, CalendarDays, NotebookPen, Search, Settings, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/planner", label: "Daily Planner", icon: UtensilsCrossed },
  { to: "/weekly", label: "Weekly Planner", icon: CalendarDays },
  { to: "/journal", label: "Food Journal", icon: NotebookPen },
  { to: "/explorer", label: "Food Explorer", icon: Search },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const profile = useApp((s) => s.profile);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">Kerala Diet Planner</span>
          </Link>
          <div className="hidden text-xs text-muted-foreground md:block">
            {profile ? `Hi, ${profile.name ?? "friend"}` : "Guest mode"}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 md:block">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary-soft text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 pb-24 md:pb-0">{children ?? <Outlet />}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5">
          {NAV.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[10px]",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

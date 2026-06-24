import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useApp, todayISO } from "@/lib/store";
import { calcTargets } from "@/lib/recommend";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Flame, Drumstick, Wheat, Droplet, UtensilsCrossed, CalendarDays, NotebookPen } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Kerala Diet Planner" }] }),
  component: Dashboard,
});

function Dashboard() {
  const profile = useApp((s) => s.profile);
  const journal = useApp((s) => s.journal);
  if (!profile) return <Navigate to="/profile" />;

  const t = calcTargets(profile);
  const today = todayISO();
  const todays = journal.filter((j) => j.date === today);
  const consumed = todays.reduce(
    (a, j) => ({ kcal: a.kcal + j.kcal, protein: a.protein + j.protein, carbs: a.carbs + j.carbs, fat: a.fat + j.fat }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const stats = [
    { label: "Calories", value: consumed.kcal, target: t.kcal, unit: "kcal", icon: Flame, color: "text-primary", bg: "bg-primary-soft" },
    { label: "Protein", value: consumed.protein, target: t.protein, unit: "g", icon: Drumstick, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Carbs", value: consumed.carbs, target: t.carbs, unit: "g", icon: Wheat, color: "text-warning", bg: "bg-warning/10" },
    { label: "Fat", value: consumed.fat, target: t.fat, unit: "g", icon: Droplet, color: "text-info", bg: "bg-info/10" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Hello {profile.name ?? "there"} 👋</h1>
          <p className="text-sm text-muted-foreground">
            BMR {t.bmr} · TDEE {t.tdee} · Goal: {profile.goal}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => {
            const pct = Math.min(100, Math.round((s.value / Math.max(1, s.target)) * 100));
            const Icon = s.icon;
            return (
              <div key={s.label} className="card-surface p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`grid h-7 w-7 place-items-center rounded-md ${s.bg} ${s.color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {s.label}
                </div>
                <div className="mt-3 text-2xl font-bold">{s.value}<span className="text-sm font-normal text-muted-foreground"> / {s.target} {s.unit}</span></div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: pct + "%" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <QuickCard to="/planner" icon={UtensilsCrossed} title="Generate today's plan" body="Get breakfast, lunch and dinner suited to your goal." />
          <QuickCard to="/weekly" icon={CalendarDays} title="Plan the week" body="Monday-to-Sunday with built-in variety rules." />
          <QuickCard to="/journal" icon={NotebookPen} title="Log a meal" body="Track what you actually ate today." />
        </div>

        <div className="card-surface p-5">
          <h2 className="text-base font-semibold">Today's meals</h2>
          {todays.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              No meals logged yet today. <Link to="/journal" className="text-primary underline">Log one →</Link>
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {todays.map((j) => (
                <li key={j.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">{j.meal}</div>
                    <div className="font-medium">{j.customName ?? j.recipeId}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{j.kcal} kcal</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function QuickCard({ to, icon: Icon, title, body }: { to: string; icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Link to={to} className="card-surface group block p-5 transition-colors hover:bg-muted/40">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-base font-semibold group-hover:text-primary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      <span className="mt-3 inline-block text-sm font-medium text-primary">Open →</span>
    </Link>
  );
}

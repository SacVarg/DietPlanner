import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import { generateWeeklyPlan, calcTargets } from "@/lib/recommend";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CUISINES } from "@/lib/data/cuisines";
import type { Recipe } from "@/lib/data/recipes";

export const Route = createFileRoute("/weekly")({
  head: () => ({ meta: [{ title: "Weekly Planner — Kerala Diet Planner" }] }),
  component: WeeklyPage,
});

function WeeklyPage() {
  const profile = useApp((s) => s.profile);
  const seed = useApp((s) => s.weeklySeed);
  const regen = useApp((s) => s.regenerateWeekly);
  const [cuisine, setCuisine] = useState<"all" | Recipe["cuisine"]>("kerala");
  const targets = profile ? calcTargets(profile) : null;
  const plan = useMemo(
    () => (profile ? generateWeeklyPlan(profile, seed, cuisine) : null),
    [profile, seed, cuisine],
  );

  if (!profile || !targets || !plan) return <Navigate to="/profile" />;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Weekly meal plan</h1>
            <p className="text-sm text-muted-foreground">
              Target {targets.kcal} kcal · {targets.protein}g protein per day
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              onClick={() => setCuisine("all")}
              className={
                (cuisine === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground") + " rounded-full border px-3 py-1 text-xs"
              }
            >
              All cuisines
            </button>
            {CUISINES.filter((c) => c.id !== "global").map((c) => (
              <button
                key={c.id}
                onClick={() => setCuisine(c.id)}
                className={
                  (cuisine === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground") + " rounded-full border px-3 py-1 text-xs"
                }
              >
                {c.label}
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={regen}>
            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate week
          </Button>
        </div>

        <div className="space-y-3">
          {plan.days.map(({ day, plan: d }) => (
            <div key={day} className="card-surface overflow-hidden">
              <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
                <div className="font-semibold">{day}</div>
                <div className="text-xs text-muted-foreground">
                  {d.totals.kcal} kcal · {d.totals.protein}g P
                </div>
              </div>
              <div className="grid gap-px bg-border md:grid-cols-4">
                {(["breakfast", "lunch", "dinner", "dessert"] as const).map((m) => {
                  const r = d[m];
                  return (
                    <div key={m} className="bg-card p-4">
                      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {m}
                      </div>
                      {r ? (
                        <Link
                          to="/recipes/$id"
                          params={{ id: r.id }}
                          className="mt-1 block text-sm font-medium hover:text-primary"
                        >
                          {r.name}
                        </Link>
                      ) : (
                        <div className="mt-1 text-sm text-muted-foreground">—</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

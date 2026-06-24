import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useApp, todayISO } from "@/lib/store";
import { generateDailyPlan } from "@/lib/recommend";
import { computeRecipeNutrition, type Recipe } from "@/lib/data/recipes";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Daily Planner — Kerala Diet Planner" }] }),
  component: Planner,
});

function Planner() {
  const profile = useApp((s) => s.profile);
  const seed = useApp((s) => s.dailySeed);
  const regen = useApp((s) => s.regenerateDaily);
  const addJournal = useApp((s) => s.addJournal);
  if (!profile) return <Navigate to="/profile" />;

  const plan = useMemo(() => generateDailyPlan(profile, seed), [profile, seed]);

  const log = (r: Recipe, meal: "breakfast" | "lunch" | "dinner") => {
    const n = computeRecipeNutrition(r);
    addJournal({
      id: crypto.randomUUID(),
      date: todayISO(),
      meal,
      recipeId: r.id,
      customName: r.name,
      kcal: n.kcal, protein: n.protein, carbs: n.carbs, fat: n.fat,
    });
    toast.success(`Logged ${r.name}`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Today's plan</h1>
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{plan.totals.kcal} kcal</span>
              {" · "} {plan.totals.protein}g protein · {plan.totals.carbs}g carbs · {plan.totals.fat}g fat
            </p>
          </div>
          <Button variant="outline" onClick={regen}>
            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(["breakfast", "lunch", "dinner"] as const).map((m) => {
            const r = plan[m];
            return (
              <div key={m} className="card-surface flex flex-col p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{m}</div>
                {r ? (
                  <>
                    <h3 className="mt-2 text-lg font-semibold">{r.name}</h3>
                    <div className="mt-1 text-xs text-muted-foreground">{r.localName}</div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{r.prepMinutes} min</span>
                      <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3" />{computeRecipeNutrition(r).kcal} kcal</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 capitalize">{r.cost}</span>
                    </div>
                    <div className="mt-auto flex gap-2 pt-4">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to="/recipes/$id" params={{ id: r.id }}>View recipe</Link>
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => log(r, m)}>Log meal</Button>
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No recipe available for your preferences.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

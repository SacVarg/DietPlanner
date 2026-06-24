import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FOODS } from "@/lib/data/foods";
import { RECIPES, computeRecipeNutrition } from "@/lib/data/recipes";
import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/explorer")({
  head: () => ({ meta: [{ title: "Food Explorer — Kerala Diet Planner" }] }),
  component: Explorer,
});

function Explorer() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"foods" | "recipes">("recipes");

  const filteredFoods = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FOODS;
    return FOODS.filter((f) => f.name.toLowerCase().includes(s) || f.localName.toLowerCase().includes(s));
  }, [q]);

  const filteredRecipes = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return RECIPES;
    return RECIPES.filter((r) => r.name.toLowerCase().includes(s) || r.localName.toLowerCase().includes(s));
  }, [q]);

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Food explorer</h1>
          <p className="text-sm text-muted-foreground">Browse Kerala foods and recipes with nutrition info.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search foods or recipes…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm">
            {(["recipes", "foods"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "rounded-full px-3 py-1 capitalize " +
                  (tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "recipes" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((r) => {
              const n = computeRecipeNutrition(r);
              return (
                <Link to="/recipes/$id" params={{ id: r.id }} key={r.id} className="card-surface group p-4 transition-colors hover:bg-muted/40">
                  <div className="text-xs text-muted-foreground">{r.localName}</div>
                  <h3 className="mt-1 text-base font-semibold group-hover:text-primary">{r.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                    {r.meal.map((m) => (
                      <span key={m} className="rounded-full bg-primary-soft px-2 py-0.5 capitalize text-accent-foreground">{m}</span>
                    ))}
                    <span className="rounded-full bg-muted px-2 py-0.5 capitalize">{r.cost}</span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {n.kcal} kcal · {n.protein}g P · {r.prepMinutes} min
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Food</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2 text-right">kcal / 100g</th>
                  <th className="px-4 py-2 text-right">P</th>
                  <th className="px-4 py-2 text-right">C</th>
                  <th className="px-4 py-2 text-right">F</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.map((f) => (
                  <tr key={f.id} className="border-t border-border">
                    <td className="px-4 py-2">
                      <div className="font-medium">{f.name}</div>
                      <div className="text-xs text-muted-foreground">{f.localName}</div>
                    </td>
                    <td className="px-4 py-2 capitalize text-muted-foreground">{f.category}</td>
                    <td className="px-4 py-2 text-right">{f.kcal}</td>
                    <td className="px-4 py-2 text-right">{f.protein}</td>
                    <td className="px-4 py-2 text-right">{f.carbs}</td>
                    <td className="px-4 py-2 text-right">{f.fat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RECIPE_MAP, computeRecipeNutrition, type Recipe } from "@/lib/data/recipes";
import { FOOD_MAP } from "@/lib/data/foods";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Clock, Flame, ChefHat, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/recipes/$id")({
  head: ({ params }) => ({ meta: [{ title: `${RECIPE_MAP[params.id]?.name ?? "Recipe"} — Kerala Diet Planner` }] }),
  loader: ({ params }): Recipe => {
    const r = RECIPE_MAP[params.id];
    if (!r) throw notFound();
    return r;
  },
  notFoundComponent: () => (
    <AppShell>
      <p className="text-muted-foreground">Recipe not found. <Link to="/explorer" className="text-primary underline">Browse recipes</Link></p>
    </AppShell>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const r = Route.useLoaderData();
  const n = computeRecipeNutrition(r);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/explorer"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>
          </Button>
        </div>

        <div className="card-surface p-6">
          <div className="text-sm text-muted-foreground">{r.localName}</div>
          <h1 className="mt-1 text-3xl font-bold">{r.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {r.meal.map((m) => (
              <span key={m} className="rounded-full bg-primary-soft px-2 py-0.5 capitalize text-accent-foreground">{m}</span>
            ))}
            {r.diet.map((d) => (
              <span key={d} className="rounded-full border border-border px-2 py-0.5 capitalize">{d}</span>
            ))}
            <span className="rounded-full bg-muted px-2 py-0.5 capitalize">{r.cost}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {r.prepMinutes} min</span>
            <span className="inline-flex items-center gap-1"><ChefHat className="h-4 w-4" /> {r.difficulty}</span>
            <span className="inline-flex items-center gap-1"><Flame className="h-4 w-4" /> {n.kcal} kcal / serving</span>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 rounded-xl bg-surface p-3 text-center text-xs">
            <Stat label="kcal" value={n.kcal} />
            <Stat label="Protein" value={`${n.protein}g`} />
            <Stat label="Carbs" value={`${n.carbs}g`} />
            <Stat label="Fat" value={`${n.fat}g`} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface p-5">
            <h2 className="text-base font-semibold">Ingredients</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {r.ingredients.map((ing) => {
                const f = FOOD_MAP[ing.foodId];
                return (
                  <li key={ing.foodId} className="flex items-center justify-between border-b border-border/60 pb-1.5">
                    <span>{f?.name ?? ing.foodId}<span className="ml-1 text-xs text-muted-foreground">({f?.localName})</span></span>
                    <span className="text-muted-foreground">{ing.grams} g</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-base font-semibold">Steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
              {r.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-sm font-bold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

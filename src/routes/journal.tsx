import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp, todayISO, type JournalEntry } from "@/lib/store";
import { calcTargets } from "@/lib/recommend";
import { RECIPES, computeRecipeNutrition } from "@/lib/data/recipes";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Food Journal — Kerala Diet Planner" }] }),
  component: JournalPage,
});

function JournalPage() {
  const profile = useApp((s) => s.profile);
  const journal = useApp((s) => s.journal);
  const addJournal = useApp((s) => s.addJournal);
  const removeJournal = useApp((s) => s.removeJournal);

  const [meal, setMeal] = useState<JournalEntry["meal"]>("breakfast");
  const [recipeId, setRecipeId] = useState("");
  const [customName, setCustomName] = useState("");
  const [kcal, setKcal] = useState<number | "">("");
  const [protein, setProtein] = useState<number | "">("");
  const [carbs, setCarbs] = useState<number | "">("");
  const [fat, setFat] = useState<number | "">("");

  if (!profile) return <Navigate to="/profile" />;
  const targets = calcTargets(profile);

  const today = todayISO();
  const todays = journal.filter((j) => j.date === today);
  const totals = todays.reduce(
    (a, j) => ({ kcal: a.kcal + j.kcal, protein: a.protein + j.protein, carbs: a.carbs + j.carbs, fat: a.fat + j.fat }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const onPickRecipe = (id: string) => {
    setRecipeId(id);
    const r = RECIPES.find((x) => x.id === id);
    if (r) {
      const n = computeRecipeNutrition(r);
      setCustomName(r.name);
      setKcal(n.kcal); setProtein(n.protein); setCarbs(n.carbs); setFat(n.fat);
    }
  };

  const submit = () => {
    if (!customName || kcal === "") {
      toast.error("Add a name and calories");
      return;
    }
    addJournal({
      id: crypto.randomUUID(),
      date: today,
      meal,
      recipeId: recipeId || undefined,
      customName,
      kcal: Number(kcal),
      protein: Number(protein || 0),
      carbs: Number(carbs || 0),
      fat: Number(fat || 0),
    });
    setRecipeId(""); setCustomName(""); setKcal(""); setProtein(""); setCarbs(""); setFat("");
    toast.success("Meal logged");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Food journal</h1>
          <p className="text-sm text-muted-foreground">
            Today: {totals.kcal} / {targets.kcal} kcal · {totals.protein} / {targets.protein}g protein
          </p>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-base font-semibold">Log a meal</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <Label>Meal</Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {(["breakfast", "lunch", "dinner", "snack"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMeal(m)}
                    className={
                      "rounded-full border px-3 py-1.5 text-sm capitalize " +
                      (meal === m
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-muted")
                    }
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="recipe">Pick from recipes</Label>
              <select
                id="recipe"
                className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                value={recipeId}
                onChange={(e) => onPickRecipe(e.target.value)}
              >
                <option value="">— Choose a recipe (optional) —</option>
                {RECIPES.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. Two idlis with sambar" />
            </div>

            <div className="grid grid-cols-4 gap-2 md:col-span-2">
              <NumField label="kcal" value={kcal} onChange={setKcal} />
              <NumField label="Protein" value={protein} onChange={setProtein} />
              <NumField label="Carbs" value={carbs} onChange={setCarbs} />
              <NumField label="Fat" value={fat} onChange={setFat} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={submit}><Plus className="mr-1 h-4 w-4" /> Add to journal</Button>
          </div>
        </div>

        <div className="card-surface overflow-hidden">
          <div className="border-b border-border bg-surface px-4 py-2 text-sm font-semibold">Today</div>
          {todays.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">Nothing logged yet today.</p>
          ) : (
            <ul className="divide-y divide-border">
              {todays.map((j) => (
                <li key={j.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{j.meal}</div>
                    <div className="text-sm font-medium">{j.customName}</div>
                    <div className="text-xs text-muted-foreground">{j.kcal} kcal · {j.protein}P · {j.carbs}C · {j.fat}F</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeJournal(j.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {journal.length > todays.length && (
          <div className="card-surface overflow-hidden">
            <div className="border-b border-border bg-surface px-4 py-2 text-sm font-semibold">Earlier</div>
            <ul className="divide-y divide-border">
              {journal.filter((j) => j.date !== today).slice(0, 25).map((j) => (
                <li key={j.id} className="flex items-center justify-between p-4 text-sm">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{j.date} · {j.meal}</div>
                    <div className="font-medium">{j.customName}</div>
                  </div>
                  <div className="text-muted-foreground">{j.kcal} kcal</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number | ""; onChange: (v: number | "") => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      />
    </div>
  );
}

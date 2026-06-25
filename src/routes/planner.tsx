import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useApp, todayISO, type AiMeal } from "@/lib/store";
import { generateDailyPlan } from "@/lib/recommend";
import { CUISINES, CUISINE_LABELS } from "@/lib/data/cuisines";
import { computeRecipeNutrition, type Recipe } from "@/lib/data/recipes";
import { recommendTemplates } from "@/lib/data/templates";
import { cookWithIngredientsFn, generateAiPlanFn } from "@/lib/ai.server";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Clock, Flame, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Daily Planner — Kerala Diet Planner" }] }),
  component: Planner,
});

type CookSuggestion = {
  name: string;
  cuisine: string;
  mealType: string;
  matchScore: number;
  availableIngredientsUsed?: string[];
  additionalIngredientsRequired?: string[];
  steps?: string[];
};

function Planner() {
  const profile = useApp((s) => s.profile);
  const seed = useApp((s) => s.dailySeed);
  const regen = useApp((s) => s.regenerateDaily);
  const addJournal = useApp((s) => s.addJournal);

  // V3 AI State
  const aiPlan = useApp((s) => s.aiPlan);
  const setAiPlan = useApp((s) => s.setAiPlan);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [cuisine, setCuisine] = useState<"all" | Recipe["cuisine"]>("kerala");
  const [pantryInput, setPantryInput] = useState("");
  const [cookSuggestions, setCookSuggestions] = useState<CookSuggestion[]>([]);
  const [isCookingAi, setIsCookingAi] = useState(false);

  // SAFE HOOKS: Run before return to prevent React crashes
  const plan = useMemo(() => {
    if (!profile) return null;
    return generateDailyPlan(profile, seed, cuisine);
  }, [profile, seed, cuisine]);

  const templates = useMemo(() => {
    if (!profile) return [];
    return recommendTemplates(profile).slice(0, 3);
  }, [profile]);

  if (!profile || !plan) return <Navigate to="/profile" />;

  const logStatic = (r: Recipe, meal: "breakfast" | "lunch" | "dinner" | "dessert") => {
    const n = computeRecipeNutrition(r);
    addJournal({
      id: crypto.randomUUID(),
      date: todayISO(),
      meal,
      recipeId: r.id,
      customName: r.name,
      kcal: Math.round(n.kcal),
      protein: Math.round(n.protein),
      carbs: Math.round(n.carbs),
      fat: Math.round(n.fat),
    });
    toast.success(`Logged ${r.name} for ${meal}`);
  };

  const logAi = (m: AiMeal, meal: "breakfast" | "lunch" | "dinner" | "dessert") => {
    addJournal({
      id: crypto.randomUUID(),
      date: todayISO(),
      meal,
      recipeId: `ai-${Date.now()}`,
      customName: `${m.name} (AI)`,
      kcal: Math.round(m.kcal),
      protein: Math.round(m.protein),
      carbs: Math.round(m.carbs),
      fat: Math.round(m.fat),
    });
    toast.success(`Logged ${m.name} for ${meal}`);
  };

  const handleGenerateAi = async () => {
    setIsGeneratingAi(true);
    try {
      const result = await generateAiPlanFn({ data: { profile, cuisine } });
      setAiPlan(result);
      toast.success("AI generated a perfect meal plan for you!");
    } catch (err) {
      console.error(err);

      // THE FIX: Smart error handling for the UI Popup
      const errorMessage = err instanceof Error ? err.message : "";
      if (errorMessage.includes("503") || errorMessage.includes("demand")) {
        toast.error(
          "The AI server is currently overloaded with high demand. Please try again in a few minutes!",
        );
      } else {
        toast.error("The AI server is temporarily unavailable. Please try again later.");
      }
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCookWithIngredients = async () => {
    const ingredients = pantryInput
      .split(/[,,\n]/)
      .map((i) => i.trim())
      .filter(Boolean);
    if (ingredients.length === 0) {
      toast.error("Enter at least one ingredient.");
      return;
    }
    setIsCookingAi(true);
    try {
      const result = await cookWithIngredientsFn({ data: { ingredients } });
      setCookSuggestions(result);
      toast.success("AI found recipes from your ingredients.");
    } catch (err) {
      console.error(err);
      toast.error("The AI server is temporarily unavailable. Please try again later.");
    } finally {
      setIsCookingAi(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daily planner</h1>
            <p className="text-sm text-muted-foreground">
              Your meals for today based on your profile and cuisine preference.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
          </div>

          <div className="flex items-center gap-2">
            {!aiPlan && (
              <Button onClick={regen} variant="outline" size="sm" disabled={isGeneratingAi}>
                <RefreshCw className="mr-2 h-4 w-4" /> Static
              </Button>
            )}
            <Button
              onClick={handleGenerateAi}
              disabled={isGeneratingAi}
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isGeneratingAi ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {aiPlan ? "Regenerate with AI" : "Ask AI"}
            </Button>
          </div>
        </div>

        {aiPlan && (
          <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-indigo-800 dark:bg-indigo-950/30">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                Custom AI Plan Active
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAiPlan(null)}
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
            >
              Clear & return to Static
            </Button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {(["breakfast", "lunch", "dinner", "dessert"] as const).map((mealKey) => {
            // Render AI Meal
            if (aiPlan && aiPlan[mealKey]) {
              const m = aiPlan[mealKey];
              return (
                <div
                  key={mealKey}
                  className="card-surface relative flex flex-col p-5 border-indigo-100 dark:border-indigo-900 shadow-sm"
                >
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {mealKey}
                  </div>
                  <h3 className="font-semibold leading-tight">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.localName}</p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" /> {Math.round(m.kcal)} kcal
                    </span>
                    <span className="font-medium text-primary">P: {Math.round(m.protein)}g</span>
                  </div>

                  <div className="mt-auto pt-4 flex gap-2">
                    <Button className="w-full" size="sm" onClick={() => logAi(m, mealKey)}>
                      Log meal
                    </Button>
                  </div>
                </div>
              );
            }

            // Render Static Meal
            const r = plan[mealKey];
            return (
              <div key={mealKey} className="card-surface relative flex flex-col p-5">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {mealKey}
                </div>
                {r ? (
                  <>
                    <h3 className="font-semibold leading-tight">
                      <Link
                        to="/recipes/$id"
                        params={{ id: r.id }}
                        className="hover:underline hover:text-primary"
                      >
                        {r.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground">{r.localName}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {r.prepMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3" /> {Math.round(computeRecipeNutrition(r).kcal)}{" "}
                        kcal
                      </span>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button className="w-full" size="sm" onClick={() => logStatic(r, mealKey)}>
                        Log meal
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    No recipe available for your preferences.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <section className="card-surface space-y-4 p-5">
          <div>
            <h2 className="text-lg font-semibold">Cook With What I Have</h2>
            <p className="text-sm text-muted-foreground">
              Enter ingredients as comma-separated text or one per line. AI will rank dishes by best
              ingredient match.
            </p>
          </div>
          <Textarea
            value={pantryInput}
            onChange={(e) => setPantryInput(e.target.value)}
            placeholder="Example: rice, egg, onion, tomato, curd"
          />
          <Button onClick={handleCookWithIngredients} disabled={isCookingAi}>
            {isCookingAi ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Recommend dishes
          </Button>
          {cookSuggestions.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {cookSuggestions.map((s, idx) => (
                <div key={idx} className="rounded-lg border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{s.name}</h3>
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs">
                      {s.matchScore}% match
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.cuisine} · {s.mealType}
                  </p>
                  <p className="mt-3 text-xs">
                    <strong>Uses:</strong> {(s.availableIngredientsUsed || []).join(", ") || "—"}
                  </p>
                  <p className="mt-1 text-xs">
                    <strong>Needs:</strong>{" "}
                    {(s.additionalIngredientsRequired || []).join(", ") || "Nothing major"}
                  </p>
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
                    {(s.steps || []).map((step: string) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </section>

        {templates.length > 0 && !aiPlan && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Meal templates for your goal</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {templates.map((t) => (
                <div key={t.id} className="card-surface p-4">
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}

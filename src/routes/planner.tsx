import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useApp, todayISO, type AiMeal } from "@/lib/store";
import { generateDailyPlan } from "@/lib/recommend";
import { computeRecipeNutrition, type Recipe } from "@/lib/data/recipes";
import { recommendTemplates } from "@/lib/data/templates";
import { generateAiPlanFn } from "@/lib/ai.server";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, Flame, Sparkles, Loader2 } from "lucide-react";
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
  
  // V3 AI State
  const aiPlan = useApp((s) => s.aiPlan);
  const setAiPlan = useApp((s) => s.setAiPlan);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // SAFE HOOKS: Run before return to prevent React crashes
  const plan = useMemo(() => {
    if (!profile) return null;
    return generateDailyPlan(profile, seed);
  }, [profile, seed]);

  const templates = useMemo(() => {
    if (!profile) return [];
    return recommendTemplates(profile).slice(0, 3);
  }, [profile]);

  if (!profile || !plan) return <Navigate to="/profile" />;

  const logStatic = (r: Recipe, meal: "breakfast" | "lunch" | "dinner") => {
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

  const logAi = (m: AiMeal, meal: "breakfast" | "lunch" | "dinner") => {
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
      const result = await generateAiPlanFn({ data: { profile } });
      setAiPlan(result);
      toast.success("AI generated a perfect Kerala meal plan for you!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI plan. Check Cloudflare API key settings.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daily planner</h1>
            <p className="text-sm text-muted-foreground">Your meals for today based on your profile.</p>
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
            <Button variant="ghost" size="sm" onClick={() => setAiPlan(null)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
              Clear & return to Static
            </Button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {(["breakfast", "lunch", "dinner"] as const).map((mealKey) => {
            
            // Render AI Meal
            if (aiPlan && aiPlan[mealKey]) {
              const m = aiPlan[mealKey];
              return (
                <div key={mealKey} className="card-surface relative flex flex-col p-5 border-indigo-100 dark:border-indigo-900 shadow-sm">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {mealKey}
                  </div>
                  <h3 className="font-semibold leading-tight">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.localName}</p>
                  
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {Math.round(m.kcal)} kcal</span>
                    <span className="font-medium text-primary">P: {Math.round(m.protein)}g</span>
                  </div>
                  
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button className="w-full" size="sm" onClick={() => logAi(m, mealKey)}>Log meal</Button>
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
                      <Link to="/recipes/$id" params={{ id: r.id }} className="hover:underline hover:text-primary">
                        {r.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground">{r.localName}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.prepMinutes}m</span>
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {Math.round(computeRecipeNutrition(r).kcal)} kcal</span>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button className="w-full" size="sm" onClick={() => logStatic(r, mealKey)}>Log meal</Button>
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No recipe available for your preferences.</p>
                )}
              </div>
            );
          })}
        </div>

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
                      <span key={h} className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">{h}</span>
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

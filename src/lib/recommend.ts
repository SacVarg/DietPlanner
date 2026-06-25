import { RECIPES, computeRecipeNutrition, type Recipe } from "./data/recipes";
import type { Profile } from "./store";

export function calcBMR(p: Pick<Profile, "age" | "gender" | "heightCm" | "weightKg">) {
  // Mifflin-St Jeor
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  return p.gender === "female" ? base - 161 : base + 5;
}

export const ACTIVITY_MULTIPLIER: Record<Profile["activity"], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

export function calcTargets(p: Profile) {
  const bmr = calcBMR(p);
  const tdee = bmr * ACTIVITY_MULTIPLIER[p.activity];
  let kcal = tdee;
  switch (p.goal) {
    case "lose":
      kcal = tdee - 500;
      break;
    case "gain":
      kcal = tdee + 350;
      break;
    case "muscle":
      kcal = tdee + 250;
      break;
    case "maintain":
    case "healthy":
    default:
      kcal = tdee;
  }
  kcal = Math.max(1200, Math.round(kcal));

  let proteinPerKg = 1.2;
  if (p.goal === "muscle") proteinPerKg = 1.8;
  else if (p.goal === "lose") proteinPerKg = 1.6;
  else if (p.goal === "gain") proteinPerKg = 1.5;
  const protein = Math.round(proteinPerKg * p.weightKg);

  const fat = Math.round((kcal * 0.25) / 9);
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));

  return { kcal, protein, carbs, fat, bmr: Math.round(bmr), tdee: Math.round(tdee) };
}

export function filterRecipes(
  p: Profile,
  meal: Recipe["meal"][number],
  cuisine?: Recipe["cuisine"] | "all",
) {
  const matchesProfile = (r: Recipe) => {
    if (!r.meal.includes(meal)) return false;
    // diet
    if (p.diet === "vegetarian" && !r.diet.some((d) => d === "vegetarian" || d === "vegan"))
      return false;
    if (p.diet === "vegan" && !r.diet.includes("vegan")) return false;
    if (
      p.diet === "eggetarian" &&
      !r.diet.some((d) => d === "vegetarian" || d === "vegan" || d === "eggetarian")
    )
      return false;
    // budget
    if (p.budget === "budget" && r.cost !== "budget") return false;
    if (p.budget === "moderate" && r.cost === "premium") return false;
    return true;
  };

  const mealPool = RECIPES.filter(matchesProfile);
  if (!cuisine || cuisine === "all") return mealPool;

  const cuisinePool = mealPool.filter((r) => r.cuisine === cuisine);
  return cuisinePool.length ? cuisinePool : mealPool;
}

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pick<T>(arr: T[], rng: () => number): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(rng() * arr.length)];
}

export type DailyPlan = {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
  totals: { kcal: number; protein: number; carbs: number; fat: number };
};

export function generateDailyPlan(
  p: Profile,
  seed = Date.now(),
  cuisine?: Recipe["cuisine"] | "all",
): DailyPlan {
  const rng = seededRng(seed);
  const breakfast = pick(filterRecipes(p, "breakfast", cuisine), rng);
  const lunch = pick(filterRecipes(p, "lunch", cuisine), rng);
  const dinner = pick(filterRecipes(p, "dinner", cuisine), rng);
  const dessert = pick(filterRecipes(p, "dessert", "all"), rng);
  const totals = [breakfast, lunch, dinner, dessert].reduce(
    (acc, r) => {
      if (!r) return acc;
      const n = computeRecipeNutrition(r);
      acc.kcal += n.kcal;
      acc.protein += n.protein;
      acc.carbs += n.carbs;
      acc.fat += n.fat;
      return acc;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
  return { breakfast, lunch, dinner, dessert, totals };
}

export type WeeklyPlan = { days: { day: string; plan: DailyPlan }[] };

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function generateWeeklyPlan(
  p: Profile,
  seed = Date.now(),
  cuisine?: Recipe["cuisine"] | "all",
): WeeklyPlan {
  const rng = seededRng(seed);
  const breakfastPool = filterRecipes(p, "breakfast", cuisine);
  const lunchPool = filterRecipes(p, "lunch", cuisine);
  const dinnerPool = filterRecipes(p, "dinner", cuisine);
  const dessertPool = filterRecipes(p, "dessert", "all");

  const breakfastCounts = new Map<string, number>();
  let lastLunch: string | undefined;
  let lastDinner: string | undefined;

  const days = DAYS.map((day) => {
    // breakfast: max 2 per week
    const bf = (() => {
      const candidates = breakfastPool.filter((r) => (breakfastCounts.get(r.id) ?? 0) < 2);
      const r = pick(candidates.length ? candidates : breakfastPool, rng);
      if (r) breakfastCounts.set(r.id, (breakfastCounts.get(r.id) ?? 0) + 1);
      return r;
    })();
    const lunch = (() => {
      const candidates = lunchPool.filter((r) => r.id !== lastLunch);
      const r = pick(candidates.length ? candidates : lunchPool, rng);
      lastLunch = r?.id;
      return r;
    })();
    const dinner = (() => {
      const candidates = dinnerPool.filter((r) => r.id !== lastDinner);
      const r = pick(candidates.length ? candidates : dinnerPool, rng);
      lastDinner = r?.id;
      return r;
    })();
    const dessert = pick(dessertPool, rng);
    const totals = [bf, lunch, dinner, dessert].reduce(
      (acc, r) => {
        if (!r) return acc;
        const n = computeRecipeNutrition(r);
        acc.kcal += n.kcal;
        acc.protein += n.protein;
        acc.carbs += n.carbs;
        acc.fat += n.fat;
        return acc;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    );
    return { day, plan: { breakfast: bf, lunch, dinner, dessert, totals } satisfies DailyPlan };
  });

  return { days };
}

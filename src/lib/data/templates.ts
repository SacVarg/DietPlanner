// Goal-based meal templates (PRD v2 §22) — 10 templates spanning all goal/budget combos.
import type { Profile } from "../store";

export type MealTemplate = {
  id: string;
  name: string;
  description: string;
  goal: Profile["goal"];
  budget: Profile["budget"];
  diet?: Profile["diet"];
  // Distribution of daily kcal across meals
  split: { breakfast: number; lunch: number; dinner: number; snack: number };
  // Multiplier on TDEE for this template (overrides goal default if set)
  kcalAdjust?: number;
  // Protein g per kg body weight
  proteinPerKg: number;
  // Highlight tags
  highlights: string[];
};

export const MEAL_TEMPLATES: MealTemplate[] = [
  {
    id: "weight-loss-budget",
    name: "Weight Loss — Budget Kerala",
    description: "Calorie deficit using affordable staples: kanji, moong, vegetables, fish.",
    goal: "lose", budget: "budget",
    split: { breakfast: 0.25, lunch: 0.4, dinner: 0.3, snack: 0.05 },
    kcalAdjust: -500, proteinPerKg: 1.6,
    highlights: ["High fibre", "Low oil", "Cheap proteins"],
  },
  {
    id: "weight-loss-moderate",
    name: "Weight Loss — Moderate",
    description: "Balanced deficit with oats, chicken, paneer and seasonal veg.",
    goal: "lose", budget: "moderate",
    split: { breakfast: 0.25, lunch: 0.4, dinner: 0.3, snack: 0.05 },
    kcalAdjust: -500, proteinPerKg: 1.6,
    highlights: ["High protein", "Lean dairy", "Whole grains"],
  },
  {
    id: "maintain-traditional",
    name: "Traditional Kerala Maintenance",
    description: "Classic three-meal Kerala plate with rice, sambar, thoran, fish curry.",
    goal: "maintain", budget: "budget",
    split: { breakfast: 0.3, lunch: 0.4, dinner: 0.3, snack: 0 },
    proteinPerKg: 1.2,
    highlights: ["Matta rice", "Coconut-based", "Fish or veg"],
  },
  {
    id: "maintain-premium",
    name: "Premium Maintenance",
    description: "Variety-rich maintenance with seafood, paneer and biryanis.",
    goal: "maintain", budget: "premium",
    split: { breakfast: 0.3, lunch: 0.4, dinner: 0.3, snack: 0 },
    proteinPerKg: 1.2,
    highlights: ["Seafood", "Variety", "Restaurant favourites"],
  },
  {
    id: "muscle-gain-budget",
    name: "Muscle Gain — Budget",
    description: "High-protein cheap plan: eggs, moong, peanut, milk and fish.",
    goal: "muscle", budget: "budget",
    split: { breakfast: 0.3, lunch: 0.35, dinner: 0.25, snack: 0.1 },
    kcalAdjust: 300, proteinPerKg: 1.8,
    highlights: ["Eggs & dal", "Cheap protein", "5 meals"],
  },
  {
    id: "muscle-gain-premium",
    name: "Muscle Gain — Premium",
    description: "Chicken, paneer, fish, almonds — built around 1.8g/kg protein.",
    goal: "muscle", budget: "premium",
    split: { breakfast: 0.3, lunch: 0.35, dinner: 0.25, snack: 0.1 },
    kcalAdjust: 350, proteinPerKg: 1.8,
    highlights: ["Chicken breast", "Paneer", "Almonds"],
  },
  {
    id: "weight-gain-veg",
    name: "Weight Gain — Vegetarian",
    description: "Calorie surplus with milk, ghee, banana, paneer and ragi.",
    goal: "gain", budget: "moderate", diet: "vegetarian",
    split: { breakfast: 0.3, lunch: 0.35, dinner: 0.25, snack: 0.1 },
    kcalAdjust: 400, proteinPerKg: 1.4,
    highlights: ["Full-fat dairy", "Ragi malt", "Nuts"],
  },
  {
    id: "healthy-eating",
    name: "Healthy Eating (Default)",
    description: "Balanced macros, more vegetables, moderate oil; no calorie shift.",
    goal: "healthy", budget: "moderate",
    split: { breakfast: 0.3, lunch: 0.35, dinner: 0.3, snack: 0.05 },
    proteinPerKg: 1.2,
    highlights: ["Balanced", "Veg-forward", "Mindful oil"],
  },
  {
    id: "diabetic-friendly",
    name: "Diabetic-Friendly Maintenance",
    description: "Low-GI breakfasts, controlled carbs, more fibre and protein.",
    goal: "maintain", budget: "moderate",
    split: { breakfast: 0.25, lunch: 0.35, dinner: 0.3, snack: 0.1 },
    proteinPerKg: 1.4,
    highlights: ["Low GI", "High fibre", "Split meals"],
  },
  {
    id: "non-veg-fitness",
    name: "Non-Veg Fitness",
    description: "High-protein non-veg plan with fish, chicken and eggs at every meal.",
    goal: "muscle", budget: "moderate", diet: "non-vegetarian",
    split: { breakfast: 0.3, lunch: 0.35, dinner: 0.3, snack: 0.05 },
    kcalAdjust: 250, proteinPerKg: 2.0,
    highlights: ["Fish daily", "Eggs", "1g/lb protein"],
  },
];

export const TEMPLATE_MAP: Record<string, MealTemplate> = Object.fromEntries(
  MEAL_TEMPLATES.map((t) => [t.id, t])
);

/** Recommend templates that match a profile by goal/budget/diet. */
export function recommendTemplates(p: Profile): MealTemplate[] {
  return MEAL_TEMPLATES.filter((t) => {
    if (t.goal !== p.goal && p.goal !== "healthy") return false;
    if (t.diet && t.diet !== p.diet) return false;
    return true;
  });
}

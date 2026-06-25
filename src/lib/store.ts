import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Profile = {
  name?: string;
  age: number;
  gender: "male" | "female" | "other";
  heightCm: number;
  weightKg: number;
  activity: "sedentary" | "light" | "moderate" | "active" | "athlete";
  goal: "lose" | "maintain" | "gain" | "muscle" | "healthy";
  diet: "vegetarian" | "vegan" | "eggetarian" | "non-vegetarian";
  budget: "budget" | "moderate" | "premium";
  ingredients?: string[];
};

export type JournalEntry = {
  id: string;
  date: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
  recipeId?: string;
  customName?: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

// --- NEW V3 AI TYPES ---
export type AiMeal = {
  name: string;
  localName: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: { foodId: string; grams: number }[];
  steps: string[];
};

export type AiPlan = {
  breakfast: AiMeal;
  lunch: AiMeal;
  dinner: AiMeal;
  dessert?: AiMeal;
};
// -----------------------

type State = {
  profile?: Profile;
  setProfile: (p: Profile) => void;
  clearProfile: () => void;
  journal: JournalEntry[];
  addJournal: (e: JournalEntry) => void;
  removeJournal: (id: string) => void;
  dailySeed: number;
  weeklySeed: number;
  regenerateDaily: () => void;
  regenerateWeekly: () => void;

  // --- NEW V3 AI STATE ---
  aiPlan: AiPlan | null;
  setAiPlan: (plan: AiPlan | null) => void;
};

export const todayISO = () => new Date().toISOString().split("T")[0];

export const useApp = create<State>()(
  persist(
    (set) => ({
      profile: undefined,
      setProfile: (p) => set({ profile: p }),
      clearProfile: () => set({ profile: undefined, journal: [], aiPlan: null }),
      journal: [],
      addJournal: (e) => set((s) => ({ journal: [e, ...s.journal] })),
      removeJournal: (id) => set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),
      dailySeed: 1,
      weeklySeed: 1,
      regenerateDaily: () => set({ dailySeed: Date.now() }),
      regenerateWeekly: () => set({ weeklySeed: Date.now() }),

      // --- NEW V3 AI ACTIONS ---
      aiPlan: null,
      setAiPlan: (plan) => set({ aiPlan: plan }),
    }),
    {
      name: "kerala-diet-planner",
      // Removing the explicit createJSONStorage here prevents the SSR crash!
    },
  ),
);

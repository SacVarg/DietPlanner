import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  date: string; // YYYY-MM-DD
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  recipeId?: string;
  customName?: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

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
};

export const useApp = create<State>()(
  persist(
    (set) => ({
      profile: undefined,
      setProfile: (p) => set({ profile: p }),
      clearProfile: () => set({ profile: undefined, journal: [] }),
      journal: [],
      addJournal: (e) => set((s) => ({ journal: [e, ...s.journal] })),
      removeJournal: (id) => set((s) => ({ journal: s.journal.filter(j => j.id !== id) })),
      dailySeed: 1,
      weeklySeed: 1,
      regenerateDaily: () => set({ dailySeed: Date.now() }),
      regenerateWeekly: () => set({ weeklySeed: Date.now() }),
    }),
    {
      name: "kerala-diet-planner",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : (undefined as never))),
      skipHydration: false,
    }
  )
);

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

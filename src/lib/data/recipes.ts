import { FOOD_MAP, type Food } from "./foods";

export type RecipeIngredient = { foodId: string; grams: number };
export type Recipe = {
  id: string;
  name: string;
  localName: string;
  meal: ("breakfast" | "lunch" | "dinner" | "snack")[];
  diet: ("vegetarian" | "vegan" | "non-vegetarian" | "eggetarian")[];
  prepMinutes: number;
  difficulty: "easy" | "medium" | "hard";
  cost: "budget" | "moderate" | "premium";
  tags?: string[];
  servings: number;
  ingredients: RecipeIngredient[];
  steps: string[];
};

export const RECIPES: Recipe[] = [
  // BREAKFAST
  {
    id: "puttu-kadala",
    name: "Puttu & Kadala Curry",
    localName: "Puttu & Kadala",
    meal: ["breakfast"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 30, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "puttu", grams: 150 },
      { foodId: "kadala", grams: 50 },
      { foodId: "coconut", grams: 15 },
      { foodId: "coconut-oil", grams: 5 },
      { foodId: "onion", grams: 30 },
    ],
    steps: [
      "Soak black chickpeas overnight; pressure-cook with salt till tender.",
      "Steam puttu in puttu maker with grated coconut layers (~8 min).",
      "Sauté onions and spices in coconut oil; add cooked kadala with water.",
      "Simmer 5 min and serve hot with steamed puttu.",
    ],
  },
  {
    id: "idli-sambar",
    name: "Idli & Sambar",
    localName: "Idli Sambar",
    meal: ["breakfast", "dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 25, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "idli", grams: 200 },
      { foodId: "toor-dal", grams: 30 },
      { foodId: "drumstick", grams: 50 },
      { foodId: "tomato", grams: 50 },
      { foodId: "onion", grams: 30 },
      { foodId: "coconut-oil", grams: 5 },
    ],
    steps: [
      "Steam 3-4 idlis from fermented batter.",
      "Cook toor dal with turmeric until soft.",
      "Add drumstick, tomato, onion and tamarind water; simmer 8 min.",
      "Temper with mustard, curry leaves in coconut oil.",
    ],
  },
  {
    id: "appam-stew",
    name: "Appam & Vegetable Stew",
    localName: "Appam Stew",
    meal: ["breakfast", "dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 35, difficulty: "medium", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "appam", grams: 140 },
      { foodId: "carrot", grams: 50 },
      { foodId: "beans", grams: 50 },
      { foodId: "coconut", grams: 25 },
      { foodId: "coconut-oil", grams: 5 },
    ],
    steps: [
      "Cook vegetables in thin coconut milk with whole spices.",
      "Finish with thick coconut milk; do not boil after.",
      "Serve hot with 2 appams.",
    ],
  },
  {
    id: "oats-porridge",
    name: "Oats Porridge with Banana",
    localName: "Oats Kanji",
    meal: ["breakfast"],
    diet: ["vegetarian"],
    prepMinutes: 10, difficulty: "easy", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "oats", grams: 50 },
      { foodId: "milk", grams: 200 },
      { foodId: "banana", grams: 100 },
    ],
    steps: ["Simmer oats in milk 5-7 min.", "Top with sliced banana."],
  },
  {
    id: "dosa-chutney",
    name: "Dosa with Coconut Chutney",
    localName: "Dosa Chammanthi",
    meal: ["breakfast", "dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 20, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "dosa", grams: 160 },
      { foodId: "coconut", grams: 30 },
      { foodId: "onion", grams: 20 },
    ],
    steps: ["Spread dosa batter on hot tawa; cook till crisp.", "Grind coconut with green chilli, ginger; temper with mustard."],
  },
  {
    id: "egg-dosa",
    name: "Egg Dosa",
    localName: "Mutta Dosa",
    meal: ["breakfast"],
    diet: ["eggetarian", "non-vegetarian"],
    prepMinutes: 15, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "dosa", grams: 120 },
      { foodId: "egg", grams: 100 },
      { foodId: "onion", grams: 30 },
    ],
    steps: ["Pour dosa batter; crack egg on top.", "Add onions, chilli; fold and serve."],
  },
  {
    id: "ragi-puttu",
    name: "Ragi Puttu",
    localName: "Panji Pullu Puttu",
    meal: ["breakfast"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 25, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "ragi", grams: 60 },
      { foodId: "coconut", grams: 20 },
      { foodId: "banana", grams: 100 },
    ],
    steps: ["Mix ragi flour with water and salt; layer with coconut.", "Steam 10 min; serve with banana."],
  },

  // LUNCH
  {
    id: "matta-rice-sambar",
    name: "Matta Rice with Sambar & Thoran",
    localName: "Chooru Sambar Thoran",
    meal: ["lunch"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 40, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "rice-boiled", grams: 200 },
      { foodId: "toor-dal", grams: 30 },
      { foodId: "cabbage", grams: 100 },
      { foodId: "coconut", grams: 20 },
      { foodId: "coconut-oil", grams: 8 },
    ],
    steps: ["Boil matta rice 25 min.", "Make sambar with toor dal and vegetables.", "Stir-fry cabbage thoran with coconut."],
  },
  {
    id: "fish-curry-rice",
    name: "Meen Curry with Rice",
    localName: "Meen Curry Chooru",
    meal: ["lunch"],
    diet: ["non-vegetarian"],
    prepMinutes: 35, difficulty: "medium", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "rice-boiled", grams: 180 },
      { foodId: "sardine", grams: 120 },
      { foodId: "coconut-oil", grams: 8 },
      { foodId: "onion", grams: 40 },
      { foodId: "tomato", grams: 40 },
    ],
    steps: ["Grind chilli, coriander, turmeric with water.", "Cook sardine in clay pot with kudampuli and masala.", "Simmer 12 min; serve with rice."],
  },
  {
    id: "kerala-chicken-curry",
    name: "Nadan Chicken Curry & Rice",
    localName: "Nadan Kozhi Curry",
    meal: ["lunch", "dinner"],
    diet: ["non-vegetarian"],
    prepMinutes: 45, difficulty: "medium", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "chicken", grams: 150 },
      { foodId: "rice-boiled", grams: 180 },
      { foodId: "coconut", grams: 25 },
      { foodId: "onion", grams: 50 },
      { foodId: "coconut-oil", grams: 10 },
    ],
    steps: ["Marinate chicken with turmeric, chilli, salt.", "Sauté onion, ginger, garlic; add masala.", "Add chicken and coconut milk; simmer 20 min."],
  },
  {
    id: "vegetable-stew-rice",
    name: "Vegetable Ishtu with Rice",
    localName: "Pacha Ishtu",
    meal: ["lunch"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 30, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "rice-boiled", grams: 180 },
      { foodId: "carrot", grams: 60 },
      { foodId: "beans", grams: 60 },
      { foodId: "coconut", grams: 25 },
    ],
    steps: ["Cook vegetables in coconut milk with whole spices.", "Serve with rice."],
  },
  {
    id: "kappa-meen",
    name: "Kappa & Meen Curry",
    localName: "Kappa Meen",
    meal: ["lunch", "dinner"],
    diet: ["non-vegetarian"],
    prepMinutes: 40, difficulty: "medium", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "tapioca", grams: 200 },
      { foodId: "mackerel", grams: 120 },
      { foodId: "coconut", grams: 25 },
      { foodId: "coconut-oil", grams: 8 },
    ],
    steps: ["Boil tapioca with turmeric and salt.", "Cook ayala in spicy red gravy.", "Mash kappa lightly with coconut; serve with curry."],
  },
  {
    id: "avial",
    name: "Avial with Rice",
    localName: "Aviyal Chooru",
    meal: ["lunch"],
    diet: ["vegetarian"],
    prepMinutes: 35, difficulty: "medium", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "rice-boiled", grams: 180 },
      { foodId: "drumstick", grams: 60 },
      { foodId: "snake-gourd", grams: 60 },
      { foodId: "raw-banana", grams: 60 },
      { foodId: "coconut", grams: 30 },
      { foodId: "curd", grams: 50 },
    ],
    steps: ["Cook chopped vegetables with turmeric.", "Grind coconut with cumin, green chilli.", "Add curd, mix; finish with coconut oil and curry leaves."],
  },
  {
    id: "egg-curry-rice",
    name: "Egg Curry with Rice",
    localName: "Mutta Curry",
    meal: ["lunch", "dinner"],
    diet: ["eggetarian", "non-vegetarian"],
    prepMinutes: 30, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "egg", grams: 100 },
      { foodId: "rice-boiled", grams: 180 },
      { foodId: "coconut", grams: 20 },
      { foodId: "onion", grams: 50 },
    ],
    steps: ["Boil eggs; halve.", "Make masala with onion, tomato, spices.", "Add coconut milk; simmer with eggs."],
  },
  {
    id: "beef-fry-rice",
    name: "Beef Ularthiyathu with Rice",
    localName: "Beef Ularthu",
    meal: ["lunch", "dinner"],
    diet: ["non-vegetarian"],
    prepMinutes: 60, difficulty: "hard", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "beef", grams: 120 },
      { foodId: "rice-boiled", grams: 150 },
      { foodId: "coconut", grams: 20 },
      { foodId: "coconut-oil", grams: 10 },
    ],
    steps: ["Pressure-cook beef with spices.", "Roast coconut slivers; add to beef and dry-fry till dark."],
  },

  // DINNER
  {
    id: "chapati-dal",
    name: "Chapati with Dal Fry",
    localName: "Chapati Parippu",
    meal: ["dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 30, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "chapati", grams: 80 },
      { foodId: "moong-dal", grams: 40 },
      { foodId: "onion", grams: 40 },
      { foodId: "tomato", grams: 40 },
    ],
    steps: ["Knead atta, rest 15 min, roll and cook 2 chapatis.", "Cook moong dal; temper with onions, tomato, garlic."],
  },
  {
    id: "chapati-chicken",
    name: "Chapati & Chicken Curry",
    localName: "Chapati Kozhi",
    meal: ["dinner"],
    diet: ["non-vegetarian"],
    prepMinutes: 35, difficulty: "medium", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "chapati", grams: 80 },
      { foodId: "chicken", grams: 120 },
      { foodId: "onion", grams: 50 },
      { foodId: "tomato", grams: 50 },
    ],
    steps: ["Cook chicken curry with onion-tomato base.", "Serve with 2 chapatis."],
  },
  {
    id: "veg-soup",
    name: "Mixed Vegetable Soup",
    localName: "Vegetable Soup",
    meal: ["dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 20, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "carrot", grams: 80 },
      { foodId: "beans", grams: 60 },
      { foodId: "cabbage", grams: 60 },
      { foodId: "onion", grams: 30 },
    ],
    steps: ["Boil chopped vegetables with garlic and pepper.", "Blend half; season and serve hot."],
  },
  {
    id: "kanji-payar",
    name: "Rice Kanji with Cherupayar",
    localName: "Kanji & Payar",
    meal: ["dinner"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 25, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "rice-boiled", grams: 100 },
      { foodId: "moong-dal", grams: 40 },
      { foodId: "coconut", grams: 15 },
      { foodId: "coconut-oil", grams: 5 },
    ],
    steps: ["Cook rice with extra water to porridge.", "Boil moong with turmeric; temper with coconut and curry leaves."],
  },
  {
    id: "paneer-chapati",
    name: "Paneer Curry with Chapati",
    localName: "Paneer Chapati",
    meal: ["dinner"],
    diet: ["vegetarian"],
    prepMinutes: 25, difficulty: "easy", cost: "moderate", servings: 1,
    ingredients: [
      { foodId: "paneer", grams: 100 },
      { foodId: "chapati", grams: 80 },
      { foodId: "tomato", grams: 80 },
      { foodId: "onion", grams: 50 },
    ],
    steps: ["Sauté onion-tomato gravy; add paneer cubes.", "Simmer 5 min; serve with chapati."],
  },

  // SNACKS
  {
    id: "banana-snack",
    name: "Banana + Buttermilk",
    localName: "Pazham Sambharam",
    meal: ["snack"],
    diet: ["vegetarian"],
    prepMinutes: 2, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [
      { foodId: "banana", grams: 100 },
      { foodId: "buttermilk", grams: 200 },
    ],
    steps: ["Serve cold buttermilk with a banana."],
  },
  {
    id: "tender-coconut",
    name: "Tender Coconut",
    localName: "Karikku",
    meal: ["snack"],
    diet: ["vegetarian", "vegan"],
    prepMinutes: 2, difficulty: "easy", cost: "budget", servings: 1,
    ingredients: [{ foodId: "tender-coconut", grams: 250 }],
    steps: ["Drink fresh tender coconut water; scoop the malai."],
  },
];

export function computeRecipeNutrition(r: Recipe) {
  let kcal = 0, protein = 0, carbs = 0, fat = 0, fiber = 0;
  for (const ing of r.ingredients) {
    const f: Food | undefined = FOOD_MAP[ing.foodId];
    if (!f) continue;
    const factor = ing.grams / 100;
    kcal += f.kcal * factor;
    protein += f.protein * factor;
    carbs += f.carbs * factor;
    fat += f.fat * factor;
    fiber += (f.fiber ?? 0) * factor;
  }
  const s = r.servings || 1;
  return {
    kcal: Math.round(kcal / s),
    protein: Math.round(protein / s),
    carbs: Math.round(carbs / s),
    fat: Math.round(fat / s),
    fiber: Math.round(fiber / s),
  };
}

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(RECIPES.map(r => [r.id, r]));

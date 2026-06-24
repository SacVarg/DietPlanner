// Nutrition per 100g (approx; sources: IFCT/USDA/OFF)
export type Food = {
  id: string;
  name: string;
  localName: string; // Malayalam transliteration
  category: "grain" | "pulse" | "vegetable" | "fruit" | "dairy" | "meat" | "fish" | "egg" | "spice" | "oil" | "snack" | "beverage";
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  servingG?: number;
  cost: "budget" | "moderate" | "premium";
  tags?: string[];
};

export const FOODS: Food[] = [
  { id: "rice-boiled", name: "Boiled Rice (Matta)", localName: "Kuthari", category: "grain", kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, servingG: 150, cost: "budget" },
  { id: "rice-white", name: "White Rice", localName: "Vella Ari", category: "grain", kcal: 130, protein: 2.4, carbs: 28, fat: 0.3, servingG: 150, cost: "budget" },
  { id: "tapioca", name: "Tapioca", localName: "Kappa", category: "vegetable", kcal: 160, protein: 1.4, carbs: 38, fat: 0.3, fiber: 1.8, servingG: 150, cost: "budget" },
  { id: "wheat-atta", name: "Whole Wheat Atta", localName: "Gothambu", category: "grain", kcal: 340, protein: 12, carbs: 72, fat: 1.7, fiber: 11, servingG: 50, cost: "budget" },
  { id: "ragi", name: "Finger Millet", localName: "Panji Pullu", category: "grain", kcal: 336, protein: 7.3, carbs: 72, fat: 1.3, fiber: 11, servingG: 40, cost: "budget" },
  { id: "oats", name: "Rolled Oats", localName: "Oats", category: "grain", kcal: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, servingG: 40, cost: "moderate" },
  { id: "idli", name: "Idli", localName: "Idli", category: "grain", kcal: 156, protein: 5, carbs: 30, fat: 0.4, servingG: 100, cost: "budget" },
  { id: "dosa", name: "Plain Dosa", localName: "Dosa", category: "grain", kcal: 168, protein: 4, carbs: 29, fat: 3.7, servingG: 80, cost: "budget" },
  { id: "appam", name: "Appam", localName: "Appam", category: "grain", kcal: 120, protein: 2.5, carbs: 23, fat: 1.5, servingG: 70, cost: "budget" },
  { id: "puttu", name: "Puttu", localName: "Puttu", category: "grain", kcal: 112, protein: 2.6, carbs: 24, fat: 0.5, servingG: 100, cost: "budget" },
  { id: "chapati", name: "Chapati", localName: "Chapati", category: "grain", kcal: 297, protein: 7.9, carbs: 56, fat: 4.3, servingG: 40, cost: "budget" },

  { id: "toor-dal", name: "Toor Dal", localName: "Thuvara Parippu", category: "pulse", kcal: 343, protein: 22, carbs: 63, fat: 1.5, fiber: 15, servingG: 30, cost: "budget" },
  { id: "moong-dal", name: "Moong Dal", localName: "Cherupayar Parippu", category: "pulse", kcal: 347, protein: 24, carbs: 63, fat: 1.2, fiber: 16, servingG: 30, cost: "budget" },
  { id: "kadala", name: "Black Chickpea", localName: "Kadala", category: "pulse", kcal: 364, protein: 19, carbs: 61, fat: 6, fiber: 17, servingG: 40, cost: "budget" },
  { id: "vanpayar", name: "Red Cowpea", localName: "Vanpayar", category: "pulse", kcal: 336, protein: 24, carbs: 60, fat: 1.3, fiber: 11, servingG: 40, cost: "budget" },
  { id: "rajma", name: "Kidney Beans", localName: "Rajma", category: "pulse", kcal: 333, protein: 24, carbs: 60, fat: 0.8, fiber: 25, servingG: 40, cost: "moderate" },

  { id: "coconut", name: "Coconut (fresh)", localName: "Thenga", category: "vegetable", kcal: 354, protein: 3.3, carbs: 15, fat: 33, fiber: 9, servingG: 20, cost: "budget" },
  { id: "drumstick", name: "Drumstick", localName: "Muringakka", category: "vegetable", kcal: 37, protein: 2.1, carbs: 8.5, fat: 0.2, fiber: 3.2, servingG: 80, cost: "budget" },
  { id: "snake-gourd", name: "Snake Gourd", localName: "Padavalanga", category: "vegetable", kcal: 18, protein: 0.5, carbs: 3.3, fat: 0.3, servingG: 100, cost: "budget" },
  { id: "ash-gourd", name: "Ash Gourd", localName: "Kumbalanga", category: "vegetable", kcal: 13, protein: 0.4, carbs: 3, fat: 0.2, servingG: 100, cost: "budget" },
  { id: "raw-banana", name: "Raw Banana", localName: "Pacha Kaaya", category: "vegetable", kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, servingG: 100, cost: "budget" },
  { id: "yam", name: "Elephant Foot Yam", localName: "Chena", category: "vegetable", kcal: 118, protein: 1.5, carbs: 28, fat: 0.2, fiber: 4, servingG: 100, cost: "budget" },
  { id: "spinach", name: "Spinach", localName: "Cheera", category: "vegetable", kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, servingG: 100, cost: "budget" },
  { id: "carrot", name: "Carrot", localName: "Carrot", category: "vegetable", kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, servingG: 80, cost: "budget" },
  { id: "beans", name: "French Beans", localName: "Payar", category: "vegetable", kcal: 31, protein: 1.8, carbs: 7, fat: 0.2, fiber: 2.7, servingG: 80, cost: "budget" },
  { id: "cabbage", name: "Cabbage", localName: "Muttakose", category: "vegetable", kcal: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5, servingG: 100, cost: "budget" },
  { id: "onion", name: "Onion", localName: "Ulli", category: "vegetable", kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1, servingG: 50, cost: "budget" },
  { id: "tomato", name: "Tomato", localName: "Thakkali", category: "vegetable", kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingG: 80, cost: "budget" },

  { id: "banana", name: "Banana", localName: "Pazham", category: "fruit", kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, servingG: 100, cost: "budget" },
  { id: "papaya", name: "Papaya", localName: "Omakka", category: "fruit", kcal: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, servingG: 150, cost: "budget" },
  { id: "mango", name: "Mango", localName: "Manga", category: "fruit", kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, servingG: 150, cost: "moderate" },
  { id: "pineapple", name: "Pineapple", localName: "Kaithachakka", category: "fruit", kcal: 50, protein: 0.5, carbs: 13, fat: 0.1, servingG: 150, cost: "budget" },

  { id: "milk", name: "Cow Milk", localName: "Pal", category: "dairy", kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3, servingG: 200, cost: "budget" },
  { id: "curd", name: "Curd", localName: "Thairu", category: "dairy", kcal: 60, protein: 3.5, carbs: 4.7, fat: 3.3, servingG: 150, cost: "budget" },
  { id: "paneer", name: "Paneer", localName: "Paneer", category: "dairy", kcal: 296, protein: 18, carbs: 6, fat: 22, servingG: 50, cost: "moderate" },

  { id: "egg", name: "Egg (whole)", localName: "Mutta", category: "egg", kcal: 155, protein: 13, carbs: 1.1, fat: 11, servingG: 50, cost: "budget" },
  { id: "egg-white", name: "Egg White", localName: "Mutta Vella", category: "egg", kcal: 52, protein: 11, carbs: 0.7, fat: 0.2, servingG: 33, cost: "budget" },

  { id: "chicken", name: "Chicken Breast", localName: "Kozhi Erachi", category: "meat", kcal: 165, protein: 31, carbs: 0, fat: 3.6, servingG: 100, cost: "moderate" },
  { id: "mutton", name: "Mutton", localName: "Aatterachi", category: "meat", kcal: 294, protein: 25, carbs: 0, fat: 21, servingG: 100, cost: "premium" },
  { id: "beef", name: "Beef", localName: "Mattu Erachi", category: "meat", kcal: 250, protein: 26, carbs: 0, fat: 17, servingG: 100, cost: "moderate" },

  { id: "sardine", name: "Sardine", localName: "Mathi", category: "fish", kcal: 208, protein: 25, carbs: 0, fat: 11, servingG: 100, cost: "budget" },
  { id: "mackerel", name: "Mackerel", localName: "Ayala", category: "fish", kcal: 205, protein: 19, carbs: 0, fat: 14, servingG: 100, cost: "budget" },
  { id: "kingfish", name: "Kingfish", localName: "Neymeen", category: "fish", kcal: 130, protein: 25, carbs: 0, fat: 3, servingG: 100, cost: "premium" },
  { id: "prawn", name: "Prawn", localName: "Chemmeen", category: "fish", kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, servingG: 100, cost: "moderate" },

  { id: "coconut-oil", name: "Coconut Oil", localName: "Velichenna", category: "oil", kcal: 862, protein: 0, carbs: 0, fat: 100, servingG: 5, cost: "moderate" },
  { id: "ghee", name: "Ghee", localName: "Ney", category: "oil", kcal: 900, protein: 0, carbs: 0, fat: 100, servingG: 5, cost: "moderate" },

  { id: "tea", name: "Tea with Milk", localName: "Chaya", category: "beverage", kcal: 50, protein: 1.5, carbs: 6, fat: 2, servingG: 150, cost: "budget" },
  { id: "buttermilk", name: "Buttermilk", localName: "Sambharam", category: "beverage", kcal: 40, protein: 3.3, carbs: 4.8, fat: 0.9, servingG: 200, cost: "budget" },
  { id: "tender-coconut", name: "Tender Coconut Water", localName: "Karikku", category: "beverage", kcal: 19, protein: 0.7, carbs: 3.7, fat: 0.2, servingG: 250, cost: "budget" },
];

export const FOOD_MAP: Record<string, Food> = Object.fromEntries(FOODS.map(f => [f.id, f]));

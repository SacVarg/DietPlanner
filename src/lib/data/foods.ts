// Nutrition per 100g (approx; sources: IFCT/USDA/OFF)
export type Food = {
  id: string;
  name: string;
  localName: string; // Malayalam transliteration
  category:
    | "grain"
    | "pulse"
    | "vegetable"
    | "fruit"
    | "dairy"
    | "meat"
    | "fish"
    | "egg"
    | "spice"
    | "oil"
    | "snack"
    | "nut"
    | "beverage";
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
  // GRAINS & STAPLES
  { id: "rice-boiled", name: "Boiled Rice (Matta)", localName: "Kuthari", category: "grain", kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, servingG: 150, cost: "budget" },
  { id: "rice-white", name: "White Rice", localName: "Vella Ari", category: "grain", kcal: 130, protein: 2.4, carbs: 28, fat: 0.3, servingG: 150, cost: "budget" },
  { id: "rice-brown", name: "Brown Rice", localName: "Brown Ari", category: "grain", kcal: 123, protein: 2.7, carbs: 26, fat: 1, fiber: 1.8, servingG: 150, cost: "moderate" },
  { id: "tapioca", name: "Tapioca", localName: "Kappa", category: "vegetable", kcal: 160, protein: 1.4, carbs: 38, fat: 0.3, fiber: 1.8, servingG: 150, cost: "budget" },
  { id: "wheat-atta", name: "Whole Wheat Atta", localName: "Gothambu", category: "grain", kcal: 340, protein: 12, carbs: 72, fat: 1.7, fiber: 11, servingG: 50, cost: "budget" },
  { id: "ragi", name: "Finger Millet", localName: "Panji Pullu", category: "grain", kcal: 336, protein: 7.3, carbs: 72, fat: 1.3, fiber: 11, servingG: 40, cost: "budget" },
  { id: "oats", name: "Rolled Oats", localName: "Oats", category: "grain", kcal: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, servingG: 40, cost: "moderate" },
  { id: "idli", name: "Idli", localName: "Idli", category: "grain", kcal: 156, protein: 5, carbs: 30, fat: 0.4, servingG: 100, cost: "budget" },
  { id: "dosa", name: "Plain Dosa", localName: "Dosa", category: "grain", kcal: 168, protein: 4, carbs: 29, fat: 3.7, servingG: 80, cost: "budget" },
  { id: "appam", name: "Appam", localName: "Appam", category: "grain", kcal: 120, protein: 2.5, carbs: 23, fat: 1.5, servingG: 70, cost: "budget" },
  { id: "puttu", name: "Puttu", localName: "Puttu", category: "grain", kcal: 112, protein: 2.6, carbs: 24, fat: 0.5, servingG: 100, cost: "budget" },
  { id: "chapati", name: "Chapati", localName: "Chapati", category: "grain", kcal: 297, protein: 7.9, carbs: 56, fat: 4.3, servingG: 40, cost: "budget" },
  { id: "parotta", name: "Kerala Parotta", localName: "Porotta", category: "grain", kcal: 320, protein: 7, carbs: 50, fat: 10, servingG: 80, cost: "budget" },
  { id: "pathiri", name: "Rice Pathiri", localName: "Pathiri", category: "grain", kcal: 130, protein: 2.5, carbs: 28, fat: 0.6, servingG: 60, cost: "budget" },
  { id: "idiyappam", name: "Idiyappam", localName: "Noolputtu", category: "grain", kcal: 145, protein: 2.7, carbs: 32, fat: 0.5, servingG: 100, cost: "budget" },
  { id: "upma", name: "Rava Upma", localName: "Upma", category: "grain", kcal: 132, protein: 3.4, carbs: 25, fat: 2.3, servingG: 150, cost: "budget" },
  { id: "poha", name: "Poha (Flattened Rice)", localName: "Aval", category: "grain", kcal: 130, protein: 2.5, carbs: 28, fat: 1, servingG: 120, cost: "budget" },
  { id: "vermicelli", name: "Vermicelli", localName: "Semiya", category: "grain", kcal: 352, protein: 12, carbs: 73, fat: 1.2, servingG: 50, cost: "budget" },
  { id: "quinoa", name: "Quinoa", localName: "Quinoa", category: "grain", kcal: 368, protein: 14, carbs: 64, fat: 6, fiber: 7, servingG: 50, cost: "premium" },

  // PULSES
  { id: "toor-dal", name: "Toor Dal", localName: "Thuvara Parippu", category: "pulse", kcal: 343, protein: 22, carbs: 63, fat: 1.5, fiber: 15, servingG: 30, cost: "budget" },
  { id: "moong-dal", name: "Moong Dal", localName: "Cherupayar Parippu", category: "pulse", kcal: 347, protein: 24, carbs: 63, fat: 1.2, fiber: 16, servingG: 30, cost: "budget" },
  { id: "moong-whole", name: "Whole Green Gram", localName: "Cherupayar", category: "pulse", kcal: 347, protein: 24, carbs: 63, fat: 1.2, fiber: 16, servingG: 40, cost: "budget" },
  { id: "kadala", name: "Black Chickpea", localName: "Kadala", category: "pulse", kcal: 364, protein: 19, carbs: 61, fat: 6, fiber: 17, servingG: 40, cost: "budget" },
  { id: "vanpayar", name: "Red Cowpea", localName: "Vanpayar", category: "pulse", kcal: 336, protein: 24, carbs: 60, fat: 1.3, fiber: 11, servingG: 40, cost: "budget" },
  { id: "rajma", name: "Kidney Beans", localName: "Rajma", category: "pulse", kcal: 333, protein: 24, carbs: 60, fat: 0.8, fiber: 25, servingG: 40, cost: "moderate" },
  { id: "chana", name: "Bengal Gram (Chana)", localName: "Kabool Kadala", category: "pulse", kcal: 364, protein: 19, carbs: 61, fat: 6, fiber: 17, servingG: 40, cost: "budget" },
  { id: "urad-dal", name: "Urad Dal", localName: "Uzhunnu", category: "pulse", kcal: 341, protein: 25, carbs: 59, fat: 1.6, fiber: 18, servingG: 30, cost: "budget" },
  { id: "masoor-dal", name: "Masoor Dal", localName: "Masoor Parippu", category: "pulse", kcal: 352, protein: 25, carbs: 63, fat: 1, fiber: 11, servingG: 30, cost: "budget" },
  { id: "soya-chunks", name: "Soya Chunks", localName: "Soya", category: "pulse", kcal: 345, protein: 52, carbs: 33, fat: 0.5, fiber: 13, servingG: 30, cost: "moderate" },

  // VEGETABLES
  { id: "coconut", name: "Coconut (fresh)", localName: "Thenga", category: "vegetable", kcal: 354, protein: 3.3, carbs: 15, fat: 33, fiber: 9, servingG: 20, cost: "budget" },
  { id: "drumstick", name: "Drumstick", localName: "Muringakka", category: "vegetable", kcal: 37, protein: 2.1, carbs: 8.5, fat: 0.2, fiber: 3.2, servingG: 80, cost: "budget" },
  { id: "drumstick-leaves", name: "Drumstick Leaves", localName: "Muringayila", category: "vegetable", kcal: 64, protein: 9, carbs: 8, fat: 1.4, fiber: 2, servingG: 50, cost: "budget" },
  { id: "snake-gourd", name: "Snake Gourd", localName: "Padavalanga", category: "vegetable", kcal: 18, protein: 0.5, carbs: 3.3, fat: 0.3, servingG: 100, cost: "budget" },
  { id: "ash-gourd", name: "Ash Gourd", localName: "Kumbalanga", category: "vegetable", kcal: 13, protein: 0.4, carbs: 3, fat: 0.2, servingG: 100, cost: "budget" },
  { id: "bitter-gourd", name: "Bitter Gourd", localName: "Pavakka", category: "vegetable", kcal: 17, protein: 1, carbs: 3.7, fat: 0.2, fiber: 2.8, servingG: 100, cost: "budget" },
  { id: "raw-banana", name: "Raw Banana", localName: "Pacha Kaaya", category: "vegetable", kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, servingG: 100, cost: "budget" },
  { id: "plantain", name: "Plantain", localName: "Nenthrakaaya", category: "vegetable", kcal: 122, protein: 1.3, carbs: 32, fat: 0.4, fiber: 2.3, servingG: 100, cost: "budget" },
  { id: "yam", name: "Elephant Foot Yam", localName: "Chena", category: "vegetable", kcal: 118, protein: 1.5, carbs: 28, fat: 0.2, fiber: 4, servingG: 100, cost: "budget" },
  { id: "colocasia", name: "Colocasia", localName: "Chembu", category: "vegetable", kcal: 112, protein: 1.5, carbs: 26, fat: 0.2, fiber: 4.1, servingG: 100, cost: "budget" },
  { id: "spinach", name: "Spinach", localName: "Cheera", category: "vegetable", kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, servingG: 100, cost: "budget" },
  { id: "red-spinach", name: "Red Spinach", localName: "Chuvanna Cheera", category: "vegetable", kcal: 26, protein: 3.3, carbs: 4.2, fat: 0.4, fiber: 2.5, servingG: 100, cost: "budget" },
  { id: "carrot", name: "Carrot", localName: "Carrot", category: "vegetable", kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, servingG: 80, cost: "budget" },
  { id: "beans", name: "French Beans", localName: "Payar", category: "vegetable", kcal: 31, protein: 1.8, carbs: 7, fat: 0.2, fiber: 2.7, servingG: 80, cost: "budget" },
  { id: "cabbage", name: "Cabbage", localName: "Muttakose", category: "vegetable", kcal: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5, servingG: 100, cost: "budget" },
  { id: "cauliflower", name: "Cauliflower", localName: "Cauliflower", category: "vegetable", kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, servingG: 100, cost: "moderate" },
  { id: "onion", name: "Onion", localName: "Ulli", category: "vegetable", kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1, servingG: 50, cost: "budget" },
  { id: "small-onion", name: "Shallots", localName: "Cheriya Ulli", category: "vegetable", kcal: 72, protein: 2.5, carbs: 17, fat: 0.1, servingG: 30, cost: "budget" },
  { id: "tomato", name: "Tomato", localName: "Thakkali", category: "vegetable", kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingG: 80, cost: "budget" },
  { id: "potato", name: "Potato", localName: "Urulakizhangu", category: "vegetable", kcal: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, servingG: 100, cost: "budget" },
  { id: "okra", name: "Okra", localName: "Vendakka", category: "vegetable", kcal: 33, protein: 1.9, carbs: 7.5, fat: 0.2, fiber: 3.2, servingG: 100, cost: "budget" },
  { id: "brinjal", name: "Brinjal", localName: "Vazhuthana", category: "vegetable", kcal: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, servingG: 100, cost: "budget" },
  { id: "cucumber", name: "Cucumber", localName: "Vellarikka", category: "vegetable", kcal: 16, protein: 0.7, carbs: 3.6, fat: 0.1, servingG: 100, cost: "budget" },
  { id: "ridge-gourd", name: "Ridge Gourd", localName: "Peechinga", category: "vegetable", kcal: 20, protein: 1.2, carbs: 4.3, fat: 0.2, servingG: 100, cost: "budget" },
  { id: "bottle-gourd", name: "Bottle Gourd", localName: "Churakka", category: "vegetable", kcal: 14, protein: 0.6, carbs: 3.4, fat: 0.1, servingG: 100, cost: "budget" },
  { id: "ginger", name: "Ginger", localName: "Inji", category: "spice", kcal: 80, protein: 1.8, carbs: 18, fat: 0.8, servingG: 5, cost: "budget" },
  { id: "garlic", name: "Garlic", localName: "Veluthulli", category: "spice", kcal: 149, protein: 6.4, carbs: 33, fat: 0.5, servingG: 5, cost: "budget" },
  { id: "green-chilli", name: "Green Chilli", localName: "Pacha Mulaku", category: "spice", kcal: 40, protein: 1.9, carbs: 9, fat: 0.4, servingG: 5, cost: "budget" },
  { id: "curry-leaves", name: "Curry Leaves", localName: "Kariveppila", category: "spice", kcal: 108, protein: 6, carbs: 19, fat: 1, servingG: 2, cost: "budget" },

  // FRUITS
  { id: "banana", name: "Banana", localName: "Pazham", category: "fruit", kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, servingG: 100, cost: "budget" },
  { id: "nendran-banana", name: "Nendran Banana", localName: "Ethakka", category: "fruit", kcal: 116, protein: 1.3, carbs: 31, fat: 0.4, fiber: 2.3, servingG: 100, cost: "budget" },
  { id: "papaya", name: "Papaya", localName: "Omakka", category: "fruit", kcal: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, servingG: 150, cost: "budget" },
  { id: "mango", name: "Mango", localName: "Manga", category: "fruit", kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, servingG: 150, cost: "moderate" },
  { id: "pineapple", name: "Pineapple", localName: "Kaithachakka", category: "fruit", kcal: 50, protein: 0.5, carbs: 13, fat: 0.1, servingG: 150, cost: "budget" },
  { id: "jackfruit", name: "Jackfruit", localName: "Chakka", category: "fruit", kcal: 95, protein: 1.7, carbs: 23, fat: 0.6, fiber: 1.5, servingG: 100, cost: "budget" },
  { id: "guava", name: "Guava", localName: "Pera", category: "fruit", kcal: 68, protein: 2.6, carbs: 14, fat: 1, fiber: 5.4, servingG: 100, cost: "budget" },
  { id: "orange", name: "Orange", localName: "Orange", category: "fruit", kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, servingG: 150, cost: "moderate" },
  { id: "apple", name: "Apple", localName: "Apple", category: "fruit", kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, servingG: 150, cost: "moderate" },
  { id: "watermelon", name: "Watermelon", localName: "Thannimathan", category: "fruit", kcal: 30, protein: 0.6, carbs: 8, fat: 0.2, servingG: 200, cost: "budget" },

  // DAIRY
  { id: "milk", name: "Cow Milk", localName: "Pal", category: "dairy", kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3, servingG: 200, cost: "budget" },
  { id: "skim-milk", name: "Skim Milk", localName: "Skim Pal", category: "dairy", kcal: 34, protein: 3.4, carbs: 5, fat: 0.1, servingG: 200, cost: "budget" },
  { id: "curd", name: "Curd", localName: "Thairu", category: "dairy", kcal: 60, protein: 3.5, carbs: 4.7, fat: 3.3, servingG: 150, cost: "budget" },
  { id: "paneer", name: "Paneer", localName: "Paneer", category: "dairy", kcal: 296, protein: 18, carbs: 6, fat: 22, servingG: 50, cost: "moderate" },
  { id: "cheese", name: "Processed Cheese", localName: "Cheese", category: "dairy", kcal: 350, protein: 22, carbs: 2, fat: 28, servingG: 20, cost: "moderate" },

  // EGGS
  { id: "egg", name: "Egg (whole)", localName: "Mutta", category: "egg", kcal: 155, protein: 13, carbs: 1.1, fat: 11, servingG: 50, cost: "budget" },
  { id: "egg-white", name: "Egg White", localName: "Mutta Vella", category: "egg", kcal: 52, protein: 11, carbs: 0.7, fat: 0.2, servingG: 33, cost: "budget" },

  // MEAT
  { id: "chicken", name: "Chicken Breast", localName: "Kozhi Erachi", category: "meat", kcal: 165, protein: 31, carbs: 0, fat: 3.6, servingG: 100, cost: "moderate" },
  { id: "chicken-leg", name: "Chicken Leg", localName: "Kozhi Kal", category: "meat", kcal: 215, protein: 26, carbs: 0, fat: 12, servingG: 100, cost: "moderate" },
  { id: "mutton", name: "Mutton", localName: "Aatterachi", category: "meat", kcal: 294, protein: 25, carbs: 0, fat: 21, servingG: 100, cost: "premium" },
  { id: "beef", name: "Beef", localName: "Mattu Erachi", category: "meat", kcal: 250, protein: 26, carbs: 0, fat: 17, servingG: 100, cost: "moderate" },
  { id: "pork", name: "Pork", localName: "Panni Erachi", category: "meat", kcal: 242, protein: 27, carbs: 0, fat: 14, servingG: 100, cost: "moderate" },

  // FISH & SEAFOOD
  { id: "sardine", name: "Sardine", localName: "Mathi", category: "fish", kcal: 208, protein: 25, carbs: 0, fat: 11, servingG: 100, cost: "budget" },
  { id: "mackerel", name: "Mackerel", localName: "Ayala", category: "fish", kcal: 205, protein: 19, carbs: 0, fat: 14, servingG: 100, cost: "budget" },
  { id: "kingfish", name: "Kingfish", localName: "Neymeen", category: "fish", kcal: 130, protein: 25, carbs: 0, fat: 3, servingG: 100, cost: "premium" },
  { id: "prawn", name: "Prawn", localName: "Chemmeen", category: "fish", kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, servingG: 100, cost: "moderate" },
  { id: "pearl-spot", name: "Pearl Spot", localName: "Karimeen", category: "fish", kcal: 128, protein: 22, carbs: 0, fat: 4, servingG: 100, cost: "premium" },
  { id: "tuna", name: "Tuna", localName: "Choora", category: "fish", kcal: 144, protein: 23, carbs: 0, fat: 5, servingG: 100, cost: "moderate" },
  { id: "anchovy", name: "Anchovy", localName: "Netholi", category: "fish", kcal: 131, protein: 20, carbs: 0, fat: 4.8, servingG: 100, cost: "budget" },
  { id: "squid", name: "Squid", localName: "Koonthal", category: "fish", kcal: 92, protein: 16, carbs: 3, fat: 1.4, servingG: 100, cost: "moderate" },

  // NUTS
  { id: "cashew", name: "Cashew", localName: "Andiparippu", category: "nut", kcal: 553, protein: 18, carbs: 30, fat: 44, servingG: 15, cost: "premium" },
  { id: "peanut", name: "Peanut", localName: "Nilakkadala", category: "nut", kcal: 567, protein: 26, carbs: 16, fat: 49, servingG: 20, cost: "budget" },
  { id: "almond", name: "Almond", localName: "Badam", category: "nut", kcal: 579, protein: 21, carbs: 22, fat: 50, servingG: 15, cost: "premium" },

  // OILS
  { id: "coconut-oil", name: "Coconut Oil", localName: "Velichenna", category: "oil", kcal: 862, protein: 0, carbs: 0, fat: 100, servingG: 5, cost: "moderate" },
  { id: "ghee", name: "Ghee", localName: "Ney", category: "oil", kcal: 900, protein: 0, carbs: 0, fat: 100, servingG: 5, cost: "moderate" },
  { id: "gingelly-oil", name: "Sesame Oil", localName: "Nallenna", category: "oil", kcal: 884, protein: 0, carbs: 0, fat: 100, servingG: 5, cost: "moderate" },

  // BEVERAGES
  { id: "tea", name: "Tea with Milk", localName: "Chaya", category: "beverage", kcal: 50, protein: 1.5, carbs: 6, fat: 2, servingG: 150, cost: "budget" },
  { id: "black-coffee", name: "Black Coffee", localName: "Kappi", category: "beverage", kcal: 2, protein: 0.3, carbs: 0, fat: 0, servingG: 150, cost: "budget" },
  { id: "buttermilk", name: "Buttermilk", localName: "Sambharam", category: "beverage", kcal: 40, protein: 3.3, carbs: 4.8, fat: 0.9, servingG: 200, cost: "budget" },
  { id: "tender-coconut", name: "Tender Coconut Water", localName: "Karikku", category: "beverage", kcal: 19, protein: 0.7, carbs: 3.7, fat: 0.2, servingG: 250, cost: "budget" },
  { id: "lime-juice", name: "Lime Juice (sweet)", localName: "Naranga Vellam", category: "beverage", kcal: 30, protein: 0.1, carbs: 8, fat: 0, servingG: 200, cost: "budget" },

  // SNACKS
  { id: "banana-chips", name: "Banana Chips", localName: "Upperi", category: "snack", kcal: 519, protein: 2.3, carbs: 58, fat: 34, servingG: 30, cost: "budget" },
  { id: "murukku", name: "Murukku", localName: "Murukku", category: "snack", kcal: 484, protein: 9, carbs: 56, fat: 25, servingG: 25, cost: "budget" },
  { id: "sukhiyan", name: "Sukhiyan", localName: "Sukhiyan", category: "snack", kcal: 280, protein: 6, carbs: 38, fat: 11, servingG: 60, cost: "budget" },
  { id: "uzhunnu-vada", name: "Uzhunnu Vada", localName: "Uzhunnu Vada", category: "snack", kcal: 250, protein: 7, carbs: 22, fat: 14, servingG: 50, cost: "budget" },
  { id: "parippu-vada", name: "Parippu Vada", localName: "Parippu Vada", category: "snack", kcal: 230, protein: 8, carbs: 24, fat: 11, servingG: 50, cost: "budget" },
  { id: "pazham-pori", name: "Pazham Pori", localName: "Pazham Pori", category: "snack", kcal: 280, protein: 2, carbs: 38, fat: 13, servingG: 80, cost: "budget" },
  { id: "unniyappam", name: "Unniyappam", localName: "Unniyappam", category: "snack", kcal: 310, protein: 4, carbs: 45, fat: 13, servingG: 60, cost: "budget" },
];

export const FOOD_MAP: Record<string, Food> = Object.fromEntries(FOODS.map((f) => [f.id, f]));

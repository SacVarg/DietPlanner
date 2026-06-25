import { createServerFn } from "@tanstack/react-start";
import { calcTargets } from "@/lib/recommend";
import type { Profile } from "@/lib/store";

const getGeminiApiKey = () => {
  const runtime = globalThis as typeof globalThis & { GEMINI_API_KEY?: string };
  return process.env.GEMINI_API_KEY || runtime.GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY;
};

export const generateAiPlanFn = createServerFn({ method: "POST" }).handler(async (ctx) => {
  const { profile } = ctx.data as { profile: Profile };
  const targets = calcTargets(profile);

  // Safely checks standard process.env, Cloudflare globalThis, and Vite import.meta
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const prompt = `
      Act as an expert Kerala nutritionist. 
      Create a 1-day traditional Kerala meal plan (Breakfast, Lunch, Dinner) for a user with the following profile:
      - Goal: ${profile.goal}
      - Diet Type: ${profile.diet}
      - Budget Tier: ${profile.budget}
      
      Daily Macro Targets: 
      - Calories: ${targets.kcal} kcal
      - Protein: ${targets.protein}g
      - Carbs: ${targets.carbs}g
      - Fat: ${targets.fat}g

      Rules:
      1. Use traditional Kerala dishes ONLY (e.g., Puttu, Kadala, Appam, Fish Curry, Kanji, Thoran).
      2. Strictly adhere to the diet type (${profile.diet}) and budget (${profile.budget}).
      3. Distribute macros sensibly across the three meals to hit the daily targets.
      
      Provide the output ONLY as a raw JSON object matching EXACTLY this structure. Do not include markdown formatting or backticks:
      {
        "plan": {
          "breakfast": { "name": "String", "localName": "String", "kcal": Number, "protein": Number, "carbs": Number, "fat": Number, "ingredients": [{"foodId": "String", "grams": Number}], "steps": ["String"] },
          "lunch": { "name": "String", "localName": "String", "kcal": Number, "protein": Number, "carbs": Number, "fat": Number, "ingredients": [{"foodId": "String", "grams": Number}], "steps": ["String"] },
          "dinner": { "name": "String", "localName": "String", "kcal": Number, "protein": Number, "carbs": Number, "fat": Number, "ingredients": [{"foodId": "String", "grams": Number}], "steps": ["String"] }
        }
      }
    `;

  try {
    // THE FINAL FIX: Using the active gemini-2.5-flash model endpoint
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("--- RAW GEMINI API ERROR ---");
      console.error(errorText);
      console.error("----------------------------");
      throw new Error(`Google API rejected the request with status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Empty AI Response:", JSON.stringify(data));
      throw new Error("Received empty response from AI.");
    }

    const cleanText = text
      .replace(new RegExp("```json", "gi"), "")
      .replace(new RegExp("```", "g"), "")
      .trim();

    const parsed = JSON.parse(cleanText);
    return parsed.plan;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
});

export const cookWithIngredientsFn = createServerFn({ method: "POST" }).handler(async (ctx) => {
  const { ingredients } = ctx.data as { ingredients: string[] };
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing from environment variables.");
  const prompt = `Act as a practical meal-planning chef. The user has these ingredients at home: ${ingredients.join(", ")}. Recommend 4-6 dishes, best matches first. For each dish list availableIngredientsUsed, additionalIngredientsRequired, matchScore from 0-100, cuisine, mealType, and short steps. Return ONLY raw JSON: {"suggestions":[{"name":"String","cuisine":"String","mealType":"String","matchScore":Number,"availableIngredientsUsed":["String"],"additionalIngredientsRequired":["String"],"steps":["String"]}]}`;
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    },
  );
  if (!response.ok)
    throw new Error(`Google API rejected the request with status: ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Received empty response from AI.");
  return JSON.parse(
    text.replace(new RegExp("```json", "gi"), "").replace(new RegExp("```", "g"), "").trim(),
  ).suggestions;
});

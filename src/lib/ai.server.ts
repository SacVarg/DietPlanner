import { createServerFn } from "@tanstack/react-start";
import { calcTargets } from "@/lib/recommend";
import type { Profile } from "@/lib/store";

export const generateAiPlanFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { profile } = ctx.data as { profile: Profile };
    const targets = calcTargets(profile);

    // Safely checks standard process.env, Cloudflare globalThis, and Vite import.meta
    const apiKey = 
      process.env.GEMINI_API_KEY || 
      (typeof globalThis !== 'undefined' && (globalThis as any).GEMINI_API_KEY) ||
      (import.meta as any).env?.GEMINI_API_KEY;

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
      const response = await fetch(
        `[https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=$](https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=$){apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
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

      // THE FIX: Safe regex formatting that won't crash the build tool
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

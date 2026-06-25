import { createServerFn } from "@tanstack/react-start";
import { calcTargets } from "@/lib/recommend";
import type { Profile } from "@/lib/store";

// Note: This MUST be saved exactly as "src/lib/ai.server.ts"
export const generateAiPlanFn = createServerFn({ method: "POST" })
  .validator((data: { profile: Profile }) => data)
  .handler(async (ctx) => {
    const { profile } = ctx.data;
    const targets = calcTargets(profile);

    const apiKey = process.env.GEMINI_API_KEY;
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
      
      Provide the output ONLY as a raw JSON object matching EXACTLY this structure, with no markdown formatting or codeblocks around it:
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch plan from Gemini AI.");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("Received empty response from AI.");
      }

      const parsed = JSON.parse(text);
      return parsed.plan;

    } catch (error) {
      console.error("AI Generation Error:", error);
      throw new Error("Failed to generate AI meal plan.");
    }
  });

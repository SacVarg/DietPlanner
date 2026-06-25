import type { CuisineId } from "./recipes";

export type Cuisine = { id: CuisineId; label: string; description: string };

export const CUISINES: Cuisine[] = [
  { id: "kerala", label: "Kerala", description: "Traditional Kerala meals and snacks" },
  {
    id: "north-indian",
    label: "North Indian",
    description: "Parathas, dals, curries and tandoori-style meals",
  },
  { id: "chinese", label: "Chinese", description: "Stir-fries, rice bowls, soups and noodles" },
  {
    id: "continental",
    label: "Continental / Western",
    description: "Oats, salads, pastas, sandwiches and grilled plates",
  },
  {
    id: "eastern-european",
    label: "Eastern European",
    description: "Buckwheat, borscht, stews and cottage-cheese plates",
  },
  {
    id: "global",
    label: "Healthy Desserts",
    description: "Fruit, yogurt, chia, oats and protein dessert options",
  },
];

export const CUISINE_LABELS = Object.fromEntries(CUISINES.map((c) => [c.id, c.label])) as Record<
  CuisineId,
  string
>;

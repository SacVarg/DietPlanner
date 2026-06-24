import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kerala Diet Planner — Healthy meals from your kitchen" },
      { name: "description", content: "Free meal planning and calorie tracking built around Kerala foods. No signup required." },
      { property: "og:title", content: "Kerala Diet Planner" },
      { property: "og:description", content: "Plan healthy meals with puttu, kappa, meen curry and more." },
    ],
  }),
  component: Landing,
});

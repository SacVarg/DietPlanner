import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApp, type Profile } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/app-shell";

const schema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().min(10).max(100),
  gender: z.enum(["male", "female", "other"]),
  heightCm: z.coerce.number().min(120).max(220),
  weightKg: z.coerce.number().min(30).max(200),
  activity: z.enum(["sedentary", "light", "moderate", "active", "athlete"]),
  goal: z.enum(["lose", "maintain", "gain", "muscle", "healthy"]),
  diet: z.enum(["vegetarian", "vegan", "eggetarian", "non-vegetarian"]),
  budget: z.enum(["budget", "moderate", "premium"]),
});

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile Setup — Kerala Diet Planner" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const profile = useApp((s) => s.profile);
  const setProfile = useApp((s) => s.setProfile);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Profile>({
    resolver: zodResolver(schema) as never,
    defaultValues: profile ?? {
      age: 28, gender: "male", heightCm: 170, weightKg: 70,
      activity: "moderate", goal: "maintain", diet: "non-vegetarian", budget: "budget",
    },
  });

  const onSubmit = (data: Profile) => {
    setProfile(data);
    navigate({ to: "/dashboard" });
  };

  const segGroup = <K extends keyof Profile>(key: K, options: { value: Profile[K]; label: string }[]) => {
    const current = watch(key);
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => setValue(key, o.value as never, { shouldValidate: true })}
            className={
              "rounded-full border px-3 py-1.5 text-sm transition-colors " +
              (current === o.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted")
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">Tell us about you</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We use this to estimate calorie and protein targets. Stored only on your device.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="card-surface p-5 space-y-4">
            <div>
              <Label htmlFor="name">Name (optional)</Label>
              <Input id="name" {...register("name")} placeholder="e.g. Ananya" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...register("age")} />
              </div>
              <div>
                <Label>Gender</Label>
                {segGroup("gender", [
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ])}
              </div>
              <div>
                <Label htmlFor="heightCm">Height (cm)</Label>
                <Input id="heightCm" type="number" {...register("heightCm")} />
              </div>
              <div>
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input id="weightKg" type="number" step="0.1" {...register("weightKg")} />
              </div>
            </div>
          </div>

          <div className="card-surface p-5 space-y-4">
            <div>
              <Label>Activity level</Label>
              {segGroup("activity", [
                { value: "sedentary", label: "Sedentary" },
                { value: "light", label: "Light" },
                { value: "moderate", label: "Moderate" },
                { value: "active", label: "Active" },
                { value: "athlete", label: "Athlete" },
              ])}
            </div>
            <div>
              <Label>Goal</Label>
              {segGroup("goal", [
                { value: "lose", label: "Lose weight" },
                { value: "maintain", label: "Maintain" },
                { value: "gain", label: "Gain weight" },
                { value: "muscle", label: "Build muscle" },
                { value: "healthy", label: "Eat healthier" },
              ])}
            </div>
            <div>
              <Label>Diet preference</Label>
              {segGroup("diet", [
                { value: "vegetarian", label: "Vegetarian" },
                { value: "vegan", label: "Vegan" },
                { value: "eggetarian", label: "Eggetarian" },
                { value: "non-vegetarian", label: "Non-vegetarian" },
              ])}
            </div>
            <div>
              <Label>Budget preference</Label>
              {segGroup("budget", [
                { value: "budget", label: "Budget" },
                { value: "moderate", label: "Moderate" },
                { value: "premium", label: "Premium" },
              ])}
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="text-sm text-destructive">Please check the highlighted fields.</p>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg">Save & continue</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

import { Link } from "@tanstack/react-router";
import { Leaf, Sparkles, Wallet, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">Kerala Diet Planner</span>
          </Link>
          <Link to="/profile" className="text-sm font-medium text-primary hover:underline">
            Start planning →
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground">
              <Sparkles className="h-3 w-3" /> Built for Kerala kitchens
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Eat well with foods <span className="text-primary">from your own kitchen.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
              A free, no-signup meal planner with calorie and macro tracking — built around puttu,
              kappa, meen curry, avial and 50+ Kerala favourites.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/profile">
                  Get started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/explorer">Browse foods</Link>
              </Button>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {[
                "No signup, no cloud",
                "Goal-based meal plans",
                "Macro & calorie tracking",
                "Budget-aware recipes",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Today's plan • Maintain</div>
                <div className="text-lg font-semibold">1,860 kcal · 92g protein</div>
              </div>
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-accent-foreground">
                Vegetarian
              </span>
            </div>
            <div className="space-y-3">
              {[
                { meal: "Breakfast", name: "Puttu & Kadala Curry", kcal: 420 },
                { meal: "Lunch", name: "Matta Rice, Sambar, Thoran", kcal: 690 },
                { meal: "Dinner", name: "Appam & Vegetable Stew", kcal: 540 },
                { meal: "Snack", name: "Tender Coconut", kcal: 60 },
              ].map((m) => (
                <div
                  key={m.meal}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{m.meal}</div>
                    <div className="text-sm font-medium">{m.name}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{m.kcal} kcal</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Kerala-first foods", body: "Puttu, kappa, meen curry, avial and more — with Malayalam names." },
            { icon: Wallet, title: "Budget aware", body: "Filter to budget, moderate or premium recipes anytime." },
            { icon: BookOpen, title: "Track effortlessly", body: "Log meals locally — no account required. Your data stays on device." },
          ].map((f) => (
            <div key={f.title} className="card-surface p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Built with Kerala foods in mind • Data stored locally on your device
      </footer>
    </div>
  );
}

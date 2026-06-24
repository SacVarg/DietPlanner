import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Kerala Diet Planner" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const profile = useApp((s) => s.profile);
  const clear = useApp((s) => s.clearProfile);
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="card-surface p-5">
          <h2 className="text-base font-semibold">Your profile</h2>
          {profile ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {Object.entries(profile).map(([k, v]) => (
                <div key={k} className="rounded-lg bg-surface px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{String(v)}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No profile yet.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => navigate({ to: "/profile" })}>Edit profile</Button>
            <Button
              variant="outline"
              onClick={() => {
                if (confirm("Clear profile and all journal entries?")) {
                  clear();
                  navigate({ to: "/" });
                }
              }}
            >
              Clear all data
            </Button>
          </div>
        </div>

        <div className="card-surface p-5 text-sm text-muted-foreground">
          <p>All data is stored locally on this device using browser storage. No cloud, no account.</p>
        </div>
      </div>
    </AppShell>
  );
}

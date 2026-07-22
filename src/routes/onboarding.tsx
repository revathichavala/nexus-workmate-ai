import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Cpu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { loadProfile, saveProfile } from "@/hooks/use-profile";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your profile — NexusOps AI" },
      { name: "description", content: "Tell us about you to personalize your NexusOps AI workspace." },
      { property: "og:title", content: "Set up your profile — NexusOps AI" },
      { property: "og:description", content: "Personalize your NexusOps AI adoption workspace." },
    ],
  }),
  component: Onboarding,
});

const DEPARTMENTS = ["Engineering", "Product", "Data & AI", "Security", "IT / Cloud", "Operations", "HR", "Finance", "Other"];

function Onboarding() {
  const navigate = useNavigate();
  const existing = typeof window !== "undefined" ? loadProfile() : null;
  const [name, setName] = useState(existing?.name ?? "");
  const [role, setRole] = useState(existing?.role ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [department, setDepartment] = useState(existing?.department ?? DEPARTMENTS[0]);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !email.trim()) {
      setError("Please fill in your name, role and email.");
      return;
    }
    saveProfile({ name: name.trim(), role: role.trim(), email: email.trim(), department });
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-gradient-surface grid place-items-center px-6 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary text-primary-foreground shadow-soft">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground">NexusOps AI</span>
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-card">
          <h1 className="text-2xl font-semibold text-foreground">Set up your workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us a bit about yourself so we can personalize your AI companion, skills and dashboards.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Full name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>

            <Field label="Work email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>

            <Field label="Role / title">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Cloud Engineer"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>

            <Field label="Department">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>

            {error && <div className="text-xs text-destructive">{error}</div>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium shadow-soft hover:opacity-95"
            >
              Enter workspace <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              Stored locally in your browser. You can update this anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}

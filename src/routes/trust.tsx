import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Gauge, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "AI Trust Engine — NexusOps AI" },
      { name: "description", content: "Composite deployment confidence across accuracy, security and policy signals." },
      { property: "og:title", content: "AI Trust Engine — NexusOps AI" },
      { property: "og:description", content: "Approve safe deployments automatically; route the rest to human review." },
    ],
  }),
  component: Trust,
});

const TREND = [
  { d: "Mon", v: 88 }, { d: "Tue", v: 91 }, { d: "Wed", v: 93 },
  { d: "Thu", v: 90 }, { d: "Fri", v: 94 }, { d: "Sat", v: 95 }, { d: "Sun", v: 95 },
];

function Trust() {
  const overall = 95;
  const arc = (overall / 100) * 283; // rough circumference for r=45

  return (
    <AppLayout title="AI Trust Engine" subtitle="Deployment confidence across accuracy, security and policy">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overall gauge */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card flex flex-col items-center">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Overall trust</div>
          <svg viewBox="0 0 100 100" className="w-48 h-48 mt-3">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--secondary)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${arc} 283`}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="52" textAnchor="middle" fontSize="22" fontWeight="600" fill="var(--foreground)">{overall}</text>
            <text x="50" y="66" textAnchor="middle" fontSize="7" fill="var(--muted-foreground)">of 100</text>
          </svg>
          <div className="mt-2 inline-flex items-center gap-1 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" /> Deployment approved
          </div>
        </section>

        {/* Component breakdown */}
        <section className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <h2 className="font-medium text-foreground">Signal breakdown</h2>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            {[
              { k: "Accuracy", v: 92, note: "Model responses match verified reference" },
              { k: "Security", v: 98, note: "No secrets or injection surfaces" },
              { k: "Policy", v: 100, note: "Aligned with S-14, S-22" },
            ].map((c) => (
              <div key={c.k} className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">{c.k}</div>
                <div className="text-2xl font-semibold text-foreground mt-1">{c.v}%</div>
                <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${c.v}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-2">{c.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-56">
            <ResponsiveContainer>
              <LineChart data={TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-medium text-foreground">Recent decisions</h2>
        <ul className="mt-3 divide-y divide-border text-sm">
          {[
            ["NEX-482 · Token rotation", 95, "Approved"],
            ["NEX-501 · Rate limiting", 88, "Human review"],
            ["NEX-478 · Rollout doc", 97, "Approved"],
            ["NEX-455 · Cache warm-up", 76, "Blocked"],
          ].map(([id, score, dec]) => (
            <li key={id as string} className="py-3 flex items-center gap-3">
              <div className="flex-1 text-foreground">{id}</div>
              <div className="text-muted-foreground text-xs w-16">Score {score}</div>
              <span className={
                "text-xs rounded-full px-3 py-1 border " +
                (dec === "Approved" ? "bg-success/15 text-success-foreground border-success/30"
                  : dec === "Human review" ? "bg-warning/15 text-warning-foreground border-warning/30"
                  : "bg-destructive/15 text-destructive-foreground border-destructive/30")
              }>{dec}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}

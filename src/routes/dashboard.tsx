import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { CheckCircle2, Circle, Clock, Sparkles, TrendingUp, GitBranch, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Employee Dashboard — NexusOps AI" },
      { name: "description", content: "Today's tasks, AI assistant, skill score and notifications for the connected workday." },
      { property: "og:title", content: "Employee Dashboard — NexusOps AI" },
      { property: "og:description", content: "Assigned tasks, contextual AI help, and live skill progress." },
    ],
  }),
  component: Dashboard,
});

const TASKS = [
  { id: "NEX-482", title: "Fix expiring JWT in /auth/refresh", state: "In progress", repo: "core-api", priority: "High" },
  { id: "NEX-501", title: "Add rate limiting to public endpoints", state: "Ready", repo: "gateway", priority: "Med" },
  { id: "NEX-478", title: "Document Kubernetes rollout strategy", state: "Review", repo: "infra", priority: "Low" },
  { id: "NEX-462", title: "Migrate Meraki webhook to v2 schema", state: "Backlog", repo: "cisco-adapter", priority: "Med" },
];

function Dashboard() {
  return (
    <AppLayout title="Good morning, Aditya" subtitle="Wednesday · 4 tasks assigned · 2 code reviews pending">
      {/* KPI row */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Tasks today", value: "4", hint: "2 in progress" },
          { label: "AI suggestions used", value: "18", hint: "this week", trend: "+34%" },
          { label: "Time saved", value: "5.2h", hint: "vs. baseline", trend: "+12%" },
          { label: "Skill score", value: "742", hint: "Cloud Engineer L3", trend: "+22" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{k.value}</span>
              {k.trend && <span className="text-xs text-success">{k.trend}</span>}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{k.hint}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <section className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card">
          <header className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h2 className="font-medium text-foreground">Today's tasks</h2>
              <p className="text-xs text-muted-foreground">Synced from Jira · 2 min ago</p>
            </div>
            <Link to="/assistant" className="text-xs text-primary font-medium inline-flex items-center gap-1">
              Open AI companion <ArrowRight className="h-3 w-3" />
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {TASKS.map((t) => (
              <li key={t.id} className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/50">
                {t.state === "In progress" ? (
                  <Clock className="h-4 w-4 text-warning" />
                ) : t.state === "Review" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">
                    <span className="text-muted-foreground mr-2">{t.id}</span>
                    {t.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" />{t.repo}</span>
                    <span>Priority: {t.priority}</span>
                  </div>
                </div>
                <span className={
                  "text-[11px] px-2 py-0.5 rounded-full border " +
                  (t.state === "In progress"
                    ? "bg-warning/15 text-warning-foreground border-warning/30"
                    : t.state === "Review"
                    ? "bg-success/15 text-success-foreground border-success/30"
                    : "bg-secondary text-secondary-foreground border-border")
                }>
                  {t.state}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* AI Assistant preview */}
        <aside className="rounded-xl border border-border bg-card shadow-card p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-medium text-foreground">AI Work Companion</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Context: NEX-482 · core-api · main
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg bg-secondary p-3">
              <div className="text-xs text-muted-foreground mb-1">Suggestion</div>
              Rotate refresh token on each use, add 30s clock skew tolerance, invalidate re-used tokens for replay defense.
            </div>
            <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground">
              Sources: <span className="text-foreground">auth-service/README.md</span>, RFC 6749 §10, internal Security Policy S-14.
            </div>
          </div>
          <Link to="/assistant" className="mt-4 block text-center rounded-lg bg-primary text-primary-foreground text-sm py-2 font-medium">
            Open assistant
          </Link>
        </aside>
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium text-foreground">Skill momentum</h2>
              <p className="text-xs text-muted-foreground">Updated automatically from your work</p>
            </div>
            <Link to="/skills" className="text-xs text-primary font-medium">View graph</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { s: "Python", v: 82, d: "+4" },
              { s: "Kubernetes", v: 68, d: "+7" },
              { s: "OAuth / Security", v: 74, d: "+3" },
              { s: "Meraki APIs", v: 41, d: "+11" },
            ].map((r) => (
              <li key={r.s}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{r.s}</span>
                  <span className="text-xs text-muted-foreground">{r.v}/100 <span className="text-success ml-1">{r.d}</span></span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${r.v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <h2 className="font-medium text-foreground">Activity</h2>
          </div>
          <ol className="mt-4 space-y-3 text-sm">
            {[
              ["Governance passed", "NEX-478 · Kubernetes rollout doc", "9:41"],
              ["AI suggestion accepted", "NEX-482 · token rotation logic", "9:22"],
              ["Skill unlocked", "OAuth 2.1 Rotation · +1 badge", "9:22"],
              ["Trust score refreshed", "Weekly average 94.6", "8:00"],
            ].map(([t, d, tm]) => (
              <li key={t as string} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <div className="text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <div className="text-xs text-muted-foreground">{tm}</div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppLayout>
  );
}

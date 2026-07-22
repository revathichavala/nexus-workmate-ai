import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Governance Engine — NexusOps AI" },
      { name: "description", content: "Automated validation of security, compliance, privacy and policy for every AI-assisted change." },
      { property: "og:title", content: "Governance Engine — NexusOps AI" },
      { property: "og:description", content: "Policy checks that keep AI safe to deploy — with actionable suggestions." },
    ],
  }),
  component: Governance,
});

const CHECKS = [
  { name: "Security scan", status: "pass", detail: "No critical vulnerabilities" },
  { name: "Compliance (SOC 2)", status: "pass", detail: "Logging and audit trail present" },
  { name: "Privacy (GDPR)", status: "warn", detail: "PII in log line 42 — mask before deploy" },
  { name: "Coding standards", status: "pass", detail: "Lint + type checks clean" },
  { name: "Enterprise policy S-14", status: "pass", detail: "Token rotation matches policy" },
  { name: "Secrets scan", status: "fail", detail: "Test file contains hardcoded API key" },
];

function icon(status: string) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (status === "warn") return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <XCircle className="h-4 w-4 text-destructive" />;
}

function Governance() {
  return (
    <AppLayout title="Governance Engine" subtitle="Every AI-assisted change is checked before it ships">
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card">
          <header className="px-5 py-4 border-b border-border flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <div>
              <h2 className="font-medium text-foreground">PR #482 · core-api / auth-service</h2>
              <p className="text-xs text-muted-foreground">Triggered by AI companion · 12 files changed</p>
            </div>
            <span className="ml-auto text-xs rounded-full px-3 py-1 bg-warning/15 text-warning-foreground border border-warning/30">
              Needs attention
            </span>
          </header>
          <ul className="divide-y divide-border">
            {CHECKS.map((c) => (
              <li key={c.name} className="px-5 py-3 flex items-center gap-3">
                {icon(c.status)}
                <div className="flex-1">
                  <div className="text-sm text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.detail}</div>
                </div>
                {c.status !== "pass" && (
                  <button className="text-xs rounded-md bg-primary text-primary-foreground px-3 py-1.5">
                    View fix
                  </button>
                )}
              </li>
            ))}
          </ul>
          <footer className="px-5 py-4 border-t border-border flex items-center gap-3">
            <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm">Apply AI suggestions</button>
            <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground">Request human review</button>
            <span className="ml-auto text-xs text-muted-foreground">Estimated fix time: 8 min</span>
          </footer>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Policy summary</div>
            <div className="mt-3 flex items-center gap-4">
              <div className="text-3xl font-semibold text-foreground">4/6</div>
              <div className="text-xs text-muted-foreground">checks passing</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: "66%" }} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">This week</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between"><span>PRs validated</span><span className="text-foreground font-medium">128</span></li>
              <li className="flex justify-between"><span>Auto-fixed</span><span className="text-foreground font-medium">74</span></li>
              <li className="flex justify-between"><span>Escalated to human</span><span className="text-foreground font-medium">9</span></li>
              <li className="flex justify-between"><span>Policy violations blocked</span><span className="text-foreground font-medium">21</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

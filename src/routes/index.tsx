import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Sparkles, ShieldCheck, GraduationCap, Gauge, LineChart, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusOps AI — Enterprise AI Adoption Intelligence" },
      { name: "description", content: "Contextual AI assistance, upskilling, governance, trust validation and ROI measurement — unified for enterprise AI adoption." },
      { property: "og:title", content: "NexusOps AI — Enterprise AI Adoption Intelligence" },
      { property: "og:description", content: "Contextual AI assistance, upskilling, governance, trust validation and ROI measurement — unified for enterprise AI adoption." },
    ],
  }),
  component: Landing,
});

const MODULES = [
  { icon: Sparkles, title: "Context Intelligence", desc: "Reads Jira, GitHub, VS Code and docs to understand the work in progress." },
  { icon: Cpu, title: "AI Work Companion", desc: "Contextual answers, code suggestions and RAG responses at the point of work." },
  { icon: GraduationCap, title: "Skill Intelligence", desc: "Live skill graph that updates automatically as employees complete work." },
  { icon: ShieldCheck, title: "Governance Engine", desc: "Automated checks for security, compliance, privacy and enterprise policy." },
  { icon: Gauge, title: "AI Trust Engine", desc: "Computes a deployment trust score across accuracy, security and policy." },
  { icon: LineChart, title: "Executive ROI", desc: "Adoption, productivity, time saved, skill growth and business ROI." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Nav */}
      <header className="border-b border-border bg-background/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-primary text-primary-foreground shadow-soft">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="font-semibold text-foreground">NexusOps AI</div>
          <nav className="ml-auto flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#modules" className="hover:text-foreground">Platform</a>
            <a href="#journey" className="hover:text-foreground">How it works</a>
            <Link to="/dashboard" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-soft hover:opacity-95">
              Enter Workspace
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-border bg-card text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Enterprise AI adoption, unified
            </div>
            <h1 className="mt-5 text-5xl font-semibold text-foreground leading-tight">
              Turn AI investment into <span className="text-primary">measurable</span> productivity.
            </h1>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              NexusOps AI helps organizations learn AI while working, use it safely,
              govern it automatically, and prove business impact — in one workflow.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-soft hover:opacity-95">
                Launch Workspace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/executive" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                See executive view
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-sm">
              {[
                ["50%", "faster task completion"],
                ["40%", "AI adoption lift"],
                ["30%", "skill growth"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-2xl font-semibold text-foreground">{k}</div>
                  <div className="text-muted-foreground text-xs mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              <span className="h-2 w-2 rounded-full bg-warning" />
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="ml-2">AI Work Companion — NEX-482</span>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-lg bg-secondary p-3">
                <div className="text-xs text-muted-foreground">Jira context</div>
                <div className="text-foreground">Fix expiring JWT in /auth/refresh endpoint.</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-primary font-medium">AI suggestion</div>
                <div className="text-foreground mt-1">Rotate refresh token on use, add 30s clock skew, invalidate re-used tokens.</div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Trust 95 · Security 98 · Policy 100
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Python +1", "OAuth +1", "Security +1"].map((s) => (
                  <div key={s} className="rounded-md bg-accent/20 border border-accent/40 text-accent-foreground text-[11px] px-2 py-1 text-center">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-foreground">Six intelligence engines. One workflow.</h2>
        <p className="text-muted-foreground mt-2">From reading context to proving ROI.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {MODULES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-medium text-foreground">{title}</div>
              <div className="text-sm text-muted-foreground mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-foreground">The adoption flywheel</h2>
        <ol className="mt-6 grid md:grid-cols-4 gap-4 text-sm">
          {[
            ["1. Context", "Reads Jira, code, docs"],
            ["2. Assist", "Contextual AI answers"],
            ["3. Learn", "Skill graph updates"],
            ["4. Govern", "Policy + security checks"],
            ["5. Trust", "Deployment confidence"],
            ["6. Measure", "Adoption, ROI, growth"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-border bg-card p-4">
              <div className="text-primary text-xs font-semibold">{t}</div>
              <div className="text-foreground mt-1">{d}</div>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-soft hover:opacity-95">
            Explore the workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © NexusOps AI — Enterprise AI Adoption Intelligence
      </footer>
    </div>
  );
}

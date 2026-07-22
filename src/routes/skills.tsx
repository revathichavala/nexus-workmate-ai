import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { GraduationCap, Star, TrendingUp } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skill Intelligence — NexusOps AI" },
      { name: "description", content: "Live skill graph, progress, and personalized learning recommendations." },
      { property: "og:title", content: "Skill Intelligence — NexusOps AI" },
      { property: "og:description", content: "Track skills that update automatically as employees complete work." },
    ],
  }),
  component: Skills,
});

const RADAR = [
  { skill: "Python", value: 82 },
  { skill: "Kubernetes", value: 68 },
  { skill: "OAuth", value: 74 },
  { skill: "Cloud", value: 71 },
  { skill: "Meraki", value: 41 },
  { skill: "DevOps", value: 78 },
];

const HISTORY = [
  { date: "Aug 12", event: "Completed NEX-482 · +1 OAuth", delta: "+3" },
  { date: "Aug 09", event: "Reviewed Kubernetes rollout doc", delta: "+2" },
  { date: "Aug 04", event: "Passed governance on gateway PR", delta: "+1" },
  { date: "Jul 29", event: "Meraki webhook v2 migration", delta: "+5" },
];

const RECS = [
  { title: "OAuth 2.1 Deep Dive", why: "Boosts your Security score to L4" },
  { title: "Kubernetes Progressive Delivery", why: "Aligned to 3 upcoming tasks" },
  { title: "Meraki API v2 Fundamentals", why: "Fastest path to fill your weakest area" },
];

function Skills() {
  return (
    <AppLayout title="Skill Intelligence" subtitle="Your skills update automatically from the work you do">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radar */}
        <section className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h2 className="font-medium text-foreground">Live skill graph</h2>
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <RadarChart data={RADAR}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Overall */}
        <aside className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Overall</div>
          <div className="mt-1 text-4xl font-semibold text-foreground">742</div>
          <div className="text-xs text-muted-foreground">Cloud Engineer L3 · <span className="text-success">+22 this month</span></div>
          <div className="mt-6 space-y-2 text-sm">
            {[
              ["Python", 82], ["Kubernetes", 68], ["OAuth", 74], ["DevOps", 78], ["Meraki", 41],
            ].map(([s, v]) => (
              <div key={s as string}>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span className="text-foreground">{s}</span><span>{v}/100</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <h2 className="font-medium text-foreground">Learning history</h2>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {HISTORY.map((h) => (
              <li key={h.event} className="py-3 flex items-center gap-3 text-sm">
                <span className="text-xs text-muted-foreground w-16">{h.date}</span>
                <span className="flex-1 text-foreground">{h.event}</span>
                <span className="text-xs text-success">{h.delta}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-warning" />
            <h2 className="font-medium text-foreground">Recommended for you</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {RECS.map((r) => (
              <li key={r.title} className="rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.why}</div>
                </div>
                <button className="text-xs rounded-md bg-primary text-primary-foreground px-3 py-1.5">Start</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}

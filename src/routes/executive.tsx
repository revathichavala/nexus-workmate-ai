import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { LineChart as LineIcon, Users, Clock, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export const Route = createFileRoute("/executive")({
  head: () => ({
    meta: [
      { title: "Executive ROI Dashboard — NexusOps AI" },
      { name: "description", content: "AI adoption, productivity, time saved, skill growth and ROI across the enterprise." },
      { property: "og:title", content: "Executive ROI Dashboard — NexusOps AI" },
      { property: "og:description", content: "Prove business impact of AI investment with unified adoption and ROI signals." },
    ],
  }),
  component: Executive,
});

const ADOPTION = [
  { m: "Feb", adoption: 22, productivity: 12 },
  { m: "Mar", adoption: 34, productivity: 18 },
  { m: "Apr", adoption: 41, productivity: 24 },
  { m: "May", adoption: 52, productivity: 31 },
  { m: "Jun", adoption: 61, productivity: 39 },
  { m: "Jul", adoption: 72, productivity: 47 },
  { m: "Aug", adoption: 78, productivity: 52 },
];

const TEAMS = [
  { t: "Cloud", saved: 420, growth: 28 },
  { t: "DevOps", saved: 380, growth: 24 },
  { t: "AI Eng", saved: 510, growth: 34 },
  { t: "Security", saved: 260, growth: 19 },
  { t: "Platform", saved: 330, growth: 21 },
];

function Executive() {
  return (
    <AppLayout title="Executive ROI Dashboard" subtitle="Adoption, productivity and business impact across the enterprise">
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "AI adoption", value: "78%", trend: "+16% QoQ" },
          { icon: TrendingUp, label: "Productivity lift", value: "52%", trend: "vs. baseline" },
          { icon: Clock, label: "Time saved (wk)", value: "1,900h", trend: "across 240 engineers" },
          { icon: LineIcon, label: "Estimated ROI", value: "3.4x", trend: "12-mo rolling" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <k.icon className="h-3.5 w-3.5" /> {k.label}
            </div>
            <div className="mt-2 text-3xl font-semibold text-foreground">{k.value}</div>
            <div className="text-xs text-success mt-1">{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-medium text-foreground">Adoption & productivity</h2>
          <div className="h-72 mt-3">
            <ResponsiveContainer>
              <AreaChart data={ADOPTION}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="adoption" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="productivity" stroke="var(--accent)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-medium text-foreground">Business impact</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              ["Pilots moved to production", "18", "+7"],
              ["Governance auto-fixes", "1,204", "+312"],
              ["Avg. trust score", "94.6", "+2.1"],
              ["Skill certifications", "312", "+58"],
              ["Support tickets deflected", "870", "+120"],
            ].map(([k, v, d]) => (
              <li key={k} className="flex items-center gap-3">
                <span className="flex-1 text-muted-foreground">{k}</span>
                <span className="text-foreground font-medium">{v}</span>
                <span className="text-xs text-success w-12 text-right">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-medium text-foreground">By team</h2>
        <div className="h-72 mt-3">
          <ResponsiveContainer>
            <BarChart data={TEAMS}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="t" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="saved" name="Time saved (h/wk)" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="growth" name="Skill growth %" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}

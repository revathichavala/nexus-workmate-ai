import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Gauge,
  LineChart,
  Bell,
  Search,
  Cpu,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useProfile, initials } from "@/hooks/use-profile";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/skills", label: "Skill Intelligence", icon: GraduationCap },
  { to: "/governance", label: "Governance", icon: ShieldCheck },
  { to: "/trust", label: "Trust Engine", icon: Gauge },
  { to: "/executive", label: "Executive ROI", icon: LineChart },
] as const;

export function AppLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { profile, ready } = useProfile();

  useEffect(() => {
    if (ready && !profile) navigate({ to: "/onboarding" });
  }, [ready, profile, navigate]);

  if (!ready || !profile) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-surface text-sm text-muted-foreground">
        Loading your workspace…
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-sidebar-border bg-sidebar">
          <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
            <div className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-primary text-primary-foreground shadow-soft">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-sidebar-foreground">NexusOps AI</div>
              <div className="text-[11px] text-muted-foreground">Adoption Intelligence</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || pathname.startsWith(to + "/");
              return (
                <Link
                  key={to}
                  to={to}
                  className={
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors " +
                    (active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-sidebar-foreground hover:bg-sidebar-accent")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mx-3 mb-4 rounded-xl border border-sidebar-border bg-card">
            <div className="text-xs text-muted-foreground">AI Trust Score</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-foreground">95</span>
              <span className="text-xs text-success">+2 this week</span>
            </div>
            <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: "95%" }} />
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 md:ml-64">
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border">
            <div className="flex items-center gap-4 px-6 py-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground w-72">
                  <Search className="h-4 w-4" />
                  <span>Search tasks, docs, skills…</span>
                </div>
                <button className="relative rounded-lg p-2 hover:bg-secondary" aria-label="Notifications">
                  <Bell className="h-4 w-4 text-foreground" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
                </button>
                <Link to="/onboarding" className="flex items-center gap-2 pl-2 border-l border-border hover:opacity-90" title="Edit profile">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-semibold">
                    {initials(profile.name)}
                  </div>
                  <div className="hidden sm:block text-xs text-left">
                    <div className="font-medium text-foreground">{profile.name}</div>
                    <div className="text-muted-foreground">{profile.role}</div>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <main className="px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

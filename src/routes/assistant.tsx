import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Sparkles, FileText, GitBranch, Send, Bot, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Work Companion — NexusOps AI" },
      { name: "description", content: "Contextual AI assistant grounded in your Jira, code, and enterprise knowledge." },
      { property: "og:title", content: "AI Work Companion — NexusOps AI" },
      { property: "og:description", content: "Ask questions grounded in your work context, code and company docs." },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; text: string; sources?: string[] };

const INITIAL: Msg[] = [
  {
    role: "assistant",
    text:
      "I've loaded context from NEX-482, the core-api repo, and Security Policy S-14. Ask me anything about the current task, or try: 'Explain Kubernetes deployment for auth-service'.",
  },
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [draft, setDraft] = useState("");

  function send() {
    const q = draft.trim();
    if (!q) return;
    const reply: Msg = {
      role: "assistant",
      text:
        "Based on your repo and internal docs: rotate refresh tokens on every use, enforce 30s clock skew, and invalidate re-used tokens. Emit a security event and require re-auth. Add unit tests around token replay.",
      sources: ["core-api/auth-service/README.md", "Security Policy S-14", "RFC 6749 §10"],
    };
    setMessages((m) => [...m, { role: "user", text: q }, reply]);
    setDraft("");
  }

  return (
    <AppLayout title="AI Work Companion" subtitle="Grounded in your live context">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Chat */}
        <section className="rounded-xl border border-border bg-card shadow-card flex flex-col min-h-[70vh]">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Companion · NEX-482</div>
              <div className="text-xs text-muted-foreground">Context loaded: Jira, GitHub, Docs, Policy</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={"flex gap-3 " + (m.role === "user" ? "flex-row-reverse" : "")}>
                <div className={
                  "h-8 w-8 grid place-items-center rounded-lg shrink-0 " +
                  (m.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")
                }>
                  {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={"max-w-[75%] " + (m.role === "user" ? "text-right" : "")}>
                  <div className={
                    "inline-block rounded-2xl px-4 py-2.5 text-sm " +
                    (m.role === "assistant" ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground")
                  }>
                    {m.text}
                  </div>
                  {m.sources && (
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      Sources: {m.sources.map((s, k) => (
                        <span key={s}>
                          {k > 0 && " · "}
                          <span className="text-foreground">{s}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about your task, code, or company knowledge…"
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={send} className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-sm inline-flex items-center gap-1">
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Explain Kubernetes deployment",
                "Summarize this Jira ticket",
                "Suggest tests for token rotation",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setDraft(q)}
                  className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Context panel */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Context Intelligence</div>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">NEX-482 · Fix expiring JWT</div>
                  <div className="text-xs text-muted-foreground">Jira · linked to core-api</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <GitBranch className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">core-api / auth-service</div>
                  <div className="text-xs text-muted-foreground">branch: fix/token-rotation</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">Security Policy S-14</div>
                  <div className="text-xs text-muted-foreground">Token lifecycle & rotation</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Trust preview</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-foreground">95</div>
              <div className="text-xs text-success">Approved</div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {[["Accuracy", 92], ["Security", 98], ["Policy", 100]].map(([k, v]) => (
                <div key={k as string}>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{k}</span><span>{v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

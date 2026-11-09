"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSISTANT_NAME, GREETING, QUICK_REPLIES, localAnswer } from "@/lib/assistant-kb";
import { Icon } from "@/components/ui/Icon";
import { TriskiRobot } from "./TriskiRobot";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

/** Testo con link in formato [testo](url): interni → <Link>, esterni → nuova scheda. Nessun HTML dal modello. */
function Rich({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(p);
        if (!m) return <span key={i}>{p}</span>;
        const [, label, href] = m;
        const cls = "font-semibold text-gold-300 underline underline-offset-4 hover:text-gold-100";
        if (href!.startsWith("/")) {
          return (
            <Link key={i} href={href!} onClick={onNavigate} className={cls}>
              {label}
            </Link>
          );
        }
        if (/^https:\/\//.test(href!)) {
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {label}
            </a>
          );
        }
        return <span key={i}>{label}</span>;
      })}
    </>
  );
}

/** Chat di Triskello: finestra con messaggi, risposte rapide e campo di testo. Esc la chiude. */
export function AssistantPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, []);
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    let reply = "";
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = (await res.json()) as { reply?: string };
      reply = data.reply ?? "";
    } catch {
      /* rete assente: risposta di riserva */
    }
    await new Promise((r) => setTimeout(r, 350));
    setMsgs((m) => [...m, { role: "assistant", content: reply || localAnswer(t) }]);
    setBusy(false);
  };

  return (
    <section
      role="dialog"
      aria-label={`Chat con ${ASSISTANT_NAME}`}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="triski-bubble flex h-[min(34rem,calc(100svh-8rem))] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-card border border-azure-300/50 bg-night shadow-[0_30px_80px_-16px_rgb(0_0_0/0.9),0_0_60px_-20px_rgb(58_164_212/0.6)]"
    >
      <header className="flex items-center gap-3 border-b border-line bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-night-raised))] px-4 py-3">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-azure-300/60 bg-night">
          <TriskiRobot className="h-9 w-9" talking={busy} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[1.0625rem] font-bold leading-tight text-fg">{ASSISTANT_NAME}</p>
          <p className="text-[0.75rem] text-azure-200">Assistente AI di Triskell Ecosystem</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Chiudi la chat" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg hover:border-gold-300 hover:text-gold-300">
          <Icon name="close" className="h-4 w-4" />
        </button>
      </header>

      <div ref={list} data-lenis-prevent="" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-sm bg-gold-300 px-3.5 py-2.5 text-[0.9375rem] font-medium leading-snug text-night" : "max-w-[90%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-line bg-night-raised px-3.5 py-2.5 text-[0.9375rem] leading-snug text-fg"}>
              {m.role === "assistant" ? <Rich text={m.content} onNavigate={onClose} /> : m.content}
            </p>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start" aria-label={`${ASSISTANT_NAME} sta scrivendo`}>
            <p className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-night-raised px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-azure-300" style={{ animation: "triski-dot 1s infinite", animationDelay: `${d * 0.15}s` }} />
              ))}
            </p>
          </div>
        )}
        {msgs.length === 1 && (
          <ul className="flex flex-wrap gap-2 pt-1">
            {QUICK_REPLIES.map((q) => (
              <li key={q}>
                <button type="button" onClick={() => send(q)} className="rounded-full border border-azure-300/50 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-azure-200 transition-colors hover:border-gold-300 hover:text-gold-200">
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="flex items-center gap-2 border-t border-line bg-night-raised/70 p-3"
      >
        <label htmlFor="triski-input" className="sr-only">
          Scrivi a {ASSISTANT_NAME}
        </label>
        <input
          id="triski-input"
          ref={field}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={400}
          placeholder="Scrivi una domanda…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-line-strong bg-night px-4 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-3 focus:border-gold-300 focus:outline-none"
        />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Invia" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night disabled:opacity-50">
          <Icon name="send" className="h-4 w-4" />
        </button>
      </form>
      <p className="px-4 pb-2.5 text-center text-[0.6875rem] text-fg-3">Risposte generate da un&apos;AI: per prezzi e condizioni scrivi al team. <Link href="/privacy" onClick={onClose} className="underline underline-offset-2">Privacy</Link></p>
    </section>
  );
}

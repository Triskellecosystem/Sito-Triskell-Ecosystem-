import { NextResponse } from "next/server";
import { localAnswer, systemPrompt } from "@/lib/assistant-kb";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

/** Limite semplice per IP (in memoria): frena abusi banali; per il traffico vero usare un rate limiter esterno. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear();
  return arr.length > 12;
}

/**
 * POST /api/assistant — risposta dell'assistente Triskiello.
 * Con ANTHROPIC_API_KEY risponde un modello AI (Claude), guidato da un prompt con i soli fatti del sito.
 * Senza chiave, o se il servizio non risponde, usa le risposte a regole (`localAnswer`): l'assistente funziona sempre.
 * La chiave resta solo sul server e non è mai inviata al browser.
 */
export async function POST(req: Request) {
  let body: { messages?: Msg[] };
  try {
    body = (await req.json()) as { messages?: Msg[] };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const msgs = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  const last = msgs[msgs.length - 1];
  if (!last || last.role !== "user" || !last.content.trim()) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (limited(ip)) return NextResponse.json({ ok: true, mode: "limit", reply: "Stai scrivendo molto in fretta! Aspetta un attimo e riprova, oppure scrivi al team su WhatsApp." });

  const key = process.env.ANTHROPIC_API_KEY;
  if (key) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15_000);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: process.env.ASSISTANT_MODEL || "claude-haiku-5-5", max_tokens: 450, system: systemPrompt(), messages: msgs }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
        const text = data.content?.find((b) => b.type === "text")?.text?.trim();
        if (text) return NextResponse.json({ ok: true, mode: "ai", reply: text });
      }
    } catch {
      /* ricade sulle risposte a regole */
    }
  }
  return NextResponse.json({ ok: true, mode: "local", reply: localAnswer(last.content) });
}

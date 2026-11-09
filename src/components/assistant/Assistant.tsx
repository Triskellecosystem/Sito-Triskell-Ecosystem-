"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ASSISTANT_NAME, GREETING } from "@/lib/assistant-kb";
import { TriskiRobot } from "./TriskiRobot";

const Panel = dynamic(() => import("./AssistantPanel").then((m) => m.AssistantPanel), { ssr: false });

/**
 * Triskello: piccolo robot sempre presente in basso a destra. Si presenta una sola volta per visita con un fumetto,
 * poi resta un pulsante discreto; al click si apre la chat (caricata solo allora, per non pesare sulla pagina).
 */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("triski-seen") === "1";
    } catch {
      /* storage non disponibile */
    }
    if (seen) return;
    const show = window.setTimeout(() => setBubble(true), 2800);
    const hide = window.setTimeout(() => {
      setBubble(false);
      try {
        sessionStorage.setItem("triski-seen", "1");
      } catch {
        /* ignora */
      }
    }, 13000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const toggle = () => {
    setOpen((v) => !v);
    setBubble(false);
    try {
      sessionStorage.setItem("triski-seen", "1");
    } catch {
      /* ignora */
    }
  };

  return (
    <div className="fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5">
      {open && (
        <div className="absolute bottom-[calc(100%+0.75rem)] right-0">
          <Panel onClose={() => setOpen(false)} />
        </div>
      )}
      {bubble && !open && (
        <div role="status" className="triski-bubble absolute bottom-[calc(100%+0.75rem)] right-0 w-[16rem] max-w-[calc(100vw-1.5rem)] rounded-2xl rounded-br-sm border border-azure-300/50 bg-night-raised/95 p-3.5 text-[0.875rem] leading-snug text-fg shadow-[0_16px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur">
          <button type="button" aria-label="Chiudi il messaggio" onClick={() => setBubble(false)} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line-strong bg-night text-[0.75rem] text-fg-2 hover:text-fg">
            ×
          </button>
          {GREETING}
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? `Chiudi ${ASSISTANT_NAME}` : `Apri ${ASSISTANT_NAME}, l'assistente AI`}
        className="group/t relative grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border-2 border-azure-300/70 bg-night-raised/90 shadow-[0_10px_34px_-6px_rgb(0_0_0/0.8),0_0_30px_-6px_rgb(58_164_212/0.7)] backdrop-blur transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300 hover:shadow-[0_10px_34px_-6px_rgb(0_0_0/0.8),0_0_36px_-4px_rgb(247_200_92/0.7)] sm:h-[4.75rem] sm:w-[4.75rem]"
      >
        <TriskiRobot className="h-[2.6rem] w-[2.6rem] sm:h-[3.8rem] sm:w-[3.8rem]" />
        <span className="absolute -left-1.5 -top-1.5 rounded-full bg-gold-300 px-1.5 py-0.5 font-display text-[0.5625rem] font-bold uppercase tracking-wider text-night">AI</span>
      </button>
    </div>
  );
}

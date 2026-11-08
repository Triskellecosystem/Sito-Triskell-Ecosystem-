"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { GymLogo, Poster } from "./SocialPosters";

const HIGHLIGHTS: Array<{ icon: IconName; label: string }> = [
  { icon: "dumbbell", label: "Corsi" },
  { icon: "trophy", label: "Risultati" },
  { icon: "users", label: "Team" },
  { icon: "bell", label: "Offerte" },
];

const nf = new Intl.NumberFormat("it-IT");

/**
 * Mock di un profilo Instagram fatto bene (palestra) + schermata campagne Meta Ads, in un telefono.
 * · Il contatore dei follower è grande, cambia colore a ogni incremento e corre veloce, con "+N oggi" accanto.
 * · Si passa dal profilo alla campagna con i pulsanti, le frecce o scorrendo (si alterna anche da solo).
 * · Le richieste in arrivo stanno in un pannello separato sotto il telefono: non coprono mai il resto.
 * Il timer gira solo se il mock è visibile e senza reduced motion. I dati sono DIMOSTRATIVI (site.agencyPage.demo).
 */
export function SocialMock() {
  const d = site.agencyPage.demo;
  const rootRef = useRef<HTMLElement>(null);
  const drag = useRef<number | null>(null);
  const [tick, setTick] = useState(0);
  const [manual, setManual] = useState<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([en]) => {
      window.clearInterval(timer);
      if (en?.isIntersecting) timer = window.setInterval(() => setTick((t) => t + 1), 420);
    });
    io.observe(el);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, []);

  // tick ogni 0,42 s → il cambio automatico di schermata avviene ogni ~12 s (e si ferma se scegli tu)
  const auto = Math.floor(tick / 28) % 2;
  const screen = manual ?? auto;
  const followers = d.followersStart + tick + Math.floor(tick / 3);
  const gain = d.todayGain + tick + Math.floor(tick / 3);
  const contacts = d.ads.todayValue + Math.floor(tick / 5);
  const n = Math.floor(tick / 4);
  const chat = [0, 1, 2].map((k) => ({ ...d.chat[(n + d.chat.length * 4 - k) % d.chat.length]!, key: n - k }));
  const requests = 9 + n;

  const go = (to: number) => setManual(((to % 2) + 2) % 2);
  const tabs: Array<{ label: string; icon: IconName }> = [
    { label: d.tabs.profile, icon: "smartphone" },
    { label: d.tabs.campaign, icon: "trending" },
  ];

  return (
    <figure ref={rootRef} className="relative mx-auto w-[19.5rem] sm:w-[21rem]" aria-label={`${d.note}: profilo Instagram di una palestra e campagna pubblicitaria con i contatti in arrivo`}>
      <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.4),transparent_65%)]" />

      <div
        aria-hidden="true"
        className="relative aspect-[9/16.6] touch-pan-y select-none overflow-hidden rounded-[2.4rem] border-[6px] border-line-strong bg-night shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(42_144_195/0.35)]"
        onPointerDown={(e) => {
          drag.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (drag.current !== null && Math.abs(e.clientX - drag.current) > 40) go(screen + (e.clientX < drag.current ? 1 : -1));
          drag.current = null;
        }}
      >
        <span className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-night-deep" />

        {/* ===== Schermata 1: profilo Instagram ===== */}
        <div className={cn("absolute inset-0 flex flex-col px-3.5 pb-3 pt-9 transition-[opacity,transform] duration-700 ease-out-expo", screen === 0 ? "opacity-100" : "pointer-events-none -translate-x-8 opacity-0")}>
          <div className="flex items-center justify-between text-fg">
            <p className="flex items-center gap-1 text-[0.8125rem] font-bold">
              {d.handle}
              <Icon name="badge" className="h-3.5 w-3.5 text-azure-300" />
            </p>
            <span className="flex items-center gap-2.5">
              <Icon name="plus" className="h-4 w-4" />
              <Icon name="menu" className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-3">
            <span className="grid h-[3.9rem] w-[3.9rem] shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,var(--color-gold-300),var(--color-azure-400),var(--color-gold-300))] p-[2.5px]">
              <span className="block h-full w-full overflow-hidden rounded-full">
                <GymLogo />
              </span>
            </span>
            <dl className="grid flex-1 grid-cols-2 gap-x-2 text-center">
              <div>
                <dd className="font-display text-[1rem] font-bold leading-none text-fg">{d.posts}</dd>
                <dt className="mt-1 text-[0.625rem] text-fg-3">post</dt>
              </div>
              <div>
                <dd className="font-display text-[1rem] font-bold leading-none text-fg">{d.following}</dd>
                <dt className="mt-1 text-[0.625rem] text-fg-3">seguiti</dt>
              </div>
            </dl>
          </div>

          {/* contatore follower: grande, cambia colore a ogni incremento */}
          <div className="relative mt-2.5 overflow-hidden rounded-2xl border border-gold-400/50 bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-night-raised))] px-3.5 py-2.5 shadow-glow-gold">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-fg-3">{d.followersLabel}</p>
                <p key={followers} className="follower-num font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                  {nf.format(followers)}
                </p>
              </div>
              <span key={gain} className="grow-pill mb-0.5 flex shrink-0 items-center gap-1 rounded-full bg-gold-300 px-2.5 py-1 text-[0.75rem] font-bold tabular-nums text-night">
                <Icon name="trending" className="h-3.5 w-3.5" strokeWidth={2.6} />+{gain} {d.gainLabel}
              </span>
            </div>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-azure-400 via-gold-300 to-azure-400" />
          </div>

          <p className="mt-2 text-[0.625rem] leading-snug text-fg-2">
            <span className="font-semibold text-fg">{d.name}</span> · {d.category}
            <br />
            {d.bio[0]} <span className="text-azure-300">{d.bio[1]}</span>
          </p>

          <div className="mt-2 flex gap-1.5">
            <span className="flex-1 rounded-lg bg-[image:var(--gradient-gold-btn)] py-1.5 text-center text-[0.6875rem] font-bold text-night">{d.follow}</span>
            <span className="flex-1 rounded-lg border border-line-strong py-1.5 text-center text-[0.6875rem] font-semibold text-fg">{d.message}</span>
          </div>

          <ul className="mt-2 flex justify-between px-1">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="flex flex-col items-center gap-0.5">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                  <Icon name={h.icon} className="h-4 w-4" />
                </span>
                <span className="text-[0.5625rem] text-fg-2">{h.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex border-y border-line py-1 text-fg-3">
            <span className="flex flex-1 justify-center text-gold-300">
              <Icon name="layers" className="h-4 w-4" />
            </span>
            <span className="flex flex-1 justify-center">
              <Icon name="film" className="h-4 w-4" />
            </span>
            <span className="flex flex-1 justify-center">
              <Icon name="users" className="h-4 w-4" />
            </span>
          </div>

          <ul className="mt-[3px] grid grid-cols-3 gap-[3px]">
            {d.feed.map((k) => (
              <li key={k}>
                <Poster kind={k} />
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Schermata 2: campagna pubblicitaria ===== */}
        <div className={cn("absolute inset-0 flex flex-col px-4 pb-4 pt-10 transition-[opacity,transform] duration-700 ease-out-expo", screen === 1 ? "opacity-100" : "pointer-events-none translate-x-8 opacity-0")}>
          <div className="flex items-center justify-between">
            <p className="font-display text-[0.9375rem] font-bold text-fg">{d.ads.title}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-azure-300/50 bg-azure-400/15 px-2 py-0.5 text-[0.625rem] font-semibold text-azure-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-azure-300" />
              {d.ads.status}
            </span>
          </div>
          <p className="mt-0.5 text-[0.6875rem] text-fg-3">{d.ads.name}</p>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-gold-400/50 bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-night-raised))] p-4 shadow-glow-gold">
            <p className="text-[0.75rem] font-medium text-fg-2">{d.ads.today}</p>
            <p className="mt-1 flex items-end gap-2">
              <span key={contacts} className="grow-pill text-gold font-display text-[3.75rem] font-bold leading-none tracking-[-0.05em] tabular-nums">
                {contacts}
              </span>
              <span className="mb-2 font-display text-[1.125rem] font-semibold text-fg">{d.ads.todayUnit}</span>
            </p>
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold-300 text-night">
              <Icon name="trending" className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </div>

          <div className="mt-4 flex h-32 items-end gap-1.5 rounded-xl border border-line bg-night-raised/60 px-3 pb-3 pt-4">
            {d.ads.bars.map((b, i) => (
              <span
                key={i}
                style={{ height: `${b}%`, transitionDelay: `${0.35 + i * 0.07}s` }}
                className={cn("block flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-azure-400 to-gold-300 transition-transform duration-700 ease-out-expo", screen === 1 ? "scale-y-100" : "scale-y-0")}
              />
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2">
            {d.ads.kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-line bg-night-raised/60 px-2 py-2.5 text-center">
                <dd className="font-display text-[1rem] font-bold leading-none text-fg">{k.value}</dd>
                <dt className="mt-1.5 text-[0.5625rem] leading-tight text-fg-3">{k.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* selettore: frecce + due schede ben visibili */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button type="button" onClick={() => go(screen - 1)} aria-label="Schermata precedente" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-left" className="h-4 w-4" />
        </button>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => go(i)}
            aria-pressed={screen === i}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8125rem] font-semibold transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-base)]",
              screen === i ? "border-gold-300 bg-gold-300 text-night shadow-glow-gold" : "border-line-strong text-fg-2 hover:border-gold-300/60 hover:text-fg",
            )}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.label}
          </button>
        ))}
        <button type="button" onClick={() => go(screen + 1)} aria-label="Schermata successiva" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-right" className="h-4 w-4" />
        </button>
      </div>

      {/* richieste in arrivo: pannello separato, mai sovrapposto al telefono */}
      <div aria-hidden="true" className="mt-4 rounded-2xl border border-azure-400/40 bg-surface/80 p-3 backdrop-blur-sm">
        <p className="mb-2 flex items-center justify-between text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-3">
          {d.requestsLabel}
          <span key={requests} className="grow-pill rounded-full bg-azure-400 px-2 py-0.5 text-[0.75rem] font-bold tabular-nums text-night">
            {requests}
          </span>
        </p>
        <ul className="flex flex-col gap-1.5">
          {chat.map((m, i) => (
            <li
              key={m.key}
              className={cn(
                "chat-in flex items-center gap-2.5 rounded-xl border px-3 py-2",
                i === 0 ? "border-gold-300/60 bg-gold-300/10" : "border-line bg-night/50 opacity-80",
              )}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-azure-400/30 font-display text-[0.8125rem] font-bold text-azure-300">{m.who[0]}</span>
              <span className="min-w-0 text-[0.8125rem] leading-tight text-fg">
                <strong className="block text-[0.6875rem] font-semibold text-azure-300">{m.who}</strong>
                {m.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-small text-fg-3">{d.note}</figcaption>
    </figure>
  );
}

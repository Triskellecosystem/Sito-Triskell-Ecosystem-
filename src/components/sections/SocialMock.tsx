"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

const HIGHLIGHTS: Array<{ icon: IconName; label: string }> = [
  { icon: "dumbbell", label: "Corsi" },
  { icon: "trophy", label: "Risultati" },
  { icon: "users", label: "Team" },
  { icon: "bell", label: "Offerte" },
];

const nf = new Intl.NumberFormat("it-IT");

/**
 * Mock di un profilo Instagram "fatto bene" (palestra) + schermata campagne Meta Ads, in un telefono.
 * I follower crescono in tempo reale con il contatore "+N oggi" accanto, le richieste in chat compaiono
 * in fretta e ben visibili, e ogni ~8 s il telefono passa dal profilo alla campagna ("oggi sono arrivati N contatti").
 * Il timer gira solo se il mock è visibile e senza reduced motion. I dati sono DIMOSTRATIVI (site.agencyPage.demo).
 */
export function SocialMock() {
  const d = site.agencyPage.demo;
  const rootRef = useRef<HTMLElement>(null);
  const [tick, setTick] = useState(0);
  const [manual, setManual] = useState<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([en]) => {
      window.clearInterval(timer);
      if (en?.isIntersecting) timer = window.setInterval(() => setTick((t) => t + 1), 1100);
    });
    io.observe(el);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const auto = Math.floor(tick / 7) % 2;
  const screen = manual ?? auto;
  const followers = d.followersStart + tick;
  const gain = d.todayGain + tick;
  const contacts = d.ads.todayValue + Math.floor(tick / 3);
  const n = Math.floor(tick / 2);
  const chat = [0, 1, 2].map((k) => ({ ...d.chat[(n + 5 - k + d.chat.length * 3) % d.chat.length]!, key: n - k }));

  return (
    <figure ref={rootRef} className="relative mx-auto w-[19.5rem] sm:w-[21rem]" aria-label={`${d.note}: profilo Instagram di una palestra e campagna pubblicitaria con i contatti in arrivo`}>
      <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.4),transparent_65%)]" />

      <div aria-hidden="true" className="relative aspect-[9/18.5] overflow-hidden rounded-[2.4rem] border-[6px] border-line-strong bg-night shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(42_144_195/0.35)]">
        <span className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-night-deep" />

        {/* ===== Schermata 1: profilo ===== */}
        <div className={cn("absolute inset-0 flex flex-col px-3.5 pb-3 pt-9 transition-[opacity,transform] duration-700 ease-out-expo", screen === 0 ? "opacity-100" : "pointer-events-none -translate-x-6 opacity-0")}>
          <div className="flex items-center justify-between text-fg">
            <p className="flex items-center gap-1 text-[0.8125rem] font-bold">
              {d.handle}
              <Icon name="badge" className="h-3.5 w-3.5 text-azure-300" />
            </p>
            <Icon name="plus" className="h-4 w-4" />
          </div>

          <div className="mt-2.5 flex items-center gap-3">
            {/* logo della palestra come foto profilo */}
            <span className="grid h-[3.75rem] w-[3.75rem] shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,var(--color-gold-300),var(--color-azure-400),var(--color-gold-300))] p-[2.5px]">
              <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_30%,var(--color-cobalt-500),var(--color-night-deep)_75%)]">
                <Icon name="dumbbell" className="h-6 w-6 text-gold-300" strokeWidth={1.9} />
                <span className="absolute inset-x-0 bottom-[3px] text-center font-display text-[0.375rem] font-bold uppercase tracking-[0.12em] text-fg">Palestra</span>
              </span>
            </span>
            <dl className="grid flex-1 grid-cols-3 text-center">
              <div>
                <dd className="font-display text-[0.9375rem] font-bold leading-none text-fg">{d.posts}</dd>
                <dt className="mt-1 text-[0.625rem] text-fg-3">post</dt>
              </div>
              <div className="relative">
                <dd className="font-display text-[0.9375rem] font-bold leading-none tabular-nums text-fg">{nf.format(followers)}</dd>
                <dt className="mt-1 text-[0.625rem] text-fg-3">follower</dt>
              </div>
              <div>
                <dd className="font-display text-[0.9375rem] font-bold leading-none text-fg">{d.following}</dd>
                <dt className="mt-1 text-[0.625rem] text-fg-3">seguiti</dt>
              </div>
            </dl>
          </div>

          {/* crescita giornaliera, accanto ai follower */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="min-w-0 text-[0.625rem] leading-snug text-fg-2">
              <span className="font-semibold text-fg">{d.name}</span>
              <br />
              {d.bio[0]}
              <br />
              <span className="text-azure-300">{d.bio[1]}</span>
            </p>
            <span key={gain} className="grow-pill flex shrink-0 items-center gap-1 rounded-full border border-gold-400/60 bg-gold-300/15 px-2.5 py-1 text-[0.6875rem] font-bold tabular-nums text-gold-200 shadow-glow-gold">
              <Icon name="trending" className="h-3 w-3" strokeWidth={2.4} />+{gain} {d.gainLabel}
            </span>
          </div>

          <div className="mt-2.5 flex gap-1.5">
            <span className="flex-1 rounded-lg bg-[image:var(--gradient-gold-btn)] py-1.5 text-center text-[0.6875rem] font-bold text-night">{d.follow}</span>
            <span className="flex-1 rounded-lg border border-line-strong py-1.5 text-center text-[0.6875rem] font-semibold text-fg">{d.message}</span>
          </div>

          <ul className="mt-2.5 flex justify-between px-1">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="flex flex-col items-center gap-1">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                  <Icon name={h.icon} className="h-4 w-4" />
                </span>
                <span className="text-[0.5625rem] text-fg-2">{h.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2.5 flex border-y border-line py-1.5 text-fg-3">
            <span className="flex flex-1 justify-center text-gold-300"><Icon name="layers" className="h-4 w-4" /></span>
            <span className="flex flex-1 justify-center"><Icon name="film" className="h-4 w-4" /></span>
            <span className="flex flex-1 justify-center"><Icon name="users" className="h-4 w-4" /></span>
          </div>

          {/* feed coerente: due toni (oro / azzurro) alternati, stessa grafica */}
          <ul className="mt-1.5 grid grid-cols-3 gap-[3px]">
            {d.feed.map((t, i) => (
              <li
                key={t.label}
                className={cn(
                  "relative grid aspect-square place-items-center overflow-hidden",
                  t.tone === "gold"
                    ? "bg-[linear-gradient(145deg,var(--color-gold-600),var(--color-cobalt-800)_85%)]"
                    : "bg-[linear-gradient(145deg,var(--color-azure-glow),var(--color-cobalt-800)_85%)]",
                )}
              >
                <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-30" />
                <Icon name={t.icon} className="relative h-6 w-6 text-fg/90" strokeWidth={1.6} />
                <span className="absolute inset-x-0 bottom-0 bg-night/55 px-1 py-0.5 text-center font-display text-[0.5rem] font-bold uppercase tracking-wide text-fg">{t.label}</span>
                {i === 1 && <Icon name="play" className="absolute right-1 top-1 h-2.5 w-2.5 text-fg" />}
              </li>
            ))}
          </ul>

          {/* richieste in chat: più grandi e più veloci */}
          <ul className="absolute inset-x-2.5 bottom-3 z-10 flex flex-col-reverse gap-1.5">
            {chat.map((m, i) => (
              <li
                key={m.key}
                className={cn(
                  "chat-in flex items-center gap-2.5 rounded-2xl border border-azure-300/60 bg-surface-2/95 px-3 py-2.5 shadow-[0_10px_30px_-8px_rgb(0_0_0/0.7)] backdrop-blur",
                  i === 0 ? "scale-100" : i === 1 ? "scale-[0.97] opacity-90" : "scale-[0.94] opacity-70",
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

        {/* ===== Schermata 2: campagna pubblicitaria ===== */}
        <div className={cn("absolute inset-0 flex flex-col px-4 pb-4 pt-10 transition-[opacity,transform] duration-700 ease-out-expo", screen === 1 ? "opacity-100" : "pointer-events-none translate-x-6 opacity-0")}>
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
              <span key={contacts} className="grow-pill text-gold font-display text-[3.25rem] font-bold leading-none tracking-[-0.05em] tabular-nums">{contacts}</span>
              <span className="mb-1.5 font-display text-[1.125rem] font-semibold text-fg">{d.ads.todayUnit}</span>
            </p>
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold-300 text-night">
              <Icon name="trending" className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </div>

          <div className="mt-4 flex h-28 items-end gap-1.5 rounded-xl border border-line bg-night-raised/60 px-3 pb-3 pt-4">
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

      {/* selettore schermata */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {["Profilo", "Campagna"].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setManual(i)}
            aria-pressed={screen === i}
            className={cn("rounded-full border px-3.5 py-1 text-[0.75rem] font-semibold transition-colors", screen === i ? "border-gold-300 bg-gold-300/15 text-gold-200" : "border-line-strong text-fg-3 hover:text-fg")}
          >
            {label}
          </button>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-small text-fg-3">{d.note}</figcaption>
    </figure>
  );
}

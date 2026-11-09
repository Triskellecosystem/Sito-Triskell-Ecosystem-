"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Person } from "@/content/site";
import { cn } from "@/lib/cn";
import { DigitalCursor } from "@/components/motion/DigitalCursor";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Finestre di comparsa delle 4 schede (progresso dello scroll 0-1). */
const WINDOWS: Array<[number, number]> = [
  [0.04, 0.27],
  [0.31, 0.53],
  [0.57, 0.77],
  [0.81, 9],
];

/** Punti della "camera" lungo lo scroll: zoom (s), punto inquadrato (u,v), rotazione del riquadro (fry) e foto alla scrivania. */
function camera(p: Person, t: number) {
  const keys = [
    { t: 0.0, s: 3, u: p.face.u, v: p.face.v, ry: -20, desk: 0 },
    { t: 0.2, s: 3, u: p.face.u, v: p.face.v, ry: -5, desk: 0 },
    { t: 0.3, s: 1, u: 0.5, v: 0.5, ry: 8, desk: 0 },
    { t: 0.46, s: 1, u: 0.5, v: 0.5, ry: 22, desk: 0 },
    { t: 0.57, s: 2.6, u: p.watch.u, v: p.watch.v, ry: 6, desk: 0 },
    { t: 0.72, s: 2.6, u: p.watch.u, v: p.watch.v, ry: -8, desk: 0 },
    { t: 0.8, s: 1, u: 0.5, v: 0.5, ry: 0, desk: 0 },
    { t: 0.9, s: 1, u: 0.5, v: 0.5, ry: 0, desk: 1 },
    { t: 1.0, s: 1.06, u: 0.5, v: 0.5, ry: 0, desk: 1 },
  ];
  let i = 0;
  while (i < keys.length - 2 && t > keys[i + 1]!.t) i++;
  const a = keys[i]!;
  const b = keys[i + 1]!;
  const k = smooth(a.t, b.t, t);
  const m = (x: number, y: number) => x + (y - x) * k;
  return { s: m(a.s, b.s), u: m(a.u, b.u), v: m(a.v, b.v), ry: m(a.ry, b.ry), desk: m(a.desk, b.desk) };
}

function Card({ c, tone }: { c: Person["cards"][number]; tone: Person["tone"] }) {
  return (
    <div className={cn("pf-card rounded-2xl border p-5 backdrop-blur-md", tone === "azure" ? "border-azure-300/50 bg-[rgb(1_20_38/0.78)]" : "border-ember-300/50 bg-[rgb(26_5_4/0.78)]")}>
      <p className={cn("text-[0.6875rem] font-semibold uppercase tracking-[0.18em]", tone === "azure" ? "text-azure-300" : "text-ember-300")}>{c.kicker}</p>
      <h3 className="mt-1.5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] font-bold leading-[1.12] tracking-[-0.025em] text-fg">{c.title}</h3>
      {c.stats && (
        <dl className="mt-3 flex gap-6">
          {c.stats.map((st) => (
            <div key={st.label}>
              <dd className={cn("font-display text-[clamp(1.875rem,1.5rem+1.4vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]", tone === "azure" ? "text-azure-300" : "text-ember-300")}>{st.value}</dd>
              <dt className="mt-1 text-[0.75rem] leading-tight text-fg-2">{st.label}</dt>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-2.5 text-[0.9375rem] leading-snug text-fg-2">{c.text}</p>
      {c.tags && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <li key={t} className={cn("rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold", tone === "azure" ? "border-azure-300/50 text-azure-200" : "border-ember-300/50 text-ember-200")}>
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Una persona del team a tutto schermo, legata allo scroll: la figura (foto) sta in un riquadro 3D che si inclina e "gira"
 * mentre scendi; la camera passa dal primo piano del volto, alla figura intera, ai dettagli, fino alla foto al computer.
 * Le schede con le informazioni arrivano girando attorno al riquadro (orbita), a destra e a sinistra alternate.
 * Su telefono le schede stanno in basso, una alla volta. Con reduced motion: foto fissa e schede in elenco.
 */
export function PersonStage({ person, index }: { person: Person; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const cam = useRef<HTMLDivElement>(null);
  const deskImg = useRef<HTMLDivElement>(null);
  const cardsDesk = useRef<HTMLDivElement>(null);
  const cardsMob = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const tone = person.tone;

  useEffect(() => {
    const tr = track.current;
    const fr = frame.current;
    if (!tr || !fr || !cam.current || !tilt.current || !deskImg.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let near = false;
    let cur = 0;
    let mx = 0;
    let my = 0;
    const desk = Array.from(cardsDesk.current?.children ?? []) as HTMLElement[];
    const mob = Array.from(cardsMob.current?.children ?? []) as HTMLElement[];
    const update = () => {
      raf = 0;
      const r = tr.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const t = Math.min(1, Math.max(0, -r.top / span));
      const c = camera(person, t);
      const w = fr.clientWidth;
      const h = fr.clientHeight;
      // la foto deve sempre coprire il riquadro: la traslazione resta entro [dimensione·(1−zoom), 0]
      const cl = (v: number, size: number) => Math.min(0, Math.max(size * (1 - c.s), v));
      cam.current!.style.transform = `translate3d(${cl(w * (0.5 - c.u * c.s), w).toFixed(1)}px, ${cl(h * (0.5 - c.v * c.s), h).toFixed(1)}px, 0) scale(${c.s.toFixed(3)})`;
      deskImg.current!.style.opacity = c.desk.toFixed(3);
      tilt.current!.style.setProperty("--fry", `${(c.ry + mx * 6).toFixed(2)}deg`);
      tilt.current!.style.setProperty("--frx", `${(-my * 4).toFixed(2)}deg`);
      let act = 0;
      WINDOWS.forEach(([a, b], i) => {
        const e = smooth(a - 0.1, a, t);
        const x = smooth(b, b + 0.09, t);
        const vis = e * (1 - x);
        const side = i % 2 === 0 ? 1 : -1;
        const oa = side * (80 * (1 - e) + 70 * x);
        const dk = desk[i];
        if (dk) {
          dk.style.setProperty("--oa", `${oa.toFixed(1)}deg`);
          dk.style.opacity = vis.toFixed(3);
          dk.style.pointerEvents = vis > 0.6 ? "auto" : "none";
        }
        const mb = mob[i];
        if (mb) {
          mb.style.opacity = vis.toFixed(3);
          mb.style.transform = `translate3d(0, ${((1 - e + x) * 24).toFixed(1)}px, 0)`;
        }
        if (vis > 0.5) act = i;
      });
      if (act !== cur) {
        cur = act;
        setStep(act);
      }
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = tr.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const sr = fr.getBoundingClientRect();
      my = ((e.clientY - (sr.top + sr.height / 2)) / window.innerHeight) * 2;
      onScroll();
    };
    const io = new IntersectionObserver(
      ([en]) => {
        near = !!en?.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(tr);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tr.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      tr.removeEventListener("pointermove", onMove);
    };
  }, [person]);

  const side = (i: number) => (i % 2 === 0 ? "right" : "left");

  return (
    <section aria-labelledby={`${person.id}-title`} className="pf relative isolate" data-tone={tone}>
      <div ref={track} className="pf-track">
        <div className="pf-sticky">
          {/* sfondo: alone del colore della persona + griglia + effetto mouse */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="pf-aura absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="bg-grid absolute inset-0 opacity-35 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
            <DigitalCursor />
          </div>

          <h2 id={`${person.id}-title`} className="sr-only">
            {person.name}
          </h2>

          {/* nome gigante dietro al riquadro (profondità) */}
          <p aria-hidden="true" className="pf-bigname pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none whitespace-nowrap font-display font-extrabold uppercase leading-none tracking-[-0.04em]">
            {person.short}
          </p>

          {/* indicatore: nome e passo corrente */}
          <div className="absolute left-0 top-2 z-20 flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-fg-2 sm:top-4">
            <span className="pf-dot-tone h-2 w-2 rounded-full" />
            {person.name}
            <span className="text-fg-3">
              {String(step + 1).padStart(2, "0")} / {String(person.cards.length).padStart(2, "0")}
            </span>
          </div>

          <div className="pf-persp">
            <div ref={tilt} className="pf-tilt">
              {/* anelli 3D dietro la figura */}
              <span aria-hidden="true" className="pf-ring pf-ring--a" />
              <span aria-hidden="true" className="pf-ring pf-ring--b" />

              <div ref={frame} className="pf-frame">
                <div ref={cam} className="pf-cam">
                  <Image src={person.image} alt={`${person.name}, a figura intera`} fill priority={index === 0} sizes="(min-width: 1024px) 30rem, 80vw" className="object-cover" />
                </div>
                <div ref={deskImg} className="pf-desk absolute inset-0" style={{ opacity: 0 }}>
                  <Image src={person.desk} alt={`${person.name} al computer`} fill sizes="(min-width: 1024px) 30rem, 80vw" className="object-cover" />
                </div>
                <span aria-hidden="true" className="pf-sheen pointer-events-none absolute inset-0" />
              </div>

              {/* schede che orbitano attorno al riquadro (desktop) */}
              <div ref={cardsDesk} className="pf-desktop hidden lg:block">
                {person.cards.map((c, i) => (
                  <div key={c.title} className={cn("pf-orbit", side(i) === "right" ? "pf-orbit--r" : "pf-orbit--l")} style={{ "--oa": `${i % 2 === 0 ? 80 : -80}deg`, opacity: i === 0 ? 1 : 0, "--top": `${[14, 50, 16, 46][i] ?? 20}%` } as CSSVars}>
                    <Card c={c} tone={tone} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* schede (telefono e reduced motion): in basso, una alla volta */}
          <div ref={cardsMob} className="pf-mobile lg:hidden">
            {person.cards.map((c, i) => (
              <div key={c.title} className="pf-mobile-card" style={{ opacity: i === 0 ? 1 : 0 }}>
                <Card c={c} tone={tone} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

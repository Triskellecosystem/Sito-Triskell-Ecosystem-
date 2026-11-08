"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
const pop = (d: number) => ({ "--d": d }) as CSSVars;

/**
 * Un portatile in 3D che si apre quando entra nello schermo. Sul display scorre un sito Triskell "vero"
 * (hero, numeri, servizi, lavori, prenotazione) a tappe, con un cursore che clicca. Tutto HTML/CSS:
 * il contenuto è scritto in unità del contenitore (cqw), quindi scala con il portatile.
 * Il mouse inclina il portatile. Con reduced motion: aperto e fermo sulla hero.
 */
export function LaptopShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero } = site;
  const shots = site.sitiWeb.items.slice(0, 6);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(nx * 12).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
      });
    };
    const reset = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    const host = el.closest("section") ?? el;
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", reset);
    return () => {
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} data-reveal="" style={{ "--reveal-y": "40px", "--reveal-blur": "0px" } as CSSVars} className="lp" role="img" aria-label="Un portatile che si apre e mostra un sito Triskell Ecosystem che scorre">
      <div aria-hidden="true" className="absolute -inset-x-10 bottom-0 top-1/4 rounded-full bg-[radial-gradient(ellipse,rgb(42_144_195/0.4),transparent_65%)]" />
      <div className="lp-stage" aria-hidden="true">
        <div className="lp-laptop">
          {/* coperchio: fuori (logo) e dentro (schermo) */}
          <div className="lp-lid">
            <div className="lp-back">
              <Image src="/brand/triskell-medallion.png" alt="" width={160} height={160} sizes="10rem" className="h-[24%] w-auto opacity-90 drop-shadow-[0_0_14px_rgb(247_200_92/0.5)]" />
            </div>
            <div className="lp-screen">
              <div className="lp-frame">
                <div className="lp-view" style={{ "--base": "2.4s" } as CSSVars}>
                  <div className="lp-page">
                    {/* 1 · HERO */}
                    <section className="lp-sec lp-s1">
                      <nav className="lp-nav">
                        <span className="lp-brand">
                          <Image src="/brand/triskell-medallion.png" alt="" width={64} height={64} sizes="4rem" className="lp-logo" />
                          Triskell
                        </span>
                        <span className="lp-links">
                          <i>Agency</i>
                          <i>Academy</i>
                          <i>Siti web</i>
                          <i>Chi siamo</i>
                        </span>
                        <b className="lp-pill">Prenota ora</b>
                      </nav>
                      <div className="lp-hero">
                        <div>
                          <p className="lp-over lp-pop" style={pop(0.1)}>
                            Marketing · AI · Automazioni
                          </p>
                          <h4 className="lp-h lp-pop" style={pop(0.25)}>
                            {hero.titleLines[0]}
                            <br />
                            <span className="lp-gold">{hero.titleLines[1]}</span>
                          </h4>
                          <p className="lp-sub lp-pop" style={pop(0.45)}>
                            {hero.titleAccent}
                          </p>
                          <p className="lp-btns lp-pop" style={pop(0.6)}>
                            <b className="lp-pill lp-pill--big">Scopri Agency</b>
                            <b className="lp-ghost">Academy</b>
                          </p>
                        </div>
                        <div className="lp-orb lp-pop" style={pop(0.35)}>
                          <span className="lp-ring" />
                          <span className="lp-ring lp-ring--2" />
                          <Image src="/brand/triskell-medallion.png" alt="" width={256} height={256} sizes="14rem" className="lp-medal" />
                        </div>
                      </div>
                    </section>

                    {/* 2 · NUMERI */}
                    <section className="lp-sec lp-s2">
                      <h5 className="lp-h2 lp-pop" style={pop(5.2)}>
                        Numeri <span className="lp-gold">reali</span>
                      </h5>
                      <div className="lp-stats">
                        {hero.keyNumbers.map((n, i) => (
                          <div key={n.label} className="lp-stat lp-pop" style={pop(5.4 + i * 0.25)}>
                            <strong>
                              {n.prefix}
                              {n.value}
                              {n.suffix}
                            </strong>
                            <span>{n.label}</span>
                            <em>
                              <u style={{ width: `${[78, 92, 64][i] ?? 70}%` }} />
                            </em>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 3 · SERVIZI */}
                    <section className="lp-sec lp-s3">
                      <h5 className="lp-h2 lp-pop" style={pop(10.3)}>
                        Tutto per <span className="lp-gold">crescere</span>
                      </h5>
                      <div className="lp-cards">
                        {([
                          ["rocket", "Agency", "Marketing e clienti"],
                          ["graduation", "Academy", "Formazione pratica"],
                          ["monitor", "Siti web", "Veloci e curati"],
                        ] as const).map(([icon, t, s], i) => (
                          <div key={t} className="lp-card lp-pop" style={pop(10.5 + i * 0.25)}>
                            <span className="lp-ico">
                              <Icon name={icon} strokeWidth={1.7} />
                            </span>
                            <strong>{t}</strong>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 4 · LAVORI */}
                    <section className="lp-sec lp-s4">
                      <h5 className="lp-h2 lp-pop" style={pop(15.4)}>
                        Lavori <span className="lp-gold">recenti</span>
                      </h5>
                      <div className="lp-mosaic">
                        {shots.map((s, i) => (
                          <div key={s.id} className="lp-shot lp-pop" style={pop(15.6 + i * 0.18)}>
                            <Image src={s.image} alt="" width={640} height={400} sizes="22rem" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 5 · PRENOTA */}
                    <section className="lp-sec lp-s5">
                      <h5 className="lp-h2 lp-h2--xl lp-pop" style={pop(19.4)}>
                        Sei curioso?
                        <br />
                        <span className="lp-gold">Parliamone.</span>
                      </h5>
                      <b className="lp-pill lp-pill--cta lp-pop" style={pop(19.7)}>
                        Prenota ora
                      </b>
                    </section>
                  </div>
                  <svg className="lp-cursor" viewBox="0 0 24 24" fill="none">
                    <path d="M4 2l15 9-6.5 1.6L9 19 4 2z" fill="#fff" stroke="#011a30" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                  <span className="lp-click" />
                </div>
              </div>
              <span className="lp-cam" />
            </div>
          </div>
          {/* base con tastiera e trackpad */}
          <div className="lp-base">
            <span className="lp-keys" />
            <span className="lp-pad" />
          </div>
        </div>
      </div>
    </div>
  );
}

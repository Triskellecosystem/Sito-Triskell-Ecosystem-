import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const HIGHLIGHTS: Array<{ icon: IconName; label: string }> = [
  { icon: "dumbbell", label: "Corsi" },
  { icon: "trophy", label: "Risultati" },
  { icon: "users", label: "Team" },
  { icon: "bell", label: "Offerte" },
];
const TILES: Array<{ icon: IconName; likes: string; accent?: boolean }> = [
  { icon: "dumbbell", likes: "1,2 K" },
  { icon: "play", likes: "8,4 K", accent: true },
  { icon: "heart", likes: "980" },
  { icon: "trophy", likes: "2,1 K" },
  { icon: "users", likes: "1,6 K" },
  { icon: "play", likes: "5,3 K", accent: true },
];

/**
 * "Video" di un profilo social seguito bene (palestra) con le richieste che arrivano in chat.
 * Tutto HTML/CSS: animazioni in loop con sola opacity/transform. I dati sono DIMOSTRATIVI (vedi site.agencyPage.demo).
 */
export function SocialMock() {
  const d = site.agencyPage.demo;
  return (
    <figure className="relative mx-auto w-[17.5rem] sm:w-[19.5rem]" aria-label={`${d.note}: profilo social di una palestra con richieste in arrivo`}>
      <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.4),transparent_65%)]" />

      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.4rem] border-[6px] border-line-strong bg-night shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(42_144_195/0.35)]">
        <span aria-hidden="true" className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-night-deep" />

        <div className="relative flex h-full flex-col px-4 pb-4 pt-9">
          {/* intestazione profilo */}
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,var(--color-gold-300),var(--color-azure-400),var(--color-gold-300))] p-[2.5px]">
              <span className="grid h-full w-full place-items-center rounded-full bg-night text-gold-300">
                <Icon name="dumbbell" className="h-6 w-6" strokeWidth={1.8} />
              </span>
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1 truncate text-small font-bold text-fg">
                @{d.handle}
                <Icon name="badge" className="h-3.5 w-3.5 shrink-0 text-azure-300" />
              </p>
              <p className="truncate text-[0.6875rem] text-fg-3">{d.category}</p>
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-3 text-center">
            {d.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[0.9375rem] font-bold leading-none text-fg">{s.value}</dd>
                <p aria-hidden="true" className="mt-0.5 text-[0.625rem] text-fg-3">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded-lg bg-[image:var(--gradient-gold-btn)] py-1.5 text-center text-[0.6875rem] font-bold text-night">Segui</span>
            <span className="flex-1 rounded-lg border border-line-strong py-1.5 text-center text-[0.6875rem] font-semibold text-fg">Messaggio</span>
          </div>

          <ul className="mt-3 flex justify-between">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="flex flex-col items-center gap-1">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                  <Icon name={h.icon} className="h-4 w-4" />
                </span>
                <span className="text-[0.5625rem] text-fg-2">{h.label}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-3 grid grid-cols-3 gap-1">
            {TILES.map((t, i) => (
              <li
                key={i}
                className={`relative grid aspect-square place-items-center overflow-hidden rounded-md ${
                  t.accent ? "bg-[linear-gradient(140deg,var(--color-cobalt-500),var(--color-night-glow))]" : "bg-[linear-gradient(140deg,var(--color-surface-3),var(--color-night-raised))]"
                }`}
              >
                <Icon name={t.icon} className={`h-6 w-6 ${t.accent ? "text-azure-300" : "text-fg-3"}`} strokeWidth={1.5} />
                <span className="absolute bottom-0.5 right-1 flex items-center gap-0.5 text-[0.5rem] font-semibold text-fg">
                  <Icon name="heart" className="h-2 w-2 text-gold-300" />
                  {t.likes}
                </span>
              </li>
            ))}
          </ul>

          {/* richieste che arrivano in chat */}
          <ul className="absolute inset-x-3 bottom-3 z-10 space-y-1.5">
            {d.chat.map((m, i) => (
              <li
                key={m.who}
                className="chat-pop flex items-center gap-2 rounded-2xl border border-azure-400/40 bg-surface-2/95 px-3 py-2 shadow-card backdrop-blur"
                style={{ "--i": i } as CSSVars}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-azure-400/25 text-[0.625rem] font-bold text-azure-300">{m.who[0]}</span>
                <span className="min-w-0 text-[0.6875rem] leading-tight text-fg">
                  <strong className="font-semibold">{m.who}:</strong> {m.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* chip fluttuanti */}
      <span className="float-slow absolute -left-4 top-[58%] z-20 rounded-full border border-gold-400/50 bg-night/90 px-3 py-1.5 text-[0.75rem] font-semibold text-gold-200 shadow-glow-gold sm:-left-24">
        <Icon name="trending" className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
        {d.gain}
      </span>
      <span className="float-slower absolute -right-3 top-[44%] z-20 rounded-2xl border border-azure-400/50 bg-night/90 px-3.5 py-2 text-[0.75rem] font-semibold text-fg shadow-card sm:-right-10">
        <span className="block text-[0.625rem] font-medium text-fg-3">{d.requestsLabel}</span>
        <span className="relative mt-0.5 block h-6 w-10 font-display text-[1.375rem] font-bold leading-none text-azure-300">
          {[9, 10, 11, 12].map((n, i) => (
            <span key={n} className="num-slot absolute inset-0" style={{ "--i": i } as CSSVars}>
              {n}
            </span>
          ))}
        </span>
      </span>
      <figcaption className="mt-5 text-center text-small text-fg-3">{d.note}</figcaption>
    </figure>
  );
}

import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
const MODULE_ICONS: IconName[] = ["trending", "megaphone", "cpu", "workflow"];

/**
 * Anteprima di una lezione dell'Academy: video, barra di avanzamento e moduli che si completano uno dopo l'altro.
 * Tutto HTML/CSS (solo opacity/transform). Dati DIMOSTRATIVI (vedi site.academyPage.demo).
 */
export function CoursePlayerMock() {
  const d = site.academyPage.demo;
  return (
    <figure className="relative mx-auto w-full max-w-[34rem]" aria-label={`${d.note}: anteprima di una lezione dell'Academy`}>
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.35),transparent_66%)]" />
      <div className="relative overflow-hidden rounded-card border border-azure-400/40 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night))] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          ))}
          <span className="ml-2 h-2 flex-1 rounded-full bg-line" />
        </div>

        {/* video */}
        <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,var(--color-cobalt-600),var(--color-night-glow)_55%,var(--color-surface))]">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold">
            <span aria-hidden="true" className="btn-ping absolute inset-0 rounded-full border-2 border-gold-200" />
            <Icon name="play" className="ml-1 h-7 w-7" fill="currentColor" />
          </span>
          <span className="absolute left-4 top-4 rounded-full bg-night/75 px-3 py-1 text-[0.75rem] font-semibold text-gold-200 backdrop-blur">{d.lesson}</span>
          <div className="absolute inset-x-4 bottom-4 h-1.5 overflow-hidden rounded-full bg-night/70">
            <span className="course-progress block h-full w-full origin-left rounded-full bg-gold-300" />
          </div>
        </div>

        {/* moduli */}
        <ul className="space-y-2 p-4 sm:p-5">
          {d.modules.map((m, i) => (
            <li key={m} className="flex items-center gap-3 rounded-xl border border-line bg-night/50 px-3.5 py-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-azure-400/50 text-azure-300">
                <Icon name={MODULE_ICONS[i % MODULE_ICONS.length] ?? "cpu"} className="h-4 w-4" />
              </span>
              <span className="flex-1 text-small font-medium text-fg">{m}</span>
              <span className="check-pop grid h-6 w-6 place-items-center rounded-full bg-gold-300 text-night" style={{ "--i": i } as CSSVars}>
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
          <span className="text-small text-fg-2">{d.progress}</span>
          <span className="badge-final inline-flex items-center gap-1.5 rounded-full border border-gold-400/60 bg-gold-300/10 px-3 py-1 text-[0.75rem] font-semibold text-gold-200">
            <Icon name="award" className="h-3.5 w-3.5" />
            {d.badge}
          </span>
        </div>
      </div>
      <figcaption className="mt-5 text-center text-small text-fg-3">{d.note}</figcaption>
    </figure>
  );
}

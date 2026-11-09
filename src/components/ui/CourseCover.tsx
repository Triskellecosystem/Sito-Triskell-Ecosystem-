import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Tone = "gold" | "azure" | "cobalt";

const BG: Record<Tone, string> = {
  gold: "bg-[radial-gradient(120%_120%_at_85%_0%,rgb(247_200_92/0.55),transparent_55%),linear-gradient(150deg,#1a2f55,#06162b_70%)]",
  azure: "bg-[radial-gradient(120%_120%_at_85%_0%,rgb(42_144_195/0.7),transparent_55%),linear-gradient(150deg,#0b3d6e,#04162b_70%)]",
  cobalt: "bg-[radial-gradient(120%_120%_at_85%_0%,rgb(79_120_230/0.6),transparent_55%),linear-gradient(150deg,#142a6b,#050f26_70%)]",
};
const ACCENT: Record<Tone, string> = { gold: "text-gold-200", azure: "text-azure-300", cobalt: "text-azure-300" };

/**
 * Copertina di un corso dell'Academy, disegnata in CSS con i colori del brand: fondo scuro con alone colorato, griglia,
 * grande icona in una "lastra di vetro", titolo bianco, etichetta e pillola "Gratuito". Nitida a qualsiasi dimensione.
 */
export function CourseCover({ title, tag, icon, tone, free, className }: { title: string; tag: string; icon: IconName; tone: Tone; free: string; className?: string }) {
  return (
    <div className={cn("course-cover relative aspect-video overflow-hidden", BG[tone], className)}>
      <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-35 [mask-image:linear-gradient(120deg,#000,transparent_75%)]" />
      <span aria-hidden="true" className="cc-ring absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/20" />
      <span aria-hidden="true" className="cc-ring absolute -right-2 top-2 h-28 w-28 rounded-full border border-dashed border-gold-300/50" />
      <span aria-hidden="true" className="absolute right-[7%] top-[16%] grid h-[34%] aspect-square place-items-center rounded-2xl border border-white/25 bg-white/10 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] backdrop-blur-md">
        <Icon name={icon} className={cn("h-1/2 w-1/2", ACCENT[tone])} strokeWidth={1.5} />
      </span>
      <p className="absolute left-[6%] top-[9%] flex items-center gap-2 text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-fg-2 sm:text-[0.625rem]">
        <span className="h-px w-5 bg-gold-300/70" />
        Triskell Academy
      </p>
      <p className={cn("absolute bottom-[26%] left-[6%] text-[0.625rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.6875rem]", ACCENT[tone])}>{tag}</p>
      <p className="absolute bottom-[8%] left-[6%] right-[26%] font-display text-[clamp(1rem,0.8rem+1.2vw,1.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-fg">{title}</p>
      <span className="absolute bottom-[8%] right-[6%] rounded-full bg-gold-300 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-night">{free}</span>
    </div>
  );
}

import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { Spotlight } from "./Spotlight";

/** Card-link grande per portare da una pagina a un'altra (es. Agency → Siti web). */
export function LinkCard({ href, title, text, icon }: { href: string; title: string; text: string; icon: IconName }) {
  return (
    <Spotlight className="group/lc h-full rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-400/50 hover:shadow-[0_0_44px_-14px_rgb(247_200_92/0.45)]">
      <Link href={href} className="relative z-[2] flex h-full items-center gap-5 p-6 sm:p-8">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-400/40 bg-gold-300/10 text-gold-300">
          <Icon name={icon} className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.375rem] font-bold tracking-tight text-fg">{title}</span>
          <span className="mt-1 block text-body text-fg-2">{text}</span>
        </span>
        <Icon name="arrow-right" className="h-6 w-6 shrink-0 text-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/lc:translate-x-1" />
      </Link>
    </Spotlight>
  );
}

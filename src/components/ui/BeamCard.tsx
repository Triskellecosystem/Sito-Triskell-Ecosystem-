import { cn } from "@/lib/cn";

interface BeamCardProps {
  children: React.ReactNode;
  className?: string;
  /** Bordo oro visibile solo in hover/focus (card secondarie). */
  hoverOnly?: boolean;
  /** Bordo oro statico (niente rotazione). */
  staticRing?: boolean;
  as?: "div" | "article" | "li";
}

/** Card con bordo "beam" oro rotante (conic-gradient ruotato con transform). */
export function BeamCard({ children, className, hoverOnly, staticRing, as: Tag = "div" }: BeamCardProps) {
  return (
    <Tag className={cn("beam", hoverOnly && "beam--hover-only", className)}>
      <span aria-hidden="true" className={cn("beam-ring", staticRing && "beam-ring--static")} />
      {children}
    </Tag>
  );
}

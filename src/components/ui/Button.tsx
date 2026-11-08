import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Posizione dell'icona (default: dopo il testo). */
  iconPosition?: "start" | "end";
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;
type LinkProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[14px] font-display font-semibold tracking-[-0.01em] " +
  "transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-[var(--dur-base)] ease-out-expo " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(255_247_190/0.6),0_16px_48px_-8px_rgb(255_185_27/0.65)]",
  secondary:
    "border border-line-strong bg-night/40 text-fg backdrop-blur-sm hover:-translate-y-0.5 hover:border-gold-300/70 hover:text-gold-200 hover:shadow-[0_0_32px_-8px_rgb(247_200_92/0.4)]",
  ghost: "text-fg-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.875rem]",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-[1rem]",
};

/** Bottone / link con 3 varianti. Riflesso "shine" sulla primaria, freccia che scorre. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", icon, iconPosition = "end", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover/btn:animate-[shine_0.9s_var(--ease-out-expo)] group-hover/btn:opacity-100"
        />
      )}
      {icon && iconPosition === "start" && <Icon name={icon} className="h-[1.1em] w-[1.1em] shrink-0" />}
      <span className="relative">{children}</span>
      {icon && iconPosition === "end" && (
        <Icon
          name={icon}
          className="relative h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as Omit<ButtonProps, keyof CommonProps>)}>
      {content}
    </button>
  );
}

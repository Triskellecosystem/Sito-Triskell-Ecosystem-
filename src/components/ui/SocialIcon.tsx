import type { Social } from "@/content/site";

/** Icone social tracciate a mano (Lucide non include più i loghi dei brand). */
export function SocialIcon({ id, className }: { id: Social["id"]; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    focusable: false,
  };
  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3.5" />
          <path d="M8 11v5.5M8 7.9v.1M12 16.5V11m0 2.4c0-1.5 1-2.4 2.3-2.4s1.9.9 1.9 2.4v3.1" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14.2 3.5v10.3a3.6 3.6 0 1 1-3.6-3.6" />
          <path d="M14.2 3.5c.3 2.4 1.9 4 4.3 4.3" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10.2 9.4 4.6 2.6-4.6 2.6z" fill="currentColor" />
        </svg>
      );
  }
}

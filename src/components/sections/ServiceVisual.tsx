import type { ServiceVisual as Kind } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const goldFill = "bg-[linear-gradient(180deg,var(--color-gold-300),var(--color-gold-600))]";
const glassFill = "bg-cobalt-600/50 border border-azure-400/25";

/** Micro-visual animati per ogni tile. Solo markup + CSS: nessun JS, solo transform/opacity. */
export function ServiceVisual({ kind }: { kind: Kind }) {
  switch (kind) {
    case "bars":
      return (
        <div aria-hidden="true" className="relative flex h-full items-end gap-1.5 border-b border-line-strong pb-px">
          {[26, 38, 32, 50, 44, 68, 90].map((h, i) => (
            <span
              key={i}
              className={`sv-bar flex-1 rounded-t-[4px] ${goldFill}`}
              style={{ height: `${h}%`, opacity: 0.4 + i * 0.075, "--i": i } as CSSVars}
            />
          ))}
        </div>
      );
    case "posts":
      return (
        <div aria-hidden="true" className="grid h-full grid-cols-3 grid-rows-2 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`sv-pop relative overflow-hidden rounded-lg ${i === 1 || i === 4 ? goldFill : glassFill}`}
              style={{ "--i": i } as CSSVars}
            >
              {i === 1 && <Icon name="play" className="absolute inset-0 m-auto h-3.5 w-3.5 text-night" fill="currentColor" />}
            </span>
          ))}
        </div>
      );
    case "browser":
      return (
        <div aria-hidden="true" className="relative h-full overflow-hidden rounded-lg border border-line-strong bg-night/60">
          <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            ))}
            <span className="ml-1.5 h-1.5 flex-1 rounded-full bg-line" />
          </div>
          <div className="space-y-1.5 p-2.5">
            <span className={`sv-grow block h-5 rounded ${goldFill}`} style={{ "--i": 0 } as CSSVars} />
            <span className="sv-grow block h-1.5 w-4/5 rounded bg-fg-3/40" style={{ "--i": 1 } as CSSVars} />
            <span className="sv-grow block h-1.5 w-3/5 rounded bg-fg-3/30" style={{ "--i": 2 } as CSSVars} />
          </div>
          <span className="sv-scan pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(247_200_92/0.16)_50%,transparent)]" />
        </div>
      );
    case "video":
      return (
        <div aria-hidden="true" className="flex h-full flex-col gap-2.5">
          <div className="relative grid flex-1 place-items-center overflow-hidden rounded-lg border border-line-strong bg-[linear-gradient(135deg,var(--color-cobalt-700),var(--color-night-glow))]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-300 text-night shadow-glow-gold">
              <Icon name="play" className="ml-0.5 h-4 w-4" fill="currentColor" />
            </span>
            <div className="absolute inset-x-3 bottom-2 flex h-4 items-center justify-between gap-0.5">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="sv-wave h-full w-0.5 rounded-full bg-azure-300/80" style={{ "--i": i } as CSSVars} />
              ))}
            </div>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-line">
            <span className="sv-progress block h-full w-full rounded-full bg-gold-300" />
          </div>
        </div>
      );
    case "flow":
      return (
        <div aria-hidden="true" className="flex h-full items-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center" style={{ flex: i < 2 ? "1 1 0" : "0 0 auto" }}>
              <span
                className={`sv-pop grid h-9 w-9 shrink-0 place-items-center rounded-xl ${i === 1 ? goldFill : glassFill} ${i === 1 ? "text-night" : "text-azure-300"}`}
                style={{ "--i": i } as CSSVars}
              >
                <Icon name={i === 0 ? "bot" : i === 1 ? "zap" : "check"} className="h-4 w-4" />
              </span>
              {i < 2 && (
                <span className="relative mx-1 h-px flex-1 overflow-hidden bg-line-strong">
                  <span className="sv-travel absolute inset-0 block" style={{ "--i": i } as CSSVars} />
                </span>
              )}
            </div>
          ))}
        </div>
      );
    case "funnel":
      return (
        <div aria-hidden="true" className="flex h-full flex-col items-center justify-center gap-1.5">
          {[100, 78, 56, 36].map((w, i) => (
            <span
              key={w}
              className={`sv-grow block h-[22%] rounded-md ${i === 3 ? goldFill : glassFill}`}
              style={{ width: `${w}%`, "--i": i, transformOrigin: "center" } as CSSVars}
            />
          ))}
        </div>
      );
  }
}

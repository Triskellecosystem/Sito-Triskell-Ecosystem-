import Image from "next/image";

export type CoverKind = "vibe" | "codes" | "gpt56" | "gpt55" | "cowork" | "artifacts" | "crowd" | "flows" | "skills" | "fable";

const svgProps = { viewBox: "0 0 320 180", preserveAspectRatio: "xMidYMid slice", className: "block h-full w-full", "aria-hidden": true, focusable: false } as const;

function Stars({ n = 26, seed = 1, color = "#fff" }: { n?: number; seed?: number; color?: string }) {
  // posizioni deterministiche (nessun Math.random: stessa resa su server e client)
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const x = ((i * 97 + seed * 53) % 320) + ((i * 13) % 7) * 0.3;
        const y = ((i * 61 + seed * 29) % 180) + ((i * 7) % 5) * 0.4;
        return <circle key={i} cx={x} cy={y} r={0.6 + ((i + seed) % 3) * 0.45} opacity={0.25 + ((i * 3 + seed) % 6) * 0.1} />;
      })}
    </g>
  );
}

/** Copertine illustrate per le risorse: ognuna racconta il suo tema, senza testo (il titolo sta sotto, nella scheda). */
export function ResourceCover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "vibe":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_120%_at_30%_20%,#0f3b66,#06182b_70%)]">
          <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.45),transparent_70%)]" />
          <Image src="/brand/vibe-cover.webp" alt="" width={300} height={450} sizes="8rem" className="absolute left-1/2 top-1/2 h-[88%] w-auto -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-sm shadow-[0_14px_30px_-6px_rgb(0_0_0/0.8)]" />
        </div>
      );

    case "codes":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-codes" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b3b33" /><stop offset="1" stopColor="#04130f" /></linearGradient>
            <radialGradient id="rc-codes-g" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#19c37d" stopOpacity="0.45" /><stop offset="1" stopColor="#19c37d" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-codes)" />
          <circle cx="160" cy="95" r="110" fill="url(#rc-codes-g)" />
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 38 + i * 56;
            const y = 78 + Math.abs(i - 2) * 14 - 6;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <rect width="44" height="52" rx="12" fill="#0d2a24" stroke="#19c37d" strokeOpacity={0.55 + i * 0.08} strokeWidth="1.4" />
                <g stroke="#7ff0c0" strokeWidth="2.6" strokeLinecap="round" fill="none">
                  {i === 0 && <path d="M18 38l8-24" />}
                  {i === 1 && <path d="M18 16l-3 20M28 16l-3 20M13 23h20M12 30h20" strokeWidth="2.2" />}
                  {i === 2 && <path d="M30 31a9 9 0 1 1-2-12M30 19v13" strokeWidth="2.2" />}
                  {i === 3 && <path d="M15 17l8-5 8 5v12l-8 5-8-5z" strokeWidth="2.2" />}
                  {i === 4 && <path d="M17 16l-6 10 6 10M29 16l6 10-6 10" strokeWidth="2.4" />}
                </g>
              </g>
            );
          })}
          <path d="M60 70q100-52 200 0" fill="none" stroke="#19c37d" strokeOpacity="0.35" strokeDasharray="3 6" />
          <Stars n={14} seed={2} color="#aff5d6" />
        </svg>
      );

    case "gpt56":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-56" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0a1a40" /><stop offset="1" stopColor="#020611" /></linearGradient>
            <radialGradient id="rc-sol" cx="40%" cy="40%" r="60%"><stop offset="0" stopColor="#fff3b0" /><stop offset="0.5" stopColor="#ffb938" /><stop offset="1" stopColor="#e2701a" /></radialGradient>
            <radialGradient id="rc-terra" cx="38%" cy="35%" r="70%"><stop offset="0" stopColor="#7fd3ff" /><stop offset="0.6" stopColor="#1f74c9" /><stop offset="1" stopColor="#0b2f6b" /></radialGradient>
            <radialGradient id="rc-luna" cx="38%" cy="35%" r="70%"><stop offset="0" stopColor="#f4f4f4" /><stop offset="1" stopColor="#8a93a3" /></radialGradient>
            <radialGradient id="rc-sol-g" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ffb938" stopOpacity="0.5" /><stop offset="1" stopColor="#ffb938" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-56)" />
          <Stars n={34} seed={5} />
          <circle cx="62" cy="92" r="84" fill="url(#rc-sol-g)" />
          <circle cx="62" cy="92" r="40" fill="url(#rc-sol)" />
          <ellipse cx="160" cy="98" rx="190" ry="40" fill="none" stroke="#fff" strokeOpacity="0.12" transform="rotate(-8 160 98)" />
          <circle cx="170" cy="88" r="25" fill="url(#rc-terra)" />
          <path d="M156 84q8-10 18-4t4 14q-10 6-20-2z M178 98q6 2 8 8" fill="#3fae6a" opacity="0.8" />
          <circle cx="248" cy="74" r="11" fill="url(#rc-luna)" />
          <circle cx="245" cy="71" r="2.2" fill="#6b7280" opacity="0.5" /><circle cx="251" cy="77" r="1.6" fill="#6b7280" opacity="0.5" />
        </svg>
      );

    case "gpt55":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-55" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a1850" /><stop offset="1" stopColor="#070a24" /></linearGradient>
            <radialGradient id="rc-55g" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#7c8cff" stopOpacity="0.5" /><stop offset="1" stopColor="#7c8cff" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-55)" />
          <circle cx="160" cy="90" r="90" fill="url(#rc-55g)" />
          {[[48, 40], [60, 138], [262, 34], [272, 132], [160, 24], [160, 158]].map(([x, y], i) => (
            <g key={i}>
              <line x1="160" y1="90" x2={x} y2={y} stroke="#8fa0ff" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="4 4" />
              <circle cx={x} cy={y} r="12" fill="#10143a" stroke="#8fa0ff" strokeWidth="1.5" />
              {i % 2 === 0 ? <rect x={x! - 4.5} y={y! - 4.5} width="9" height="9" rx="2" fill="#b7c2ff" /> : <circle cx={x} cy={y} r="4.5" fill="#ffd36b" />}
            </g>
          ))}
          <circle cx="160" cy="90" r="30" fill="#0e1240" stroke="#c0caff" strokeWidth="2" />
          <path d="M148 90l9 9 16-18" fill="none" stroke="#7fffd0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="160" cy="90" r="42" fill="none" stroke="#8fa0ff" strokeOpacity="0.35" strokeDasharray="2 6" />
        </svg>
      );

    case "cowork":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-cw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a1d12" /><stop offset="1" stopColor="#140a06" /></linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-cw)" />
          <path d="M28 138C80 138 80 96 128 96S176 140 214 120 250 62 292 52" fill="none" stroke="#d97757" strokeOpacity="0.5" strokeWidth="14" strokeLinecap="round" />
          <path d="M28 138C80 138 80 96 128 96S176 140 214 120 250 62 292 52" fill="none" stroke="#ffd9c4" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
          {[[28, 138, 1], [128, 96, 2], [214, 120, 3]].map(([x, y, n], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="13" fill="#d97757" stroke="#ffe3d3" strokeWidth="2" />
              <path d={n === 1 ? "M-4 0l3 3 6-7" : n === 2 ? "M-4 0l3 3 6-7" : "M-4 0l3 3 6-7"} transform={`translate(${x} ${y})`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          <g transform="translate(292 52)">
            <line x1="0" y1="0" x2="0" y2="-30" stroke="#ffe3d3" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M0 -30l22 7-22 8z" fill="#ffb38f" />
          </g>
          <rect x="40" y="26" width="64" height="34" rx="8" fill="#2a140c" stroke="#d97757" strokeOpacity="0.6" />
          <path d="M50 38h30M50 46h44M50 54h22" stroke="#e9a98e" strokeWidth="2.4" strokeLinecap="round" />
          <Stars n={10} seed={7} color="#ffd9c4" />
        </svg>
      );

    case "artifacts":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-ar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c1a2f" /><stop offset="1" stopColor="#120a16" /></linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-ar)" />
          <g transform="translate(46 34) rotate(-5 50 60)">
            <rect width="104" height="124" rx="10" fill="#f6efe6" />
            <rect x="12" y="14" width="40" height="8" rx="4" fill="#d97757" />
            <path d="M12 38h80M12 50h66M12 62h76M12 74h50" stroke="#c9b9a6" strokeWidth="5" strokeLinecap="round" />
            <rect x="12" y="88" width="80" height="24" rx="6" fill="#ffe0cf" />
            <path d="M72 100l6-6 6 6-6 6z" fill="#d97757" />
          </g>
          <g transform="translate(150 50) rotate(4 60 50)">
            <path d="M0 20a8 8 0 0 1 8-8h34l10 12h62a8 8 0 0 1 8 8v78a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill="#9b6bd3" />
            <path d="M0 36h122v62a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill="#c4a3ee" />
            <rect x="14" y="50" width="30" height="38" rx="4" fill="#fff" opacity="0.9" />
            <rect x="50" y="50" width="30" height="38" rx="4" fill="#fff" opacity="0.6" />
            <rect x="86" y="50" width="22" height="38" rx="4" fill="#fff" opacity="0.35" />
          </g>
          <path d="M146 92h16m-5-6l6 6-6 6" fill="none" stroke="#ffd9c4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "crowd":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2b6e" /><stop offset="0.55" stopColor="#e0607e" /><stop offset="1" stopColor="#ffb86b" /></linearGradient>
            <linearGradient id="rc-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d5f8a" /><stop offset="1" stopColor="#0d3552" /></linearGradient>
            <linearGradient id="rc-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3d29b" /><stop offset="1" stopColor="#c9985a" /></linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-sky)" />
          <circle cx="226" cy="78" r="26" fill="#fff1c9" />
          <circle cx="226" cy="78" r="44" fill="#ffd27a" opacity="0.28" />
          <rect y="88" width="320" height="38" fill="url(#rc-sea)" />
          <path d="M0 98q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0M0 110q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" fill="none" stroke="#9fd8f5" strokeOpacity="0.45" strokeWidth="1.4" />
          <path d="M0 126q40-14 80-4t80-2 80 4 80-4v60H0z" fill="url(#rc-sand)" />
          {/* una persona grande a sinistra, poi la folla: tanti puntini sempre più piccoli */}
          <g fill="#2a1630">
            <circle cx="46" cy="112" r="7" /><path d="M36 150q10-30 20 0z" />
          </g>
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 6 + row * 5 }, (_, i) => {
              const n = 6 + row * 5;
              const x = 92 + (i / (n - 1)) * (214 - row * 6) + (i % 2) * 2;
              const y = 131 + row * 9.5;
              const r = 3.4 - row * 0.5;
              return <circle key={`${row}-${i}`} cx={x} cy={y} r={r} fill="#2a1630" opacity={0.95 - row * 0.1} />;
            }),
          )}
        </svg>
      );

    case "flows":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-fl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#262a33" /><stop offset="1" stopColor="#0d0f14" /></linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-fl)" />
          <rect x="14" y="14" width="292" height="152" rx="10" fill="#0a0c10" stroke="#3b414d" />
          <circle cx="28" cy="27" r="3" fill="#ff5f57" /><circle cx="40" cy="27" r="3" fill="#febc2e" /><circle cx="52" cy="27" r="3" fill="#28c840" />
          <path d="M26 46l8 6-8 6M42 58h22" fill="none" stroke="#d97757" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <g stroke="#d97757" strokeWidth="1.8" fill="none" strokeLinecap="round">
            <path d="M92 100h30M122 100c22 0 22-34 44-34M122 100c22 0 22 0 44 0M122 100c22 0 22 34 44 34M166 66c20 0 20-14 40-14M166 66c20 0 20 14 40 14M166 134c20 0 20-14 40-14M166 134c20 0 20 14 40 14M206 80h28M206 120h28" />
          </g>
          {[[92, 100, 8], [166, 66, 6], [166, 100, 6], [166, 134, 6], [206, 52, 5], [206, 80, 5], [206, 120, 5], [206, 148, 5], [236, 80, 5], [236, 120, 5]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? "#d97757" : "#1a1d24"} stroke="#ffb38f" strokeWidth="1.6" />
          ))}
          <path d="M262 80l10 8-10 8M262 116l10 8-10 8" fill="none" stroke="#7fffd0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "skills":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-sk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1a3e" /><stop offset="1" stopColor="#0e0818" /></linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-sk)" />
          <rect x="18" y="26" width="140" height="128" rx="10" fill="#0b0712" stroke="#4b3a66" />
          <path d="M30 48h50M30 62h84M30 76h62M30 90h96M30 104h40M30 118h72" stroke="#8e73c8" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <path d="M30 48h18" stroke="#ffb38f" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 104h18" stroke="#7fffd0" strokeWidth="4" strokeLinecap="round" />
          {/* blocchi "skill" impilati */}
          {[[190, 94, "#d97757"], [236, 94, "#9b6bd3"], [213, 52, "#ffc85c"]].map(([x, y, c], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width="44" height="38" rx="9" fill={c as string} />
              <path d={i === 0 ? "M24 8l-8 14h8l-4 10 12-16h-9z" : i === 1 ? "M12 19l8-8 8 8-8 8z" : "M14 12l16 0M14 19h16M14 26h10"} fill={i === 0 ? "#fff" : "none"} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          <path d="M168 90h14" stroke="#e6d9ff" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 5" />
          <Stars n={10} seed={11} color="#cdb8f5" />
        </svg>
      );

    case "fable":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="rc-fa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1b1040" /><stop offset="1" stopColor="#060414" /></linearGradient>
            <radialGradient id="rc-fo" cx="38%" cy="35%" r="70%"><stop offset="0" stopColor="#fff2b8" /><stop offset="0.55" stopColor="#f2b53c" /><stop offset="1" stopColor="#a8651a" /></radialGradient>
            <radialGradient id="rc-mo" cx="38%" cy="35%" r="70%"><stop offset="0" stopColor="#e4c8ff" /><stop offset="0.55" stopColor="#8e53e0" /><stop offset="1" stopColor="#3c1a82" /></radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#rc-fa)" />
          <Stars n={40} seed={3} color="#e8dcff" />
          <circle cx="122" cy="92" r="64" fill="#f2b53c" opacity="0.14" />
          <circle cx="204" cy="92" r="64" fill="#8e53e0" opacity="0.2" />
          <circle cx="122" cy="92" r="42" fill="url(#rc-fo)" />
          <circle cx="204" cy="92" r="42" fill="url(#rc-mo)" opacity="0.92" />
          <path d="M163 56a42 42 0 0 1 0 72 42 42 0 0 1 0-72z" fill="#fff6d0" opacity="0.28" />
          <path d="M40 40l24 20 22-8M250 52l20-12 22 22M60 140l30-12 20 14M236 138l24-6 20 18" fill="none" stroke="#cdb8f5" strokeOpacity="0.5" strokeWidth="1" />
          {[[40, 40], [64, 60], [86, 52], [250, 52], [270, 40], [292, 62], [60, 140], [90, 128], [110, 142], [236, 138], [260, 132], [280, 150]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.4" fill="#fff" />
          ))}
        </svg>
      );
  }
}

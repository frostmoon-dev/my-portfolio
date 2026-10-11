import type { ProjectCover as Cover } from "@/content/types";

// Generated archive plates: one quiet motif per project, tinted, numbered.
// They stand in for screenshots until real ones are added.

function Motif({ motif, tint }: Cover) {
  switch (motif) {
    case "dialogue":
      return (
        <g fill="none" stroke={tint} strokeWidth="2">
          <rect x="70" y="80" width="170" height="64" rx="18" />
          <path d="M100 144 l-10 22 l30 -22" />
          <rect x="160" y="170" width="170" height="64" rx="18" fill={tint} fillOpacity="0.16" />
          <path d="M300 234 l10 22 l-30 -22" />
          <g fill={tint} stroke="none" opacity="0.7">
            <circle cx="120" cy="112" r="4" />
            <circle cx="140" cy="112" r="4" />
            <circle cx="160" cy="112" r="4" />
          </g>
        </g>
      );
    case "moon":
      return (
        <g>
          <circle cx="200" cy="160" r="78" fill={tint} fillOpacity="0.9" />
          <circle cx="232" cy="140" r="72" fill="#0a1b42" />
          <g stroke={tint} strokeOpacity="0.5" fill="none">
            <path d="M60 250 h280" />
            <path d="M90 268 h220" strokeDasharray="4 6" />
          </g>
        </g>
      );
    case "envelope":
      return (
        <g fill="none" stroke={tint} strokeWidth="2">
          <rect x="95" y="95" width="210" height="140" rx="6" />
          <path d="M95 101 l105 78 l105 -78" />
          <circle cx="200" cy="179" r="12" fill={tint} fillOpacity="0.5" />
          <path d="M150 260 h100" strokeDasharray="2 8" strokeLinecap="round" />
        </g>
      );
    case "ledger":
      return (
        <g stroke={tint} strokeWidth="2" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M80 ${100 + i * 34} h240`} strokeOpacity={0.35} />
          ))}
          <path d="M80 236 C 140 220, 160 150, 210 160 S 290 110, 320 96" strokeWidth="3" />
          <circle cx="320" cy="96" r="7" fill={tint} />
        </g>
      );
    case "board":
      return (
        <g>
          {[0, 1, 2].map((c) => (
            <g key={c}>
              <rect x={70 + c * 92} y="80" width="78" height="180" rx="8" fill={tint} fillOpacity="0.08" stroke={tint} strokeOpacity="0.4" />
              {Array.from({ length: 3 - c }, (_, r) => (
                <rect key={r} x={78 + c * 92} y={92 + r * 46} width="62" height="36" rx="5" fill={tint} fillOpacity={0.55 - r * 0.12} />
              ))}
            </g>
          ))}
        </g>
      );
    case "swatch":
    default:
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={80 + i * 50} y={90 + (i % 2) * 18} width="40" height="150" rx="20" fill={tint} fillOpacity={0.25 + i * 0.15} />
          ))}
        </g>
      );
  }
}

export function ProjectCover({ cover, number, label }: { cover?: Cover; number: string; label: string }) {
  const c = cover ?? { tint: "#a9dcff", motif: "swatch" as const };
  return (
    <svg viewBox="0 0 400 320" className="project-cover" role="img" aria-label={`Archive plate for ${label}`}>
      <rect width="400" height="320" fill="#0d2052" />
      <rect x="12" y="12" width="376" height="296" fill="none" stroke="#e8ddc9" strokeOpacity="0.14" />
      <Motif {...c} />
      <text x="24" y="296" fill="#e8ddc9" fillOpacity="0.55" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">
        {`NO. ${number}`}
      </text>
    </svg>
  );
}

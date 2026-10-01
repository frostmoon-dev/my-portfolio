"use client";

import { useSyncExternalStore } from "react";
import { litPath, moonPhase, type MoonPhase } from "@/lib/moon";

const HOUR_MS = 3_600_000;
const noopSubscribe = () => () => {};
const currentHour = () => Math.floor(Date.now() / HOUR_MS);

const C = 100;
const R = 58;

// A few fixed stars around the moon.
const STARS = [
  [38, 46, 1.4], [158, 34, 1.1], [170, 150, 1.5], [30, 140, 1], [64, 172, 1.2], [140, 182, 0.9], [100, 22, 0.8], [182, 92, 1],
] as const;

// Tonight's real moon phase, drawn on load. The server renders a fixed
// crescent so the layout never shifts.
export function LiveMoon({ className }: { className?: string }) {
  // The current hour is the snapshot: stable between renders, null on the server.
  const hour = useSyncExternalStore(noopSubscribe, currentHour, () => null);
  const phase: MoonPhase | null = hour === null ? null : moonPhase(new Date(hour * HOUR_MS));

  const shown = phase ?? { fraction: 0.18, illumination: 0.3, waxing: true, name: "" };

  return (
    <figure className={className ? `live-moon ${className}` : "live-moon"}>
      <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="var(--moon-glow)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--moon-glow)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="moon-lit-clip">
            <path d={litPath(shown, C, R)} />
          </clipPath>
        </defs>
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="live-moon-star" />
        ))}
        <circle cx={C} cy={C} r={R + 26} fill="url(#moon-glow)" />
        <circle cx={C} cy={C} r={R} className="live-moon-dark" />
        <path d={litPath(shown, C, R)} className="live-moon-lit" />
        <g className="live-moon-craters" clipPath="url(#moon-lit-clip)">
          <circle cx="120" cy="84" r="7" />
          <circle cx="108" cy="122" r="4.5" />
          <circle cx="132" cy="112" r="3" />
          <circle cx="84" cy="96" r="5" />
        </g>
      </svg>
      <figcaption>
        {phase ? (
          <>
            Tonight&rsquo;s moon: <strong>{phase.name.toLowerCase()}</strong>,{" "}
            {Math.round(phase.illumination * 100)}% lit
          </>
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </figcaption>
    </figure>
  );
}

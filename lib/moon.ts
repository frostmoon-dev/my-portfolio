// Moon phase from the date alone: days since a known new moon, modulo the
// synodic month. Accurate to within about a day, which is plenty for a doodle.

const SYNODIC_DAYS = 29.530588853;
// New moon of 6 January 2000, 18:14 UTC.
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const DAY_MS = 86_400_000;

export type MoonPhase = {
  /** 0–1 through the cycle: 0 new, 0.5 full. */
  fraction: number;
  /** 0–1 share of the disc that is lit. */
  illumination: number;
  waxing: boolean;
  name: string;
};

const NAMES = [
  "New moon",
  "Waxing crescent",
  "First quarter",
  "Waxing gibbous",
  "Full moon",
  "Waning gibbous",
  "Last quarter",
  "Waning crescent",
];

export function moonPhase(date: Date): MoonPhase {
  const days = (date.getTime() - KNOWN_NEW_MOON) / DAY_MS;
  const fraction = (((days / SYNODIC_DAYS) % 1) + 1) % 1;
  const illumination = (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  const name = NAMES[Math.round(fraction * 8) % 8];
  return { fraction, illumination, waxing: fraction < 0.5, name };
}

/**
 * SVG path for the lit part of a moon disc centred at (c, c) with radius r.
 * The outer edge is a half circle on the lit side; the terminator is a half
 * ellipse whose width shrinks to zero at the quarters.
 */
export function litPath({ fraction, illumination, waxing }: MoonPhase, c: number, r: number): string {
  if (illumination < 0.005) return "";
  if (illumination > 0.995) return `M ${c - r} ${c} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
  const rx = Math.abs(Math.cos(2 * Math.PI * fraction)) * r;
  const crescent = illumination < 0.5;
  const outer = waxing ? 1 : 0;
  const inner = waxing ? (crescent ? 0 : 1) : crescent ? 1 : 0;
  return `M ${c} ${c - r} A ${r} ${r} 0 0 ${outer} ${c} ${c + r} A ${rx.toFixed(2)} ${r} 0 0 ${inner} ${c} ${c - r} Z`;
}

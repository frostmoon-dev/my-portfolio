// WCAG contrast helpers, used to keep theme previews readable.

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance(hex: string) {
  const [r, g, b] = rgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function mix(a: string, b: string, t: number) {
  const [ra, ga, ba] = rgb(a);
  const [rb, gb, bb] = rgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  return `#${m(ra, rb)}${m(ga, gb)}${m(ba, bb)}`.toUpperCase();
}

/**
 * Returns `color` unchanged if it reaches `min` contrast on `bg`; otherwise
 * moves it the smallest step towards black or white (whichever is further
 * from the background) until it does.
 */
export function readable(color: string, bg: string, min = 4.5) {
  if (contrast(color, bg) >= min) return color;
  const target = luminance(bg) > 0.18 ? "#000000" : "#FFFFFF";
  for (let t = 0.05; t <= 1; t += 0.05) {
    const c = mix(color, target, t);
    if (contrast(c, bg) >= min) return c;
  }
  return target;
}

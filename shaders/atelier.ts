// GLSL for the window. Kept as strings so no loader is needed.

export const fullscreenVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/** Rain on the glass: sliding drops with short trails, plus small still beads. */
export const rainFragment = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uSize;      // glass size in world units
uniform float uDensity;  // 0–1

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

// One layer of sliding drops. Returns (mask, highlight).
vec2 slide(vec2 uv, float t, vec2 cells) {
  vec2 st = uv * cells;
  float col = floor(st.x);
  float colN = h21(vec2(col, 3.1));
  st.y += colN * 7.0;                    // stagger columns
  vec2 id = floor(st);
  float n = h21(id);
  vec2 gv = fract(st) - 0.5;
  if (n > uDensity) return vec2(0.0);
  vec2 cell = uSize / cells;
  float speed = 0.07 + n * 0.08;
  float y = 0.42 - fract(t * speed + n * 3.7) * 0.84;
  float x = (n - 0.5) * 0.55 + sin(y * 18.0 + n * 6.28) * 0.025;
  vec2 d = (gv - vec2(x, y)) * cell;
  d.y *= 0.85;
  float r = 0.016 + n * 0.012;
  float drop = smoothstep(r, r * 0.55, length(d));
  float hi = smoothstep(r * 0.4, 0.0, length(d - vec2(-r * 0.3, r * 0.3)));
  // the trail it leaves above it
  float above = step(y, gv.y);
  float trailW = smoothstep(r * 0.55, 0.0, abs(d.x));
  float fade = smoothstep(0.5, y, gv.y);
  float beads = smoothstep(0.32, 0.0, abs(fract(gv.y * 9.0) - 0.5) * 2.0 - 0.3);
  float trail = above * trailW * fade * (0.25 + beads * 0.5);
  return vec2(drop + trail * 0.55, hi);
}

float still(vec2 uv, float t) {
  vec2 cells = vec2(46.0, 34.0);
  vec2 st = uv * cells;
  vec2 id = floor(st);
  float n = h21(id + 17.0);
  vec2 gv = fract(st) - 0.5;
  vec2 c = (vec2(h21(id + 3.0), h21(id + 9.0)) - 0.5) * 0.6;
  vec2 cell = uSize / cells;
  float r = 0.004 + n * 0.006;
  float life = fract(t * 0.05 + n);
  float on = step(0.55, n) * smoothstep(0.0, 0.05, life) * smoothstep(1.0, 0.7, life);
  return smoothstep(r, r * 0.4, length((gv - c) * cell)) * on;
}

void main() {
  vec2 a = slide(vUv, uTime, vec2(11.0, 2.0));
  vec2 b = slide(vUv * 1.17 + vec2(0.31, 0.0), uTime * 0.85, vec2(17.0, 3.0));
  float s = still(vUv, uTime);
  float mask = clamp(a.x + b.x * 0.8 + s * 0.8, 0.0, 1.0);
  float hi = clamp(a.y + b.y, 0.0, 1.0);
  // condensation: a faint haze, heavier near the sill
  float haze = 0.05 + smoothstep(0.35, 0.0, vUv.y) * 0.09;
  vec3 glass = vec3(0.55, 0.68, 0.86);
  vec3 col = mix(glass * 0.6, vec3(0.86, 0.93, 1.0), hi);
  float alpha = haze + mask * 0.42 + hi * 0.35;
  gl_FragColor = vec4(col, alpha);
}
`;

/** The night sky: gradient, faint stars, a warm haze where the city glows. */
export const skyFragment = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
float h21(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
void main() {
  vec3 top = vec3(0.027, 0.07, 0.19);
  vec3 mid = vec3(0.07, 0.15, 0.33);
  vec3 low = vec3(0.24, 0.24, 0.33);
  float y = vUv.y;
  vec3 col = mix(low, mid, smoothstep(0.05, 0.4, y));
  col = mix(col, top, smoothstep(0.4, 0.95, y));
  // stars
  vec2 st = vUv * vec2(160.0, 90.0);
  vec2 id = floor(st);
  float n = h21(id);
  vec2 gv = fract(st) - 0.5;
  float tw = 0.6 + 0.4 * sin(uTime * (0.6 + n * 1.6) + n * 40.0);
  float star = step(0.985, n) * smoothstep(0.12, 0.0, length(gv)) * tw * smoothstep(0.35, 0.7, y);
  col += vec3(0.75, 0.86, 1.0) * star * 0.8;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** The moon, lit for today's real phase (see lib/moon.ts). */
export const moonFragment = /* glsl */ `
varying vec2 vUv;
uniform float uPhase; // 0 new, 0.5 full
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  float disc = smoothstep(0.5, 0.48, r);
  vec2 q = p / 0.5;
  float z = sqrt(max(0.0, 1.0 - dot(q, q)));
  float a = uPhase * 6.2831853;
  vec3 L = normalize(vec3(sin(a), 0.0, -cos(a)));
  float lit = smoothstep(-0.06, 0.08, dot(vec3(q, z), L));
  float mottled = 0.92 + 0.08 * sin(q.x * 9.0 + 1.3) * sin(q.y * 7.0 - 0.4);
  vec3 cream = vec3(0.93, 0.89, 0.8) * mottled;
  vec3 dark = vec3(0.12, 0.16, 0.27);
  vec3 col = mix(dark, cream, lit);
  float halo = smoothstep(1.0, 0.5, r) * 0.22 * (0.3 + 0.7 * (1.0 - abs(uPhase - 0.5) * 2.0));
  // the unlit side only faintly visible (earthshine), the halo follows the lit share
  float alpha = max(disc * mix(0.35, 1.0, lit), halo);
  col = mix(vec3(0.66, 0.82, 1.0), col, disc);
  gl_FragColor = vec4(col, alpha);
}
`;

import * as THREE from "three";

// A painterly finish without textures: a little directional "brush" noise in
// world space breaks up flat colour, the way a hand-painted backdrop does.

const NOISE = /* glsl */ `
varying vec3 vPaintPos;
uniform float uPaintAmount;
uniform float uPaintScale;
float pHash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float pNoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(pHash(i), pHash(i + vec3(1,0,0)), f.x), mix(pHash(i + vec3(0,1,0)), pHash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(pHash(i + vec3(0,0,1)), pHash(i + vec3(1,0,1)), f.x), mix(pHash(i + vec3(0,1,1)), pHash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
`;

type PaintOptions = {
  roughness?: number;
  metalness?: number;
  /** 0 = flat colour, 0.2 = visible brushwork. */
  amount?: number;
  scale?: number;
  emissive?: THREE.ColorRepresentation;
  emissiveIntensity?: number;
  side?: THREE.Side;
  transparent?: boolean;
  opacity?: number;
};

export function paint(color: THREE.ColorRepresentation, o: PaintOptions = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: o.roughness ?? 0.82,
    metalness: o.metalness ?? 0,
    emissive: o.emissive ?? "#000000",
    emissiveIntensity: o.emissiveIntensity ?? 1,
    side: o.side ?? THREE.FrontSide,
    transparent: o.transparent ?? false,
    opacity: o.opacity ?? 1,
  });
  const amount = o.amount ?? 0.14;
  const scale = o.scale ?? 5;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uPaintAmount = { value: amount };
    shader.uniforms.uPaintScale = { value: scale };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vPaintPos;")
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
        vec4 paintPos = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          paintPos = instanceMatrix * paintPos;
        #endif
        vPaintPos = (modelMatrix * paintPos).xyz;`,
      );
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>\n${NOISE}`).replace(
      "#include <color_fragment>",
      `#include <color_fragment>
      vec3 pp = vPaintPos * uPaintScale;
      float strokes = pNoise(pp * vec3(1.0, 5.0, 1.0)) * 0.6 + pNoise(pp * 2.7) * 0.4;
      diffuseColor.rgb *= 1.0 + (strokes - 0.5) * uPaintAmount * 2.0;`,
    );
  };
  mat.customProgramCacheKey = () => "paint";
  return mat;
}

/** A soft round shadow for the bottom of things. Cheaper than a shadow map. */
export function blobTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, "rgba(3,8,24,0.75)");
  grad.addColorStop(0.55, "rgba(3,8,24,0.3)");
  grad.addColorStop(1, "rgba(3,8,24,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A small soft dot, for dust and stars. */
export function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
export const rng = seeded;

/** The monitor: an X++ editor at midnight, drawn as abstract code. */
export function screenTexture() {
  const W = 1024;
  const H = 620;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0b1733";
  g.fillRect(0, 0, W, H);
  // title bar + tabs
  g.fillStyle = "#081127";
  g.fillRect(0, 0, W, 44);
  g.fillStyle = "#13264f";
  g.fillRect(16, 10, 210, 34);
  g.fillStyle = "#e8ddc9";
  g.globalAlpha = 0.85;
  g.font = "500 18px monospace";
  g.fillText("Atelier_Extension.xpp", 30, 33);
  g.globalAlpha = 0.4;
  g.fillText("notes.md", 252, 33);
  g.globalAlpha = 1;
  // gutter
  g.fillStyle = "#0e1c3d";
  g.fillRect(0, 44, 64, H - 44);
  const ink = ["#a9dcff", "#a3ad91", "#d7b06a", "#e8ddc9", "#7aa7e6", "#c9b8e8"];
  const r = rng(7);
  let y = 76;
  let indent = 0;
  for (let line = 1; y < H - 20; line++) {
    g.fillStyle = "#3d5687";
    g.font = "16px monospace";
    g.fillText(String(line).padStart(2, " "), 18, y + 5);
    if (r() < 0.12) {
      y += 30;
      continue;
    }
    if (r() < 0.2) indent = Math.max(0, indent + (r() < 0.5 ? -1 : 1));
    let x = 92 + indent * 34;
    const parts = 1 + Math.floor(r() * 4);
    for (let p = 0; p < parts; p++) {
      const w = 30 + r() * 140;
      g.fillStyle = ink[Math.floor(r() * ink.length)];
      g.globalAlpha = line % 9 === 0 ? 0.45 : 0.85;
      roundRect(g, x, y - 7, w, 12, 6);
      x += w + 14;
      if (x > W - 120) break;
    }
    g.globalAlpha = 1;
    y += 30;
  }
  // status bar
  g.fillStyle = "#2d6ac8";
  g.fillRect(0, H - 24, W, 24);
  g.fillStyle = "#e8ddc9";
  g.font = "14px monospace";
  g.fillText("Build succeeded · 0 errors · 00:47", 16, H - 7);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** A notebook page: ruled lines, handwriting, a small sketch. */
export function pageTexture(side: "left" | "right") {
  const W = 512;
  const H = 680;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(side === "left" ? W : 0, 0, side === "left" ? 0 : W, 0);
  grad.addColorStop(0, "#d9cdb6");
  grad.addColorStop(0.12, "#ece3d1");
  grad.addColorStop(1, "#efe7d6");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = "rgba(45,106,200,0.22)";
  g.lineWidth = 2;
  for (let y = 90; y < H - 30; y += 34) {
    g.beginPath();
    g.moveTo(30, y);
    g.lineTo(W - 30, y);
    g.stroke();
  }
  const r = rng(side === "left" ? 11 : 23);
  g.strokeStyle = "rgba(15,38,88,0.78)";
  g.lineWidth = 3;
  g.lineCap = "round";
  const lines = side === "left" ? 10 : 6;
  for (let i = 0; i < lines; i++) {
    const y = 84 + i * 34;
    let x = 50 + (i === 0 ? 0 : r() * 10);
    const end = W - 60 - r() * 160;
    g.beginPath();
    g.moveTo(x, y);
    while (x < end) {
      const step = 8 + r() * 10;
      g.quadraticCurveTo(x + step / 2, y - 4 - r() * 12, x + step, y - r() * 3);
      x += step;
      if (r() < 0.12) {
        x += 14;
        g.moveTo(x, y);
      }
    }
    g.stroke();
  }
  if (side === "right") {
    // a little moon over a rooftop, sketched
    g.strokeStyle = "rgba(15,38,88,0.7)";
    g.lineWidth = 2.5;
    g.beginPath();
    g.arc(300, 470, 54, Math.PI * 0.35, Math.PI * 1.65);
    g.quadraticCurveTo(250, 470, 300 + 54 * Math.cos(Math.PI * 0.35), 470 + 54 * Math.sin(Math.PI * 0.35));
    g.stroke();
    g.beginPath();
    g.moveTo(120, 620);
    g.lineTo(170, 560);
    g.lineTo(220, 620);
    g.moveTo(200, 590);
    g.lineTo(260, 545);
    g.lineTo(330, 620);
    g.stroke();
    g.fillStyle = "rgba(215,176,106,0.9)";
    star(g, 420, 400, 9);
    star(g, 160, 430, 6);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function star(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const rr = i % 2 ? r * 0.35 : r;
    g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  g.fill();
}

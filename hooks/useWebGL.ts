"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | undefined;

function detect() {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cached = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}

const noop = () => () => {};

/** `null` on the server and during hydration, then whether WebGL is available. */
export function useWebGL(): boolean | null {
  return useSyncExternalStore(noop, detect, () => null);
}

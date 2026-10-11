"use client";

import { useEffect } from "react";
import { useAtelier, type Quality } from "@/store/atelier";

// A first guess from the device. The scene can lower it later if frames drop.
function guess(): Quality {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (w < 700 || cores <= 4 || memory <= 3) return "low";
  if (coarse || w < 1100) return "medium";
  return "high";
}

export function useQualityGuess() {
  const setQuality = useAtelier((s) => s.setQuality);
  useEffect(() => setQuality(guess()), [setQuality]);
}

"use client";

import { useEffect, useRef } from "react";
import { useAtelier } from "@/store/atelier";

// Procedural rain: filtered noise plus a few soft drips. No audio files,
// nothing plays until the visitor turns sound on.
export function useRainSound() {
  const soundOn = useAtelier((s) => s.soundOn);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!soundOn) {
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (ctx && gain) {
        gain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        const t = setTimeout(() => ctx.suspend(), 1500);
        return () => clearTimeout(t);
      }
      return;
    }

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new AudioContext();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      gainRef.current = master;

      // Two seconds of pink-ish noise, looped.
      const len = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + w * 0.029591;
        b1 = 0.985 * b1 + w * 0.032534;
        b2 = 0.95 * b2 + w * 0.048056;
        data[i] = (b0 + b1 + b2 + w * 0.05) * 0.6;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const low = ctx.createBiquadFilter();
      low.type = "lowpass";
      low.frequency.value = 2400;
      const high = ctx.createBiquadFilter();
      high.type = "highpass";
      high.frequency.value = 280;
      noise.connect(high).connect(low).connect(master);
      noise.start();
    }

    ctx.resume();
    gainRef.current!.gain.setTargetAtTime(0.22, ctx.currentTime, 0.8);

    // Occasional drips on the sill.
    const drip = () => {
      const c = ctxRef.current;
      const master = gainRef.current;
      if (!c || !master) return;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      const f = 900 + Math.random() * 900;
      osc.frequency.setValueAtTime(f, c.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f * 0.45, c.currentTime + 0.12);
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.18);
      osc.connect(g).connect(master);
      osc.start();
      osc.stop(c.currentTime + 0.2);
    };
    const id = setInterval(() => Math.random() < 0.5 && drip(), 1100);
    return () => clearInterval(id);
  }, [soundOn]);

  useEffect(() => () => void ctxRef.current?.close(), []);
}

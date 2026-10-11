"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { atmosphere } from "@/content/atmosphere";

// A toned photograph behind a section that drifts a little slower than the
// page as you scroll, so the section feels like a pane in front of it.
// Only moves while on screen, and not at all with reduced motion.

const DRIFT = 0.18; // fraction of scroll the photo lags behind

export function Atmosphere({ section }: { section: string }) {
  const photo = atmosphere[section];
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const host = el.parentElement!;
      const r = host.getBoundingClientRect();
      // 0 when the section's centre is at the viewport's centre
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * DRIFT).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el.parentElement!);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!photo) return null;
  return (
    <div className={`atmosphere atmosphere-${photo.side}`} aria-hidden="true" style={{ opacity: photo.opacity }}>
      <div ref={layer} className="atmosphere-layer">
        <Image src={photo.src} alt="" fill sizes="100vw" style={{ objectPosition: photo.position ?? "50% 50%" }} />
      </div>
    </div>
  );
}

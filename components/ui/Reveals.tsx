"use client";

import gsap from "gsap";
import { useEffect } from "react";

// Soft, weighted reveals for anything marked `data-reveal`, as it scrolls in.
// IntersectionObserver (not cached scroll positions), so a notebook page or a
// filter changing the page height never strands a section unrevealed.
// Nothing moves with reduced motion, and everything is visible without JS.
export function Reveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending = items.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    // opacity only (not visibility), so a heading can still take focus before it fades in
    gsap.set(pending, { opacity: 0, y: 28 });
    let queue: HTMLElement[] = [];
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          queue.push(e.target as HTMLElement);
        }
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          gsap.to(queue, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, overwrite: true });
          queue = [];
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      gsap.set(pending, { clearProps: "opacity,transform" });
    };
  }, []);
  return null;
}

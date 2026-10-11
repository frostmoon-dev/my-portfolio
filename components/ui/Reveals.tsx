"use client";

import { useEffect } from "react";

// Soft, weighted reveals for anything marked `data-reveal` as it scrolls in.
// CSS does the motion; an IntersectionObserver only removes `is-pending`.
// Only elements below the fold are ever hidden, nothing moves with reduced
// motion, and everything is visible without JavaScript.
export function Reveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    pending.forEach((el) => el.classList.add("is-pending"));
    const io = new IntersectionObserver(
      (entries) => {
        // stagger the ones that arrive together, in reading order
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            io.unobserve(el);
            el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
            el.classList.remove("is-pending");
          });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      pending.forEach((el) => el.classList.remove("is-pending"));
    };
  }, []);
  return null;
}

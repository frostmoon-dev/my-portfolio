"use client";

import { useEffect } from "react";

// Drives every static list marked  data-motion="ledger-rows" data-motion-auto
// (see styles/motion/ledger-rows.css). Lists below the fold wait in "pre"
// (rows visible, rules undrawn) and have their rules drawn when scrolled to.
// Lists already on screen are left as they are. Nothing is ever hidden.
export function MotionLists() {
  useEffect(() => {
    const lists = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="ledger-rows"][data-motion-auto]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          (e.target as HTMLElement).dataset.state = "in";
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const list of lists) {
      Array.from(list.children).forEach((row, i) => (row as HTMLElement).style.setProperty("--i", String(i)));
      if (list.getBoundingClientRect().top < window.innerHeight) {
        list.dataset.state = "in";
        continue;
      }
      list.dataset.state = "pre";
      io.observe(list);
    }
    return () => {
      io.disconnect();
      // never leave a list hidden if this unmounts
      lists.forEach((l) => (l.dataset.state = "in"));
    };
  }, []);
  return null;
}

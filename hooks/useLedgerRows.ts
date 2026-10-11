"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Drives styles/motion/ledger-rows.css for one list.
//
// - Enter: if the list starts below the fold it waits in "pre" (rules not
//   drawn yet, rows visible) and rules them in when it scrolls into view. If it is already
//   on screen, it is shown as is, with no animation on load.
// - Exit: swap(next) plays "out", then renders the new rows and plays "in".
//   Rapid swaps: the latest one wins.
// The state lives on the element (data-state), so no React re-render is
// needed to run the animation, and without JS the list is just visible.

const EXIT_MS = 220;
const EXIT_MS_REDUCED = 120;

export function useLedgerRows<T>(initial: T[]) {
  const listRef = useRef<HTMLOListElement>(null);
  const [rows, setRows] = useState(initial);
  const pending = useRef<number[]>([]);

  const setState = (s: "pre" | "in" | "out") => {
    if (listRef.current) listRef.current.dataset.state = s;
  };
  const clearPending = () => {
    pending.current.forEach((id) => {
      clearTimeout(id);
      cancelAnimationFrame(id);
    });
    pending.current = [];
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.dataset.state = "in";
      return;
    }
    el.dataset.state = "pre";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.state = "in";
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => clearPending, []);

  const swap = useCallback((next: T[]) => {
    clearPending();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState("out");
    const t = window.setTimeout(() => {
      setRows(next);
      setState("pre");
      // two frames: let "pre" apply with transitions off, then enter
      const a = requestAnimationFrame(() => {
        const b = requestAnimationFrame(() => setState("in"));
        pending.current.push(b);
      });
      pending.current.push(a);
    }, reduced ? EXIT_MS_REDUCED : EXIT_MS);
    pending.current.push(t);
  }, []);

  return { listRef, rows, swap };
}

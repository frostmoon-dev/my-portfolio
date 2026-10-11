"use client";

import { useEffect, useState } from "react";
import { coffeeNotes } from "@/content/atelier";

// The note tucked under the coffee cup. A different one each visit.
export function CoffeeNote() {
  const [i, setI] = useState(0);
  useEffect(() => {
    // pick after hydration so server and client agree on the first render
    const t = setTimeout(() => setI(Math.floor(Math.random() * coffeeNotes.length)), 0);
    return () => clearTimeout(t);
  }, []);
  return (
    <figure className="coffee-note">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="coffee-note-cup">
        <path d="M18 18 h28 l-3 36 h-22 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 30 h24 l-2 23 h-20 Z" fill="currentColor" opacity="0.35" />
        <path d="M36 6 l-4 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <blockquote aria-live="polite">
        <p className="coffee-note-text">{coffeeNotes[i]}</p>
      </blockquote>
      <figcaption className="mono">
        <span>A note under the cup</span>
        <button type="button" className="text-btn" onClick={() => setI((i + 1) % coffeeNotes.length)}>
          Another note
        </button>
      </figcaption>
    </figure>
  );
}

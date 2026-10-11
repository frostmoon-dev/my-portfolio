"use client";

import { useState } from "react";
import type { NotebookPage } from "@/content/types";

// Pages turn like paper: the old page lifts away on its spine, the next one
// is already underneath. Arrow buttons, or ← → when the notebook has focus.
export function Notebook({ pages, motto }: { pages: NotebookPage[]; motto: string }) {
  const [i, setI] = useState(0);
  const [turning, setTurning] = useState<{ from: number; dir: 1 | -1 } | null>(null);

  function go(dir: 1 | -1) {
    const next = i + dir;
    if (next < 0 || next >= pages.length || turning) return;
    setTurning({ from: i, dir });
    setI(next);
    window.setTimeout(() => setTurning(null), 700);
  }

  const page = pages[i];
  const leaving = turning ? pages[turning.from] : null;

  return (
    <div
      className="notebook"
      role="region"
      aria-roledescription="notebook"
      aria-label="Notes from the notebook"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="notebook-spread">
        <div className="notebook-page notebook-left" aria-hidden="true">
          <p className="notebook-motto">{motto}</p>
          <svg viewBox="0 0 200 120" className="notebook-sketch">
            <path d="M20 100 L60 55 L90 85 L120 40 L180 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M150 20 a14 14 0 1 0 10 24 a11 11 0 0 1 -10 -24Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="40" cy="30" r="1.8" fill="currentColor" />
            <circle cx="95" cy="18" r="1.4" fill="currentColor" />
          </svg>
          <p className="mono notebook-folio">p. {String(i * 2 + 1).padStart(2, "0")}</p>
        </div>
        <div className="notebook-right">
          <article className="notebook-page notebook-current" aria-live="polite" key={page.id}>
            <h3>{page.heading}</h3>
            {page.paragraphs.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
            {page.margin && <p className="notebook-margin">{page.margin}</p>}
            <p className="mono notebook-folio">p. {String(i * 2 + 2).padStart(2, "0")}</p>
          </article>
          {leaving && (
            <article className={`notebook-page notebook-turning dir-${turning!.dir > 0 ? "next" : "prev"}`} aria-hidden="true">
              <h3>{leaving.heading}</h3>
              {leaving.paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </article>
          )}
        </div>
      </div>
      <div className="notebook-controls">
        <button type="button" className="text-btn" onClick={() => go(-1)} disabled={i === 0}>
          <span aria-hidden="true">←</span> Previous page
        </button>
        <span className="mono" aria-hidden="true">
          {i + 1} / {pages.length}
        </span>
        <button type="button" className="text-btn" onClick={() => go(1)} disabled={i === pages.length - 1}>
          Next page <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

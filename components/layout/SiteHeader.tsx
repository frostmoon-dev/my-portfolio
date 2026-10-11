"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/content/site";
import { useClock } from "@/hooks/useClock";
import { useRainSound } from "@/hooks/useRainSound";
import { useAtelier } from "@/store/atelier";

// The plain, always-there way around: the atelier's name, the menu, the
// clock, and the sound switch (off until you turn it on).

export function SiteHeader() {
  const time = useClock();
  const catAwake = useAtelier((s) => s.catAwake);
  const soundOn = useAtelier((s) => s.soundOn);
  const toggleSound = useAtelier((s) => s.toggleSound);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useRainSound();

  // A quiet backdrop once the page moves, so the menu stays readable over content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a href="#top" className="wordmark" aria-label={`${site.atelier}, back to the room`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="wordmark-moon">
            <path d="M15.5 3.5a8.5 8.5 0 1 0 5 15.3A7 7 0 0 1 15.5 3.5Z" />
          </svg>
          <span className="wordmark-text">
            The Midnight Atelier
          </span>
        </a>

        <nav aria-label="Sections" className="site-nav">
          <ul>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>
                  <span className="mono">{n.index}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-tools">
          <span className={`clock mono${catAwake ? " is-magic" : ""}`} title="Your local time. The atelier is always open.">
            <span className="sr-only">Local time </span>
            {catAwake ? "12:47" : time || "--:--"}
          </span>
          <button
            type="button"
            className="text-btn header-btn"
            aria-pressed={soundOn}
            onClick={toggleSound}
          >
            Rain<span className="sr-only"> sound</span>{" "}
            <span className="header-btn-state" aria-hidden="true">
              {soundOn ? "on" : "off"}
            </span>
          </button>
          <button
            ref={menuBtn}
            type="button"
            className="text-btn header-btn menu-btn"
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="menu-panel" ref={panel} className={`menu-panel${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Sections">
          <ol>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                  <span className="mono">{n.index}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="menu-panel-note">{site.tagline}</p>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

// Sticky header. Highlights the section in view and folds into a menu
// button on small screens.
export function SiteHeader() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = navItems.find((n) => visible.get(n.id));
        setActive(first ? first.id : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <a href="#top" className="brand">
          <span className="brand-moon" aria-hidden="true">⏾</span>
          <span>frostmoon</span>
        </a>
        <nav aria-label="Sections" className="site-nav">
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="site-nav-list"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
          <ul id="site-nav-list" className={open ? "is-open" : undefined}>
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

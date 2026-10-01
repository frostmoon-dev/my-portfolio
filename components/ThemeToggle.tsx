"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("themechange", onChange);
  };
}

// A moon that waxes to full for light mode and wanes to a crescent for dark.
// The choice is stored; until then the system setting wins.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the theme still changes, it just won't be remembered.
    }
    window.dispatchEvent(new Event("themechange"));
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <defs>
          <mask id="toggle-moon-mask">
            <rect width="24" height="24" fill="white" />
            <circle className="theme-toggle-shadow" cx="17" cy="9" r="7.5" fill="black" />
          </mask>
        </defs>
        <circle cx="12" cy="12" r="7.5" fill="currentColor" mask="url(#toggle-moon-mask)" />
      </svg>
    </button>
  );
}

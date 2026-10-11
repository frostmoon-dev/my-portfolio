"use client";

import { catNote } from "@/content/atelier";
import { site } from "@/content/site";
import { useAtelier } from "@/store/atelier";

// The closing line, and a cat asleep under the last sentence.
export function Footer() {
  const awake = useAtelier((s) => s.catAwake);
  const wakeCat = useAtelier((s) => s.wakeCat);
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p className="footer-close">Thank you for visiting my little corner of the internet.</p>
        <p className="footer-meta mono">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.handle}
          </span>
          <span>Made by hand, mostly after midnight. Next.js and React Three Fiber.</span>
        </p>
        <button type="button" className={`footer-cat${awake ? " is-awake" : ""}`} onClick={wakeCat} aria-label={catNote.label}>
          <span aria-hidden="true">{awake ? "(=^･ω･^=)" : "(=ᵕ ᴗ ᵕ=) zz"}</span>
        </button>
        <p className="footer-cat-note" aria-live="polite">
          {awake ? catNote.woken : ""}
        </p>
        <a href="#top" className="footer-back mono">
          Back to the room ↑
        </a>
      </div>
    </footer>
  );
}

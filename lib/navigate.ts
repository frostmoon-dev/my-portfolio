import type { AtelierObjectId } from "@/content/types";
import { useAtelier } from "@/store/atelier";

// One way into every section, used by the 3D objects, the 2D poster and the menu.
// From the room: the camera leans in, the screen dips to navy, the page lands
// on the section and its heading takes focus.

function land(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  const heading = el.querySelector<HTMLElement>("[data-section-heading]");
  heading?.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}

export function goToSection(id: string, from?: AtelierObjectId) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const s = useAtelier.getState();
  if (!from || !s.cinematic || reduced || s.focused) {
    land(id, !reduced);
    return;
  }
  s.setHovered(null);
  s.setFocused(from);
  window.setTimeout(() => {
    s.setDip(true);
    window.setTimeout(() => {
      land(id, false);
      s.setFocused(null);
      window.setTimeout(() => s.setDip(false), 120);
    }, 450);
  }, 1000);
}

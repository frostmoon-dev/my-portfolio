"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { arrival, atelierObjects, introduction } from "@/content/atelier";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useQualityGuess } from "@/hooks/useQuality";
import { useWebGL } from "@/hooks/useWebGL";
import { goToSection } from "@/lib/navigate";
import { useAtelier } from "@/store/atelier";
import { AtelierPoster } from "./AtelierPoster";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AtelierScene = dynamic(() => import("@/components/three/AtelierScene"), { ssr: false });

// If anything in the 3D scene throws, the painted poster stays.
class SceneBoundary extends Component<{ onFail: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("The 3D atelier could not start; showing the painted version.", error);
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const VISITED = "atelier-visited";

export function AtelierStage() {
  const stage = useRef<HTMLElement>(null);
  const enterBtn = useRef<HTMLButtonElement>(null);
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const phase = useAtelier((s) => s.phase);
  const setPhase = useAtelier((s) => s.setPhase);
  const setCinematic = useAtelier((s) => s.setCinematic);
  const dip = useAtelier((s) => s.dip);
  const focused = useAtelier((s) => s.focused);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [veil, setVeil] = useState<"shown" | "leaving" | "gone">("shown");
  useQualityGuess();

  const use3D = webgl === true && !reduced && !failed;

  useEffect(() => {
    setCinematic(use3D && ready);
  }, [use3D, ready, setCinematic]);

  // Returning visitors (same tab session) and deep links skip the arrival.
  // The inline script in layout.tsx sets data-visited, and CSS hides the veil.
  useEffect(() => {
    if (document.documentElement.dataset.visited) {
      setPhase("intro");
    } else {
      enterBtn.current?.focus({ preventScroll: true });
    }
  }, [setPhase]);

  const enter = useCallback(() => {
    try {
      sessionStorage.setItem(VISITED, "1");
    } catch {}
    setVeil("leaving");
    setPhase("intro");
    window.setTimeout(() => setVeil("gone"), 1400);
  }, [setPhase]);

  // Escape skips the arrival.
  useEffect(() => {
    if (veil !== "shown" || document.documentElement.dataset.visited) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && enter();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [veil, enter]);

  // Intro → explore, once the camera has settled and the copy is in.
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("explore"), reduced ? 0 : 2600);
    return () => clearTimeout(t);
  }, [phase, reduced, setPhase]);

  // As the page scrolls past the room, it dims and the camera drifts back.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: stage.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          useAtelier.getState().setScroll(self.progress);
          stage.current?.style.setProperty("--scroll", self.progress.toFixed(3));
        },
      });
    },
    { scope: stage },
  );

  return (
    <section
      ref={stage}
      className="stage"
      aria-label="The atelier"
      data-phase={phase} data-ready={use3D && ready ? "" : undefined}
      data-focus={focused ? "" : undefined}
      id="top"
    >
      <div className="stage-scene">
        <AtelierPoster />
        {use3D && (
          <SceneBoundary onFail={() => setFailed(true)}>
            <AtelierScene onReady={() => setReady(true)} onFail={() => setFailed(true)} />
          </SceneBoundary>
        )}
        <div className="stage-shade" aria-hidden="true" />
      </div>

      <div className="stage-copy wrap">
        <p className="stage-kicker mono">
          <span>{arrival.title}</span>
          <span aria-hidden="true"> · </span>
          <span>{arrival.tagline}</span>
        </p>
        <h1 className="stage-title">
          <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
            {introduction.hello}
          </span>
        </h1>
        {introduction.lines.map((l, i) => (
          <p key={i} className="stage-line line" style={{ "--i": i + 1 } as React.CSSProperties}>
            {l}
          </p>
        ))}
        <p className="stage-role mono line" style={{ "--i": 3 } as React.CSSProperties}>
          {site.role} · {site.location}
        </p>

        <nav className="stage-objects line" style={{ "--i": 4 } as React.CSSProperties} aria-label="Objects in the atelier">
          <p className="stage-hint">{introduction.hint}</p>
          <ul>
            {atelierObjects.map((o) => (
              <li key={o.id}>
                <a
                  href={`#${o.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(o.target, o.id);
                  }}
                  onFocus={() => phase === "explore" && useAtelier.getState().setHovered(o.id)}
                  onBlur={() => useAtelier.getState().setHovered(null)}
                  onMouseEnter={() => phase === "explore" && useAtelier.getState().setHovered(o.id)}
                  onMouseLeave={() => useAtelier.getState().setHovered(null)}
                >
                  <span className="mono">{o.label.split(" · ")[0]}</span> {o.name.replace(/^The /, "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <a href="#person" className="stage-scroll mono" aria-label="Scroll to The Person">
        <span aria-hidden="true" />
        scroll
      </a>

      {veil !== "gone" && (
        <div className={`veil${veil === "leaving" ? " is-leaving" : ""}`} role="dialog" aria-modal="false" aria-labelledby="veil-title">
          <div className="veil-inner">
            <p className="veil-time mono" aria-hidden="true">
              00:47
            </p>
            <h2 id="veil-title" className="veil-title">
              {arrival.title}
            </h2>
            <p className="veil-tagline">{arrival.tagline}</p>
            <p className="veil-line">{arrival.line}</p>
            <button ref={enterBtn} type="button" className="btn btn-primary veil-enter" onClick={enter}>
              <span className="mono" aria-hidden="true">[</span>
              {arrival.enter}
              <span className="mono" aria-hidden="true">]</span>
            </button>
            <p className="veil-skip mono">or press Esc</p>
          </div>
        </div>
      )}

      <div className={`dip${dip ? " is-on" : ""}`} aria-hidden="true" />
    </section>
  );
}

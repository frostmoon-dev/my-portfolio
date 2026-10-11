"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAtelier } from "@/store/atelier";
import { CameraRig } from "./CameraRig";
import { Desk } from "./Desk";
import { Life } from "./Life";
import { MaterialsContext, createMaterials, disposeMaterials } from "./materials";
import { Outside } from "./Outside";
import { Room } from "./Room";

// The 3D atelier. Loaded only in the browser, only when WebGL works and the
// visitor hasn't asked for reduced motion. Pauses when off screen or hidden.

function Materials({ children }: { children: React.ReactNode }) {
  const m = useMemo(() => createMaterials(), []);
  useEffect(() => () => disposeMaterials(m), [m]);
  return <MaterialsContext.Provider value={m}>{children}</MaterialsContext.Provider>;
}

function Lights() {
  return (
    <>
      <hemisphereLight args={["#3a5590", "#0a1b42", 0.9]} />
      {/* moonlight through the window: a cool rim on everything */}
      <directionalLight position={[-3, 7, -9]} color="#a9c8ff" intensity={0.9} />
      <ambientLight color="#2d4a80" intensity={0.35} />
    </>
  );
}

type Props = { onReady: () => void; onFail: () => void };

export default function AtelierScene({ onReady, onFail }: Props) {
  const quality = useAtelier((s) => s.quality);
  const setQuality = useAtelier((s) => s.setQuality);
  const wrap = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const vis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const maxDpr = quality === "high" ? 1.75 : quality === "medium" ? 1.5 : 1.25;

  return (
    <div ref={wrap} className="atelier-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, maxDpr]}
        shadows={quality === "high"}
        frameloop={onScreen && tabVisible ? "always" : "never"}
        gl={{ antialias: quality !== "low", powerPreference: "high-performance" }}
        camera={{ fov: 36, near: 0.1, far: 60, position: [4, 4, 7] }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onFail();
          });
          // give the first frames a moment to compile shaders before fading in
          requestAnimationFrame(() => requestAnimationFrame(onReady));
        }}
      >
        <color attach="background" args={["#0a1b42"]} />
        <fog attach="fog" args={["#0a1b42", 9, 34]} />
        <PerformanceMonitor
          onDecline={() => setQuality(quality === "high" ? "medium" : "low")}
          flipflops={2}
        >
          <Materials>
            <Lights />
            <Room />
            <Outside />
            <Desk />
            <Life />
            <CameraRig />
          </Materials>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

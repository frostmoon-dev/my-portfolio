"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { milestones } from "@/content/aspirations";
import { moonPhase } from "@/lib/moon";
import { fullscreenVertex, moonFragment, skyFragment } from "@/shaders/atelier";
import { Hotspot } from "./Hotspot";
import { useMaterials } from "./materials";
import { rng } from "./paint";
import { WINDOW } from "./Room";

// Everything beyond the glass: sky, today's moon, a sleeping city, and the
// unfinished constellation from "Still Becoming".

const isDev = process.env.NODE_ENV === "development";

function Sky() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh position={[-3, 5, -22]}>
      <planeGeometry args={[60, 30]} />
      <shaderMaterial ref={ref} vertexShader={fullscreenVertex} fragmentShader={skyFragment} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

function Moon() {
  const uniforms = useMemo(() => ({ uPhase: { value: moonPhase(new Date()).fraction } }), []);
  return (
    <mesh position={[-2.3, 5.5, -17]}>
      <planeGeometry args={[1.7, 1.7]} />
      <shaderMaterial vertexShader={fullscreenVertex} fragmentShader={moonFragment} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

function City() {
  const m = useMaterials();
  const buildings = useRef<THREE.InstancedMesh>(null);
  const lights = useRef<THREE.InstancedMesh>(null);
  const { blocks, windows } = useMemo(() => {
    const r = rng(1247);
    const blocks: { x: number; z: number; w: number; d: number; h: number }[] = [];
    const windows: { pos: THREE.Vector3; color: THREE.Color }[] = [];
    const warm = ["#ffd9a0", "#f3c27a", "#e8ddc9", "#a9dcff"];
    for (let i = 0; i < 46; i++) {
      const z = -9 - r() * 6;
      const w = 0.7 + r() * 1.5;
      const h = 3 + r() * (z < -12 ? 6.5 : 4.5);
      const x = -14 + r() * 19;
      const d = 0.8 + r() * 1.2;
      blocks.push({ x, z, w, d, h });
      const cols = Math.floor(w / 0.26);
      const rows = Math.floor(h / 0.34);
      for (let c = 0; c < cols; c++) {
        for (let k = 1; k < rows; k++) {
          if (r() > 0.14) continue;
          windows.push({
            pos: new THREE.Vector3(x - w / 2 + 0.18 + c * 0.26, -3 + k * 0.34, z + d / 2 + 0.01),
            color: new THREE.Color(warm[Math.floor(r() * warm.length)]).multiplyScalar(0.55 + r() * 0.45),
          });
        }
      }
    }
    return { blocks, windows };
  }, []);

  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    blocks.forEach((b, i) => {
      o.position.set(b.x, -3 + b.h / 2, b.z);
      o.scale.set(b.w, b.h, b.d);
      o.updateMatrix();
      buildings.current!.setMatrixAt(i, o.matrix);
    });
    buildings.current!.instanceMatrix.needsUpdate = true;
    windows.forEach((w, i) => {
      o.position.copy(w.pos);
      o.scale.set(1, 1, 1);
      o.updateMatrix();
      lights.current!.setMatrixAt(i, o.matrix);
      lights.current!.setColorAt(i, w.color);
    });
    lights.current!.instanceMatrix.needsUpdate = true;
    if (lights.current!.instanceColor) lights.current!.instanceColor.needsUpdate = true;
  }, [blocks, windows]);

  // Every few seconds, somebody in the city turns a light off, or on.
  const last = useRef(0);
  const dark = useMemo(() => new THREE.Color("#0b1530"), []);
  useFrame(({ clock }) => {
    if (clock.elapsedTime - last.current < 2.5 || !lights.current?.instanceColor) return;
    last.current = clock.elapsedTime;
    const i = Math.floor(Math.random() * windows.length);
    const c = new THREE.Color();
    lights.current.getColorAt(i, c);
    lights.current.setColorAt(i, c.getHex() === dark.getHex() ? windows[i].color : dark);
    lights.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={buildings} args={[undefined, undefined, blocks.length]} material={m.building}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <instancedMesh ref={lights} args={[undefined, undefined, windows.length]}>
        <planeGeometry args={[0.07, 0.1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function Constellation({ brightness }: { brightness: React.RefObject<number> }) {
  const stars = useMemo(() => milestones.filter((s) => isDev || !s.draft), []);
  const pts = useMemo(
    () => stars.map((s) => new THREE.Vector3(-7.4 + (s.x / 100) * 7, 6.4 - (s.y / 100) * 2.4, -12)),
    [stars],
  );
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const b = brightness.current ?? 0;
    group.current?.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.Material & { opacity: number };
      if (mat && "opacity" in mat && o.userData.base !== undefined) {
        mat.opacity = o.userData.base * (0.75 + 0.25 * Math.sin(clock.elapsedTime * 0.8 + o.id)) + b * 0.35;
      }
    });
  });
  return (
    <group ref={group}>
      {pts.slice(1).map((p, i) => {
        const reached = stars[i + 1].reached && stars[i].reached;
        return (
          <Line
            key={i}
            points={[pts[i], p]}
            color="#a9dcff"
            lineWidth={1.2}
            transparent
            opacity={reached ? 0.55 : 0.35}
            dashed={!reached}
            dashSize={0.12}
            gapSize={0.12}
            userData={{ base: reached ? 0.55 : 0.35 }}
          />
        );
      })}
      {pts.map((p, i) => (
        <mesh key={i} position={p} userData={{ base: stars[i].reached ? 1 : 0.6 }}>
          {stars[i].reached ? <circleGeometry args={[0.07, 16]} /> : <ringGeometry args={[0.06, 0.085, 20]} />}
          <meshBasicMaterial color={stars[i].reached ? "#e8ddc9" : "#a9dcff"} transparent toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function Outside() {
  const brightness = useRef(0);
  const { left, right, bottom, top, z } = WINDOW;
  return (
    <group>
      <Sky />
      <Moon />
      <City />
      <Hotspot
        id="window"
        labelAt={[0, 0.7, 0.4]}
        position={[(left + right) / 2, (bottom + top) / 2, z + 0.03]}
        onHover={(a) => {
          brightness.current = a;
        }}
      >
        {/* an invisible pane that catches the pointer */}
        <mesh>
          <planeGeometry args={[right - left, top - bottom]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
        </mesh>
      </Hotspot>
      <Constellation brightness={brightness} />
    </group>
  );
}

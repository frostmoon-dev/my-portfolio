"use client";

import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useAtelier } from "@/store/atelier";
import { useMaterials } from "./materials";
import { rng } from "./paint";
import { WINDOW } from "./Room";

// The things that make the room feel lived in: a plant that sways in the
// draught, a cat asleep on the sill, dust turning in the lamplight.

const SILL = WINDOW.bottom + 0.02;

function Plant() {
  const m = useMaterials();
  const ref = useRef<THREE.Group>(null);
  const leafGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.09, 0.18, 0, 0.42);
    s.quadraticCurveTo(-0.09, 0.18, 0, 0);
    const g = new THREE.ShapeGeometry(s, 8);
    // curl each leaf back a little
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setZ(i, -Math.pow(p.getY(i), 2) * 0.7);
    g.computeVertexNormals();
    return g;
  }, []);
  const leaves = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: 11 }, (_, i) => ({
      yaw: (i / 11) * Math.PI * 2 + r() * 0.4,
      tilt: 0.35 + r() * 0.5,
      scale: 0.75 + r() * 0.5,
    }));
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.z = Math.sin(t * 0.7) * 0.03;
      ref.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.02;
    }
  });
  return (
    <group position={[1.25, SILL, WINDOW.z + 0.22]}>
      <mesh position={[0, 0.11, 0]} material={m.terracotta} castShadow>
        <cylinderGeometry args={[0.13, 0.1, 0.22, 24]} />
      </mesh>
      <mesh position={[0, 0.215, 0]} material={m.woodDark}>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 24]} />
      </mesh>
      <group ref={ref} position={[0, 0.21, 0]}>
        {leaves.map((l, i) => (
          <group key={i} rotation-y={l.yaw}>
            <mesh geometry={leafGeo} material={m.leaf} rotation-x={-l.tilt} scale={l.scale} castShadow />
          </group>
        ))}
      </group>
    </group>
  );
}

function Cat() {
  const m = useMaterials();
  const awake = useAtelier((s) => s.catAwake);
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const tail = useRef<THREE.Group>(null);
  const taps = useRef<number[]>([]);
  const wake = useRef(0);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    wake.current = THREE.MathUtils.damp(wake.current, awake ? 1 : 0, 3, dt);
    const w = wake.current;
    const breathe = 1 + Math.sin(t * 1.4) * 0.025 * (1 - w);
    if (body.current) body.current.scale.set(0.3 + w * 0.06, 0.15 * breathe + w * 0.02, 0.22);
    if (head.current) {
      head.current.position.set(0.2 + w * 0.06, 0.07 + w * 0.13, 0.08);
      head.current.rotation.z = -0.5 + w * 0.6;
    }
    if (tail.current) tail.current.rotation.y = Math.sin(t * (awake ? 3 : 0.4)) * (0.08 + w * 0.25);
  });
  const tap = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const now = performance.now();
    taps.current = [...taps.current.filter((x) => now - x < 1800), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      useAtelier.getState().wakeCat();
    }
  };
  return (
    <group
      position={[-1.0, SILL + 0.12, WINDOW.z + 0.24]}
      rotation-y={0.3}
      onClick={tap}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <mesh ref={body} material={m.cat} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
      </mesh>
      <group ref={head}>
        <mesh material={m.cat} castShadow>
          <sphereGeometry args={[0.1, 20, 14]} />
        </mesh>
        <mesh position={[0.02, 0.085, 0.05]} rotation={[0.3, 0, -0.2]} material={m.catEar}>
          <coneGeometry args={[0.035, 0.07, 4]} />
        </mesh>
        <mesh position={[0.02, 0.085, -0.05]} rotation={[-0.3, 0, -0.2]} material={m.catEar}>
          <coneGeometry args={[0.035, 0.07, 4]} />
        </mesh>
      </group>
      <group ref={tail} position={[-0.05, -0.08, 0]}>
        <mesh rotation-x={Math.PI / 2} material={m.cat}>
          <torusGeometry args={[0.24, 0.035, 8, 24, Math.PI * 0.9]} />
        </mesh>
      </group>
    </group>
  );
}

function Dust() {
  const m = useMaterials();
  const ref = useRef<THREE.Points>(null);
  const { geo, seeds } = useMemo(() => {
    const r = rng(9);
    const n = 70;
    const pos = new Float32Array(n * 3);
    const seeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = -1.6 + r() * 2.2;
      pos[i * 3 + 1] = 1.6 + r() * 1.5;
      pos[i * 3 + 2] = -2.4 + r() * 1.8;
      seeds[i] = r() * 100;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo, seeds };
  }, []);
  useFrame((_, dt) => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const s = seeds[i];
      let y = p.getY(i) + dt * 0.03 * (0.4 + (s % 1));
      if (y > 3.2) y = 1.6;
      p.setY(i, y);
      p.setX(i, p.getX(i) + Math.sin(y * 3 + s) * dt * 0.02);
    }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.028}
        map={m.dot}
        color="#ffd9a6"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Life() {
  const quality = useAtelier((s) => s.quality);
  return (
    <group>
      <Plant />
      <Cat />
      {quality !== "low" && <Dust />}
    </group>
  );
}

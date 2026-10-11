"use client";

import { Html } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { atelierObjects } from "@/content/atelier";
import type { AtelierObjectId } from "@/content/types";
import { goToSection } from "@/lib/navigate";
import { useAtelier } from "@/store/atelier";

type Props = {
  id: AtelierObjectId;
  /** Where the hover label floats, relative to the group. */
  labelAt: [number, number, number];
  glow?: THREE.ColorRepresentation;
  children: React.ReactNode;
  /** Called every frame with 0–1 hover amount, for objects that move when hovered. */
  onHover?: (amount: number) => void;
  /** Extra action on click. */
  onOpen?: () => void;
  /** A small line shown under the label, e.g. the note under the coffee cup. */
  note?: string;
} & Omit<React.ComponentProps<"group">, "id">;

const objects = new Map(atelierObjects.map((o) => [o.id, o]));

// Wraps a room object so it can be hovered and opened. Materials are cloned
// per hotspot so its glow never leaks onto shared materials.
export function Hotspot({ id, labelAt, glow = "#a9dcff", children, onHover, onOpen, note, ...group }: Props) {
  const ref = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const amount = useRef(0);
  const hovered = useAtelier((s) => s.hovered === id);
  const phase = useAtelier((s) => s.phase);
  const info = objects.get(id)!;

  useLayoutEffect(() => {
    const list: THREE.MeshStandardMaterial[] = [];
    const color = new THREE.Color(glow);
    ref.current?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || mesh.userData.noGlow) return;
      const m = mesh.material as THREE.MeshStandardMaterial;
      if (!m || !("emissive" in m)) return;
      const clone = m.clone();
      // clone() does not carry shader hooks over; the painterly finish needs them.
      clone.onBeforeCompile = m.onBeforeCompile;
      clone.customProgramCacheKey = m.customProgramCacheKey;
      clone.userData.baseEmissive = clone.emissive.clone();
      clone.userData.baseIntensity = clone.emissiveIntensity;
      clone.userData.glow = color;
      mesh.material = clone;
      list.push(clone);
    });
    mats.current = list;
    return () => list.forEach((m) => m.dispose());
  }, [glow]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    // A faint, slow breath on every openable object once you can explore.
    const idle = phase === "explore" ? 0.018 + 0.018 * Math.sin(t * 1.3 + id.length) : 0;
    const target = hovered ? 1 : 0;
    amount.current = THREE.MathUtils.damp(amount.current, target, 7, dt);
    const a = amount.current;
    for (const m of mats.current) {
      const base = m.userData.baseEmissive as THREE.Color;
      const baseI = m.userData.baseIntensity as number;
      // base emissive plus a little of the glow colour; zero glow = untouched
      m.emissive.copy(m.userData.glow as THREE.Color).multiplyScalar(idle + a * 0.22).add(base);
      m.emissiveIntensity = baseI;
    }
    onHover?.(a);
  });

  // Over/out fire per child mesh, and not always in order, so count how many
  // of this object's meshes the pointer is inside instead of trusting the last event.
  const inside = useRef(0);
  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    inside.current += 1;
    if (phase !== "explore") return;
    useAtelier.getState().setHovered(id);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    inside.current = Math.max(0, inside.current - 1);
    if (inside.current > 0) return;
    if (useAtelier.getState().hovered === id) useAtelier.getState().setHovered(null);
    document.body.style.cursor = "";
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (phase !== "explore") return;
    document.body.style.cursor = "";
    onOpen?.();
    goToSection(info.target, id);
  };

  // On touch screens the label shows while the camera travels to the object;
  // the chips under the introduction are the always-visible way in.
  const showLabel = phase === "explore" && hovered;

  return (
    <group ref={ref} {...group} onPointerOver={over} onPointerOut={out} onClick={click}>
      {children}
      {showLabel && (
        <Html position={labelAt} center zIndexRange={[20, 10]} pointerEvents="none">
          <span className="room-label">
            <span className="room-label-name">{info.name}</span>
            <span className="room-label-target">{info.label}</span>
            {note && <span className="room-label-note">{note}</span>}
          </span>
        </Html>
      )}
    </group>
  );
}

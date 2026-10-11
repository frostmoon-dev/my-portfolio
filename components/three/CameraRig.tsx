"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { AtelierObjectId } from "@/content/types";
import { useAtelier } from "@/store/atelier";

// A directed camera, not a model viewer: it dollies in on arrival, leans
// with the cursor a few centimetres, travels to an object when you open it,
// and drifts back as you scroll away. No orbit controls.

type Pose = { pos: THREE.Vector3; target: THREE.Vector3; fov: number };
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

// The room now hangs in its own frame beside the words, so it is framed centred.
const WIDE: Pose = { pos: v(2.6, 3.05, 5.0), target: v(-0.3, 2.2, -1.9), fov: 40 };
const TALL: Pose = { pos: v(0.6, 3.15, 5.6), target: v(-0.05, 2.15, -1.8), fov: 52 };
const SQUARE: Pose = { pos: v(1.6, 3.2, 5.0), target: v(-0.1, 1.85, -1.8), fov: 46 };

const FOCUS: Record<AtelierObjectId, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  notebook: { pos: v(-0.15, 2.6, 0.25), target: v(-0.45, 1.5, -1.3) },
  monitor: { pos: v(0.35, 2.4, -0.45), target: v(0.2, 2.32, -2.1) },
  drawer: { pos: v(2.05, 1.75, 0.95), target: v(1.5, 1.1, -0.8) },
  bookshelf: { pos: v(-1.5, 2.35, 0.7), target: v(-3.05, 1.95, -2.6) },
  coffee: { pos: v(1.4, 2.25, 0.05), target: v(1.0, 1.75, -1.12) },
  window: { pos: v(0.15, 2.95, 0.3), target: v(-1.6, 3.7, -6) },
  letter: { pos: v(0.6, 2.35, 0.25), target: v(0.38, 1.5, -0.95) },
};

export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const aspect = useThree((s) => s.size.width / s.size.height);
  const pointer = useThree((s) => s.pointer);
  const look = useRef(new THREE.Vector3());
  const desired = useMemo(() => ({ pos: new THREE.Vector3(), target: new THREE.Vector3() }), []);
  const lean = useRef(new THREE.Vector2());
  const fovRef = useRef(36);

  const base = aspect < 0.85 ? TALL : aspect < 1.25 ? SQUARE : WIDE;

  // Start from the doorway: further back and a little higher.
  useEffect(() => {
    const phase = useAtelier.getState().phase;
    const start = phase === "arrival" ? base.pos.clone().add(v(1.4, 0.8, 3.4)) : base.pos.clone().add(v(0.5, 0.3, 1.2));
    camera.position.copy(start);
    look.current.copy(base.target);
    camera.lookAt(look.current);
    fovRef.current = base.fov;
    camera.fov = base.fov;
    camera.updateProjectionMatrix();
    // only on first mount, so a resize never restarts the entrance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, dt) => {
    const { phase, focused, scroll } = useAtelier.getState();
    const d = Math.min(dt, 0.05);
    const f = focused ? FOCUS[focused] : null;

    if (phase === "arrival") {
      // hold at the door, breathing very slightly
      desired.pos.copy(camera.position);
      desired.target.copy(base.target);
    } else if (f) {
      desired.pos.copy(f.pos);
      desired.target.copy(f.target);
    } else {
      desired.pos.copy(base.pos);
      desired.target.copy(base.target);
      // drift back and up as the room scrolls away
      desired.pos.add(v(0.2 * scroll, 0.7 * scroll, 1.4 * scroll));
      desired.target.y -= 0.25 * scroll;
      // a small lean toward the cursor
      lean.current.x = THREE.MathUtils.damp(lean.current.x, pointer.x, 2.5, d);
      lean.current.y = THREE.MathUtils.damp(lean.current.y, pointer.y, 2.5, d);
      desired.pos.x += lean.current.x * 0.28;
      desired.pos.y += lean.current.y * 0.14;
    }

    const speed = f ? 2.6 : phase === "intro" ? 1.15 : 2.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desired.pos.x, speed, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desired.pos.y, speed, d);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desired.pos.z, speed, d);
    look.current.x = THREE.MathUtils.damp(look.current.x, desired.target.x, speed, d);
    look.current.y = THREE.MathUtils.damp(look.current.y, desired.target.y, speed, d);
    look.current.z = THREE.MathUtils.damp(look.current.z, desired.target.z, speed, d);
    camera.lookAt(look.current);

    const fov = base.fov - (f ? 4 : 0);
    if (Math.abs(fovRef.current - fov) > 0.01) {
      fovRef.current = THREE.MathUtils.damp(fovRef.current, fov, 3, d);
      camera.fov = fovRef.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { fullscreenVertex, rainFragment } from "@/shaders/atelier";
import { Hotspot } from "./Hotspot";
import { useMaterials } from "./materials";
import { rng } from "./paint";
import { useAtelier } from "@/store/atelier";

// The shell of the atelier: walls, the big window with rain on it, the sill,
// a few photos, and the bookshelf in the corner.

export const WINDOW = { left: -1.7, right: 1.7, bottom: 1.75, top: 4.35, z: -3 };

function Box({
  from,
  to,
  material,
  ...rest
}: { from: [number, number, number]; to: [number, number, number]; material: THREE.Material } & React.ComponentProps<"mesh">) {
  const size: [number, number, number] = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
  const pos: [number, number, number] = [(to[0] + from[0]) / 2, (to[1] + from[1]) / 2, (to[2] + from[2]) / 2];
  return (
    <mesh position={pos} material={material} {...rest}>
      <boxGeometry args={size} />
    </mesh>
  );
}

function Walls() {
  const m = useMaterials();
  const { left, right, bottom, top, z } = WINDOW;
  const back = z - 0.12;
  const front = z + 0.12;
  return (
    <group>
      <Box from={[-7, 0, back]} to={[left, 6, front]} material={m.wall} receiveShadow />
      <Box from={[right, 0, back]} to={[7, 6, front]} material={m.wall} receiveShadow />
      <Box from={[left, 0, back]} to={[right, bottom, front]} material={m.wall} receiveShadow />
      <Box from={[left, top, back]} to={[right, 6, front]} material={m.wall} receiveShadow />
      {/* side wall, mostly in shadow */}
      <Box from={[-5.2, 0, -3]} to={[-5.0, 6, 4]} material={m.wallDark} />
      {/* skirting */}
      <Box from={[-5, 0, front]} to={[7, 0.14, front + 0.03]} material={m.frame} />
      <mesh rotation-x={-Math.PI / 2} material={m.floor} receiveShadow>
        <planeGeometry args={[14, 10]} />
      </mesh>
      {/* a rug under the desk, to warm the floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0.2, 0.006, -0.9]} material={m.navyCloth} receiveShadow>
        <circleGeometry args={[2.3, 48]} />
      </mesh>
    </group>
  );
}

function WindowFrame() {
  const m = useMaterials();
  const { left, right, bottom, top, z } = WINDOW;
  const t = 0.1;
  const cx = (left + right) / 2;
  const cy = (bottom + top) / 2;
  return (
    <group>
      <Box from={[left - t, bottom - t, z - 0.1]} to={[left, top + t, z + 0.14]} material={m.frame} castShadow />
      <Box from={[right, bottom - t, z - 0.1]} to={[right + t, top + t, z + 0.14]} material={m.frame} castShadow />
      <Box from={[left, top, z - 0.1]} to={[right, top + t, z + 0.14]} material={m.frame} />
      {/* muntins */}
      <Box from={[cx - 0.035, bottom, z - 0.04]} to={[cx + 0.035, top, z + 0.06]} material={m.frame} castShadow />
      <Box from={[left, cy + 0.15 - 0.03, z - 0.04]} to={[right, cy + 0.15 + 0.03, z + 0.06]} material={m.frame} castShadow />
      {/* sill */}
      <RoundedBox args={[right - left + 0.5, 0.08, 0.42]} radius={0.02} position={[cx, bottom - 0.02, z + 0.2]} material={m.sill} castShadow receiveShadow />
      {/* curtain, gathered on the left */}
      <Curtain />
    </group>
  );
}

function Curtain() {
  const m = useMaterials();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.75, 4.6, 24, 12);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      // folds that gather toward the top
      p.setZ(i, Math.sin(x * 26) * 0.05 * (0.6 + 0.4 * (y / 4.6 + 0.5)));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return <mesh geometry={geo} material={m.navyCloth} position={[WINDOW.left - 0.45, 3.05, WINDOW.z + 0.24]} castShadow />;
}

function Glass() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const quality = useAtelier((s) => s.quality);
  const { left, right, bottom, top, z } = WINDOW;
  const w = right - left;
  const h = top - bottom;
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: new THREE.Vector2(w, h) }, uDensity: { value: 0.75 } }),
    [w, h],
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  useLayoutEffect(() => {
    uniforms.uDensity.value = quality === "low" ? 0.5 : 0.75;
  }, [quality, uniforms]);
  return (
    <mesh position={[(left + right) / 2, (bottom + top) / 2, z + 0.01]} userData={{ noGlow: true }}>
      <planeGeometry args={[w, h]} />
      <shaderMaterial
        ref={ref}
        vertexShader={fullscreenVertex}
        fragmentShader={rainFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Photos() {
  const m = useMaterials();
  const photos: [number, number, number, THREE.Material][] = [
    [2.35, 3.75, -0.08, m.photo1],
    [2.95, 3.55, 0.06, m.photo2],
    [2.6, 3.0, 0.03, m.photo3],
  ];
  return (
    <group position={[0, 0, WINDOW.z + 0.13]}>
      {photos.map(([x, y, r, mat], i) => (
        <group key={i} position={[x, y, 0.005 * i]} rotation-z={r}>
          <mesh material={m.paper}>
            <boxGeometry args={[0.42, 0.5, 0.01]} />
          </mesh>
          <mesh position={[0, 0.04, 0.006]} material={mat}>
            <planeGeometry args={[0.34, 0.34]} />
          </mesh>
          <mesh position={[0, 0.24, 0.012]} material={m.brass}>
            <sphereGeometry args={[0.018, 10, 10]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const SHELVES = [0.5, 1.35, 2.2, 3.05];

function Bookshelf() {
  const m = useMaterials();
  const books = useRef<THREE.InstancedMesh>(null);
  const layout = useMemo(() => {
    const r = rng(42);
    const palette = ["#22355f", "#2d6ac8", "#a3ad91", "#e8ddc9", "#6f7a62", "#7b4652", "#3b4f80", "#d7b06a", "#556a9a"];
    const items: { pos: THREE.Vector3; scale: THREE.Vector3; rot: number; color: THREE.Color }[] = [];
    for (const y of SHELVES) {
      let x = -0.62;
      while (x < 0.58) {
        const w = 0.05 + r() * 0.06;
        const h = 0.48 + r() * 0.24;
        const lean = r() < 0.1 ? 0.25 : 0;
        items.push({
          pos: new THREE.Vector3(x + w / 2, y + h / 2, 0),
          scale: new THREE.Vector3(w, h, 0.32 + r() * 0.06),
          rot: lean,
          color: new THREE.Color(palette[Math.floor(r() * palette.length)]),
        });
        x += w + 0.008 + (lean ? 0.08 : 0);
        if (r() < 0.08) x += 0.18; // a gap where a book is out being read
      }
    }
    return items;
  }, []);

  useLayoutEffect(() => {
    const mesh = books.current;
    if (!mesh) return;
    const o = new THREE.Object3D();
    layout.forEach((b, i) => {
      o.position.copy(b.pos);
      o.scale.copy(b.scale);
      o.rotation.set(0, 0, b.rot);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
      mesh.setColorAt(i, b.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [layout]);

  return (
    <Hotspot id="bookshelf" labelAt={[0, 3.95, 0.3]} position={[-3.05, 0, -2.6]} rotation-y={0.18}>
      <Box from={[-0.72, 0, -0.22]} to={[-0.66, 3.7, 0.2]} material={m.woodDark} castShadow />
      <Box from={[0.66, 0, -0.22]} to={[0.72, 3.7, 0.2]} material={m.woodDark} castShadow />
      <Box from={[-0.72, 0, -0.24]} to={[0.72, 3.7, -0.2]} material={m.woodDark} />
      {[0.08, ...SHELVES.map((y) => y - 0.03), 3.66].map((y, i) => (
        <Box key={i} from={[-0.7, y - 0.04, -0.2]} to={[0.7, y + 0.03, 0.2]} material={m.wood} castShadow receiveShadow />
      ))}
      <instancedMesh ref={books} args={[undefined, undefined, layout.length]} material={m.shelfBook} castShadow>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </Hotspot>
  );
}

export function Room() {
  return (
    <group>
      <Walls />
      <WindowFrame />
      <Glass />
      <Photos />
      <Bookshelf />
    </group>
  );
}

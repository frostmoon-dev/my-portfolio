"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { coffeeNotes } from "@/content/atelier";
import { useAtelier } from "@/store/atelier";
import { Hotspot } from "./Hotspot";
import { useMaterials } from "./materials";

// The desk and everything on it. Positions are in metres; the desktop is at y = 1.5.

export const TOP = 1.5;

/** A cylinder from one point to another, for lamp arms and the like. */
function Rod({ from, to, radius, material }: { from: [number, number, number]; to: [number, number, number]; radius: number; material: THREE.Material }) {
  // cheap enough to work out on every render; the lamp rarely re-renders
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dir = b.clone().sub(a);
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  const pos = a.add(b).multiplyScalar(0.5);
  const len = dir.length();
  return (
    <mesh position={pos} quaternion={quat} material={material} castShadow>
      <cylinderGeometry args={[radius, radius, len, 10]} />
    </mesh>
  );
}

function Blob({ at, size }: { at: [number, number]; size: [number, number] }) {
  const m = useMaterials();
  return (
    <mesh rotation-x={-Math.PI / 2} position={[at[0], TOP + 0.002, at[1]]} material={m.blob} renderOrder={1} userData={{ noGlow: true }}>
      <planeGeometry args={size} />
    </mesh>
  );
}

function DeskBody() {
  const m = useMaterials();
  return (
    <group>
      <RoundedBox args={[4.1, 0.09, 1.85]} radius={0.025} position={[0, TOP - 0.045, -1.65]} material={m.wood} castShadow receiveShadow />
      {/* left leg panel */}
      <RoundedBox args={[0.09, TOP - 0.09, 1.7]} radius={0.02} position={[-1.95, (TOP - 0.09) / 2, -1.65]} material={m.woodDark} castShadow />
      {/* drawer cabinet carcass */}
      <RoundedBox args={[0.95, TOP - 0.39, 1.7]} radius={0.02} position={[1.5, 0.3 + (TOP - 0.39) / 2, -1.65]} material={m.woodDark} castShadow />
      <mesh position={[1.5, 0.15, -1.65]} material={m.woodDark}>
        <boxGeometry args={[0.85, 0.3, 1.6]} />
      </mesh>
      {/* lower drawer, closed */}
      <RoundedBox args={[0.86, 0.5, 0.05]} radius={0.015} position={[1.5, 0.62, -0.79]} material={m.woodLight} castShadow />
      <mesh position={[1.5, 0.74, -0.75]} material={m.brass} rotation-z={Math.PI / 2}>
        <capsuleGeometry args={[0.014, 0.16, 4, 8]} />
      </mesh>
    </group>
  );
}

function Drawer() {
  const m = useMaterials();
  const ref = useRef<THREE.Group>(null);
  return (
    <Hotspot
      id="drawer"
      labelAt={[0, 0.42, 0.3]}
      glow="#d7b06a"
      position={[1.5, 1.12, -0.79]}
      onHover={(a) => {
        // the drawer slides open a little when you look at it
        if (ref.current) ref.current.position.z = a * 0.22;
      }}
    >
      <group ref={ref}>
        <RoundedBox args={[0.86, 0.4, 0.05]} radius={0.015} material={m.woodLight} castShadow />
        <mesh position={[0, 0.04, 0.04]} material={m.brass} rotation-z={Math.PI / 2}>
          <capsuleGeometry args={[0.014, 0.16, 4, 8]} />
        </mesh>
        {/* what's inside: a few folders and a tiny moon pin, glimpsed when it opens */}
        <mesh position={[0, 0.05, -0.3]} material={m.woodDark}>
          <boxGeometry args={[0.8, 0.3, 0.55]} />
        </mesh>
        <mesh position={[-0.15, 0.22, -0.25]} rotation-x={-0.2} material={m.sage}>
          <boxGeometry args={[0.32, 0.02, 0.42]} />
        </mesh>
        <mesh position={[0.18, 0.23, -0.2]} rotation-x={-0.25} material={m.cream}>
          <boxGeometry args={[0.3, 0.02, 0.4]} />
        </mesh>
        <mesh position={[0.2, 0.26, -0.12]} material={m.brass}>
          <torusGeometry args={[0.04, 0.012, 8, 20, Math.PI * 1.3]} />
        </mesh>
      </group>
    </Hotspot>
  );
}

function Monitor() {
  const m = useMaterials();
  const cursor = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (cursor.current) cursor.current.visible = Math.sin(clock.elapsedTime * 5.5) > 0;
  });
  const w = 1.42;
  const h = 0.86;
  return (
    <Hotspot id="monitor" labelAt={[0, 1.42, 0.2]} position={[0.2, TOP, -2.1]}>
      {/* stand */}
      <RoundedBox args={[0.46, 0.03, 0.3]} radius={0.012} position={[0, 0.015, 0.05]} material={m.plastic} castShadow />
      <RoundedBox args={[0.07, 0.48, 0.05]} radius={0.02} position={[0, 0.26, -0.02]} material={m.plastic} castShadow />
      {/* body */}
      <RoundedBox args={[w + 0.06, h + 0.06, 0.05]} radius={0.02} position={[0, 0.82, 0.02]} material={m.plastic} castShadow />
      <mesh position={[0, 0.82, 0.047]} material={m.screen} userData={{ noGlow: true }}>
        <planeGeometry args={[w, h]} />
      </mesh>
      <mesh ref={cursor} position={[-0.2, 0.86, 0.049]} userData={{ noGlow: true }}>
        <planeGeometry args={[0.012, 0.03]} />
        <meshBasicMaterial color="#e8ddc9" toneMapped={false} />
      </mesh>
      {/* sticky notes on the bezel */}
      <mesh position={[0.66, 1.18, 0.05]} rotation-z={-0.12} material={m.cream}>
        <boxGeometry args={[0.12, 0.12, 0.004]} />
      </mesh>
      <mesh position={[0.72, 1.06, 0.052]} rotation-z={0.09} material={m.sage}>
        <boxGeometry args={[0.1, 0.1, 0.004]} />
      </mesh>
      <pointLight position={[0, 0.7, 0.9]} color="#8fc4ff" intensity={0.9} distance={3.2} decay={1.6} />
    </Hotspot>
  );
}

function Lamp() {
  const m = useMaterials();
  const quality = useAtelier((s) => s.quality);
  const phase = useAtelier((s) => s.phase);
  const spot = useRef<THREE.SpotLight>(null);
  const glow = useRef<THREE.PointLight>(null);
  const level = useRef(0);
  const target = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(-0.45, TOP, -1.3);
    return o;
  }, []);
  useFrame(({ clock }, dt) => {
    // the lamp warms up as you enter, then breathes a little
    const on = phase === "arrival" ? 0.25 : 1;
    level.current = THREE.MathUtils.damp(level.current, on, 1.4, dt);
    const flicker = 1 + Math.sin(clock.elapsedTime * 2.1) * 0.015 + Math.sin(clock.elapsedTime * 7.3) * 0.01;
    if (spot.current) spot.current.intensity = 26 * level.current * flicker;
    if (glow.current) glow.current.intensity = 2.4 * level.current * flicker;
  });
  return (
    <group position={[-1.45, TOP, -2.05]}>
      <primitive object={target} position={[1.0, 0, 0.75]} />
      <mesh position={[0, 0.03, 0]} material={m.plastic} castShadow>
        <cylinderGeometry args={[0.17, 0.2, 0.05, 32]} />
      </mesh>
      {/* arm: base → elbow → head, then a shade that looks down at the notebook */}
      <Rod from={[0, 0.04, 0]} to={[0.12, 0.98, 0]} radius={0.016} material={m.brass} />
      <mesh position={[0.12, 0.98, 0]} material={m.brass}>
        <sphereGeometry args={[0.03, 12, 12]} />
      </mesh>
      <Rod from={[0.12, 0.98, 0]} to={[0.6, 1.14, 0.06]} radius={0.014} material={m.brass} />
      <group position={[0.62, 1.12, 0.06]} rotation={[-0.35, 0, 0.5]}>
        <mesh position={[0, -0.08, 0]} material={m.lampShade} castShadow>
          <cylinderGeometry args={[0.06, 0.19, 0.24, 32, 1, true]} />
        </mesh>
        <mesh position={[0, 0.045, 0]} material={m.lampShade}>
          <sphereGeometry args={[0.06, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.12, 0]} material={m.bulb} userData={{ noGlow: true }}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
      </group>
      <spotLight
        ref={spot}
        position={[0.66, 0.98, 0.1]}
        target={target}
        color="#ffcf94"
        angle={0.95}
        penumbra={0.85}
        distance={6}
        decay={1.7}
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <pointLight ref={glow} position={[0.66, 0.96, 0.12]} color="#ffc98a" distance={5} decay={1.6} />
    </group>
  );
}

function Notebook() {
  const m = useMaterials();
  return (
    <Hotspot id="notebook" labelAt={[0, 0.32, 0]} glow="#d7b06a" position={[-0.45, TOP + 0.006, -1.22]} rotation-y={0.16}>
      <RoundedBox args={[0.98, 0.016, 0.66]} radius={0.006} material={m.sageDark} castShadow receiveShadow />
      <mesh position={[-0.235, 0.016, 0]} rotation={[-Math.PI / 2, 0.05, 0]} material={m.pageLeft} receiveShadow>
        <planeGeometry args={[0.46, 0.62]} />
      </mesh>
      <mesh position={[0.235, 0.016, 0]} rotation={[-Math.PI / 2, -0.05, 0]} material={m.pageRight} receiveShadow>
        <planeGeometry args={[0.46, 0.62]} />
      </mesh>
      {/* ribbon */}
      <mesh position={[0.02, 0.019, 0.36]} rotation-x={-Math.PI / 2} material={m.seal}>
        <planeGeometry args={[0.025, 0.16]} />
      </mesh>
      {/* pen */}
      <group position={[0.58, 0.02, 0.02]} rotation={[0, 0.4, Math.PI / 2]}>
        <mesh material={m.plastic} castShadow>
          <capsuleGeometry args={[0.014, 0.38, 4, 10]} />
        </mesh>
        <mesh position={[0, 0.17, 0]} material={m.brass}>
          <cylinderGeometry args={[0.016, 0.016, 0.05, 10]} />
        </mesh>
      </group>
    </Hotspot>
  );
}

function IcedCoffee() {
  const m = useMaterials();
  const ice = useRef<THREE.Group>(null);
  const glassGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0),
      new THREE.Vector2(0.12, 0),
      new THREE.Vector2(0.125, 0.02),
      new THREE.Vector2(0.15, 0.4),
      new THREE.Vector2(0.155, 0.42),
    ];
    return new THREE.LatheGeometry(pts, 40);
  }, []);
  const coffeeGeo = useMemo(() => {
    const pts = [new THREE.Vector2(0, 0.015), new THREE.Vector2(0.118, 0.015), new THREE.Vector2(0.141, 0.3), new THREE.Vector2(0, 0.3)];
    return new THREE.LatheGeometry(pts, 32);
  }, []);
  useFrame(({ clock }) => {
    if (ice.current) ice.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.004;
  });
  return (
    <Hotspot id="coffee" labelAt={[0, 0.78, 0]} glow="#d7b06a" position={[1.0, TOP, -1.12]} note={coffeeNotes[0]}>
      {/* coaster */}
      <mesh position={[0, 0.006, 0]} material={m.cream} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.012, 32]} />
      </mesh>
      <group position={[0, 0.012, 0]}>
        <mesh geometry={coffeeGeo} material={m.coffee} />
        <mesh position={[0, 0.2, 0]} material={m.milk}>
          <cylinderGeometry args={[0.137, 0.128, 0.08, 32]} />
        </mesh>
        <group ref={ice}>
          {[
            [0.04, 0.27, 0.02, 0.4],
            [-0.05, 0.28, -0.03, 1.1],
            [0.0, 0.3, 0.06, 2.0],
          ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[r, r * 0.7, 0.2]} material={m.ice}>
              <boxGeometry args={[0.075, 0.075, 0.075]} />
            </mesh>
          ))}
        </group>
        <mesh geometry={glassGeo} material={m.glass} renderOrder={2} userData={{ noGlow: true }} />
        {/* straw */}
        <mesh position={[0.05, 0.38, -0.02]} rotation-z={-0.22} material={m.straw}>
          <cylinderGeometry args={[0.012, 0.012, 0.62, 10]} />
        </mesh>
      </group>
    </Hotspot>
  );
}

function Letter() {
  const m = useMaterials();
  const ref = useRef<THREE.Group>(null);
  return (
    <Hotspot
      id="letter"
      labelAt={[0, 0.28, 0]}
      glow="#e8ddc9"
      position={[0.38, TOP + 0.004, -0.95]}
      rotation-y={-0.32}
      onHover={(a) => {
        if (ref.current) {
          ref.current.position.y = a * 0.05;
          ref.current.rotation.x = -a * 0.18;
        }
      }}
    >
      <group ref={ref}>
        <RoundedBox args={[0.5, 0.012, 0.32]} radius={0.004} material={m.paper} castShadow receiveShadow />
        {/* flap */}
        <mesh position={[0, 0.0075, -0.03]} rotation-x={-Math.PI / 2} material={m.cream}>
          <shapeGeometry args={[flapShape()]} />
        </mesh>
        <mesh position={[0, 0.012, 0.02]} material={m.seal} castShadow>
          <cylinderGeometry args={[0.035, 0.038, 0.012, 20]} />
        </mesh>
      </group>
    </Hotspot>
  );
}

let flap: THREE.Shape | null = null;
function flapShape() {
  if (flap) return flap;
  flap = new THREE.Shape();
  flap.moveTo(-0.245, 0.185);
  flap.lineTo(0.245, 0.185);
  flap.lineTo(0, -0.05);
  flap.closePath();
  return flap;
}

function BooksAndKeepsakes() {
  const m = useMaterials();
  return (
    <group>
      {/* a stack of books, slightly crooked */}
      <group position={[1.42, TOP, -2.12]} rotation-y={-0.3}>
        <RoundedBox args={[0.62, 0.09, 0.44]} radius={0.01} position={[0, 0.045, 0]} material={m.steel} castShadow receiveShadow />
        <RoundedBox args={[0.56, 0.07, 0.4]} radius={0.01} position={[0.02, 0.125, 0.01]} rotation-y={0.12} material={m.sage} castShadow />
        <RoundedBox args={[0.5, 0.06, 0.36]} radius={0.01} position={[-0.01, 0.19, 0]} rotation-y={-0.08} material={m.seal} castShadow />
        {/* a small brass crescent on top: a keepsake */}
        <mesh position={[0.05, 0.27, 0]} rotation={[0.2, 0.4, 0.3]} material={m.brass} castShadow>
          <torusGeometry args={[0.06, 0.017, 10, 24, Math.PI * 1.25]} />
        </mesh>
      </group>
      {/* a small cat figurine by the monitor */}
      <group position={[-0.62, TOP, -2.2]} rotation-y={0.5} scale={0.7}>
        <mesh position={[0, 0.07, 0]} material={m.cream} castShadow>
          <sphereGeometry args={[0.08, 16, 12]} />
        </mesh>
        <mesh position={[0, 0.17, 0.01]} material={m.cream} castShadow>
          <sphereGeometry args={[0.055, 16, 12]} />
        </mesh>
        <mesh position={[-0.03, 0.225, 0.01]} rotation-z={0.3} material={m.cream}>
          <coneGeometry args={[0.018, 0.04, 6]} />
        </mesh>
        <mesh position={[0.03, 0.225, 0.01]} rotation-z={-0.3} material={m.cream}>
          <coneGeometry args={[0.018, 0.04, 6]} />
        </mesh>
      </group>
      <Blob at={[0.2, -2.05]} size={[0.8, 0.5]} />
      <Blob at={[-1.45, -2.05]} size={[0.6, 0.6]} />
      <Blob at={[1.0, -1.12]} size={[0.55, 0.55]} />
      <Blob at={[1.42, -2.12]} size={[0.9, 0.7]} />
      <Blob at={[-0.45, -1.22]} size={[1.25, 0.9]} />
    </group>
  );
}

export function Desk() {
  return (
    <group>
      <DeskBody />
      <Drawer />
      <Monitor />
      <Lamp />
      <Notebook />
      <IcedCoffee />
      <Letter />
      <BooksAndKeepsakes />
    </group>
  );
}

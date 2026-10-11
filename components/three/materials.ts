import { createContext, useContext } from "react";
import * as THREE from "three";
import { blobTexture, dotTexture, paint, pageTexture, screenTexture } from "./paint";

// Every material and generated texture in the room, created once per canvas
// and shared. Objects pick from this list instead of making their own.

export function createMaterials() {
  const blob = blobTexture();
  const m = {
    wall: paint("#14275a", { amount: 0.22, scale: 1.6, roughness: 0.95 }),
    wallDark: paint("#0e1f4a", { amount: 0.2, scale: 1.6, roughness: 0.95 }),
    floor: paint("#1b2547", { amount: 0.25, scale: 2.2, roughness: 0.9 }),
    wood: paint("#4a3a35", { amount: 0.28, scale: 3.2, roughness: 0.7 }),
    woodDark: paint("#33282a", { amount: 0.24, scale: 3.2, roughness: 0.75 }),
    woodLight: paint("#6b5446", { amount: 0.22, scale: 3.2, roughness: 0.65 }),
    frame: paint("#23345f", { amount: 0.15, scale: 4 }),
    sill: paint("#c9bda6", { amount: 0.18, scale: 4, roughness: 0.7 }),
    plastic: paint("#1a2440", { amount: 0.06, roughness: 0.45 }),
    plasticLight: paint("#d8cfbe", { amount: 0.06, roughness: 0.5 }),
    metal: paint("#8d97ad", { amount: 0.05, roughness: 0.35, metalness: 0.6 }),
    brass: paint("#d7b06a", { amount: 0.06, roughness: 0.32, metalness: 0.75 }),
    lampShade: paint("#a3ad91", { amount: 0.1, roughness: 0.6, side: THREE.DoubleSide }),
    bulb: new THREE.MeshBasicMaterial({ color: "#ffe2b0", toneMapped: false }),
    cream: paint("#e8ddc9", { amount: 0.08, roughness: 0.9 }),
    paper: paint("#efe5d2", { amount: 0.06, roughness: 0.95 }),
    sage: paint("#a3ad91", { amount: 0.16, roughness: 0.7 }),
    sageDark: paint("#6f7a62", { amount: 0.18, roughness: 0.75 }),
    leaf: paint("#7f9172", { amount: 0.2, roughness: 0.7, side: THREE.DoubleSide }),
    terracotta: paint("#9a6a58", { amount: 0.2, roughness: 0.85 }),
    navyCloth: paint("#22355f", { amount: 0.2, roughness: 0.9 }),
    cat: paint("#2a2f45", { amount: 0.18, roughness: 0.95 }),
    catEar: paint("#4a4458", { amount: 0.1, roughness: 0.9 }),
    glass: new THREE.MeshStandardMaterial({
      color: "#cfe6ff",
      roughness: 0.08,
      metalness: 0.1,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    }),
    coffee: paint("#5b3a2a", { amount: 0.1, roughness: 0.3 }),
    milk: paint("#b98a64", { amount: 0.1, roughness: 0.35 }),
    ice: new THREE.MeshStandardMaterial({ color: "#e6f3ff", roughness: 0.1, transparent: true, opacity: 0.55 }),
    straw: paint("#a9dcff", { amount: 0.05, roughness: 0.5 }),
    seal: paint("#8e2f3b", { amount: 0.08, roughness: 0.4 }),
    steel: paint("#2d6ac8", { amount: 0.1, roughness: 0.6 }),
    photo1: paint("#7b93c4", { amount: 0.2, scale: 9 }),
    photo2: paint("#a3ad91", { amount: 0.2, scale: 9 }),
    photo3: paint("#d7b06a", { amount: 0.2, scale: 9 }),
    shelfBook: paint("#ffffff", { amount: 0.16, scale: 6, roughness: 0.85 }),
    building: paint("#16244a", { amount: 0.12, scale: 1, roughness: 1 }),
    screen: new THREE.MeshBasicMaterial({ map: screenTexture(), toneMapped: false }),
    pageLeft: paint("#ffffff", { amount: 0.03, roughness: 0.95 }),
    pageRight: paint("#ffffff", { amount: 0.03, roughness: 0.95 }),
    blob: new THREE.MeshBasicMaterial({ map: blob, transparent: true, depthWrite: false }),
    dot: dotTexture(),
  };
  m.pageLeft.map = pageTexture("left");
  m.pageRight.map = pageTexture("right");
  m.pageLeft.map.needsUpdate = true;
  return m;
}

export type Materials = ReturnType<typeof createMaterials>;

export function disposeMaterials(m: Materials) {
  for (const v of Object.values(m)) {
    if (v instanceof THREE.Material) {
      const withMap = v as THREE.MeshStandardMaterial;
      withMap.map?.dispose();
      v.dispose();
    } else if (v instanceof THREE.Texture) v.dispose();
  }
}

export const MaterialsContext = createContext<Materials | null>(null);

export function useMaterials() {
  const m = useContext(MaterialsContext);
  if (!m) throw new Error("useMaterials must be used inside the atelier canvas");
  return m;
}

import { create } from "zustand";
import type { AtelierObjectId } from "@/content/types";

export type Phase = "arrival" | "intro" | "explore";
export type Quality = "high" | "medium" | "low";

type AtelierState = {
  phase: Phase;
  quality: Quality;
  hovered: AtelierObjectId | null;
  /** Object the camera is travelling to. Cleared once the section is reached. */
  focused: AtelierObjectId | null;
  /** 0 at the top of the page, 1 once the room has scrolled away. */
  scroll: number;
  soundOn: boolean;
  catAwake: boolean;
  /** True while the 3D room is running (not the 2D poster). */
  cinematic: boolean;
  /** A short fade to navy between the room and a section. */
  dip: boolean;
  setPhase: (p: Phase) => void;
  setQuality: (q: Quality) => void;
  setHovered: (id: AtelierObjectId | null) => void;
  setFocused: (id: AtelierObjectId | null) => void;
  setScroll: (v: number) => void;
  toggleSound: () => void;
  wakeCat: () => void;
  setCinematic: (v: boolean) => void;
  setDip: (v: boolean) => void;
};

let catTimer: ReturnType<typeof setTimeout> | undefined;

export const useAtelier = create<AtelierState>((set) => ({
  phase: "arrival",
  quality: "high",
  hovered: null,
  focused: null,
  scroll: 0,
  soundOn: false,
  catAwake: false,
  cinematic: false,
  dip: false,
  setCinematic: (cinematic) => set({ cinematic }),
  setDip: (dip) => set({ dip }),
  setPhase: (phase) => set({ phase }),
  setQuality: (quality) => set({ quality }),
  setHovered: (hovered) => set({ hovered }),
  setFocused: (focused) => set({ focused }),
  setScroll: (scroll) => set({ scroll }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  wakeCat: () => {
    clearTimeout(catTimer);
    set({ catAwake: true });
    catTimer = setTimeout(() => set({ catAwake: false }), 8000);
  },
}));

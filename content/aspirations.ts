import type { Milestone } from "./types";

// "Still Becoming": the unfinished constellation outside the window.
// Reached stars are solid. Future stars are drawn as unfinished outlines.
// x and y are 0–100. Stars are joined in the order listed.
// `draft: true` stars only show while running `npm run dev` — use them for ideas you haven't decided on.

export const becomingLead = "I am made of everything I have yet to become.";

export const milestones: Milestone[] = [
  {
    id: "erp",
    label: "Writing X++ for a living",
    reached: true,
    x: 10,
    y: 70,
    detail: "Dynamics 365 Finance & Operations, every working day.",
  },
  {
    id: "themes",
    label: "110 editor themes",
    reached: true,
    x: 27,
    y: 44,
    detail: "Four packs, from Genshin to Wuthering Waves to two originals.",
  },
  {
    id: "worlds",
    label: "Apps for my characters",
    reached: true,
    x: 45,
    y: 58,
    detail: "Bond Garden and MoonPaper: places where stories can answer back.",
  },
  {
    id: "atelier",
    label: "This atelier",
    reached: true,
    x: 60,
    y: 30,
    detail: "A room built to see whether it could exist.",
  },
  {
    id: "next",
    label: "The next thing",
    reached: false,
    x: 77,
    y: 48,
    detail: "Not named yet. That's the point.",
  },
  {
    id: "unimagined",
    label: "Something I haven't imagined yet",
    reached: false,
    x: 90,
    y: 20,
  },
  { id: "draft-1", label: "Add an aspiration here", reached: false, x: 70, y: 78, draft: true },
];

import type { KnowledgeShelf } from "./types";

// "Acquired Knowledge". No bars, no percentages: just what lives on each shelf.

export const knowledgeShelves: KnowledgeShelf[] = [
  {
    id: "core",
    mark: "A",
    name: "Core development",
    note: "The languages I think in.",
    items: ["X++", "TypeScript", "JavaScript", "SQL Server"],
  },
  {
    id: "enterprise",
    mark: "B",
    name: "Enterprise applications",
    note: "Where the day job lives.",
    items: ["Dynamics 365 Finance & Operations", "AL / Business Central", "SSRS", "Data entities", "Workflow"],
  },
  {
    id: "frontend",
    mark: "C",
    name: "Frontend experimentation",
    note: "Where the side projects live.",
    items: ["Next.js", "React", "Tailwind CSS", "PWA", "Supabase", "Prisma", "PostgreSQL"],
  },
  {
    id: "creative",
    mark: "D",
    name: "Creative development",
    note: "Motion, colour, and rooms like this one.",
    items: ["GSAP", "Framer Motion", "Three.js / React Three Fiber", "VS Code theme design", "UI / UX"],
  },
  {
    id: "tools",
    mark: "E",
    name: "Tools & workflow",
    note: "What keeps the work honest.",
    items: ["Git & GitHub", "Vitest", "Playwright", "Figma", "Canva"],
  },
];

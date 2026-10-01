import type { Project, ProjectKind } from "./types";

// Project cards for "Things I've built". Order here is the order on the page.
// Every line was checked against the repo's README and package.json.

const gh = (repo: string) => ({ label: "Source on GitHub", href: `https://github.com/frostmoon-dev/${repo}` });

export const projectFilters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web apps" },
  { id: "theme", label: "Themes" },
  { id: "tool", label: "Tools" },
];

export const projects: Project[] = [
  {
    id: "bond-garden",
    name: "Bond Garden",
    codename: "fgo-bot-garden",
    kind: "web",
    purpose:
      "A Fate/Grand Order–style visual-novel chat: you write your lines, and AI characters answer with dialogue, narration and sprite expression changes.",
    proud:
      "Works with any OpenAI-compatible API, streamed. The API key is stored encrypted and never reaches the browser. The reply parser, lorebook, prompt builder, summaries and SSE stream all have tests.",
    stack: ["Next.js 16", "TypeScript", "Prisma 7", "Supabase Postgres", "Tailwind 4", "Vitest"],
    links: [gh("fgo-bot-garden")],
    note: "Fan project. Fate/Grand Order © TYPE-MOON / FGO PROJECT.",
  },
  {
    id: "moonpaper",
    name: "MoonPaper",
    codename: "fgo-lore-site",
    kind: "web",
    purpose:
      "A roleplay chat site for my own characters: bots, lorebooks, personas, image cropping and Character Card V2 import/export.",
    proud:
      "Layered memory (recent messages, chapters, a story so far, lasting facts and keyword recall), ordered so providers can cache most of each prompt. In a 200-message test chat it cut a reply's input from about 7,800 to about 2,100 tokens. Everything lives in IndexedDB; no server stores your key.",
    stack: ["JavaScript", "IndexedDB", "Vercel Functions", "PWA"],
    links: [gh("fgo-lore-site")],
  },
  {
    id: "napyru",
    name: "Napyru",
    codename: "messaging-app",
    kind: "web",
    purpose:
      "A private messenger PWA for exactly two people, calm and built around the conversation.",
    proud:
      "Realtime chat with honest receipts (sent, delivered, read), typing and presence, voice messages with waveforms, reactions, a WhatsApp-style photo tray and push notifications, all behind Supabase row-level security.",
    stack: ["Next.js 16", "React 19", "Supabase", "Framer Motion", "Playwright", "Vitest"],
    links: [gh("messaging-app")],
  },
  {
    id: "moona",
    name: "Moona",
    codename: "bb-budget-tracker",
    kind: "web",
    purpose:
      "A local-first tracker for money, food, weight and work tasks, with BB (Fate/Extra CCC) peeking in to judge every entry.",
    proud:
      "Every number — budgets, calorie targets, pace — is calculated by the app, never by the AI. Without an API key, BB falls back to her built-in lines, so the app still works.",
    stack: ["Next.js", "TypeScript", "Vitest", "NVIDIA / OpenRouter API"],
    isPrivate: true,
  },
  {
    id: "fo-task-board",
    name: "F&O Task Board",
    codename: "fo-task-board-web",
    kind: "tool",
    purpose:
      "A Kanban board for my own ERP work: tickets, defects and configs by module (GL, AP, AR, SCM…), stage and environment.",
    proud:
      "Drag-and-drop stages from backlog to testing to done, with ticket types, modules and environments you can customise, synced across devices.",
    stack: ["Next.js 16", "Supabase Auth + Postgres", "Framer Motion", "Tailwind"],
    isPrivate: true,
  },
  {
    id: "hoyoverse-themes",
    name: "HoYoverse Color Themes",
    codename: "genshin-hsr-themes",
    kind: "theme",
    purpose: "VS Code colour themes inspired by Genshin Impact and Honkai: Star Rail characters.",
    proud: "46 themes — light, dark and high-contrast — each tuned from one character's palette.",
    stack: ["VS Code", "JSON themes"],
    links: [
      { label: "VS Code Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.genshin-hsr-themes" },
      gh("genshin-hsr-themes"),
    ],
    note: "Fan-made. Character designs © miHoYo / HoYoverse.",
  },
  {
    id: "wuwa-themes",
    name: "Wuthering Waves Color Themes",
    codename: "wuwa-themes",
    kind: "theme",
    purpose: "VS Code colour themes inspired by Wuthering Waves characters.",
    proud: "58 themes, light and dark. A small Node script generates the first files from a template.",
    stack: ["VS Code", "JSON themes", "Node.js"],
    links: [
      { label: "VS Code Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.wuwa-themes" },
      gh("wuwa-themes"),
    ],
    note: "Fan-made. Character designs © Kuro Games.",
  },
  {
    id: "columbina-theme",
    name: "Columbina Theme",
    codename: "columbina-theme",
    kind: "theme",
    purpose: "A celestial VS Code theme inspired by Columbina: ethereal blues, mystical purples, moonlit tones.",
    proud: "Light, dark and high-contrast variants, built around one character from top to bottom.",
    stack: ["VS Code", "JSON themes"],
    links: [
      { label: "VS Code Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.columbina-theme" },
      gh("columbina-theme"),
    ],
    note: "Fan-made. Character design © miHoYo / HoYoverse.",
  },
  {
    id: "cupcake-maroon",
    name: "Cupcake Maroon",
    codename: "cupcake-maroon",
    kind: "theme",
    purpose: "A warm, cosy VS Code theme of berry wine, cherry glow and cream.",
    proud: "Light, dark and high-contrast variants with a gold focus ring. Not on the Marketplace yet.",
    stack: ["VS Code", "JSON themes"],
    links: [gh("cupcake-maroon")],
  },
];

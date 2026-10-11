import type { Link } from "./types";

// Site-wide facts: name, links, SEO text. Change the URL once you deploy.

export const site = {
  name: "Teha",
  fullName: "Fatihah",
  handle: "frostmoon",
  role: "Dynamics 365 Finance & Operations developer",
  location: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  url: "https://frostmoon.vercel.app",
  atelier: "The Midnight Atelier",
  title: "The Midnight Atelier — Teha, D365 F&O developer & builder of small worlds",
  description:
    "Teha (Fatihah), a.k.a. frostmoon: Microsoft Dynamics 365 Finance & Operations developer (X++) in Malaysia, who builds chat apps, editor themes and small tools in the quiet hours.",
  tagline: "Somewhere Between Dreams & Syntax.",
  subline: "A quiet corner of the internet, where curiosity becomes creation.",
  identity: "Softness is not the absence of strength. Curiosity is not the absence of direction.",
  motto: "Don't do it just for the end. Delight in the means, too.",
};

export const contacts: (Link & { kind: "linkedin" | "email" | "github"; display: string })[] = [
  { kind: "email", label: "Email", display: "frostmoondev@gmail.com", href: "mailto:frostmoondev@gmail.com" },
  { kind: "github", label: "GitHub", display: "frostmoon-dev", href: "https://github.com/frostmoon-dev" },
  { kind: "linkedin", label: "LinkedIn", display: "in/fatihahmuhd", href: "https://www.linkedin.com/in/fatihahmuhd" },
];

/** The conventional menu. Numbers match the section headings. */
export const navItems = [
  { id: "person", index: "01", label: "The Person" },
  { id: "workshop", index: "02", label: "The Workshop" },
  { id: "archives", index: "03", label: "The Archives" },
  { id: "knowledge", index: "04", label: "Knowledge" },
  { id: "after-hours", index: "05", label: "After Hours" },
  { id: "becoming", index: "06", label: "Still Becoming" },
  { id: "letter", index: "07", label: "Leave a Letter" },
] as const;

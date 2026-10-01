import type { Link } from "./types";

// Site-wide facts: name, links, SEO text. Change the URL once you deploy.

export const site = {
  name: "Teha",
  fullName: "Fatihah",
  handle: "frostmoon",
  role: "ERP developer",
  location: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  url: "https://frostmoon.vercel.app",
  title: "Teha · frostmoon — ERP developer & builder of small worlds",
  description:
    "Teha (Fatihah), a.k.a. frostmoon: Microsoft Dynamics 365 Finance & Operations developer (X++) in Malaysia, who builds chat apps, editor themes and small tools by night.",
  heroKicker: "hello, I'm",
  heroLine:
    "ERP developer by day — I build on Microsoft Dynamics 365 Finance & Operations. By night, I build small worlds: chat apps for my characters, editor themes, and tools for myself.",
  status: { label: "Caffeinated", mode: "Determined" },
  motto: "Don't do it just for the end. Delight in the means, too.",
};

export const contacts: (Link & { kind: "linkedin" | "email" | "github"; display: string })[] = [
  { kind: "linkedin", label: "LinkedIn", display: "in/fatihahmuhd", href: "https://www.linkedin.com/in/fatihahmuhd" },
  { kind: "email", label: "Email", display: "frostmoondev@gmail.com", href: "mailto:frostmoondev@gmail.com" },
  { kind: "github", label: "GitHub", display: "frostmoon-dev", href: "https://github.com/frostmoon-dev" },
];

export const navItems = [
  { id: "now", label: "Now" },
  { id: "erp", label: "ERP work" },
  { id: "projects", label: "Built" },
  { id: "themes", label: "Themes" },
  { id: "off-the-clock", label: "Off the clock" },
  { id: "toolbox", label: "Toolbox" },
  { id: "contact", label: "Contact" },
] as const;

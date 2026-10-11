// Shapes for everything in content/. Edit the data files, not the components.

export type Link = { label: string; href: string };

export type ProjectKind = "web" | "theme" | "tool";

export type Project = {
  id: string;
  name: string;
  /** Repo or product name shown under the title, when it differs. */
  codename?: string;
  kind: ProjectKind;
  /** One line: what it is for. */
  purpose: string;
  /** What was hard, or what I'm proud of. */
  proud: string;
  stack: string[];
  /** Private repos get no GitHub link and show a "private" tag. */
  isPrivate?: boolean;
  links?: Link[];
  /** Small note under the card, e.g. an art credit. */
  note?: string;
  /** Generated cover art for the archive entry. */
  cover?: ProjectCover;
  /** Optional case-study fields. Anything left out is simply not shown. */
  challenges?: string[];
  contributions?: string[];
  outcome?: string;
};

export type NowItem = { label: string; value: string };

export type ErpCapability = { title: string; detail: string };

export type ErpCase = {
  /** Short reference shown like a ledger line number. */
  ref: string;
  title: string;
  problem: string;
  approach: string;
  tags: string[];
};

export type SkillGroup = { name: string; skills: string[] };

/**
 * One tile in "Off the clock". Tiles whose `items` and `body` are both empty
 * are hidden in production, and shown as a dashed "fill me in" slot in dev.
 */
export type LikeTile = {
  id: string;
  title: string;
  kaomoji?: string;
  body?: string;
  items?: string[];
  /** Optional colour chips (hex), e.g. for the favourite palette tile. */
  swatches?: { name: string; hex: string }[];
  /** Optional images in /public, e.g. cosplay photos. Always give alt text. */
  photos?: { src: string; alt: string; width: number; height: number }[];
  size?: "sm" | "md" | "lg";
};

export type ThemePalette = {
  label: string;
  variant: "light" | "dark" | "high-contrast";
  bg: string;
  fg: string;
  accent: string;
  keyword: string;
  string: string;
  fn: string;
  type: string;
  number: string;
  comment: string;
  variable: string;
};

export type ThemePack = {
  id: string;
  name: string;
  blurb: string;
  credit?: string;
  marketplace?: string;
  installsNote?: string;
};

// ------------------------------------------------------------------
// The Midnight Atelier
// ------------------------------------------------------------------

/** Objects in the 3D room that open a section. */
export type AtelierObjectId = "monitor" | "notebook" | "bookshelf" | "drawer" | "coffee" | "window" | "letter";

export type AtelierObject = {
  id: AtelierObjectId;
  /** Short name of the object, e.g. "The notebook". */
  name: string;
  /** Section id it opens. */
  target: string;
  /** Small editorial label shown on hover. */
  label: string;
};

/** A page in the notebook ("The Person"). */
export type NotebookPage = {
  id: string;
  /** Small handwritten-style heading. */
  heading: string;
  paragraphs: string[];
  /** Optional margin note, shown rotated in the corner. */
  margin?: string;
};

/** A line on the "Workshop" experience timeline. Leave org/period empty until you fill them in. */
export type ExperienceEntry = {
  role: string;
  org?: string;
  period?: string;
  summary?: string;
  points?: string[];
};

export type KnowledgeShelf = {
  id: string;
  /** Catalogue mark, e.g. "A". */
  mark: string;
  name: string;
  note: string;
  items: string[];
};

/** A star in the "Still Becoming" constellation. */
export type Milestone = {
  id: string;
  label: string;
  /** Reached milestones are solid. Future ones are drawn as unfinished. */
  reached: boolean;
  /** Position in the constellation, 0–100 on both axes. */
  x: number;
  y: number;
  detail?: string;
  /** Draft milestones are only shown while running `npm run dev`. */
  draft?: boolean;
};

export type ProjectCover = {
  /** Main tint of the generated archive plate. */
  tint: string;
  motif: "dialogue" | "moon" | "envelope" | "ledger" | "board" | "swatch";
};

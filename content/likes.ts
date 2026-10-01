import type { LikeTile } from "./types";

// "Off the clock". A tile with no `body`, `items`, `swatches` or `photos` is
// hidden on the live site (and shown as a dashed slot while running `npm run dev`).
//
// Cosplay photos: put files in public/images/cosplay/ and add them to `photos`
// with width, height and alt text.

export const likes: LikeTile[] = [
  {
    id: "cats",
    title: "Cats",
    kaomoji: "ฅ^•ﻌ•^ฅ",
    body: "Cats, always. The best colleagues: quiet, warm, and never ask for a status update.",
    size: "sm",
  },
  {
    id: "coffee",
    title: "Iced coffee",
    kaomoji: "( ˘▽˘)っ☕",
    body: "The official fuel. Status: caffeinated.",
    size: "sm",
  },
  {
    id: "games",
    title: "Worlds I play in",
    items: ["Fate/Grand Order", "Genshin Impact", "Honkai: Star Rail", "Wuthering Waves"],
    size: "md",
  },
  {
    id: "writing",
    title: "Characters & AUs",
    kaomoji: "( ⸝⸝´꒳`⸝⸝)",
    body: "Character creation and alternate-universe stories: taking someone I love and asking who they'd be somewhere else. Half my side projects exist so they have somewhere to talk.",
    size: "md",
  },
  {
    id: "cosplay",
    title: "Cosplay",
    body: "I buy my cosplays rather than sew them. The craft I care about is choosing who to be for a day.",
    photos: [],
    size: "lg",
  },
  {
    id: "palette",
    title: "Favourite palette",
    body: "Warm browns and icy moon tones — the same colours as my GitHub profile, and this site.",
    swatches: [
      { name: "Bark", hex: "#594841" },
      { name: "Cocoa", hex: "#684F48" },
      { name: "Frost", hex: "#D6E9ED" },
      { name: "Mist", hex: "#CCD6D6" },
    ],
    size: "md",
  },
  { id: "music", title: "On repeat", items: [], size: "sm" },
  { id: "movies", title: "Recently watched", items: [], size: "sm" },
  { id: "astrology", title: "Written in the stars", body: "", size: "sm" },
];

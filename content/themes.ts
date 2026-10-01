import type { ThemePack } from "./types";

// Theme packs for the "Editor themes" gallery. Palettes come from
// themes.generated.ts (run `npm run palettes` to refresh them).

export const themePacks: ThemePack[] = [
  {
    id: "hoyoverse",
    name: "HoYoverse",
    blurb: "Genshin Impact and Honkai: Star Rail characters.",
    credit: "Fan-made. Character designs © miHoYo / HoYoverse.",
    marketplace: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.genshin-hsr-themes",
  },
  {
    id: "wuwa",
    name: "Wuthering Waves",
    blurb: "Wuthering Waves characters, in light and dark.",
    credit: "Fan-made. Character designs © Kuro Games.",
    marketplace: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.wuwa-themes",
  },
  {
    id: "columbina",
    name: "Columbina",
    blurb: "One character, three moods: light, dark, high contrast.",
    credit: "Fan-made. Character design © miHoYo / HoYoverse.",
    marketplace: "https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.columbina-theme",
  },
  {
    id: "cupcake-maroon",
    name: "Cupcake Maroon",
    blurb: "Berry wine, cherry glow and cream. An original.",
  },
];

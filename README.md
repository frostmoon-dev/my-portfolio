# ⏾ frostmoon — portfolio

Teha's personal site: ERP developer by day, builder of small worlds by night.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · fully static · deploys on Vercel.

## Run it

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Before you push:

```bash
npm run lint
npm run typecheck
npm run build
```

## Edit the content

All text lives in `content/`. You never need to touch the components.

| File | What it holds |
|---|---|
| `content/site.ts` | Name, hero line, status, motto, contact links, site URL, SEO text |
| `content/now.ts` | The "Now" card. Change `nowUpdated` when you edit it |
| `content/erp.ts` | ERP intro, "What I do", and the "Problems I've solved" journal |
| `content/projects.ts` | Project cards and the filter buttons |
| `content/themes.ts` | Theme pack names, blurbs, credits, Marketplace links |
| `content/likes.ts` | "Off the clock" tiles |
| `content/skills.ts` | Toolbox groups |
| `content/types.ts` | The shapes of all of the above (TypeScript checks your edits) |

### Off the clock tiles

- A tile with no `body`, `items`, `swatches` or `photos` is **hidden on the live site**.
- While running `npm run dev`, hidden tiles appear as dashed "fill me in" slots.
- To add cosplay photos:
  1. Put the files in `public/images/cosplay/`.
  2. Add them to the cosplay tile's `photos` with `src`, `alt`, `width` and `height`.
  3. Change that tile's `size` to `"lg"` so the gallery has room.

### Private projects

Set `isPrivate: true` and leave out `links`. The card shows "Private repo" and no GitHub link.

## Theme palettes

The theme gallery reads `content/themes.generated.ts`. It is generated from the theme repos' JSON files, so the swatches are the real colours.

To refresh it after changing a theme:

1. Clone `genshin-hsr-themes`, `wuwa-themes`, `columbina-theme` and `cupcake-maroon` into one folder.
2. Run:
   ```bash
   THEME_REPOS_DIR=/path/to/that/folder npm run palettes
   ```
3. Commit the updated `content/themes.generated.ts`.

In the preview window, any token colour under 4.5:1 contrast against its background is lifted slightly so it stays readable. The hex values listed under the preview are the originals.

## Design

"Frost by night, roast by day."

- **Dark:** espresso canvas (`#14100D`), bone text, electric frost accent (`#9CEBFF`).
- **Light:** bone paper (`#EEE6DA`), espresso text, burnt-roast accent (`#A6370E`).
- Taviraj 800 for display type with tight tracking; Figtree for body text.
- Film grain under the content, a dot-lattice sky in the hero, outlined section numbers.
- ERP and Toolbox use a split layout on wide screens: sticky heading left, content right.
- Contact is the one full-bleed accent band.
- Motion: one staggered load sequence in the hero, then scroll-driven reveals. All of it is off with reduced motion.

Colour tokens live at the top of `app/globals.css`.

## Accessibility notes

- Light and dark themes follow the visitor's system setting. The moon button overrides it, and the choice is remembered.
- All text pairs meet WCAG 2.2 AA (4.5:1) in both themes.
- `prefers-reduced-motion` turns off the moths, the floating moon, scroll reveals and all transitions.
- The hero moon shows the real phase for the visitor's date. It is calculated in the browser (`lib/moon.ts`), so there is no API call.
- Fonts: Taviraj (headings) and Figtree (body), self-hosted by `next/font`.

## Deploy

1. Import the repo in Vercel. No environment variables needed.
2. After the first deploy, put the real URL in `content/site.ts` → `url`. This updates the sitemap, robots and share image links.

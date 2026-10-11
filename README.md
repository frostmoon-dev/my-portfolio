# The Midnight Atelier

Teha's portfolio: a private workspace at 12:47 a.m. — an interactive 3D room, and the editorial pages behind it.

*Somewhere Between Dreams & Syntax.*

Next.js 16 (App Router) · React 19 · TypeScript · React Three Fiber · Tailwind CSS 4 · fully static · deploys on Vercel.

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

All text lives in `content/`. You never need to touch the 3D scene or the animation code.

| File | What it holds |
|---|---|
| `content/site.ts` | Name, role, tagline, identity line, contact links, menu, site URL, SEO text |
| `content/atelier.ts` | Arrival and introduction copy, the room's objects and where they lead, coffee notes, the cat |
| `content/person.ts` | "The Person": the notebook pages |
| `content/now.ts` | The "Right now" index card. Change `nowUpdated` when you edit it |
| `content/experience.ts` | "The Workshop" timeline and the tools on the bench |
| `content/erp.ts` | ERP intro, "What I do", and the "Problems I've solved" journal |
| `content/projects.ts` | "The Archives" entries and the case-study pages |
| `content/skills.ts` | "Acquired Knowledge" shelves |
| `content/likes.ts` | "Small loves" cards in After Hours |
| `content/themes.ts` | Theme pack names, blurbs, credits, Marketplace links |
| `content/aspirations.ts` | "Still Becoming": the constellation's stars |
| `content/atmosphere.ts` | Background photographs per section, with photographer credits |
| `content/types.ts` | The shapes of all of the above (TypeScript checks your edits) |

### Things to fill in

- **Employer and dates.** `content/experience.ts` has `org` and `period` commented out. Add them and they appear; leave them out and nothing is shown.
- **Case studies.** Each project in `content/projects.ts` can take `challenges`, `contributions` and `outcome`. Missing fields are simply not shown on `/projects/<id>`.
- **Aspirations.** In `content/aspirations.ts`, stars with `reached: false` are drawn as unfinished outlines. `draft: true` stars only show in `npm run dev`.
- **Small loves.** A card with no `body`, `items`, `swatches` or `photos` is hidden on the live site, and shown as a dashed slot in dev.
- **Cosplay photos.** Put files in `public/images/cosplay/`, add them to the cosplay card's `photos` with `src`, `alt`, `width`, `height`, and set its `size` to `"lg"`.

### Archive covers

Projects don't have screenshots yet. Each gets a generated "archive plate" from its `cover` (`tint` + `motif`: `dialogue`, `moon`, `envelope`, `ledger`, `board`, `swatch`). Change those two values to restyle a plate.

## How the room works

```
components/
  atelier/   AtelierStage (arrival veil, introduction, object links), AtelierPoster (2D painting)
  three/     the 3D room: Room, Desk, Outside (sky, moon, city, constellation), Life (plant, cat, dust),
             Hotspot (hover/click), CameraRig (directed camera), materials + paint (painterly shading)
  sections/  the seven sections
  layout/    header (menu, clock, sound), footer
  ui/        shared pieces: SectionHeading, Reveals, ProjectCover, ThemeGallery, ExternalMark
shaders/     rain on the glass, the sky, the moon
store/       shared state between the room and the page (zustand)
hooks/       WebGL check, reduced motion, quality guess, clock, rain sound
styles/      tokens, base, header, stage, sections, after-hours, case pages
```

- **Everything in the room is procedural.** No downloaded models or textures: geometry, a painterly shader tweak, and small canvas textures (the code on the monitor, the notebook pages).
- **The camera is directed.** It dollies in when you enter, leans a little with the cursor, travels to an object when you open it, and drifts back as you scroll. There are no orbit controls.
- **Every object is also a link.** The chips under the introduction and the menu reach the same sections. Nobody has to find the clickable things.
- **Fallbacks.** The painted 2D atelier renders first (also without JavaScript). The 3D room fades in over it only when WebGL works and reduced motion is off. If the scene errors or the GPU context is lost, the painting stays.
- **Performance.** The 3D code is a separate bundle, loaded after the page. Pixel ratio is capped per device; shadows are desktop-only; dust is off on low-power devices; quality drops a tier if the frame rate struggles; rendering stops when the room is off screen or the tab is hidden.

## Atmosphere photos

Five sections have a faint photograph behind them — one per light in the room: the lamp (The Person), the street (The Archives), the shelf (Knowledge), the sky (Still Becoming), the rain (Leave a Letter). The Workshop stays clean on purpose.

- All are from [Unsplash](https://unsplash.com), free to use under the Unsplash License. Photographers are credited in the footer and in `content/atmosphere.ts`.
- The files in `public/images/atmosphere/` are already toned: each photo's brightness is mapped onto the site's own colours (midnight → dusty steel → cream), so they never bring in outside colours. `next/image` serves them as AVIF/WebP at the right size.
- Each photo fades out toward the text and at the section edges, and drifts slightly slower than the page as you scroll (parallax). With reduced motion it stays still. On phones the photos only frame the top of the section and are dimmed further so text stays above 4.5:1 contrast.
- To change one: put a toned image in `public/images/atmosphere/`, then edit its entry (side, opacity, position, credit). To remove one, delete its entry.

## Signature details

- **Atelier clock** in the header: your local time.
- **Rain sound**: off by default. The speaker button turns on procedural rain (Web Audio, no files).
- **The coffee cup** carries a note; After Hours has more.
- **The window** shows the real moon phase for today (`lib/moon.ts`) and the unfinished constellation from "Still Becoming".
- **Easter egg**: wake the cat. Tap it three times on the windowsill, or find it under the footer.

## Design

- **Palette:** midnight navy `#0A1B42`, deep blue `#0F2658`, steel `#2D6AC8` (lines and fills only — it fails contrast as text), soft sky `#A9DCFF`, sage `#A3AD91`, warm cream `#E8DDC9`, antique gold `#D7B06A` (used sparingly).
- **Type:** Instrument Serif (headings, handwriting), DM Sans (reading), IBM Plex Mono (indexes, timestamps — 13px minimum). Self-hosted by `next/font`.
- **Motion:** soft, weighted easing; no bounce. Only section headings and a few paper objects fade in; lists don't. Plain CSS transitions and one IntersectionObserver — no animation library. Tokens live in `styles/tokens.css`.
- **Layout:** one continuous night background; sections differ only in where the light comes from (lamp, screen, window). Lists are set as type with hairlines, not cards. Each section's kicker names the room object it came from.
- **Phones and portrait tablets:** the room gets its own frame at the top; the introduction sits below it instead of over it.

## Accessibility

- Night only, one palette. All text pairs meet WCAG 2.2 AA.
- Skip link, landmarks, one `h1`, visible focus rings, 44px touch targets.
- Arriving at a section from the room or the menu moves focus to its heading.
- `prefers-reduced-motion`: no 3D animation (the painted room instead), no reveals, no page turns or envelope animation.
- The arrival screen is skippable (button or Esc) and is not shown again in the same tab, or when you open a link to a section.

## Deploy

1. Import the repo in Vercel. No environment variables needed.
2. After the first deploy, put the real URL in `content/site.ts` → `url`. This updates the sitemap, robots and share image links.

## Theme palettes

The theme gallery reads `content/themes.generated.ts`, generated from the theme repos' JSON files.

1. Clone `genshin-hsr-themes`, `wuwa-themes`, `columbina-theme` and `cupcake-maroon` into one folder.
2. Run `THEME_REPOS_DIR=/path/to/that/folder npm run palettes`.
3. Commit the updated `content/themes.generated.ts`.

import Image from "next/image";
import { likes } from "@/content/likes";
import { themePalettes } from "@/content/themes.generated";
import type { LikeTile } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThemeGallery } from "@/components/ui/ThemeGallery";
import { CoffeeNote } from "./CoffeeNote";

const isDev = process.env.NODE_ENV === "development";
const isEmpty = (t: LikeTile) => !t.body && !t.items?.length && !t.swatches?.length && !t.photos?.length;

// 05 — After Hours. The playful drawer: themes, small loves, the coffee cup.
export function AfterHours() {
  const tiles = likes.filter((t) => isDev || !isEmpty(t));
  return (
    <section id="after-hours" className="section section-after" aria-labelledby="after-hours-title">
      <div className="wrap">
        <div className="after-head">
          <SectionHeading
            id="after-hours"
            index="05"
            kicker="After Hours"
            title="Not everything needs a business requirement."
            lead="Sometimes I just wanted to see if I could build it. This is where those things go, along with everything else I love."
          />
          <CoffeeNote />
        </div>

        <h3 className="sub-heading">
          Characters, as colour
          <span className="sub-heading-note">110 VS Code themes, each built from one character&apos;s palette. Pick one to watch it write a little X++.</span>
        </h3>
        <div>
          <ThemeGallery themePalettes={themePalettes} />
        </div>

        <h3 className="sub-heading">
          Small loves
          <span className="sub-heading-note">In no particular order.</span>
        </h3>
        <ul className="keepsakes">
          {tiles.map((t) =>
            isEmpty(t) ? (
              <li key={t.id} className={`keepsake keepsake-${t.size ?? "sm"} keepsake-empty`}>
                <h4>{t.title}</h4>
                <p>
                  Empty slot (only visible in dev). Fill <code>{t.id}</code> in <code>content/likes.ts</code>.
                </p>
              </li>
            ) : (
              <li key={t.id} className={`keepsake keepsake-${t.size ?? "sm"}`}>
                <h4>
                  {t.title}
                  {t.kaomoji && (
                    <span className="kaomoji" aria-hidden="true">
                      {" "}
                      {t.kaomoji}
                    </span>
                  )}
                </h4>
                {t.body && <p>{t.body}</p>}
                {t.items && t.items.length > 0 && (
                  <ul className="keepsake-items">
                    {t.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
                {t.swatches && t.swatches.length > 0 && (
                  <ul className="keepsake-swatches">
                    {t.swatches.map((s) => (
                      <li key={s.hex}>
                        <span style={{ background: s.hex }} aria-hidden="true" />
                        {s.name} <span className="mono muted">{s.hex}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.photos && t.photos.length > 0 && (
                  <div className="keepsake-photos">
                    {t.photos.map((p) => (
                      <Image key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 300px, 45vw" />
                    ))}
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

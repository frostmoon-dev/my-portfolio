import Image from "next/image";
import { likes } from "@/content/likes";
import type { LikeTile } from "@/content/types";
import { SectionHeading } from "./SectionHeading";

const isDev = process.env.NODE_ENV === "development";

function isEmpty(t: LikeTile) {
  return !t.body && !t.items?.length && !t.swatches?.length && !t.photos?.length;
}

export function OffTheClock() {
  const tiles = likes.filter((t) => isDev || !isEmpty(t));
  return (
    <section id="off-the-clock" className="section section-warm" aria-labelledby="off-the-clock-title">
      <div className="wrap">
        <SectionHeading
          id="off-the-clock"
          kicker="Off the clock"
          title="Everything I love"
          lead="The rest of me, in no particular order."
        />
        <ul className="bento">
          {tiles.map((t) =>
            isEmpty(t) ? (
              <li key={t.id} className={`tile tile-${t.size ?? "sm"} tile-empty`}>
                <h3>{t.title}</h3>
                <p>
                  Empty slot (only visible in dev). Fill <code>{t.id}</code> in <code>content/likes.ts</code>.
                </p>
              </li>
            ) : (
              <li key={t.id} className={`tile tile-${t.size ?? "sm"} reveal`}>
                <h3>
                  {t.title}
                  {t.kaomoji && (
                    <span className="kaomoji" aria-hidden="true">
                      {" "}
                      {t.kaomoji}
                    </span>
                  )}
                </h3>
                {t.body && <p>{t.body}</p>}
                {t.items && t.items.length > 0 && (
                  <ul className="tile-items">
                    {t.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
                {t.swatches && t.swatches.length > 0 && (
                  <ul className="tile-swatches">
                    {t.swatches.map((s) => (
                      <li key={s.hex}>
                        <span style={{ background: s.hex }} aria-hidden="true" />
                        {s.name} <span className="tabular muted">{s.hex}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.photos && t.photos.length > 0 && (
                  <div className="tile-photos">
                    {t.photos.map((p) => (
                      <Image
                        key={p.src}
                        src={p.src}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 1024px) 300px, 45vw"
                      />
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

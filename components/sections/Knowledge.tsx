import { now } from "@/content/now";
import { knowledgeShelves } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 04 — Acquired Knowledge. A card catalogue, not a progress bar in sight.
export function Knowledge() {
  const learning = now.find((n) => n.label.toLowerCase() === "learning");
  return (
    <section id="knowledge" className="section section-knowledge" aria-labelledby="knowledge-title">
      <div className="wrap">
        <SectionHeading
          id="knowledge"
          index="04"
          kicker="Acquired Knowledge"
          title={<>The shelf, <em>catalogued</em></>}
          lead="No percentages — nobody is 87% of a language. Just what lives on each shelf, and what I use it for."
        />
        <ul className="catalogue">
          {knowledgeShelves.map((s) => (
            <li key={s.id} className="catalogue-card" data-reveal>
              <p className="mono catalogue-mark" aria-hidden="true">
                {s.mark}
              </p>
              <h3>{s.name}</h3>
              <p className="catalogue-note">{s.note}</p>
              <ul className="catalogue-items">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
          {learning && (
            <li className="catalogue-card catalogue-learning" data-reveal>
              <p className="mono catalogue-mark" aria-hidden="true">
                F
              </p>
              <h3>Currently learning</h3>
              <p className="catalogue-note">Spine not yet labelled.</p>
              <p className="hand catalogue-hand">{learning.value}</p>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

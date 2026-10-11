import { now } from "@/content/now";
import { knowledgeShelves } from "@/content/skills";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 04 — Acquired Knowledge. Read like the index of a card catalogue:
// shelf mark, shelf name, what's on it. No bars, no boxes.
export function Knowledge() {
  const learning = now.find((n) => n.label.toLowerCase() === "learning");
  return (
    <section id="knowledge" className="section section-knowledge" aria-labelledby="knowledge-title">
      <Atmosphere section="knowledge" />
      <div className="wrap">
        <SectionHeading
          id="knowledge"
          index="04"
          kicker="Acquired Knowledge"
          title="What's on the shelf"
          lead="No percentages — nobody is 87% of a language. Just what lives on each shelf, and what it's for."
          layout="split"
        />
        <ol className="catalogue">
          {knowledgeShelves.map((s) => (
            <li key={s.id} className="catalogue-row">
              <span className="catalogue-mark" aria-hidden="true">
                {s.mark}
              </span>
              <div className="catalogue-head">
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </div>
              <ul className="catalogue-items">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
          {learning && (
            <li className="catalogue-row catalogue-learning">
              <span className="catalogue-mark" aria-hidden="true">
                {String.fromCharCode(65 + knowledgeShelves.length)}
              </span>
              <div className="catalogue-head">
                <h3>Currently learning</h3>
                <p>Spine not labelled yet.</p>
              </div>
              <p className="hand catalogue-hand">{learning.value}</p>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}

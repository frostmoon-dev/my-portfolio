import { becomingLead, milestones } from "@/content/aspirations";
import { SectionHeading } from "@/components/ui/SectionHeading";

const isDev = process.env.NODE_ENV === "development";

// 06 — Still Becoming. The constellation outside the window, unfinished on purpose.
export function StillBecoming() {
  const stars = milestones.filter((m) => isDev || !m.draft);
  return (
    <section id="becoming" className="section section-becoming" aria-labelledby="becoming-title">
      <div className="wrap">
        <SectionHeading
          id="becoming"
          index="06"
          kicker="Still Becoming"
          title={<>An unfinished <em>constellation</em></>}
          lead={becomingLead}
          align="center"
        />
        <figure className="constellation" data-reveal>
          <svg viewBox="0 0 1000 520" aria-hidden="true">
            {stars.slice(1).map((s, i) => {
              const a = stars[i];
              const done = a.reached && s.reached;
              return (
                <line
                  key={s.id}
                  x1={a.x * 10}
                  y1={a.y * 5.2}
                  x2={s.x * 10}
                  y2={s.y * 5.2}
                  className={done ? "c-line" : "c-line c-line-future"}
                />
              );
            })}
            {stars.map((s) => (
              <g key={s.id} transform={`translate(${s.x * 10} ${s.y * 5.2})`} className={s.reached ? "c-star" : "c-star c-star-future"}>
                <circle r={s.reached ? 6 : 8} />
                {s.reached && <circle r="16" className="c-halo" />}
              </g>
            ))}
          </svg>
          <ol className="constellation-labels">
            {stars.map((s) => (
              <li
                key={s.id}
                style={{ left: `${s.x}%`, top: `${s.y}%` } as React.CSSProperties}
                className={`${s.reached ? "" : "is-future"}${s.draft ? " is-draft" : ""}`}
              >
                <span className="mono">{s.reached ? "reached" : "not yet"}</span>
                <strong>{s.label}</strong>
                {s.detail && <span className="c-detail">{s.detail}</span>}
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}

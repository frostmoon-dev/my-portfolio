import { now, nowUpdated } from "@/content/now";
import { notebookPages, personLead } from "@/content/person";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Notebook } from "./Notebook";

// 01 — The Person. Opening someone's private notebook.
export function Person() {
  return (
    <section id="person" className="section section-person" aria-labelledby="person-title">
      <div className="wrap person-grid">
        <div className="person-side">
          <SectionHeading id="person" index="01" kicker="The Person" title={<>A notebook, <em>left open</em></>} lead={personLead} />
          <blockquote className="identity" data-reveal>
            <p>{site.identity}</p>
          </blockquote>
          <aside className="index-card" aria-labelledby="now-title" data-reveal>
            <h3 id="now-title" className="mono">
              Right now <span className="muted">· {nowUpdated}</span>
            </h3>
            <dl>
              {now.map((n) => (
                <div key={n.label}>
                  <dt>{n.label}</dt>
                  <dd>{n.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <Notebook pages={notebookPages} motto={site.motto} />
      </div>
    </section>
  );
}

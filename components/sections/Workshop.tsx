import { erpCapabilities, erpCases, erpIntro } from "@/content/erp";
import { experience, workshopTools } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 02 — The Workshop. The recruiter's section: plain, clear, complete.
export function Workshop() {
  return (
    <section id="workshop" className="section section-workshop" aria-labelledby="workshop-title">
      <div className="wrap">
        <SectionHeading
          id="workshop"
          index="02"
          kicker="The Workshop"
          title={<>Where the day job <em>lives</em></>}
          lead={erpIntro}
        />

        <div className="workshop-top">
          <ol className="timeline" aria-label="Experience">
            {experience.map((e) => (
              <li key={e.role} className="timeline-entry" data-reveal>
                <p className="mono timeline-meta">
                  {e.period ?? "Current role"}
                  {e.org && <> · {e.org}</>}
                </p>
                <h3>{e.role}</h3>
                {e.summary && <p>{e.summary}</p>}
                {e.points && (
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <aside className="tools" aria-labelledby="tools-title" data-reveal>
            <h3 id="tools-title" className="mono">On the bench</h3>
            <ul>
              {workshopTools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        </div>

        <h3 className="sub-heading" data-reveal>
          What I do
        </h3>
        <ul className="capabilities">
          {erpCapabilities.map((c, i) => (
            <li key={c.title} data-reveal>
              <span className="mono capability-no">{String(i + 1).padStart(2, "0")}</span>
              <h4>{c.title}</h4>
              <p>{c.detail}</p>
            </li>
          ))}
        </ul>

        <h3 className="sub-heading" data-reveal>
          Problems I&apos;ve solved <span className="muted">— a journal, kept generic on purpose</span>
        </h3>
        <ol className="journal">
          {erpCases.map((c) => (
            <li key={c.ref} className="journal-entry" data-reveal>
              <p className="mono journal-ref">{c.ref}</p>
              <div>
                <h4>{c.title}</h4>
                <dl>
                  <div>
                    <dt className="mono">Problem</dt>
                    <dd>{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="mono">Approach</dt>
                    <dd>{c.approach}</dd>
                  </div>
                </dl>
              </div>
              <ul className="tags" aria-label="Tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

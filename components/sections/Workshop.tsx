import { erpCapabilities, erpCases, erpIntro } from "@/content/erp";
import { experience, workshopTools } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 02 · The Workshop. The recruiter's section: plain, clear, complete.
export function Workshop() {
  return (
    <section id="workshop" className="section section-workshop" aria-labelledby="workshop-title">
      <div className="wrap">
        <SectionHeading
          id="workshop"
          index="02"
          title="The day job"
          lead={erpIntro}
          layout="split"
        />

        <div className="workshop-top">
          <ol className="timeline" aria-label="Experience">
            {experience.map((e) => (
              <li key={e.role} className="timeline-entry">
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
          <aside className="tools" aria-labelledby="tools-title">
            <h3 id="tools-title" className="mono">On the bench</h3>
            <ul>
              {workshopTools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        </div>

        <h3 className="sub-heading">
          What I do
        </h3>
        <dl className="capabilities" data-motion="ledger-rows" data-motion-auto data-rule="top">
          {erpCapabilities.map((c, i) => (
            <div key={c.title}>
              <dt>
                <span className="mono capability-no">{String(i + 1).padStart(2, "0")}</span>
                {c.title}
              </dt>
              <dd>{c.detail}</dd>
            </div>
          ))}
        </dl>

        <h3 className="sub-heading">
          Problems I&apos;ve solved
          <span className="sub-heading-note">A journal, kept generic on purpose: no client names, no client code.</span>
        </h3>
        <ol className="journal" data-motion="ledger-rows" data-motion-auto data-rule-style="dashed">
          {erpCases.map((c) => (
            <li key={c.ref} className="journal-entry">
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

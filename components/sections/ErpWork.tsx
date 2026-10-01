import { erpCapabilities, erpCases, erpIntro } from "@/content/erp";
import { SectionHeading } from "./SectionHeading";

export function ErpWork() {
  return (
    <section id="erp" className="section section-erp section-split" aria-labelledby="erp-title">
      <div className="wrap">
        <SectionHeading
          id="erp"
          index="01"
          kicker="By day"
          title="ERP work in Dynamics 365 F&O"
          lead={erpIntro}
        />

        <h3 className="subhead reveal">What I do</h3>
        <ul className="capability-grid">
          {erpCapabilities.map((c) => (
            <li key={c.title} className="capability reveal">
              <h4>{c.title}</h4>
              <p>{c.detail}</p>
            </li>
          ))}
        </ul>

        <h3 className="subhead reveal">Problems I&rsquo;ve solved</h3>
        <p className="fine-print reveal">
          Described generally. Client names, data and code stay with the client.
        </p>
        <ol className="journal">
          {erpCases.map((c) => (
            <li key={c.ref} className="journal-entry reveal">
              <div className="journal-ref" aria-hidden="true">
                {c.ref}
              </div>
              <div className="journal-body">
                <h4>{c.title}</h4>
                <dl>
                  <div>
                    <dt>Problem</dt>
                    <dd>{c.problem}</dd>
                  </div>
                  <div>
                    <dt>What I did</dt>
                    <dd>{c.approach}</dd>
                  </div>
                </dl>
                <ul className="tag-list" aria-label="Areas">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <span className="journal-stamp" aria-hidden="true">
                posted
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

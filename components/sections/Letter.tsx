import { contacts } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Envelope } from "./Envelope";

// 07 — Leave a Letter. Contact, as stationery.
export function Letter() {
  const email = contacts.find((c) => c.kind === "email")!;
  return (
    <section id="letter" className="section section-letter" aria-labelledby="letter-title">
      <div className="wrap letter-grid">
        <div>
          <SectionHeading
            id="letter"
            index="07"
            kicker="Leave a Letter"
            title={<>Leave a letter <em>on the desk</em></>}
            lead="For work, for a project, or to tell me about a character you love. I read everything, usually with coffee."
          />
          <ul className="contact-list" data-reveal>
            {contacts.map((c) => (
              <li key={c.kind}>
                <span className="mono contact-kind">{c.label}</span>
                <a href={c.href} rel={c.kind === "email" ? undefined : "noopener"}>
                  {c.display}
                  {c.kind !== "email" && <ExternalMark />}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Envelope to={email.display} />
      </div>
    </section>
  );
}

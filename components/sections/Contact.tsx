import { contacts } from "@/content/site";
import { ExternalMark } from "../ExternalMark";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHeading
          id="contact"
          kicker="Contact"
          title="Say hello"
          lead="For ERP work, side projects, or to tell me your favourite character. Email is fastest."
        />
        <ul className="contact-list reveal">
          {contacts.map((c) => (
            <li key={c.kind}>
              <span className="contact-label">{c.label}</span>
              <a href={c.href} rel={c.kind === "email" ? undefined : "noopener"}>
                {c.display}
                {c.kind !== "email" && <ExternalMark />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

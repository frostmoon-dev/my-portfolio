// Shared section heading: a small kicker line, then the h2.
export function SectionHeading({
  id,
  index,
  kicker,
  title,
  lead,
}: {
  id: string;
  /** Two-digit section number, drawn large and outlined. */
  index: string;
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="section-heading reveal">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <p className="kicker">
        <span aria-hidden="true">⏾ </span>
        {kicker}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

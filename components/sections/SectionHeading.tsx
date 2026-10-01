// Shared section heading: a small kicker line, then the h2.
export function SectionHeading({
  id,
  kicker,
  title,
  lead,
}: {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="section-heading reveal">
      <p className="kicker">
        <span aria-hidden="true">⏾ </span>
        {kicker}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

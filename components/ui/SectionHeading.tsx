// Every section opens the same way: a mono index, a quiet kicker, a serif title.
// The title takes focus when you arrive from the room or the menu.

type Props = {
  id: string;
  index: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "start" | "center";
};

export function SectionHeading({ id, index, kicker, title, lead, align = "start" }: Props) {
  return (
    <div className={`section-heading section-heading-${align}`} data-reveal>
      <p className="section-kicker mono">
        <span className="section-index">{index}</span>
        <span className="section-rule" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={`${id}-title`} tabIndex={-1} data-section-heading>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

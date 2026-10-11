// Every section opens with its number and its title on one line. The number
// is set in mono beside the title, so there is no label stacked above it.
// The title takes focus when you arrive from the room or the menu.

type Props = {
  id: string;
  index: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** stack: title over lead. split: title left, lead right. center: for the window. */
  layout?: "stack" | "split" | "center";
};

export function SectionHeading({ id, index, title, lead, layout = "stack" }: Props) {
  return (
    <div className={`section-heading section-heading-${layout}`}>
      <h2 id={`${id}-title`} tabIndex={-1} data-section-heading>
        <span className="section-index mono">{index}</span>
        <span className="section-title">{title}</span>
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

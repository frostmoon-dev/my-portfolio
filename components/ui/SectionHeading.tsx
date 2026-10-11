import { atelierObjects } from "@/content/atelier";

// Every section opens with its number, its name, and the object in the room
// it came from — so the page never forgets it started at a desk.
// The title takes focus when you arrive from the room or the menu.

type Props = {
  id: string;
  index: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** stack: title over lead. split: title left, lead right. center: for the window. */
  layout?: "stack" | "split" | "center";
};

const fromObject = new Map(atelierObjects.map((o) => [o.target, o.name.replace(/^The /, "the ")]));

export function SectionHeading({ id, index, kicker, title, lead, layout = "stack" }: Props) {
  const from = fromObject.get(id);
  return (
    <div className={`section-heading section-heading-${layout}`} data-reveal>
      <p className="section-kicker mono">
        <span className="section-index">{index}</span>
        <span className="section-rule" aria-hidden="true" />
        <span>{kicker}</span>
        {from && <span className="section-from">from {from}</span>}
      </p>
      <h2 id={`${id}-title`} tabIndex={-1} data-section-heading>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

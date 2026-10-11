import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchiveIndex } from "./ArchiveIndex";

// 03 — The Archives. Each project is an entry in a catalogue, with its own page.
export function Archives() {
  return (
    <section id="archives" className="section section-archives" aria-labelledby="archives-title">
      <div className="wrap">
        <SectionHeading
          id="archives"
          index="03"
          kicker="The Archives"
          title={<>Things built, <em>kept in a drawer</em></>}
          lead="Apps, tools and editor themes — most of them made after hours, all of them made properly. Open any entry for the full story."
        />
        <ArchiveIndex />
      </div>
    </section>
  );
}

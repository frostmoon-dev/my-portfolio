import { ProjectGrid } from "../ProjectGrid";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading
          id="projects"
          kicker="By night"
          title="Things I've built"
          lead="Small worlds and useful tools, mostly made because I wanted them to exist."
        />
        <ProjectGrid />
      </div>
    </section>
  );
}

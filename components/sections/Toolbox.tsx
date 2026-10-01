import { skillGroups } from "@/content/skills";
import { SectionHeading } from "./SectionHeading";

export function Toolbox() {
  return (
    <section id="toolbox" className="section" aria-labelledby="toolbox-title">
      <div className="wrap">
        <SectionHeading id="toolbox" kicker="Toolbox" title="What I work with" />
        <div className="toolbox">
          {skillGroups.map((g) => (
            <div key={g.name} className="toolbox-group reveal">
              <h3>{g.name}</h3>
              <ul className="tag-list tag-list-lg">
                {g.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

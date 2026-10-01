import { themePalettes } from "@/content/themes.generated";
import { ThemeGallery } from "../ThemeGallery";
import { SectionHeading } from "./SectionHeading";

export function Themes() {
  return (
    <section id="themes" className="section" aria-labelledby="themes-title">
      <div className="wrap">
        <SectionHeading
          id="themes"
          index="03"
          kicker="Editor themes"
          title="Characters, as colour"
          lead="Over a hundred VS Code themes, each built from one character's palette. Pick one to see it write a little X++."
        />
        <ThemeGallery themePalettes={themePalettes} />
      </div>
    </section>
  );
}

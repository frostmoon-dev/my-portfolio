import { Moths } from "@/components/Moths";
import { SiteHeader } from "@/components/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { ErpWork } from "@/components/sections/ErpWork";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { OffTheClock } from "@/components/sections/OffTheClock";
import { Projects } from "@/components/sections/Projects";
import { Themes } from "@/components/sections/Themes";
import { Toolbox } from "@/components/sections/Toolbox";

export default function Home() {
  return (
    <>
      <Moths />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Now />
        <ErpWork />
        <Projects />
        <Themes />
        <OffTheClock />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

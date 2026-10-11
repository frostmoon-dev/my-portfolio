import { AtelierStage } from "@/components/atelier/AtelierStage";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AfterHours } from "@/components/sections/AfterHours";
import { Archives } from "@/components/sections/Archives";
import { Knowledge } from "@/components/sections/Knowledge";
import { Letter } from "@/components/sections/Letter";
import { Person } from "@/components/sections/Person";
import { StillBecoming } from "@/components/sections/StillBecoming";
import { Workshop } from "@/components/sections/Workshop";
import { Reveals } from "@/components/ui/Reveals";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <AtelierStage />
        <Person />
        <Workshop />
        <Archives />
        <Knowledge />
        <AfterHours />
        <StillBecoming />
        <Letter />
      </main>
      <Footer />
      <Reveals />
    </>
  );
}

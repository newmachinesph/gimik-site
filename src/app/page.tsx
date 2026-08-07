import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { HowItWorks } from "@/components/HowItWorks";
import { TryIt } from "@/components/TryIt";
import { BucketIndex } from "@/components/BucketIndex";
import { Modes } from "@/components/Modes";
import { GetTheApp } from "@/components/GetTheApp";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        {/* Breath (spec §4.2) — load-bearing empty band; do not fill. */}
        <div aria-hidden="true" style={{ height: 200 }} />
        <Manifesto />
        <HowItWorks />
        <TryIt />
        <BucketIndex />
        <Modes />
        <GetTheApp />
      </main>
      <SiteFooter />
    </>
  );
}

import { Hero } from "@/components/Hero";
import { Problem } from "@/components/landing/Problem";
import { CoreLoop } from "@/components/landing/CoreLoop";
import { MoreThanList } from "@/components/landing/MoreThanList";
import { Privacy } from "@/components/landing/Privacy";
import { Faq } from "@/components/Faq";
import { GetTheApp } from "@/components/GetTheApp";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        {/* Breath — a load-bearing empty band between the promise and the
            turn. Do not fill it. */}
        <div aria-hidden="true" style={{ height: "clamp(96px, 12vw, 180px)" }} />
        <Problem />
        <CoreLoop />
        <MoreThanList />
        <Privacy />
        <Faq />
        <GetTheApp />
      </main>
      <SiteFooter />
    </>
  );
}

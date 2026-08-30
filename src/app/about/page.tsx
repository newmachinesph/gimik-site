import type { Metadata } from "next";
import Link from "next/link";

import { SectionHead, Stage } from "@/components/site/kit";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Gora exists, what it refuses to be, and why it starts in the Philippines.",
  alternates: { canonical: "/about" },
};

const REFUSALS = [
  {
    title: "Not a dating app",
    body: "Gora is built around people you already know and groups you are already in. Opening a plan up means people already going can join it — not that you are being introduced to strangers.",
  },
  {
    title: "Not another group chat",
    body: "Chats are where plans go to be forgotten. Gora attaches the conversation to the plan, so the thread cannot outlive the thing it is about.",
  },
  {
    title: "Not a productivity tool",
    body: "There are no streaks, no scores and nothing to keep up with. A someday you never do costs you nothing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <main id="main-content">
        <section style={{ paddingTop: "calc(var(--header-height) + 56px)" }}>
          <div className="container-page">
            <SectionHead
              eyebrow="About"
              title="Built for the sentence nobody finishes."
              lede="“We should do that sometime” is one of the most common things people say to each other, and one of the least likely to happen. Gora exists to close that gap and nothing else."
            />
          </div>
        </section>

        <section className="container-page py-[clamp(56px,7vw,96px)]">
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="display-head text-[clamp(28px,3.4vw,42px)] font-bold">
                The idea was never the hard part.
              </h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.7] text-ink-muted">
                <p>
                  Everyone can name five things they would genuinely like to do
                  with people they genuinely like. The ideas are not scarce. What
                  is scarce is the moment someone says a day out loud.
                </p>
                <p>
                  So Gora is not a place to collect intentions beautifully. The
                  list is only there to make the next step possible: seeing that
                  someone else already wants the same thing, and putting a date
                  on it while you both still have the nerve.
                </p>
                <p>
                  Everything else in the app follows from that. Threads exist so
                  the plan has somewhere to be argued about. Groups exist because
                  most plans are not one-to-one. The record exists because a
                  calendar throws the day away once it passes, and the day was
                  the whole point.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <Stage shot="profile" tone="sky" />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-rule bg-paper-sunk">
          <div className="container-page py-[clamp(72px,9vw,120px)]">
            <Reveal>
              <SectionHead eyebrow="What it is not" title="Three things Gora refuses to be." />
            </Reveal>
            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {REFUSALS.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <h3 className="text-[22px] font-bold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.65] text-ink-muted">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-[clamp(72px,9vw,120px)]">
          <Reveal>
            <SectionHead
              eyebrow="Where it starts"
              title="The Philippines first, properly."
              lede="Not a soft launch in a market nobody is watching. Gora is built and tested here — the cities in it are Cebu, Quezon City, Taguig, Makati and Davao, the people in it speak Cebuano, Filipino and English, and the servers sit close enough that the app feels local because it is."
            />
            <p className="mt-8 text-[16px] text-ink-muted">
              More countries follow.{" "}
              <Link href="/contact" className="font-medium text-orange-deep underline underline-offset-4">
                Ask about yours
              </Link>
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

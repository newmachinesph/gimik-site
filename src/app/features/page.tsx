import type { Metadata } from "next";
import Link from "next/link";

import { FEATURES } from "@/data/features";
import { FeatureBlock, SectionHead } from "@/components/site/kit";
import { Reveal } from "@/components/Reveal";
import { StoreButtons } from "@/components/StoreButtons";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Features — everything Gimik does",
  description:
    "Keep the things you mean to do, see who wants the same, and lock a date. Plus threads, groups and the record a plan leaves behind.",
  alternates: { canonical: "/features" },
};

// Sky until a plan has a date, warm afterwards — the same rule the landing
// page uses, continued across all six.
const TONES = ["sky", "sky", "orange", "paper", "paper", "orange"] as const;

export default function FeaturesPage() {
  return (
    <>
      <main id="main-content">
        <section style={{ paddingTop: "calc(var(--header-height) + 56px)" }}>
          <div className="container-page">
            <SectionHead
              eyebrow="Features"
              title="Everything Gimik does."
              lede="Six things, in the order you meet them. Every screen below is the real app, not a drawing of it."
            />
          </div>
        </section>

        <div className="container-page space-y-[clamp(72px,9vw,128px)] py-[clamp(56px,7vw,96px)]">
          {FEATURES.map((feature, i) => (
            <FeatureBlock
              key={feature.id}
              eyebrow={feature.eyebrow}
              title={feature.title}
              body={feature.body}
              points={feature.points}
              shot={feature.shot}
              tone={TONES[i]}
              flip={i % 2 === 1}
              priority={i === 0}
            />
          ))}
        </div>

        <section className="border-t border-rule bg-paper-sunk">
          <div className="container-page py-[clamp(72px,9vw,120px)]">
            <Reveal>
              <SectionHead title="Free, with nothing to buy." align="center" />
              <div className="mt-10 flex justify-center">
                <StoreButtons />
              </div>
              <p className="mt-8 text-center text-[15px] text-ink-muted">
                Questions first?{" "}
                <Link href="/support" className="font-medium text-orange-deep underline underline-offset-4">
                  Read support
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

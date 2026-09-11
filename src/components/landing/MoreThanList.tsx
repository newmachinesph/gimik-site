import Link from "next/link";

import { FEATURES, CORE_FEATURE_IDS } from "@/data/features";
import { Reveal } from "@/components/Reveal";
import { SectionHead, Stage } from "@/components/site/kit";

/**
 * The half of Gimik the old site never mentioned: threads, groups, and the
 * record a plan leaves behind. Shown compactly here and in full on /features,
 * both from the same data.
 */
export function MoreThanList() {
  const rest = FEATURES.filter(
    (f) => !CORE_FEATURE_IDS.includes(f.id as (typeof CORE_FEATURE_IDS)[number]),
  );

  return (
    <section className="below-fold border-t border-rule bg-paper-sunk">
      <div className="container-page py-[clamp(80px,10vw,140px)]">
        <Reveal>
          <SectionHead
            eyebrow="And then"
            title="A date is the start of it, not the end."
            lede="Once a plan is real it needs somewhere to live — a thread, the people in it, and something left over afterwards."
          />
        </Reveal>

        <div className="mt-[clamp(48px,6vw,80px)] grid gap-x-10 gap-y-14 md:grid-cols-3">
          {rest.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 0.08}>
              <Stage shot={feature.shot} tone="paper" scale={0.52} />
              <h3 className="mt-8 text-[22px] font-bold tracking-[-0.01em]">
                {feature.title}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.6] text-ink-muted">
                {feature.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/features"
            className="mt-14 inline-flex min-h-[52px] items-center rounded-full bg-ink px-8 text-[16px] font-semibold text-paper transition-transform duration-[160ms] hover:-translate-y-0.5"
          >
            Everything Gimik does
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { SectionHead, Stage } from "@/components/site/kit";

/**
 * Who sees what, answered concretely rather than with a policy link.
 *
 * The claims here are the ones the app enforces per someday, and the capture
 * shows the actual control — the "who can invite you" ring on a real someday —
 * so the section is checkable rather than reassuring.
 */
export function Privacy() {
  return (
    <section className="below-fold">
      <div className="container-page grid items-center gap-x-16 gap-y-12 py-[clamp(80px,10vw,140px)] lg:grid-cols-2">
        <Reveal>
          <SectionHead
            eyebrow="Who sees what"
            title="Every someday carries its own ring."
            lede="Not one privacy setting for the whole account — one per thing you keep, changeable whenever you want."
          />
          <ul className="mt-10 space-y-5">
            {[
              ["Just me", "Nobody sees it. A list you are not performing."],
              ["Friends", "The people you have actually added."],
              ["Groups", "Only the groups you are in."],
              ["Everyone", "Open, so people already going can join."],
            ].map(([ring, meaning]) => (
              <li key={ring} className="flex flex-wrap items-baseline gap-x-3 border-b border-rule pb-5">
                <span className="min-w-[7.5ch] font-semibold">{ring}</span>
                <span className="text-[16px] text-ink-muted">{meaning}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[16px] leading-[1.6] text-ink-muted">
            Journal entries are private unless you share one, and you can delete
            your account from inside the app.{" "}
            <Link href="/privacy" className="font-medium text-orange-deep underline underline-offset-4">
              Read the privacy policy
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Stage shot="someday" tone="sky" />
        </Reveal>
      </div>
    </section>
  );
}

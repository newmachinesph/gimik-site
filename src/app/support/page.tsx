import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/data/site";
import { SUPPORT_TOPICS } from "@/data/support";
import { SectionHead } from "@/components/site/kit";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with your Gimik account: signing in, resetting a password, privacy controls, reporting and blocking, deleting your account, and how to reach a person.",
  alternates: { canonical: "/support" },
};

/**
 * The support URL on both store listings, so App Review opens it. Nothing here
 * waits on a scroll animation: how to reach a person is in the first screen,
 * and every answer is in the HTML whether or not a script ever runs.
 */
export default function SupportPage() {
  return (
    <>
      <main id="main-content">
        <section style={{ paddingTop: "calc(var(--header-height) + 56px)" }}>
          <div className="container-page">
            <SectionHead
              eyebrow="Support"
              title="Help with Gimik."
              lede="The questions that come up most, answered directly. If yours is not here, write to us and a person will reply."
            />
            <div className="mt-8 max-w-[62ch] rounded-[28px] bg-paper-sunk p-[clamp(24px,3vw,40px)]">
              <h2 className="text-[20px] font-bold tracking-[-0.01em]">Contact support</h2>
              <p className="mt-3 text-[16px] leading-[1.65] text-ink-muted">
                Email{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="font-medium text-orange-deep underline underline-offset-4"
                >
                  {site.supportEmail}
                </a>{" "}
                or use the{" "}
                <Link href="/contact" className="font-medium text-orange-deep underline underline-offset-4">
                  contact form
                </Link>
                . Tell us what happened, what you expected, and which phone you
                are on. Reports about a person or their content are reviewed
                within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <div className="container-page pb-[clamp(64px,8vw,112px)] pt-[clamp(48px,6vw,80px)]">
          <div className="space-y-[clamp(48px,6vw,72px)]">
            {SUPPORT_TOPICS.map((topic) => (
              <section key={topic.title}>
                <h2 className="text-[26px] font-bold tracking-[-0.01em]">{topic.title}</h2>
                <dl className="mt-7 space-y-7">
                  {topic.items.map((item) => (
                    <div key={item.q} className="border-b border-rule pb-7">
                      <dt className="text-[17px] font-semibold">{item.q}</dt>
                      <dd className="mt-3 max-w-[68ch] text-[16px] leading-[1.65] text-ink-muted">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <p className="mt-[clamp(40px,5vw,64px)] text-[15px] text-ink-muted">
            <Link href="/privacy" className="underline underline-offset-4">Privacy policy</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/terms" className="underline underline-offset-4">Terms of use</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/contact" className="underline underline-offset-4">Contact form</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

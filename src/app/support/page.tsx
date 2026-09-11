import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/data/site";
import { SUPPORT_TOPICS } from "@/data/support";
import { SectionHead } from "@/components/site/kit";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with your Gimik account: signing in, resetting a password, privacy controls, deleting your account, and how to reach a person.",
  alternates: { canonical: "/support" },
};

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
          </div>
        </section>

        <div className="container-page pb-[clamp(64px,8vw,112px)] pt-[clamp(48px,6vw,80px)]">
          <div className="space-y-[clamp(48px,6vw,72px)]">
            {SUPPORT_TOPICS.map((topic) => (
              <Reveal key={topic.title}>
                <section>
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
              </Reveal>
            ))}
          </div>

          <Reveal>
            <section className="mt-[clamp(56px,7vw,88px)] rounded-[28px] bg-paper-sunk p-[clamp(28px,4vw,56px)]">
              <h2 className="text-[26px] font-bold tracking-[-0.01em]">Still stuck</h2>
              <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.65] text-ink-muted">
                Email{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="font-medium text-orange-deep underline underline-offset-4"
                >
                  {site.supportEmail}
                </a>{" "}
                and tell us what happened, what you expected, and which phone you
                are on. That is usually enough to fix it in one reply.
              </p>
              <p className="mt-6 text-[15px] text-ink-muted">
                <Link href="/privacy" className="underline underline-offset-4">Privacy policy</Link>
                <span aria-hidden="true"> · </span>
                <Link href="/terms" className="underline underline-offset-4">Terms</Link>
                <span aria-hidden="true"> · </span>
                <Link href="/contact" className="underline underline-offset-4">Contact form</Link>
              </p>
            </section>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

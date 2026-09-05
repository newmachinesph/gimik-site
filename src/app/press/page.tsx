import type { Metadata } from "next";
import Image from "next/image";

import { site } from "@/data/site";
import { APP_SHOTS } from "@/components/phone/PhoneShot";
import { SectionHead } from "@/components/site/kit";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Boilerplate descriptions, logos and screenshots for anyone writing about Gora.",
  alternates: { canonical: "/press" },
};

const BOILERPLATE = [
  {
    length: "50 words",
    text: "Gora is a mobile app for the plans people keep meaning to make. You keep a list of things you want to do, Gora shows you which friends want the same, and a plan becomes real the moment someone gives it a date. It launches in the Philippines on iPhone and Android.",
  },
  {
    length: "25 words",
    text: "Gora turns “we should do that sometime” into a date on the calendar. Keep what you want to do, see who wants it too, pick a day.",
  },
  {
    length: "One line",
    text: site.slogan,
  },
];

const LOGOS = [
  { src: "/brand/gora-mark.svg", label: "Mark, colour, SVG" },
  { src: "/brand/gora-mark-white.svg", label: "Mark, white, SVG" },
  { src: "/brand/app-icon-color.svg", label: "App icon, SVG" },
];

// A representative spread rather than everything, so a writer can grab a set
// without choosing. These are the same captures the site itself runs on.
const SHOT_KEYS = ["discover", "activity", "someday", "messages"] as const;

export default function PressPage() {
  return (
    <>
      <main id="main-content">
        <section style={{ paddingTop: "calc(var(--header-height) + 56px)" }}>
          <div className="container-page">
            <SectionHead
              eyebrow="Press kit"
              title="Everything you need to write about Gora."
              lede="Take what you need without asking. If you want something that is not here, email us and we will send it."
            />
          </div>
        </section>

        <section className="container-page py-[clamp(56px,7vw,88px)]">
          <Reveal>
            <h2 className="text-[26px] font-bold tracking-[-0.01em]">Boilerplate</h2>
            <div className="mt-8 space-y-6">
              {BOILERPLATE.map((item) => (
                <div key={item.length} className="rounded-[20px] bg-paper-sunk p-7">
                  <p className="mono-label text-ink-muted">{item.length}</p>
                  <p className="mt-4 max-w-[70ch] text-[17px] leading-[1.65]">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container-page pb-[clamp(56px,7vw,88px)]">
          <Reveal>
            <h2 className="text-[26px] font-bold tracking-[-0.01em]">Logos</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {LOGOS.map((logo) => (
                <a
                  key={logo.src}
                  href={logo.src}
                  download
                  className="flex flex-col items-center gap-5 rounded-[20px] border border-rule p-8 transition-colors duration-[160ms] hover:border-ink"
                >
                  <span className="flex h-20 items-center justify-center rounded-2xl bg-night px-8">
                    <Image src={logo.src} alt="" width={40} height={53} aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-medium">{logo.label}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container-page pb-[clamp(72px,9vw,120px)]">
          <Reveal>
            <h2 className="text-[26px] font-bold tracking-[-0.01em]">Screenshots</h2>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.65] text-ink-muted">
              Captures of the shipping build, 1080&times;2190, with the phone
              status and gesture bars removed. Click to download.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              {SHOT_KEYS.map((key) => (
                <a key={key} href={APP_SHOTS[key].file} download className="group block">
                  <span className="block overflow-hidden rounded-[18px] border border-rule">
                    <Image
                      src={APP_SHOTS[key].img}
                      alt={APP_SHOTS[key].alt}
                      sizes="(max-width: 768px) 45vw, 22vw"
                      placeholder="blur"
                      className="h-auto w-full"
                    />
                  </span>
                  <span className="mono-label mt-3 block text-ink-muted group-hover:text-ink">
                    {key}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-rule bg-paper-sunk">
          <div className="container-page py-[clamp(56px,7vw,88px)]">
            <Reveal>
              <h2 className="text-[26px] font-bold tracking-[-0.01em]">Contact</h2>
              <p className="mt-4 text-[17px] leading-[1.65] text-ink-muted">
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="font-medium text-orange-deep underline underline-offset-4"
                >
                  {site.contactEmail}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

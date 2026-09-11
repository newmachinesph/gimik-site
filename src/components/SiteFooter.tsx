import Image from "next/image";
import Link from "next/link";

import footerScene from "../../public/brand/gimik-footer.webp";
import { NAV_LINKS, site } from "@/data/site";
import { GimikLockup } from "./GimikLockup";

// NAV_LINKS are already absolute routes, so they are used as-is. They used to
// be in-page anchors that needed a "/" prefix; keeping that prefix here after
// the nav became real pages produced "//features".
const COLUMNS = [
  {
    title: "Product",
    links: [
      ...NAV_LINKS.map((l) => ({ href: l.href as string, label: l.label as string })),
      { href: "/#get", label: "Get the app" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/press", label: "Press" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-rule">
      <div className="container-page pb-10 pt-16">
        <h2 className="sr-only">Gimik</h2>
        {/* Wordmark scene — mini people ticking off their bucket lists in the
            letters. Background is flattened to exactly var(--paper) so the
            image sits seamlessly on the footer. */}
        <Image
          src={footerScene}
          alt=""
          aria-hidden="true"
          sizes="(max-width: 1024px) 100vw, 980px"
          placeholder="blur"
          className="mx-auto w-full max-w-[980px] select-none"
        />

        <div
          className="mt-14 grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "clamp(32px, 3vw, 48px)",
          }}
        >
          <div>
            <GimikLockup />
            <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.65] text-ink-muted">
              {site.slogan}
            </p>
          </div>
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mono-label text-ink-muted">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-[15px] font-medium transition-colors duration-[160ms] hover:text-orange-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 border-t border-rule"
          style={{ marginTop: 56, paddingTop: 32 }}
        >
          <p className="text-[13px] text-ink-muted">© 2026 Gimik</p>
          <p className="mono-label text-ink-muted">{site.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}

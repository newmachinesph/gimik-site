import Link from "next/link";
import { NAV_LINKS, site } from "@/data/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      ...NAV_LINKS.map((l) => ({ href: `/${l.href}` as string, label: l.label as string })),
      { href: "/#get", label: "Get the app" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/contact", label: "Contact" }],
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
        <h2 className="sr-only">Gora</h2>
        {/* Oversized outline wordmark */}
        <p
          aria-hidden="true"
          className="select-none font-semibold leading-none"
          style={{
            fontSize: "clamp(4rem, 14vw, 12rem)",
            letterSpacing: "-0.035em",
            WebkitTextStroke: "1.5px var(--rule)",
            color: "transparent",
          }}
        >
          Gora
        </p>

        <div
          className="mt-14 grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "clamp(32px, 3vw, 48px)",
          }}
        >
          <div>
            <p className="mono-label text-ink-muted">Gora</p>
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
          <p className="text-[13px] text-ink-muted">© 2026 Gora</p>
          <p className="mono-label text-ink-muted">{site.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}

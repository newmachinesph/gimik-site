import Image from "next/image";
import { site } from "@/data/site";

/**
 * Official store badges, served from `public/badges/`.
 *
 * Both are the vendors' own artwork, downloaded unmodified — Apple's SVG and
 * Google's PNG. Neither may be recoloured, re-proportioned, or redrawn, so the
 * only thing we set is height, and the surrounding clear space is left alone.
 *
 * Google's PNG ships with roughly 10% transparent padding baked in; Apple's SVG
 * has almost none. The two heights below are what make them look the same size.
 */
const BADGE = {
  apple: {
    src: "/badges/app-store.svg",
    w: 119.66,
    h: 40,
    alt: "Download Gora on the App Store",
  },
  google: {
    src: "/badges/google-play.png",
    w: 646,
    h: 250,
    alt: "Get Gora on Google Play",
  },
} as const;

function StoreBadge({
  href,
  badge,
  height,
  bleed = 0,
}: {
  href: string;
  badge: (typeof BADGE)[keyof typeof BADGE];
  height: number;
  bleed?: number;
}) {
  const img = (
    <Image
      src={badge.src}
      alt={badge.alt}
      width={badge.w}
      height={badge.h}
      style={{ height, width: "auto", marginBlock: -bleed }}
      unoptimized
    />
  );

  // Until a store URL exists the badge is shown but not offered as a link — a
  // badge that navigates nowhere is worse than one that plainly says "soon".
  if (!href || href === "#") {
    return (
      <span className="inline-flex flex-col items-start gap-1" aria-disabled="true">
        <span className="opacity-70">{img}</span>
        <span className="mono-label text-[10px] text-ink-muted">Coming soon</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex rounded-lg transition-transform duration-[160ms] hover:-translate-y-0.5 active:translate-y-0"
    >
      {img}
    </a>
  );
}

export function StoreButtons() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <StoreBadge href={site.appStoreUrl} badge={BADGE.apple} height={48} />
      <StoreBadge href={site.googlePlayUrl} badge={BADGE.google} height={69} bleed={10} />
    </div>
  );
}

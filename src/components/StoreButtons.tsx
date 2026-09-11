import Image from "next/image";
import { site } from "@/data/site";

/**
 * Official store badges, served from `public/badges/`.
 *
 * Both are the vendors' own artwork, downloaded unmodified — Apple's SVG and
 * Google's PNG. Neither may be recoloured, re-proportioned, or redrawn, so the
 * only thing we set is height, and the surrounding clear space is left alone.
 *
 * Google's PNG (646×250) ships with a uniform 41px transparent border baked in
 * (visible artwork 564×168, measured from the alpha channel); Apple's SVG has
 * almost none. Each `height`/`bleed` pair below renders the *visible* artwork
 * at 48px and collapses the transparent border out of the layout box, so the
 * row gap and the "Coming soon" label align to the badge users can see.
 */
const BADGE = {
  apple: {
    src: "/badges/app-store.svg",
    w: 119.66,
    h: 40,
    alt: "Download Gimik on the App Store",
  },
  google: {
    src: "/badges/google-play.png",
    w: 646,
    h: 250,
    alt: "Get Gimik on Google Play",
  },
} as const;

function StoreBadge({
  href,
  badge,
  height,
  bleed = 0,
  tone = "dark",
}: {
  href: string;
  badge: (typeof BADGE)[keyof typeof BADGE];
  height: number;
  bleed?: number;
  tone?: "dark" | "light";
}) {
  const img = (
    <Image
      src={badge.src}
      alt={badge.alt}
      width={badge.w}
      height={badge.h}
      style={{ height, width: "auto", margin: -bleed }}
      unoptimized
    />
  );

  // Until a store URL exists the badge is shown but not offered as a link — a
  // badge that navigates nowhere is worse than one that plainly says "soon".
  if (!href || href === "#") {
    return (
      <span className="inline-flex flex-col items-start gap-1" aria-disabled="true">
        <span className="opacity-70">{img}</span>
        <span
          className={`mono-label text-[10px] ${
            tone === "light" ? "text-paper/85" : "text-ink-muted"
          }`}
        >
          Coming soon
        </span>
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

/** `tone="light"` switches the "Coming soon" note for dark/orange surfaces. */
export function StoreButtons({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <StoreBadge href={site.appStoreUrl} badge={BADGE.apple} height={48} tone={tone} />
      {/* 48 / (168/250) image height; bleed = 41px border × the same scale. */}
      <StoreBadge
        href={site.googlePlayUrl}
        badge={BADGE.google}
        height={71.43}
        bleed={11.71}
        tone={tone}
      />
    </div>
  );
}

import { site } from "@/data/site";

/* Deterministic decorative QR-style pattern (placeholder until real store QR). */
const QR_CELLS = [
  "111011010011101",
  "100010111010001",
  "101110001011101",
  "101110100011101",
  "101110010110101",
  "100010110100001",
  "111010101011111",
  "000001110000000",
  "110101001101110",
  "011010110010011",
  "101101011101101",
  "000001101100010",
  "111010011010110",
  "100011010110010",
  "101110110101011",
];

function QrPlaceholder() {
  return (
    <svg
      aria-hidden="true"
      width="92"
      height="92"
      viewBox="0 0 15 15"
      className="hidden shrink-0 rounded-xl border border-rule bg-paper p-2 min-[960px]:block"
    >
      {QR_CELLS.flatMap((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--ink)" />
          ) : null,
        ),
      )}
    </svg>
  );
}

function StoreBadge({
  href,
  eyebrow,
  store,
}: {
  href: string;
  eyebrow: string;
  store: string;
}) {
  return (
    <a
      href={href}
      className="flex min-h-[52px] min-w-[160px] flex-col justify-center rounded-full bg-ink px-7 py-2.5 text-paper transition-transform duration-[160ms] hover:-translate-y-0.5 active:translate-y-0"
    >
      <span className="mono-label block text-[10px] opacity-70">{eyebrow}</span>
      <span className="block text-[17px] font-semibold leading-tight">{store}</span>
      <span className="sr-only">(placeholder link — coming soon)</span>
    </a>
  );
}

export function StoreButtons({ qr = false }: { qr?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StoreBadge href={site.appStoreUrl} eyebrow="Download on the" store="App Store" />
      <StoreBadge href={site.googlePlayUrl} eyebrow="Get it on" store="Google Play" />
      {qr && <QrPlaceholder />}
    </div>
  );
}

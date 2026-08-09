import type { CSSProperties } from "react";

/**
 * The Gora mark: a map pin whose ring breaks on the right to form a G, with a
 * check inside. Paths are copied verbatim from public/brand/gora-mark.svg.
 *
 * The viewBox is cropped to the artwork's real bounds rather than kept at the
 * source file's 1024x1024 canvas. The drawing only occupies 511x678 of that
 * square, so a square box pads the mark with a quarter of its own width of
 * nothing on each side — which is why the header's `gap-2.5` used to read as a
 * 20px gap, and why the mark looked small for its declared size. Cropped, the
 * element's box *is* the ink, so spacing and alignment can be reasoned about.
 */
const MARK_VIEW_BOX = "257.23 173.16 510.64 677.91";
const MARK_ASPECT = 510.64 / 677.91;

/**
 * Geist's cap height, measured from the subset this app actually ships: the
 * ink of a flat-topped `H` set at 100px is 71px tall. Everything below is
 * expressed against the cap band, because that — not the line box — is what
 * the eye reads as the top and bottom of the word.
 */
const CAP_HEIGHT_EM = 0.71;

/**
 * Mark ink height as a multiple of the wordmark's cap height. Preserves the
 * proportion the header already had (22.5px of pin against 13.5px caps); the
 * footer used to run a different ratio, and now shares this one.
 */
const MARK_HEIGHT_IN_CAPS = 1.667;

/** Space between mark and wordmark, as a multiple of cap height. */
const GAP_IN_CAPS = 0.62;

export function GoraMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={MARK_VIEW_BOX}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path d="M 408.65 195.67 C 456.16 173.64 510.69 167.87 561.97 177.95 C 637.30 192.49 704.02 243.88 738.80 312.06 C 749.86 333.53 758.52 356.41 762.78 380.24 C 736.74 380.31 710.70 380.30 684.66 380.29 C 674.32 344.40 652.51 311.94 623.29 288.70 C 595.00 265.78 559.40 251.85 523.00 250.09 C 476.79 246.95 429.81 263.49 395.38 294.41 C 362.99 322.48 341.63 362.64 335.70 405.03 C 329.22 448.07 338.59 493.30 361.79 530.14 C 383.60 565.05 417.76 592.19 456.97 604.90 C 475.92 611.35 496.03 614.23 516.02 613.69 C 553.14 613.46 589.88 600.61 619.47 578.30 C 644.73 559.20 664.73 533.37 677.29 504.33 C 663.38 504.17 649.48 504.32 635.57 504.26 C 635.41 480.58 635.55 456.89 635.54 433.21 C 679.65 433.27 723.75 433.19 767.86 433.24 C 768.42 496.25 745.39 558.86 705.34 607.37 C 681.60 635.89 657.28 663.92 633.71 692.58 C 591.41 743.81 549.01 795.22 512.86 851.07 C 492.36 820.29 470.80 790.21 447.75 761.29 C 411.37 715.15 373.42 670.30 335.41 625.51 C 322.97 610.81 310.20 596.23 300.11 579.76 C 277.84 544.59 263.45 504.36 259.07 462.93 C 252.77 410.52 262.71 356.19 287.80 309.69 C 314.28 259.94 357.29 218.99 408.65 195.67 Z" />
      <path d="M 588.40 349.11 C 598.35 359.35 608.38 369.52 618.20 379.89 C 592.16 406.59 566.24 433.40 540.11 460.01 C 521.73 479.23 502.87 497.99 484.61 517.32 C 458.06 490.06 431.57 462.70 405.30 435.17 C 415.36 424.79 425.47 414.45 435.65 404.18 C 451.82 421.31 468.38 438.07 484.67 455.09 C 519.09 419.61 553.65 384.27 588.40 349.11 Z" />
    </svg>
  );
}

/**
 * Mark plus wordmark, defined once and shared by the header and the footer so
 * the two can't drift apart again.
 *
 * Vertical alignment is done against the baseline and the cap band, not
 * against boxes. `items-baseline` parks the mark's bottom edge on the text
 * baseline, then a single translate of half the overhang re-centres it on the
 * cap band — so the pin sits exactly as far above the cap line as it does
 * below the baseline, whatever size the lockup is drawn at.
 *
 * `size` is the wordmark's font size in px; the mark scales from it.
 */
export function GoraLockup({
  size = 19,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const cap = size * CAP_HEIGHT_EM;
  const markHeight = cap * MARK_HEIGHT_IN_CAPS;
  const overhang = (markHeight - cap) / 2;

  return (
    <span
      className={`inline-flex items-baseline ${className ?? ""}`}
      style={{ fontSize: size, gap: cap * GAP_IN_CAPS }}
    >
      <GoraMark
        className="shrink-0 text-orange"
        style={{
          height: markHeight,
          width: markHeight * MARK_ASPECT,
          // Layout puts the mark's bottom on the baseline; this drops it by the
          // overhang so its centre lands on the centre of the cap band.
          transform: `translateY(${overhang}px)`,
          // The transform is paint-only, so the mark's visual bottom now sits
          // below its layout box. Reclaim that space to keep the lockup's
          // measured height honest for whatever lays it out.
          marginBottom: overhang,
          marginTop: -overhang,
        }}
      />
      <span className="font-semibold leading-none tracking-[-0.02em]">Gora</span>
    </span>
  );
}

import type { ReactNode } from "react";

/**
 * Chassis height, in the same units as the 375px width.
 *
 * This is not an arbitrary iPhone dimension: it is derived from the captures.
 * The device shoots 1080x2190 once its status and gesture bars are cropped, so
 * at 375 wide a screen is 760 tall; STATUS_BAND in PhoneShot adds 44 for the
 * Dynamic Island. A frame any shorter would cover the app's own tab bar, which
 * is the part of most screens the page is trying to show.
 */
const SCREEN_H = 804;

/**
 * iPhone chassis (spec §6). Coplanar only — no rotation, no fanning, no
 * per-phone z-offset.
 *
 * The chassis is decoration and stays hidden from assistive tech. Pass `label`
 * when the screen inside is a real app capture: the frame then announces itself
 * as one image describing that screen, instead of the reader meeting a stack of
 * unlabelled boxes.
 */
export function PhoneFrame({
  children,
  scale = 1,
  className = "",
  label,
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`shrink-0 ${className}`}
      style={{ width: 375 * scale, height: SCREEN_H * scale }}
    >
      <div
        className="relative bg-paper"
        style={{
          width: 375,
          height: SCREEN_H,
          borderRadius: 52,
          boxShadow: "var(--shadow-phone)",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 z-50 -translate-x-1/2 bg-night"
          style={{ width: 126, height: 37, borderRadius: 24, top: 12 }}
        />
        {/* Screen content — clipping lives on this frame layer via clip-path,
            never overflow:hidden (it breaks backdrop-filter on descendants). */}
        <div
          className="flex h-full w-full flex-col"
          style={{ clipPath: "inset(0 round 52px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

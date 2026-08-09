import type { ReactNode } from "react";

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
      style={{ width: 375 * scale, height: 780 * scale }}
    >
      <div
        className="relative bg-paper"
        style={{
          width: 375,
          height: 780,
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
        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 z-[60] -translate-x-1/2 bg-ink opacity-80"
          style={{ width: 139, height: 5, borderRadius: 100 }}
        />
      </div>
    </div>
  );
}

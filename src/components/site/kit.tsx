import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { APP_SHOTS, PhoneShot, type ShotName } from "@/components/phone/PhoneShot";

/**
 * The pieces every section on the site is built from.
 *
 * They exist so the landing page and /features cannot drift apart: both render
 * the same FeatureBlock over the same data, so a change to how a feature reads
 * happens once. Nothing here holds content of its own.
 */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mono-label text-ink-muted">{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-[62ch] text-center" : "max-w-[62ch]"}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className="display-head mt-5 font-bold"
        style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-6 text-ink-muted ${centered ? "mx-auto" : ""}`}
          style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.6 }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A phone on a tinted ground. `tone` is the whole argument the site makes:
 * sky for a someday that has no date, orange once it has one.
 */
export function Stage({
  shot,
  tone = "sky",
  scale = 0.72,
  preload = false,
}: {
  shot: ShotName;
  tone?: "sky" | "orange" | "night" | "paper";
  scale?: number;
  preload?: boolean;
}) {
  const ground = {
    sky: "color-mix(in srgb, var(--sky) 16%, var(--paper))",
    orange: "color-mix(in srgb, var(--orange) 14%, var(--paper))",
    night: "var(--night)",
    paper: "var(--paper-sunk)",
  }[tone];

  return (
    <div
      className="flex justify-center rounded-[28px] px-6 py-12 sm:px-10"
      style={{ background: ground }}
    >
      <PhoneFrame scale={scale} label={APP_SHOTS[shot].alt}>
        {/* scale reaches PhoneShot as well as PhoneFrame: the frame uses it to
            draw the chassis, the shot uses it to ask for a capture the size it
            will actually be painted at. */}
        <PhoneShot name={shot} scale={scale} preload={preload} />
      </PhoneFrame>
    </div>
  );
}

/**
 * One feature: copy on one side, the real screen on the other. `flip` alternates
 * the side so a column of these does not read as a table.
 */
export function FeatureBlock({
  eyebrow,
  title,
  body,
  points,
  shot,
  tone = "sky",
  flip = false,
  preload = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: readonly string[];
  shot: ShotName;
  tone?: "sky" | "orange" | "night" | "paper";
  flip?: boolean;
  preload?: boolean;
}) {
  return (
    <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
      <Reveal className={flip ? "lg:order-2" : undefined}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3
          className="display-head mt-5 font-bold"
          style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}
        >
          {title}
        </h3>
        <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted">{body}</p>
        <ul className="mt-8 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-[16px] leading-[1.55]">
              <span aria-hidden="true" className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-orange" />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.08} className={flip ? "lg:order-1" : undefined}>
        <Stage shot={shot} tone={tone} preload={preload} />
      </Reveal>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { PhoneFrame } from "./phone/PhoneFrame";
import { APP_SHOTS, PhoneShot } from "./phone/PhoneShot";
import { StoreButtons } from "./StoreButtons";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Clipped-wrapper title line rise (spec §4.1 choreography). */
function TitleLine({
  children,
  ready,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  ready: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduced ? { opacity: 0 } : { y: "110%" }}
        animate={ready ? (reduced ? { opacity: 1 } : { y: 0 }) : undefined}
        transition={{ duration: reduced ? 0.15 : 0.76, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    // Gate the entrance on fonts, with a 5s safety timeout (spec §9).
    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]).then(() => {
      if (cancelled) return;
      setReady(true);
      swapTimer = setTimeout(() => setSwapped(true), 1400);
    });
    return () => {
      cancelled = true;
      clearTimeout(swapTimer);
    };
  }, []);

  return (
    <section
      aria-label="Gora — plans with people you like"
      className="relative flex flex-col justify-end"
      style={{ minHeight: "100svh", paddingTop: "var(--header-height)" }}
    >
      {/* Atmosphere: one static sky wash behind the phone — the "someday" zone.
          Clipped in its own layer so the phone can still bleed past the fold. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[12%] top-[14%] h-[680px] w-[680px] rounded-full opacity-25"
          style={{ background: "radial-gradient(closest-side, var(--sky), transparent 72%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 border-b border-rule" />
      </div>
      <div className="container-page relative grid w-full grid-cols-1 items-end gap-x-8 pb-12 min-[960px]:grid-cols-12 min-[960px]:pb-0">
        {/* Copy — lower-left, columns 1–8 */}
        <div className="min-[960px]:col-span-8 min-[960px]:pb-16">
          <motion.p
            className="mono-label text-ink-muted"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.52, ease: EASE_OUT, delay: 0.12 }}
          >
            <span className="mr-4 inline-block h-px w-6 translate-y-[-4px] bg-orange" />
            Gora — plans with people you like
          </motion.p>

          <h1
            className="mt-6 font-semibold"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
            <TitleLine ready={ready} delay={0.2} reduced={reduced}>
              We should do
            </TitleLine>
            <TitleLine ready={ready} delay={0.32} reduced={reduced}>
              <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
                that
                {/* The concept, performed: sometime → a real date */}
                {/* Both spans stay mounted in one stacked grid cell, so the
                    slot's width never changes — no layout shift on swap. */}
                <span
                  className="relative inline-grid items-center align-baseline"
                  aria-label="sometime — now a real date"
                >
                  <motion.span
                    className="serif-accent text-sky-deep [grid-area:1/1]"
                    animate={
                      swapped
                        ? reduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: -14 }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: reduced ? 0.15 : 0.26, ease: EASE_OUT }}
                  >
                    sometime
                  </motion.span>
                  <motion.span
                    className="justify-self-start self-center whitespace-nowrap font-mono font-medium uppercase text-orange-deep [grid-area:1/1]"
                    style={{ fontSize: "0.38em", letterSpacing: "0.06em" }}
                    initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                    animate={
                      swapped
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: reduced ? 0 : 18 }
                    }
                    transition={{ duration: reduced ? 0.15 : 0.52, ease: EASE_OUT }}
                  >
                    SAT 14 MAR · 9:00
                  </motion.span>
                </span>
              </span>
            </TitleLine>
          </h1>

          <motion.p
            className="mt-8 max-w-[46ch] text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.65] text-ink-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.52, ease: EASE_OUT, delay: 0.42 }}
          >
            Gora turns the ideas sitting in your group chat into plans with a
            date on them. Solo, with one person, or with everyone.
          </motion.p>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.52, ease: EASE_OUT, delay: 0.49 }}
          >
            <StoreButtons />
          </motion.div>
        </div>

        {/* Phone — lower-right, coplanar, desktop only */}
        <motion.div
          className="hidden justify-end self-end min-[960px]:col-span-4 min-[960px]:flex"
          initial={{ opacity: 0, y: 80 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.6 }}
        >
          <div className="translate-y-[88px]">
            <PhoneFrame scale={0.72} label={APP_SHOTS.list.alt}>
              <PhoneShot name="list" priority />
            </PhoneFrame>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "./phone/PhoneFrame";
import { APP_SHOTS, PhoneShot } from "./phone/PhoneShot";
import { StoreButtons } from "./StoreButtons";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const TIMES = [
  "09:00",
  "10:30",
  "12:00",
  "14:30",
  "17:00",
  "18:30",
  "20:00",
  "21:30",
] as const;

/** 1 December is a Tuesday in our reference year. We never print the year, but
 *  anchoring to a real one keeps weekday and date honest with each other. */
const DEC_FIRST_WEEKDAY = 2;
const DEC_DAYS = 31;
/** How long a date sits before the plan reshuffles. */
const SLOT_INTERVAL_MS = 2600;

/** Fixed-width by construction — 3 + 2 + 3 + 5 glyphs in mono — so the chip
 *  never resizes as dates cycle. */
function formatSlot(day: number, time: string) {
  const weekday = WEEKDAYS[(DEC_FIRST_WEEKDAY + day - 1) % 7];
  return `${weekday} ${String(day).padStart(2, "0")} DEC · ${time}`;
}

const FIRST_DAY = 13;
const FIRST_SLOT = formatSlot(FIRST_DAY, "18:30");

function randomOtherDay(current: number) {
  let day = current;
  while (day === current) day = 1 + Math.floor(Math.random() * DEC_DAYS);
  return day;
}

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
  const [slot, setSlot] = useState(FIRST_SLOT);
  const dayRef = useRef(FIRST_DAY);

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

  // Once the date has landed it keeps reshuffling — the plan is never the same
  // one twice. Auto-updating text is motion, so reduced-motion holds one date.
  useEffect(() => {
    if (!swapped || reduced) return;
    const cycle = setInterval(() => {
      const day = randomOtherDay(dayRef.current);
      dayRef.current = day;
      setSlot(formatSlot(day, TIMES[Math.floor(Math.random() * TIMES.length)]));
    }, SLOT_INTERVAL_MS);
    return () => clearInterval(cycle);
  }, [swapped, reduced]);

  return (
    <section
      aria-label="Gora — plans with people you like"
      className="relative flex flex-col"
      // border-box: the header padding is inside the 100svh, so hero + fixed
      // navbar together fill exactly the first viewport.
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
      <div className="container-page relative grid w-full flex-1 grid-cols-1 items-center gap-x-8 pb-12 min-[960px]:grid-cols-12 min-[960px]:pb-0">
        {/* Copy — columns 1–8, vertically centered in the space under the
            navbar; the phone column stays planted on the fold via self-end. */}
        <div className="min-[960px]:col-span-8">
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
                {/* The concept, performed: "sometime" stays on the page and
                    gets crossed off, then the real date lands beside it. */}
                {/* nowrap: the h1 sets overflow-wrap:anywhere for narrow
                    screens, and a break inside this word would leave the
                    absolutely-positioned strike drawn across the wrong box. */}
                <span className="relative inline-block whitespace-nowrap serif-accent text-sky-deep">
                  sometime
                  {/* Drawn as a rule rather than text-decoration so it can
                      sweep left-to-right — the gesture of crossing something
                      off, not a word that arrives pre-struck. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.52em] h-[0.055em] w-full origin-left rounded-full bg-sky-deep"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: swapped ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.15 : 0.46, ease: EASE_OUT }}
                  />
                </span>
                <motion.span
                  className="font-mono font-medium uppercase"
                  // Floor the chip in rem: at the h1's 3rem minimum a pure
                  // 0.3em lands at 14px, too small for the line the whole
                  // hero is built around.
                  style={{ fontSize: "max(1.05rem, 0.3em)", letterSpacing: "0.06em" }}
                  initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                  animate={
                    swapped
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: reduced ? 0 : 18 }
                  }
                  transition={{ duration: reduced ? 0.15 : 0.52, ease: EASE_OUT }}
                >
                  {/* Perforated stub (see .date-ticket). The dates rolling
                      through it are decorative — the sentence reads without
                      them, so they stay out of the accessibility tree. */}
                  <span className="date-ticket" aria-hidden="true">
                    <span className="inline-grid overflow-hidden leading-[1.3]">
                      {/* A split-flap roll. The two rows travel a full box
                          height on the same curve, so they tile exactly —
                          one is always arriving as the other leaves and the
                          stub never shows a half-cut date or an empty slot. */}
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={slot}
                          className="whitespace-nowrap [grid-area:1/1]"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "-100%" }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                        >
                          {slot}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </motion.span>
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

        {/* Phone — right column, vertically centered, desktop only. After the
            entrance it keeps a slow 3D drift (float + tilt) so the mockup
            feels alive without stealing attention from the copy. */}
        <motion.div
          className="hidden justify-end self-center min-[960px]:col-span-4 min-[960px]:flex"
          initial={{ opacity: 0, y: 80 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.6 }}
        >
          <div style={{ perspective: 1200 }}>
            <motion.div
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              animate={
                reduced
                  ? undefined
                  : {
                      rotateY: [-5, 5, -5],
                      rotateX: [1.5, -1.5, 1.5],
                      y: [-7, 7, -7],
                    }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneFrame scale={0.72} label={APP_SHOTS.list.alt}>
                <PhoneShot name="list" priority />
              </PhoneFrame>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

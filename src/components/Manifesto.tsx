"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const SENTENCE =
  "Your group chat has forty good ideas in it. None of them have a date. That is the only problem Gora solves.";

const WORDS = SENTENCE.split(" ");

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Word i finishes turning on at (i+1)/total, over a window of ~2 words.
  const start = index / total;
  const end = (index + 1) / total;
  // 0.2 floor makes un-revealed words read as clearly "off" next to full ink.
  // The real sentence lives in the sr-only span (this one is aria-hidden), so
  // the dimmed state carries no contrast requirement of its own.
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Track the text block itself, not the 100svh section around it: the reveal
    // starts as the text enters (top at 85% of the viewport) and completes
    // while it is still fully on screen (top at 40%). The old section-based
    // range only reached 1 after the text had scrolled past the top edge.
    offset: ["start 0.85", "start 0.4"],
  });

  return (
    <section className="flex items-center" style={{ minHeight: "100svh" }}>
      <div ref={ref} className="container-page">
        <p
          className="mx-auto max-w-[24ch] text-center font-medium"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          {reduced ? (
            SENTENCE
          ) : (
            <>
              <span className="sr-only">{SENTENCE}</span>
              <span aria-hidden="true">
                {WORDS.map((word, i) => (
                  <Word
                    key={i}
                    word={word}
                    index={i}
                    total={WORDS.length}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

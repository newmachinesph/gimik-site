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
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
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
    offset: ["start 0.8", "end 0.45"],
  });

  return (
    <section
      ref={ref}
      className="flex items-center"
      style={{ minHeight: "100svh" }}
    >
      <div className="container-page">
        <p
          aria-label={SENTENCE}
          className="mx-auto max-w-[24ch] text-center font-medium"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          {reduced
            ? SENTENCE
            : WORDS.map((word, i) => (
                <Word
                  key={i}
                  word={word}
                  index={i}
                  total={WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useScroll, type MotionValue } from "motion/react";

/** 0–1 document scroll progress, for the header progress line. */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

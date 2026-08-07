"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { chapters, type Chapter } from "@/data/chapters";
import { PhoneFrame } from "./phone/PhoneFrame";
import { SomedayList } from "./phone/screens/SomedayList";
import { Matching } from "./phone/screens/Matching";
import { Locked } from "./phone/screens/Locked";
import { Reveal } from "./Reveal";

const SCREENS: Record<Chapter["id"], () => ReactNode> = {
  add: () => <SomedayList />,
  match: () => <Matching />,
  lock: () => <Locked />,
};

function ChapterCopy({ chapter }: { chapter: Chapter }) {
  return (
    <Reveal>
      <p className="mono-label text-ink-muted">{chapter.number}</p>
      <h3
        className="display-head mt-4 font-semibold"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
      >
        {chapter.title}
      </h3>
      <p className="mt-6 max-w-[52ch] text-[clamp(1rem,1vw,1.125rem)] leading-[1.65] text-ink-muted">
        {chapter.body}
      </p>
    </Reveal>
  );
}

export function HowItWorks() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Chapter["id"]>("add");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes =
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-chapter]");
    if (!nodes || nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute("data-chapter") as Chapter["id"]);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const ActiveScreen = SCREENS[active];

  return (
    <section
      id="how"
      ref={sectionRef}
      className="below-fold"
      style={{ paddingBlock: "clamp(96px, 12vw, 176px)" }}
    >
      <div className="container-page">
        <Reveal>
          <p className="mono-label text-orange-deep">How it works</p>
          <h2
            className="display-head mt-4 max-w-[16ch] font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            From <span className="serif-accent font-normal text-sky-deep">someday</span>{" "}
            to a date, in three moves.
          </h2>
        </Reveal>

        {/* Desktop: sticky phone left, scrolling chapters right */}
        <div className="mt-20 hidden grid-cols-12 gap-x-8 min-[960px]:grid">
          <div className="col-span-7">
            <div
              className="sticky flex justify-center"
              style={{ top: "calc(var(--header-height) + 24px)" }}
            >
              <PhoneFrame scale={0.82}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0.15 : 0.36 }}
                  >
                    <ActiveScreen />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </div>
          <div className="col-span-5">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                data-chapter={chapter.id}
                className="flex flex-col justify-center"
                style={{ minHeight: "72vh" }}
              >
                <ChapterCopy chapter={chapter} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: phone above each chapter, normal flow */}
        <div className="mt-16 space-y-24 min-[960px]:hidden">
          {chapters.map((chapter) => {
            const Screen = SCREENS[chapter.id];
            return (
              <div key={chapter.id}>
                <div className="mb-10 flex justify-center">
                  <PhoneFrame scale={0.68}>{Screen()}</PhoneFrame>
                </div>
                <ChapterCopy chapter={chapter} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

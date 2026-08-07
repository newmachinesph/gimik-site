"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { modes, type Mode } from "@/data/modes";
import { Reveal } from "./Reveal";

/** Solo · Duo · Group on night ground — the single hard contrast break. */
export function Modes() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<Mode["id"]>("solo");
  const tabRefs = useRef(new Map<Mode["id"], HTMLButtonElement>());

  const active = modes.find((m) => m.id === activeId) ?? modes[0];

  function onTablistKeyDown(e: React.KeyboardEvent) {
    const index = modes.findIndex((m) => m.id === activeId);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % modes.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + modes.length) % modes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = modes.length - 1;
    if (next !== null) {
      e.preventDefault();
      const mode = modes[next];
      setActiveId(mode.id);
      tabRefs.current.get(mode.id)?.focus();
    }
  }

  return (
    <section
      id="modes"
      className="below-fold bg-night text-paper"
      style={{ paddingBlock: "clamp(112px, 14vw, 192px)" }}
    >
      <div className="container-page">
        <Reveal>
          <p className="mono-label" style={{ color: "var(--sky)" }}>
            Three ways to go
          </p>
          <h2
            className="display-head mt-4 max-w-[18ch] font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Alone counts. Two counts. Everyone counts.
          </h2>
        </Reveal>

        <div
          role="tablist"
          aria-label="Plan modes"
          onKeyDown={onTablistKeyDown}
          className="mt-14 flex gap-2 border-b"
          style={{ borderColor: "var(--rule-invert)" }}
        >
          {modes.map((mode) => {
            const selected = mode.id === activeId;
            return (
              <button
                key={mode.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(mode.id, el);
                  else tabRefs.current.delete(mode.id);
                }}
                role="tab"
                id={`mode-tab-${mode.id}`}
                aria-selected={selected}
                aria-controls={`mode-panel-${mode.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(mode.id)}
                className={`relative min-h-[52px] px-5 pb-4 text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium transition-colors duration-[160ms] ${
                  selected ? "text-paper" : "text-paper/50 hover:text-paper/80"
                }`}
              >
                {mode.label}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-[-1px] h-[2px] origin-left bg-orange"
                  initial={false}
                  animate={{ scaleX: selected ? 1 : 0 }}
                  transition={{
                    duration: reduced ? 0.15 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="min-h-[280px] min-[640px]:min-h-[240px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              role="tabpanel"
              id={`mode-panel-${active.id}`}
              aria-labelledby={`mode-tab-${active.id}`}
              className="pt-12"
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="font-semibold"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.02em" }}
              >
                {active.heading}
              </h3>
              <p className="mt-5 max-w-[52ch] text-[clamp(1rem,1vw,1.125rem)] leading-[1.65] text-paper/70">
                {active.body}
              </p>
              <p className="mono-label mt-8" style={{ color: "var(--sky)" }}>
                {active.example}
              </p>
              {active.openToJoin && (
                <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.65] text-paper/50">
                  {active.openToJoin}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

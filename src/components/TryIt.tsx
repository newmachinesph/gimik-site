"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import {
  useDragToSchedule,
  type DayCell,
  type SomedayCard,
} from "@/hooks/useDragToSchedule";
import { Reveal } from "./Reveal";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const; // the ONLY spring on the page

const CARDS: SomedayCard[] = [
  { id: "surf", title: "Surf lesson", plannedDay: null },
  { id: "market", title: "Night market run", plannedDay: null },
  { id: "pottery", title: "Pottery class", plannedDay: null },
];

const DAYS: DayCell[] = [
  { index: 0, short: "MON", date: "9 MAR", announce: "Monday 9 March" },
  { index: 1, short: "TUE", date: "10 MAR", announce: "Tuesday 10 March" },
  { index: 2, short: "WED", date: "11 MAR", announce: "Wednesday 11 March" },
  { index: 3, short: "THU", date: "12 MAR", announce: "Thursday 12 March" },
  { index: 4, short: "FRI", date: "13 MAR", announce: "Friday 13 March" },
  { index: 5, short: "SAT", date: "14 MAR", announce: "Saturday 14 March" },
  { index: 6, short: "SUN", date: "15 MAR", announce: "Sunday 15 March" },
];

export function TryIt() {
  const reduced = useReducedMotion() ?? false;
  const drag = useDragToSchedule(CARDS, DAYS);
  const [listbox, setListbox] = useState<{ cardId: string; active: number } | null>(
    null,
  );
  const listboxRef = useRef<HTMLUListElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const movedRef = useRef(false);

  const unplanned = drag.cards.filter((c) => c.plannedDay === null);

  function openListbox(cardId: string) {
    setListbox({ cardId, active: 5 }); // start on Saturday
    requestAnimationFrame(() => listboxRef.current?.focus());
  }

  function closeListbox(refocusCardId?: string) {
    setListbox(null);
    if (refocusCardId) cardRefs.current.get(refocusCardId)?.focus();
  }

  function onListboxKeyDown(e: React.KeyboardEvent, cardId: string) {
    if (!listbox) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeListbox(cardId);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setListbox({ cardId, active: Math.min(6, listbox.active + 1) });
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setListbox({ cardId, active: Math.max(0, listbox.active - 1) });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      drag.keyboardPlan(cardId, listbox.active);
      setListbox(null);
      counterRef.current?.focus();
    }
  }

  return (
    <section
      aria-label="Try it — drag a someday onto a day"
      className="below-fold bg-paper-sunk"
      style={{ paddingBlock: "clamp(88px, 10vw, 152px)" }}
    >
      <div className="container-page">
        <Reveal>
          <p className="mono-label text-orange-deep">Try it</p>
          <h2
            className="display-head mt-4 max-w-[18ch] font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Drag a{" "}
            <span className="serif-accent font-normal text-sky-deep">someday</span>{" "}
            onto a day.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[clamp(1rem,1vw,1.125rem)] leading-[1.65] text-ink-muted">
            This is the whole app in one move. Keyboard works too — press Enter
            on a card and pick a day.
          </p>
        </Reveal>

        {/* Screen-reader outcome announcements */}
        <p role="status" className="sr-only">
          {drag.liveMessage}
        </p>

        {/* Someday shelf */}
        <div className="mt-16 flex min-h-[132px] flex-wrap items-start gap-4">
          <AnimatePresence>
            {unplanned.map((card) => {
              const isDragging = drag.dragging === card.id;
              const isOpen = listbox?.cardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  className="relative"
                  exit={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.button
                    ref={(el) => {
                      if (el) cardRefs.current.set(card.id, el);
                      else cardRefs.current.delete(card.id);
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-label={`${card.title} — someday. Press Enter to pick a day.`}
                    className={`block min-h-[112px] w-[228px] cursor-grab rounded-2xl bg-sky p-5 text-left text-ink ${
                      isDragging ? "z-50 cursor-grabbing shadow-2xl" : ""
                    }`}
                    style={{ touchAction: "none", userSelect: "none", willChange: "transform" }}
                    animate={{
                      x: isDragging ? drag.dragOffset.x : 0,
                      y: isDragging ? drag.dragOffset.y : 0,
                      scale: isDragging && !reduced ? 1.04 : 1,
                    }}
                    transition={
                      isDragging
                        ? { duration: 0 } // transitions off while dragging
                        : { duration: reduced ? 0.15 : 0.48, ease: EASE_OUT } // snap-back
                    }
                    onPointerDown={(e) => {
                      if (e.pointerType === "mouse" && e.button !== 0) return;
                      movedRef.current = false;
                      drag.startDrag(card.id, e);
                    }}
                    onPointerMove={(e) => {
                      if (drag.dragging === card.id) {
                        movedRef.current = true;
                        drag.moveDrag(e);
                      }
                    }}
                    onPointerUp={() => drag.endDrag()}
                    onPointerCancel={() => drag.endDrag()}
                    onClick={() => {
                      // A real click (not the tail of a drag) opens the keyboard path.
                      if (!movedRef.current) openListbox(card.id);
                    }}
                  >
                    <span className="mono-label block text-[10px] text-sky-deep">
                      someday
                    </span>
                    <span className="serif-accent mt-2 block text-[26px] leading-tight">
                      {card.title}
                    </span>
                  </motion.button>

                  {isOpen && (
                    <ul
                      ref={listboxRef}
                      role="listbox"
                      tabIndex={-1}
                      aria-label={`Pick a day for ${card.title}`}
                      aria-activedescendant={`day-option-${listbox.active}`}
                      className="absolute left-0 top-[calc(100%+8px)] z-[70] w-[228px] rounded-2xl border border-rule bg-paper p-2 shadow-xl outline-none"
                      onKeyDown={(e) => onListboxKeyDown(e, card.id)}
                      onBlur={() => setListbox(null)}
                    >
                      {DAYS.map((day) => (
                        <li
                          key={day.index}
                          id={`day-option-${day.index}`}
                          role="option"
                          aria-selected={listbox.active === day.index}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-[14px] ${
                            listbox.active === day.index
                              ? "bg-orange font-semibold text-ink"
                              : "text-ink-muted"
                          }`}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            drag.keyboardPlan(card.id, day.index);
                            setListbox(null);
                          }}
                        >
                          <span>{day.announce}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {unplanned.length === 0 && (
            <p className="serif-accent self-center text-[26px] text-ink-muted">
              Nothing left to put off.
            </p>
          )}
        </div>

        {/* Week strip */}
        <div className="mt-12 grid snap-x snap-proximity auto-cols-[minmax(120px,1fr)] grid-flow-col gap-2 overflow-x-auto pb-2 min-[640px]:grid-flow-row min-[640px]:grid-cols-7 min-[640px]:overflow-visible">
          {DAYS.map((day) => {
            const planned = drag.cards.filter((c) => c.plannedDay === day.index);
            const isTarget = drag.hoverDay === day.index;
            return (
              <div
                key={day.index}
                data-day-cell={day.index}
                className={`min-h-[150px] snap-start rounded-2xl border p-3 transition-colors duration-[160ms] ${
                  isTarget
                    ? "border-orange bg-orange/10"
                    : "border-rule bg-paper"
                }`}
              >
                <p className="mono-label text-[10px] text-ink-muted">
                  {day.short} <span className="opacity-60">{day.date.split(" ")[0]}</span>
                </p>
                <div className="mt-2 space-y-2">
                  {planned.map((card) => (
                    <motion.div
                      key={card.id}
                      className="rounded-xl bg-orange p-3 text-ink"
                      initial={
                        reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        reduced
                          ? { duration: 0.15 }
                          : { duration: 0.42, ease: EASE_SPRING } // lock confirmation
                      }
                    >
                      <span className="mono-label block text-[9px]">
                        {day.short} {day.date} · 9:00
                      </span>
                      <span className="mt-1 block text-[15px] font-semibold leading-tight">
                        {card.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter */}
        <div className="mt-8 flex items-center gap-6">
          <p
            ref={counterRef}
            tabIndex={-1}
            className="mono-label text-ink-muted outline-none"
          >
            {drag.plannedCount} of {CARDS.length} planned
          </p>
          {drag.plannedCount === CARDS.length && (
            <button
              onClick={drag.reset}
              className="mono-label min-h-[44px] text-orange-deep underline underline-offset-4"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

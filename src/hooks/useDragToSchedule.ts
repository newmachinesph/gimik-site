"use client";

import { useCallback, useRef, useState } from "react";

export type SomedayCard = {
  id: string;
  title: string;
  plannedDay: number | null;
};

export type DayCell = {
  index: number;
  short: string; // "SAT"
  date: string; // "14 MAR"
  announce: string; // "Saturday 14 March"
};

const COMMIT_THRESHOLD_PX = 80;

export function useDragToSchedule(initial: SomedayCard[], days: DayCell[]) {
  const [cards, setCards] = useState<SomedayCard[]>(initial);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoverDay, setHoverDay] = useState<number | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const grabPoint = useRef({ x: 0, y: 0 });
  const cardCenter = useRef({ x: 0, y: 0 });
  const cellCenters = useRef<{ index: number; x: number; y: number }[]>([]);

  const measureCells = useCallback(() => {
    cellCenters.current = days
      .map((day) => {
        const el = document.querySelector<HTMLElement>(
          `[data-day-cell="${day.index}"]`,
        );
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          index: day.index,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      })
      .filter((c): c is { index: number; x: number; y: number } => c !== null);
  }, [days]);

  const nearestDay = useCallback((cx: number, cy: number): number | null => {
    let best: number | null = null;
    let bestDist = Infinity;
    for (const cell of cellCenters.current) {
      const dist = Math.hypot(cell.x - cx, cell.y - cy);
      if (dist < bestDist) {
        bestDist = dist;
        best = cell.index;
      }
    }
    return bestDist <= COMMIT_THRESHOLD_PX ? best : null;
  }, []);

  const commit = useCallback(
    (id: string, dayIndex: number) => {
      const card = cards.find((c) => c.id === id);
      const day = days.find((d) => d.index === dayIndex);
      if (!card || !day) return;
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, plannedDay: dayIndex } : c)),
      );
      setLiveMessage(`${card.title} planned for ${day.announce}`);
    },
    [cards, days],
  );

  const startDrag = useCallback(
    (id: string, e: React.PointerEvent) => {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Synthetic or already-released pointers can't be captured; the drag
        // still works, it just loses capture outside the element.
      }
      const rect = e.currentTarget.getBoundingClientRect();
      grabPoint.current = { x: e.clientX, y: e.clientY };
      cardCenter.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      measureCells();
      setDragging(id);
      setDragOffset({ x: 0, y: 0 });
      setHoverDay(null);
    },
    [measureCells],
  );

  const moveDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - grabPoint.current.x;
      const dy = e.clientY - grabPoint.current.y;
      setDragOffset({ x: dx, y: dy });
      setHoverDay(nearestDay(cardCenter.current.x + dx, cardCenter.current.y + dy));
    },
    [dragging, nearestDay],
  );

  const endDrag = useCallback(() => {
    if (!dragging) return;
    if (hoverDay !== null) {
      commit(dragging, hoverDay);
    }
    setDragging(null);
    setDragOffset({ x: 0, y: 0 });
    setHoverDay(null);
  }, [dragging, hoverDay, commit]);

  const keyboardPlan = useCallback(
    (id: string, dayIndex: number) => commit(id, dayIndex),
    [commit],
  );

  const reset = useCallback(() => {
    setCards(initial);
    setLiveMessage("List reset — nothing planned yet");
  }, [initial]);

  return {
    cards,
    plannedCount: cards.filter((c) => c.plannedDay !== null).length,
    dragging,
    dragOffset,
    hoverDay,
    liveMessage,
    startDrag,
    moveDrag,
    endDrag,
    keyboardPlan,
    reset,
  };
}

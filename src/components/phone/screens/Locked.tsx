import Image from "next/image";
import { StatusBar } from "../StatusBar";

/* Chapter 03 — locked. The plan is orange: it has a date now. */

const WEEK = [
  { day: "MON", num: 9 },
  { day: "TUE", num: 10 },
  { day: "WED", num: 11 },
  { day: "THU", num: 12 },
  { day: "FRI", num: 13 },
  { day: "SAT", num: 14, active: true },
  { day: "SUN", num: 15 },
];

export function Locked() {
  return (
    <div className="flex h-full flex-col bg-paper text-ink">
      <StatusBar />
      <div className="px-7 pb-4 pt-3">
        <p className="mono-label text-orange-deep">Locked in</p>
        <p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">
          March
        </p>
      </div>
      <div className="flex justify-between px-6 pb-5">
        {WEEK.map((d) => (
          <span
            key={d.day}
            className={`flex w-10 flex-col items-center gap-1 rounded-xl py-2 ${
              d.active ? "bg-orange text-ink" : "text-ink-muted"
            }`}
          >
            <span className="mono-label text-[8px]">{d.day}</span>
            <span className="text-[15px] font-semibold">{d.num}</span>
          </span>
        ))}
      </div>
      <div className="flex-1 space-y-2.5 px-5">
        <div className="rounded-2xl bg-orange p-4 text-ink">
          <p className="mono-label text-[9px]">SAT 14 MAR · 9:00</p>
          <p className="mt-1.5 text-[19px] font-semibold leading-tight">Surf lesson</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex -space-x-2">
              {["Y", "S", "M", "J"].map((letter, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-paper shadow-[0_0_0_2px_var(--orange)]"
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="text-[13px] font-medium">You, Sam + 2</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 rounded-2xl bg-paper-sunk p-3 opacity-80">
          <Image
            src="/aurora.jpg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-xl object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-[15px] font-medium">
            See the northern lights
          </span>
          <span className="mono-label shrink-0 rounded-full border border-sky/40 bg-paper px-2.5 py-1 text-[9px] text-sky-deep">
            someday
          </span>
        </div>
      </div>
      <div className="px-7 pb-9 pt-4">
        <p className="mono-label text-center text-[10px] text-ink-muted">
          1 locked · 11 someday
        </p>
      </div>
    </div>
  );
}

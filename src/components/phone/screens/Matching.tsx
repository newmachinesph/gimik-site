import Image from "next/image";
import { StatusBar } from "../StatusBar";

/* Chapter 02 — overlap found. Still blue, but the shared item warms up. */

const AVATARS: Record<string, string[]> = {
  "Learn to surf": ["S", "M", "J"],
  "See the northern lights": ["A"],
  "Eat through a night market": ["S", "M", "J", "K", "T"],
};

const ROWS = [
  { title: "Learn to surf", thumb: "/surf.jpg", hot: true },
  { title: "See the northern lights", thumb: "/aurora.jpg", hot: false },
  { title: "Eat through a night market", thumb: "/market.jpg", hot: false },
  { title: "Fly over Cappadocia at sunrise", thumb: null, hot: false },
];

export function Matching() {
  return (
    <div className="flex h-full flex-col bg-paper text-ink">
      <StatusBar />
      <div className="px-7 pb-4 pt-3">
        <p className="mono-label text-sky-deep">Overlap</p>
        <p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">
          Your friends have these too
        </p>
      </div>
      <ul className="flex-1 space-y-2.5 px-5">
        {ROWS.map((row) => {
          const initials = AVATARS[row.title] ?? [];
          return (
            <li
              key={row.title}
              className={`rounded-2xl p-3 ${
                row.hot
                  ? "bg-paper-sunk shadow-[inset_0_0_0_2px_var(--orange)]"
                  : "bg-paper-sunk"
              }`}
            >
              <div className="flex items-center gap-3.5">
                {row.thumb ? (
                  <Image
                    src={row.thumb}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky/15 text-[18px] text-sky-deep">
                    ◌
                  </span>
                )}
                <span className="min-w-0 flex-1 truncate text-[15px] font-medium">
                  {row.title}
                </span>
                <span className="flex shrink-0 -space-x-2">
                  {initials.slice(0, 3).map((letter, i) => (
                    <span
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-sky/25 text-[11px] font-semibold text-sky-deep shadow-[0_0_0_2px_var(--paper-sunk)]"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </div>
              {row.hot && (
                <p className="mono-label mt-2.5 pl-[62px] text-[9px] text-orange-deep">
                  3 friends have this — pick a date
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <div className="px-7 pb-9 pt-4">
        <div className="flex h-[52px] items-center justify-center rounded-full bg-orange text-[15px] font-semibold text-ink">
          Find a date for Surf lesson
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { StatusBar } from "../StatusBar";

/* Chapter 01 — the someday list. Everything blue: nothing has a date yet. */

const ROWS = [
  { title: "Learn to surf", thumb: "/surf.jpg" },
  { title: "See the northern lights", thumb: "/aurora.jpg" },
  { title: "Eat through a night market", thumb: "/market.jpg" },
  { title: "Fly over Cappadocia at sunrise", thumb: null },
  { title: "Freedive a coral reef", thumb: null },
  { title: "Catch a summit sunset", thumb: null },
];

export function SomedayList() {
  return (
    <div className="flex h-full flex-col bg-paper text-ink">
      <StatusBar />
      <div className="px-7 pb-4 pt-3">
        <p className="mono-label text-sky-deep">Your list</p>
        <p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">
          12 <span className="serif-accent font-normal text-sky-deep">somedays</span>
        </p>
      </div>
      <ul className="flex-1 space-y-2.5 px-5">
        {ROWS.map((row) => (
          <li
            key={row.title}
            className="flex items-center gap-3.5 rounded-2xl bg-paper-sunk p-3"
          >
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
            <span className="mono-label shrink-0 rounded-full bg-sky/20 px-2.5 py-1 text-[9px] text-sky-deep">
              someday
            </span>
          </li>
        ))}
      </ul>
      <div className="px-7 pb-9 pt-4">
        <div className="flex h-[52px] items-center justify-center rounded-full bg-sky text-[15px] font-semibold text-ink">
          + Add to your list
        </div>
      </div>
    </div>
  );
}

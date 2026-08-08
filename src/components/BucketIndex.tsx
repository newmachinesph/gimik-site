"use client";

import Image from "next/image";
import { useState } from "react";
import { bucketItems } from "@/data/bucket";
import { Reveal } from "./Reveal";
import { SectionRule } from "./SectionRule";

/** The bucket list as a numbered editorial ledger — a table, not a card grid. */
export function BucketIndex() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="list"
      className="below-fold"
      style={{ paddingBlock: "clamp(104px, 13vw, 176px)" }}
    >
      <div className="container-page">
        <SectionRule index="03" label="The list" />
        <Reveal>
          <h2
            className="display-head max-w-[16ch] font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Everything you keep meaning to do.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 min-[960px]:grid-cols-[minmax(0,1fr)_320px]">
          {/* The rail */}
          <ul className="border-b border-rule">
            {bucketItems.map((item, i) => (
              <li
                key={item.number}
                tabIndex={0}
                aria-label={`${item.title} — ${item.social}`}
                className="group grid min-h-[76px] grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 border-t border-rule px-2 py-4 transition-colors duration-[180ms] hover:bg-paper-sunk focus-visible:bg-paper-sunk min-[640px]:grid-cols-[80px_minmax(0,1fr)_auto]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <span className="font-mono text-[15px] text-ink-muted">
                  {item.number}
                </span>
                <span className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-[-0.01em]">
                  {item.title}
                </span>
                <span className="mono-label col-start-2 text-ink-muted opacity-0 transition-opacity duration-[180ms] group-hover:opacity-100 group-focus-within:opacity-100 min-[640px]:col-start-3">
                  {item.social}
                </span>
              </li>
            ))}
          </ul>

          {/* Image well — hover-driven, so hidden where hover doesn't exist (<960px) */}
          <div className="hidden min-[960px]:block" aria-hidden="true">
            <div className="sticky top-[calc(var(--header-height)+48px)] h-[213px] w-[320px]">
              {bucketItems.map((item, i) => (
                <Image
                  key={item.number}
                  src={item.image.src}
                  alt=""
                  width={320}
                  height={213}
                  className="absolute inset-0 h-[213px] w-[320px] rounded-2xl object-cover transition-opacity duration-[180ms]"
                  style={{ opacity: hovered === i ? 1 : 0 }}
                />
              ))}
              {hovered === null ? (
                <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-rule">
                  <span className="mono-label text-ink-muted">
                    Hover the list
                  </span>
                </div>
              ) : (
                <p className="mono-label absolute -bottom-8 left-0 text-ink-muted">
                  N°{bucketItems[hovered].number} — {bucketItems[hovered].title}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

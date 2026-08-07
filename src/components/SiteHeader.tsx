"use client";

import { motion, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NavDrawer, NAV_LINKS } from "./NavDrawer";

/** Gora mark: a date landing on the calendar line. Reused as footer mark. */
export function GoraMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="28" height="28" rx="8" fill="var(--orange)" />
      <line
        x1="6"
        y1="19.5"
        x2="22"
        y2="19.5"
        stroke="var(--paper)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="12" r="4.5" fill="var(--paper)" />
    </svg>
  );
}

export function SiteHeader() {
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(progress, "change", () => {
    setScrolled(window.scrollY > 48);
  });

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60]"
      style={{
        height: "var(--header-height)",
        background: scrolled
          ? "color-mix(in srgb, var(--paper) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition:
          "background 220ms var(--ease-standard), border-color 220ms var(--ease-standard)",
      }}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a href="#main-content" className="flex items-center gap-2.5" aria-label="Gora — home">
          <GoraMark />
          <span className="text-[19px] font-semibold tracking-[-0.02em]">Gora</span>
        </a>

        <nav aria-label="Site" className="hidden min-[960px]:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-ink-muted transition-colors duration-[160ms] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get"
            className="hidden min-h-[44px] items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-paper transition-transform duration-[160ms] hover:-translate-y-0.5 min-[960px]:flex"
          >
            Get the app
          </a>
          <button
            ref={triggerRef}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rule min-[960px]:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              <path
                d="M1 1h16M1 7h16M1 13h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Document progress line */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-orange"
        style={{ scaleX: progress }}
      />

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={triggerRef}
      />
    </header>
  );
}

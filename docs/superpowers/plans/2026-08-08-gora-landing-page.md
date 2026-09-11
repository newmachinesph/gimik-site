# Gimik Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the gimik.app marketing site — landing page plus `/contact`, `/privacy`, `/terms` — to the approved design spec.

**Architecture:** Next.js 16 App Router with one long server-rendered landing page composed of client components for anything animated. All color/motion/layout constants live in `src/styles/tokens.css`; all copy and product data live in `src/data/*`. Animation via `motion/react` only.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, Tailwind CSS v4, `motion`, `lucide-react`.

**Verification model:** This is a presentational marketing site with no business logic to unit-test; no test framework is installed and none is added. Each task's test cycle is: `npx tsc --noEmit` (types), `npm run build` (integration), and a stated manual behavior check in the dev server. The final task runs the spec §13 acceptance checklist.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-08-gora-landing-page-design.md` — authoritative; on conflict the spec wins.
- Never use the words *dating*, *match with strangers*, *swipe*, or name Tinder. Social story = friends & groups; open-to-join is one sentence inside Group mode.
- Zero raw hex in component files — tokens only.
- `--orange` fills take `--ink` text, never white. Orange/sky as text on paper uses `--orange-deep`/`--sky-deep`.
- Animate `opacity`/`transform` only; never `transition-all`; stagger 70ms max 5 children; parallax ≤24px; no loops in content sections.
- Banned: GSAP, Three.js, R3F, Lenis, carousels, chart libs, custom cursor, magnetic buttons, particles, mouse-follow, fake stats/testimonials.
- `100svh` never `100vh`. `prefers-reduced-motion` honored everywhere (≤150ms opacity swaps).
- Phones: real DOM screens, coplanar, no rotation.
- Store links: `#` placeholders with one TODO in `src/data/site.ts`.
- Images: only the six user photos in `public/`; any future generation via codex bridge (`gpt-image-bridge`) only, never Higgsfield.
- Commit after every task: `feat: <component>` conventional format.

---

### Task 1: Foundation — deps, tokens, global styles, fonts, layout

**Files:**
- Modify: `package.json` (add `motion`, `lucide-react`)
- Create: `src/styles/tokens.css`, `src/styles/index.css`
- Modify: `src/app/layout.tsx`
- Delete: `src/app/globals.css`, `src/app/page.tsx` scaffold content (replaced in Task 12)

**Interfaces:**
- Produces: CSS custom properties per spec §3 (`--paper`, `--ink`, `--orange`, `--sky`, `--night`, `--rule`, `--focus`, `--ease-*`, `--dur-*`, `--content-max`, `--page-gutter`, `--header-height`) and font variables `--font-geist-sans`, `--font-geist-mono`, `--font-serif-accent`. Utility classes `.mono-label` (11–13px uppercase mono, tracking 0.1em) and `.container-page` (max-width + gutter).

- [ ] **Step 1:** `npm install motion lucide-react` in the repo root.
- [ ] **Step 2:** Write `tokens.css` with the exact §3.1/§3.3/§3.4 values (copy verbatim from spec).
- [ ] **Step 3:** Write `index.css`: `@import "tailwindcss";` + `@import "./tokens.css";` + base rules — body `background: var(--paper); color: var(--ink)`; selection in `--sky` @ 30%; global `:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }`; `.mono-label`, `.container-page`; `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.15s !important; scroll-behavior: auto !important; } }`.
- [ ] **Step 4:** Rewrite `layout.tsx`: keep Geist/Geist_Mono, add `Instrument_Serif` (`weight: "400", style: "italic", subsets: ["latin"], variable: "--font-serif-accent"`). Metadata: title `Gimik — Turns "we should do that sometime" into a date on the calendar`, description from slogan, `metadataBase: new URL("https://gimik.app")`. Body starts with skip link `<a href="#main-content" className="skip-link">Skip to content</a>` (visually hidden until focus, styled in index.css).
- [ ] **Step 5:** Replace `page.tsx` content with a minimal `<main id="main-content" />` so the build passes.
- [ ] **Step 6:** `npx tsc --noEmit && npm run build` — expect clean.
- [ ] **Step 7:** Commit `feat: design tokens, global styles, fonts, base layout`.

### Task 2: Data + shared primitives

**Files:**
- Create: `src/data/site.ts`, `src/data/bucket.ts`, `src/data/chapters.ts`, `src/data/modes.ts`
- Create: `src/components/Reveal.tsx`, `src/components/StoreButtons.tsx`

**Interfaces (produces — later tasks consume these exact shapes):**

```ts
// site.ts
export const site = {
  name: "Gimik",
  url: "https://gimik.app",
  slogan: 'Turns "we should do that sometime" into a date on the calendar.',
  contactEmail: "hello@gimik.app",
  // TODO: replace with real store URLs before launch
  appStoreUrl: "#",
  googlePlayUrl: "#",
} as const;

// bucket.ts
export type BucketItem = {
  number: string; title: string; social: string;
  image: { src: string; alt: string };
};
export const bucketItems: BucketItem[]; // 6 rows, §11 table order:
// 014 Learn to surf / 3 friends have this / surf.jpg
// 027 See the northern lights / 1 friend has this / aurora.jpg
// 033 Fly over Cappadocia at sunrise / 2 friends have this / balloons.jpg
// 041 Eat through a night market / 5 friends have this / market.jpg
// 052 Freedive a coral reef / solo / reef.jpg
// 068 Catch a summit sunset / 2 friends have this / summit.jpg
// alt text describes the actual photo content, written fresh per image.

// chapters.ts
export type Chapter = { id: "add" | "match" | "lock"; number: string; title: string; body: string };
export const chapters: Chapter[]; // 01 Add it / 02 Match it / 03 Lock it, bodies from spec §4.4

// modes.ts
export type Mode = { id: "solo" | "duo" | "group"; label: string; heading: string; body: string; example: string; openToJoin?: string };
export const modes: Mode[];
// solo:  "For you, by you."   body about keeping promises to yourself; example "Freedive a coral reef — Sunday, just you."
// duo:   "One other calendar." body about finding the overlap of two; example "Learn to surf — you and Sam, Saturday 9:00."
// group: "Everyone in."       body about group-chat ideas getting a date; example "Eat through a night market — six of you, Friday night.";
//        openToJoin: "Some plans you can open up, so people already going can join."
```

```tsx
// Reveal.tsx — "use client"
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string })
// spec §3.4 wrapper exactly; useReducedMotion() → renders with initial visible (no y-shift)

// StoreButtons.tsx — links to site.appStoreUrl / site.googlePlayUrl, 44px min height,
// ink pill buttons: two-line layout (mono-label "Download on the" / "Get it on" over
// "App Store" / "Google Play"), aria-labels, optional `qr` prop renders a decorative
// inline-SVG QR placeholder (aria-hidden), desktop only.
```

- [ ] **Step 1:** Write the four data files with the exact content above (full copy written out, no stubs).
- [ ] **Step 2:** Write `Reveal.tsx` and `StoreButtons.tsx`.
- [ ] **Step 3:** `npx tsc --noEmit` — clean. Commit `feat: site data and shared primitives`.

### Task 3: Phone mockup system

**Files:**
- Create: `src/components/phone/PhoneFrame.tsx`, `src/components/phone/StatusBar.tsx`, `src/components/phone/screens/SomedayList.tsx`, `src/components/phone/screens/Matching.tsx`, `src/components/phone/screens/Locked.tsx`

**Interfaces:**
- Produces: `PhoneFrame({ children, className, scale })` — renders §6 chassis exactly (375×780, r52, the 5-layer box-shadow, Dynamic Island 126×37 r24 top-12 z-50, home indicator 139×5 r100 z-60, `flex-shrink: 0`). Screen content container has **no** `overflow: hidden`; clipping via `clip-path: inset(0 round 52px)` on the frame layer.
- `StatusBar()` — `9:41`, font-weight 590, 17px, inline SVG signal/wifi/battery glyphs, `aria-hidden`.
- Screens are pure DOM app-UI mockups (decorative, `aria-hidden` at the frame level): `SomedayList` = blue-tinted list of someday items (uses surf/aurora/market thumbnails via `next/image`, 48px squares); `Matching` = same list with friend-avatar initials appearing and one row gaining an orange accent; `Locked` = calendar day view, one fully orange committed card `SAT 14 MAR · 9:00 — Surf lesson`.
- The three screens accept no props; each is a static composition. Color arc across them: blue → blue+orange accent → orange.

- [ ] **Step 1:** Write `StatusBar.tsx`, then `PhoneFrame.tsx` with chassis CSS from spec §6 verbatim.
- [ ] **Step 2:** Write the three screens. Avatar initials are neutral letters (A, M, J…) — no names, no imagery implying strangers.
- [ ] **Step 3:** Temporarily mount `<PhoneFrame><SomedayList/></PhoneFrame>` in `page.tsx`, run dev server, verify chassis at 100% and 75% scale, then remove the temp mount.
- [ ] **Step 4:** `npx tsc --noEmit`. Commit `feat: phone mockup system`.

### Task 4: Header + drawer

**Files:**
- Create: `src/components/SiteHeader.tsx`, `src/components/NavDrawer.tsx`, `src/hooks/useScrollProgress.ts`

**Interfaces:**
- `useScrollProgress()` → `MotionValue<number>` (0–1 document progress; thin wrapper over `useScroll().scrollYProgress`).
- `SiteHeader` fixed 72px z-60; transparent → `rgba(251,247,240,0.88)` + `backdrop-filter: blur(18px)` + bottom hairline after 48px scroll (background/border/box-shadow transitioned individually, 220ms). 2px `--orange` progress line at bottom via `scaleX` `transform-origin: left` bound to the motion value. Wordmark = text "Gimik" + inline SVG mark (orange rounded square with paper dot — same mark as favicon). Anchors: `#how` How it works · `#list` Bucket list · `#modes` Modes (hidden <960px). Right: `Get the app` → `#get`.
- `NavDrawer({ open, onClose })` — <960px; focus trap (loop Tab within), closes on Escape + backdrop click, restores focus to hamburger trigger; anchors + store buttons inside; slides in with transform, 300ms `--ease-out`.

- [ ] **Step 1:** Write hook + header + drawer.
- [ ] **Step 2:** Mount header in `layout.tsx` (above `{children}`).
- [ ] **Step 3:** Dev-server check: scroll tint at 48px, progress line, drawer keyboard behavior (Tab loop, Escape, focus restore).
- [ ] **Step 4:** `npx tsc --noEmit`. Commit `feat: site header and nav drawer`.

### Task 5: Hero

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `PhoneFrame`, `SomedayList`, `StoreButtons`, `site`.
- Section `min-height: 100svh`, 12-col grid, copy in cols 1–8 anchored lower-left, phone lower-right (cols 9–12, hidden <960px — phones reappear via HowItWorks on mobile).
- Headline: `We should do` / `that <slot>` at hero display scale. Slot swaps once: serif italic `--sky-deep` *sometime* → mono uppercase `--orange-deep` `SAT 14 MAR · 9:00`, crossfade + y-shift 520ms at t=1400ms after fonts settle.
- Choreography: gate on `document.fonts.ready` raced with 5s timeout; then eyebrow 120ms → title rise from clipped wrapper 760ms → sub +100ms → actions 520ms/70ms stagger → slot swap at 1400ms. Reduced motion: everything visible immediately, slot swap = 150ms opacity at 1400ms.

```tsx
// swap-slot core
const [swapped, setSwapped] = useState(false);
useEffect(() => {
  let t: ReturnType<typeof setTimeout>;
  Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 5000))])
    .then(() => { t = setTimeout(() => setSwapped(true), 1400); });
  return () => clearTimeout(t);
}, []);
// render both spans absolutely stacked in a fixed-size slot sized by the longer string;
// AnimatePresence crossfade; slot carries aria-label="sometime — now a real date"
```

- [ ] **Step 1:** Write `Hero.tsx` with the §4.1 copy verbatim (eyebrow `GIMIK — PLANS WITH PEOPLE YOU LIKE`, sub-paragraph from spec, StoreButtons with QR on desktop).
- [ ] **Step 2:** Mount in `page.tsx`. Dev check: choreography order, swap at ~1.4s, no layout shift when slot swaps, fits 1280×800 without scroll.
- [ ] **Step 3:** `npx tsc --noEmit`. Commit `feat: hero`.

### Task 6: Manifesto (scrub reveal)

**Files:**
- Create: `src/components/Manifesto.tsx`

**Interfaces:**
- Copy (fixed): `Your group chat has forty good ideas in it. None of them have a date. That is the only problem Gimik solves.`
- `min-height: 100svh` centered; type `clamp(2rem, 4.5vw, 4rem)` lh 1.1. Split into words; each word's opacity maps 0.18→1 from `useScroll({ target, offset: ["start 0.8", "end 0.45"] })` progress, word *i* of *n* fully on at `i/n` (`useTransform` per word). All words stay ink — no color cycling.
- Screen readers get one sentence: the `<p>` carries `aria-label` with the full copy; word spans are `aria-hidden`.
- Reduced motion: static paragraph, single 150ms fade.

- [ ] **Step 1:** Write component; mount after a 200px Breath spacer stub. Dev check: scrub ties to scroll, completes before the section midpoint.
- [ ] **Step 2:** `npx tsc --noEmit`. Commit `feat: manifesto scrub`.

### Task 7: HowItWorks (sticky story)

**Files:**
- Create: `src/components/HowItWorks.tsx`

**Interfaces:**
- Consumes: `chapters`, `PhoneFrame`, all three screens. `id="how"`.
- ≥960px: grid 7/12 sticky left (`top: calc(var(--header-height) + 24px)`) holding one `PhoneFrame`; right column chapters each `min-height: 72vh`. Active chapter tracked with IntersectionObserver (`rootMargin: "-45% 0px -45% 0px"`); screens crossfade 360ms via `AnimatePresence` keyed on chapter id. Chapter headings: mono number `--ink-muted` + display title; body ≤60ch.
- <960px: normal flow, each chapter renders its own phone (scale 0.75) directly above its text; no observer.

- [ ] **Step 1:** Write component with both layouts (CSS-driven at the 960px breakpoint).
- [ ] **Step 2:** Mount; dev check: sticky pin engages below header, screen swaps land mid-chapter, mobile stacking correct at 375px.
- [ ] **Step 3:** `npx tsc --noEmit`. Commit `feat: how-it-works sticky story`.

### Task 8: TryIt set-piece

**Files:**
- Create: `src/hooks/useDragToSchedule.ts`, `src/components/TryIt.tsx`

**Interfaces:**

```ts
// useDragToSchedule.ts — "use client"
export type SomedayCard = { id: string; title: string; plannedDay: number | null };
export type DayCell = { index: number; short: string; date: string; announce: string }; // "SAT", "14 MAR", "Saturday 14 March"
export function useDragToSchedule(initial: SomedayCard[], days: DayCell[]): {
  cards: SomedayCard[];
  plannedCount: number;
  dragging: string | null;
  dragOffset: { x: number; y: number };
  hoverDay: number | null;          // nearest cell within 80px, else null
  liveMessage: string;              // for the aria-live region
  startDrag(id: string, e: React.PointerEvent): void;   // setPointerCapture
  moveDrag(e: React.PointerEvent): void;
  endDrag(e: React.PointerEvent): void;                 // commit if hoverDay!=null else snap back
  keyboardPlan(id: string, dayIndex: number): void;     // same commit path
  reset(): void;
}
```

- Commit threshold: card center within **80px** of a day-cell center (rects cached on drag start, recomputed on resize). During drag: `touch-action: none; user-select: none; will-change: transform`; CSS transition disabled, re-enabled on release. Miss → snap back 480ms `--ease-out`. Commit → card animates into the cell, turns `--orange` with `--ink` text, 420ms `--ease-spring` (the only spring on the page). Counter `N of 3 planned` in mono; `Start over` reset link at 3/3.
- Cards (blue, serif-accent titles): `Surf lesson`, `Night market run`, `Pottery class`.
- Keyboard: each unplanned card is a `<button>`; Enter opens a day `role="listbox"` (7 options, arrows move `aria-activedescendant`, Enter commits, Escape closes). Live region (`role="status"`, visually hidden) announces e.g. `Surf lesson planned for Saturday 14 March`.
- Reduced motion: drag still functional; spring/snap replaced by ≤150ms opacity swap.
- <640px: week strip in `overflow-x: auto` with `scroll-snap-type: x proximity`.

- [ ] **Step 1:** Write the hook (state + pointer plumbing).
- [ ] **Step 2:** Write `TryIt.tsx` consuming it; mount.
- [ ] **Step 3:** Dev check: mouse drag commit + miss snap-back; touch emulation; full keyboard path; live region updates.
- [ ] **Step 4:** `npx tsc --noEmit`. Commit `feat: try-it drag set-piece`.

### Task 9: BucketIndex

**Files:**
- Create: `src/components/BucketIndex.tsx`

**Interfaces:**
- Consumes: `bucketItems`. `id="list"`.
- Editorial ledger, not cards: rows ≥76px, top hairline `--rule` per row, grid `[80px minmax(0,1fr) auto]`. Mono number `--ink-muted`; title display face; right column mono revealed on hover/focus-within (opacity 0→1, 180ms). Row background shifts to `--paper-sunk` on hover/focus-within.
- ≥960px: an absolutely-positioned image well right of the rail (~320×213) shows the hovered row's photo, `next/image` with explicit dimensions, 180ms opacity crossfade. Hidden <960px entirely.
- Rows focusable (`tabIndex={0}`) so keyboard triggers the same reveal.
- Section heading: mono label `THE LIST` + display head `Everything you keep meaning to do.`

- [ ] **Step 1:** Write component; mount; dev check hover/focus reveals, right column drops beneath title <640px.
- [ ] **Step 2:** `npx tsc --noEmit`. Commit `feat: bucket index rail`.

### Task 10: Modes

**Files:**
- Create: `src/components/Modes.tsx`

**Interfaces:**
- Consumes: `modes`. `id="modes"`. Full-bleed `--night` ground, `--paper` text, hairlines `--rule-invert`.
- Tab selector Solo · Duo · Group — real `role="tablist"`/`tab`/`tabpanel` with arrow-key movement; selected tab = orange underline (`scaleX`) + `aria-selected`. Panels swap real content (heading, body, mono example line) with 300ms crossfade; min-height stabilizes the section.
- Group panel appends the open-to-join sentence as a muted closing paragraph — exactly the one sentence from data.

- [ ] **Step 1:** Write component; mount; dev check tab keyboard behavior + paper-on-night contrast.
- [ ] **Step 2:** `npx tsc --noEmit`. Commit `feat: modes section`.

### Task 11: GetTheApp + Footer

**Files:**
- Create: `src/components/GetTheApp.tsx`, `src/components/SiteFooter.tsx`
- Modify: `src/components/StoreButtons.tsx` (add `tone?: "onPaper" | "onOrange"`)

**Interfaces:**
- `GetTheApp` — `id="get"`. The single large orange field: card radius 32px, padding `clamp(32px, 4vw, 64px)`, `--orange` bg, **`--ink` text**. Head `Stop saying sometime.` (display scale), `StoreButtons tone="onOrange"`, QR desktop only.
- `SiteFooter` — oversized outline wordmark (`-webkit-text-stroke: 1px var(--rule)`, transparent fill, `clamp(4rem, 14vw, 12rem)`, `aria-hidden`, with a visually-hidden real heading), link columns `repeat(auto-fit, minmax(160px, 1fr))` gap `clamp(32px,3vw,48px)`: Product (#how/#list/#modes/#get) · Company (/contact) · Legal (/privacy, /terms). Copyright `© 2026 Gimik`, hairline-separated, `margin-top: 56px; padding-top: 32px`.

- [ ] **Step 1:** Write both, extend StoreButtons; mount; dev check.
- [ ] **Step 2:** `npx tsc --noEmit`. Commit `feat: cta and footer`.

### Task 12: Page assembly

**Files:**
- Modify: `src/app/page.tsx`, `src/styles/index.css`

**Interfaces:**
- Order: `Hero` → Breath (`<div aria-hidden style={{ height: 200 }} />` — load-bearing, §4.2) → `Manifesto` → `HowItWorks` → `TryIt` → `BucketIndex` → `Modes` → `GetTheApp` → `SiteFooter`.
- Below-fold sections get a `.below-fold { content-visibility: auto; contain-intrinsic-size: auto 800px; }` utility; images lazy via `next/image` defaults.
- Section vertical rhythm varied per §3.3 (no single repeated padding).
- `html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-height) + 16px); }` in index.css (reduced-motion override forces auto).

- [ ] **Step 1:** Assemble; remove any temp mounts.
- [ ] **Step 2:** `npm run build` — clean. Full-page dev pass at 1440 and 375.
- [ ] **Step 3:** Commit `feat: assemble landing page`.

### Task 13: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`, `src/components/ContactForm.tsx`

**Interfaces:**
- `ContactForm` — client component. Fields name/email/message, labels always visible, inputs on `--paper-sunk`, 44px targets. Client validation (required; email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), inline errors tied via `aria-describedby` + `aria-invalid`. Submit builds `mailto:${site.contactEmail}?subject=...&body=...` with `encodeURIComponent`, sets `window.location.href`. Button label: **`Open in your mail app`**. Below the form: plain link `Or email hello@gimik.app directly`.
- Page imports `SiteHeader` via root layout automatically; imports `SiteFooter` directly. Metadata title `Contact — Gimik`.

- [ ] **Step 1:** Write page + form.
- [ ] **Step 2:** Dev check validation + mailto composition. `npx tsc --noEmit`. Commit `feat: contact page`.

### Task 14: Privacy + Terms

**Files:**
- Create: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/components/LegalPage.tsx`

**Interfaces:**
- `LegalPage({ title, updated, children })` — 60ch measure, display h1, mono `LAST UPDATED` label, prose styles, footer included.
- Content: honest real drafts (data collected: account info, activity list, device data; contact email; no sale of data; deletion on request) with a visible mono note at top: `Draft — pending legal review`. No fabricated company registration details.

- [ ] **Step 1:** Write both pages + wrapper. `npx tsc --noEmit`. Commit `feat: privacy and terms drafts`.

### Task 15: Icon + OG card

**Files:**
- Create: `src/app/icon.svg` (Gimik mark: paper rounded square, orange dot landing on a horizontal rule — "a date on the calendar"), `src/app/apple-icon.tsx` (`ImageResponse` 180×180 from the same mark), `src/app/opengraph-image.tsx` (`ImageResponse` 1200×630: paper ground, `We should do that` + serif *sometime* → mono `SAT 14 MAR` in orange-deep, wordmark bottom-left).
- All authored in code — no AI image generation needed; if photographic OG is ever wanted, codex bridge only.

- [ ] **Step 1:** Author the three files with `export const size`/`contentType` where applicable.
- [ ] **Step 2:** `npm run build`; verify OG route renders. Commit `feat: favicon and og card`.

### Task 16: QA — acceptance checklist

**Files:** none new; fixes as found.

- [ ] **Step 1:** `npm run build && npx tsc --noEmit` clean; `npm run lint` clean.
- [ ] **Step 2:** Grep gates over `src/`: no `transition-all`, no raw hex outside `src/styles/`, no `100vh`, no banned words (`dating`, `Tinder`, `swipe`, `stranger`).
- [ ] **Step 3:** Browser pass (chrome-devtools MCP): 320/375/768/960/1280/1440 widths — zero horizontal scroll; keyboard-only run through drawer, anchors, TryIt, tabs, form; reduced-motion emulation; Lighthouse on production build ≥90 across the four categories.
- [ ] **Step 4:** Fix findings, commit `fix: qa pass`, push `origin main`.

# Gora Landing Page — Design Spec

**Date:** 2026-08-08
**Target:** `getgora.app` marketing site
**Status:** Approved for planning

---

## 1. Product

Gora is a mobile app for turning loose intentions into scheduled plans. People keep a
list of activities, goals and bucket-list items, then Gora helps them actually put one
on the calendar — solo, with one other person, or with a group.

**Slogan:** *Turns "we should do that sometime" into a date on the calendar.*

### Positioning constraints (hard)

- Never use the words *dating*, *match with strangers*, *swipe to meet*, or any
  Tinder-adjacent framing. Never name Tinder.
- The social story is **friends and groups**. "Open to join" is a soft secondary
  feature, framed as *find people already going* — never as meeting strangers.
- *Bucket list* is approved vocabulary and should be used.
- Solo, duo and group are three legitimate modes. Solo is not a consolation prize.

---

## 2. The organizing concept

> **Someday is blue. A date is orange.**

Sky blue represents the unplanned state: floating, weightless, "we should do that
sometime." Orange represents the committed state: warm, dated, real. The whole site is
a machine that converts blue into orange, and every section performs that conversion.

This is the spine. Color, motion and typography are not decoration layered onto the
pitch — they *are* the pitch. Any proposed addition that does not serve the blue→orange
conversion should be cut.

Typography carries the same duality:

| State | Face | Treatment |
|---|---|---|
| someday | Instrument Serif, italic | sky blue, soft, lowercase |
| a date | Geist Mono, uppercase | orange, hard, tracked `0.1em` |

---

## 3. Design tokens

All tokens live in `src/styles/tokens.css`. **Zero raw hex values in component files.**

### 3.1 Color

```css
--paper:       #FBF7F0;  /* warm ground, majority of the page */
--paper-sunk:  #F3EDE2;  /* recessed panels, input wells */
--ink:         #16130F;  /* body + display type */
--ink-muted:   #6B6259;  /* secondary copy, mono labels */

--orange:      #FF5C24;  /* THE PLAN — fills, locked state */
--orange-deep: #C63D0B;  /* orange as *text* on paper */
--sky:         #38B6F5;  /* SOMEDAY — unplanned cards */
--sky-deep:    #0A6FA8;  /* sky as *text* on paper */

--night:       #0B1520;  /* deep blue-black contrast sections */
--rule:        rgba(22, 19, 15, 0.14);
--rule-invert: rgba(251, 247, 240, 0.16);
--focus:       #0A6FA8;
```

**Contrast rules — these are not suggestions:**

- `--orange` as a fill takes **`--ink` text, never white.** White on `#FF5C24` measures
  ~3.0:1 and fails AA. Ink on orange measures ~6.0:1 and passes.
- `--sky` as a fill takes **`--ink` text** (~8.4:1).
- Orange or sky as *text on paper* must use the `-deep` variants (~4.7:1 and ~5.4:1).
- `--paper` on `--night` measures ~16:1.

Brand color is used as **signal, not wallpaper.** The one large orange field on the
entire page is the closing CTA. Everything else uses orange in small, earned doses.

### 3.2 Typography

| Role | Face | Source |
|---|---|---|
| Display / UI | Geist Sans | `next/font` — already in the scaffold |
| Data / labels | Geist Mono | `next/font` |
| "Someday" voice | Instrument Serif, italic 400 | `next/font/google` |

```
hero display   clamp(3.5rem, 11vw, 9rem)    lh 0.88  tracking -0.035em
section head   clamp(2.25rem, 5vw, 4.5rem)  lh 0.95  tracking -0.02em
manifesto      clamp(2rem, 4.5vw, 4rem)     lh 1.1   tracking -0.015em
body           clamp(1rem, 1vw, 1.125rem)   lh 1.65  measure 60ch (52–68 allowed)
mono label     11–13px uppercase            tracking 0.1em
```

Instrument Serif is used **only** for the word "someday" and its close variants. It is
an accent voice, not a second body font.

### 3.3 Layout

```css
--content-max:   1440px;
--page-gutter:   clamp(20px, 4vw, 72px);
--header-height: 72px;
```

Section vertical rhythm sits inside `clamp(88px, 11vw, 176px)` but must be **varied**
per section — never one repeated padding value down the page.

Layout hardening (prevents the majority of generated-layout bugs):

- Image-bearing grids use `minmax(0, 1fr)` tracks.
- Display headings get `min-width: 0` and `overflow-wrap: anywhere`.
- Every nav/control row mixing text and icons gets `align-items: center`.

### 3.4 Motion

```css
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);     /* reveals, settles */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);      /* controls, hovers */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* the lock confirmation ONLY */

--dur-fast:   160ms;   /* control response */
--dur-med:    520ms;   /* standard reveal */
--dur-slow:  1100ms;   /* large settle */
```

**Standard reveal wrapper** — used on section copy and list entries, *not* on every
line of text:

```tsx
<motion.div
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.22 }}
  transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay }}
/>
```

**Rules:**
- Animate `opacity` and `transform` only. Never `width`, `height`, `top`, `left`,
  `padding`, `margin`. Progress rules use `scaleX`/`scaleY`.
- Never `transition-all`.
- Stagger is **70ms, maximum five delayed children**.
- Movement budgets stay small: scroll parallax ≤ 24px across an entire section; image
  scale deltas of 0.025–0.035, never 1.1× zooms.
- No repeating/looping animation in content sections.

**Explicitly banned:** custom cursor, magnetic buttons, hover-scale on every element,
animated noise, floating particles, mouse-follow effects, autoplaying sound, fake
instrumentation of any kind.

---

## 4. Page architecture

Nine sections. **One** capability dialect (the sticky story). Everything else plays a
distinct, non-overlapping role.

### 4.0 Header — `<SiteHeader />`

Fixed, `72px`, `z-index: 60`. Transparent at the top; after **48px** of scroll it
gains `background: rgba(251, 247, 240, 0.88)`, `backdrop-filter: blur(18px)` and a
bottom hairline. Transitions background, border and opacity over 220ms — not `all`.

A 2px progress line at the bottom edge, driven by document progress via `scaleX` with
`transform-origin: left`, in `--orange`.

Contents: wordmark left; three anchors center (desktop only); one primary action right
(`Get the app`). Below 960px the anchors collapse into a drawer that traps focus,
closes on Escape and backdrop click, and restores focus to its trigger.

### 4.1 Hero — `<Hero />`

`min-height: 100svh` — `svh`, not `vh`, to avoid the mobile URL-bar jump. Essential
content and the first action must fit at 1280×800 without scrolling.

Copy anchored **lower-left** on a 12-column grid (columns 1–8), not centered.

The headline performs the concept. Line 2 holds a slot that transitions from the blue
serif *"sometime"* to the orange mono *"SAT 14 MAR · 9:00"* once, on load, after the
title has settled:

```
GORA / PLANS WITH PEOPLE YOU LIKE

We should do
that ⟨sometime → SAT 14 MAR · 9:00⟩

Gora turns the ideas sitting in your group chat into
plans with a date on them. Solo, with one person, or
with everyone.

[ App Store ]  [ Google Play ]      ⟨QR, desktop only⟩
```

Entrance choreography follows the corpus stagger law:

```
eyebrow      120ms
title rise   from a clipped wrapper, 760ms
sub-line     +100ms after title
actions      520ms fade-up, 70ms stagger
word swap    fires at 1400ms, after everything has settled
```

One phone frame enters from the lower right showing the someday list. It is
**coplanar and unrotated** — see §6.

### 4.2 Breath

A deliberate `200px` empty band so the hero reads as a held frame. No content. This is
load-bearing; do not fill it.

### 4.3 Manifesto — `<Manifesto />`

One 20-word thesis, revealed **word by word on scroll scrub** at `0.05s` per word.
This is the "a person made this" moment.

```
Your group chat has forty good ideas in it.
None of them have a date. That is the only problem Gora solves.
```

`min-height: 100svh`, `clamp(2rem, 4.5vw, 4rem)`, line-height 1.1, centered measure.

### 4.4 Story — `<HowItWorks />` — **the capability system**

Sticky split, desktop only (≥960px). Left column (7/12) sticky at
`top: calc(var(--header-height) + 24px)` holding a phone frame whose **screen content
crossfades** over 360ms per chapter. Right column (5/12) scrolls; each chapter is
`min-height: 72vh` so the swaps have room to register.

Exactly three chapters:

| # | Title | Job |
|---|---|---|
| 01 | **Add it** | Anything you have ever said "we should" about goes on your list. Bucket-list items, small things, big things. |
| 02 | **Match it** | Gora finds who else has it on their list — your friends, your group, the people you actually know. |
| 03 | **Lock it** | Pick a date everyone can make. It leaves your list and enters your calendar. |

The phone screen goes **blue → blue-with-orange-accent → fully orange** across the
three chapters. The color arc *is* the explanation.

Below 960px the sticky behaviour unsticks into normal document flow with each phone
directly above its chapter.

### 4.5 Set-piece — `<TryIt />` — **the signature moment**

The one interactive spectacle. Three blue "someday" cards sit above a seven-day week
strip. You drag a card onto a day; it snaps, locks, and turns orange with a spring
confirmation. A running counter reads `2 of 3 planned`.

Mechanics, built on the corpus's proven drag recipe:

```
pointer capture on the dragged card
touch-action: none; user-select: none; will-change: transform, opacity
base CSS transition DISABLED while dragging, re-enabled on release
commit threshold 80px to the nearest day cell
snap-back 480ms --ease-out on miss
lock confirmation 420ms --ease-spring (the ONLY spring on the page)
```

**Keyboard path is mandatory, not a fallback.** Each card is a button; `Enter` opens a
day listbox; arrows move; `Enter` commits; `Escape` cancels. Screen-reader users get
the same outcome via a live region announcing
`Surf lesson planned for Saturday 14 March`.

Under `prefers-reduced-motion` the drag still works; only the spring and the snap
animation are replaced by a ≤150ms opacity change.

### 4.6 The list — `<BucketIndex />`

The bucket-list as a numbered editorial index rail — the cheapest section to make
beautiful and the most ownable.

```
014   Learn to surf                        3 friends have this
027   See the northern lights              1 friend has this
041   Finally do that pottery class        solo
...
```

Mono numbers in `--ink-muted`, item in display face, right column in mono. Rows are
`≥76px`, hover/focus-within shifts background and reveals the right column over 180ms.
A **table/ledger**, explicitly not a card grid.

### 4.7 Modes + open to join — `<Modes />`

Merged into one section on `--night` ground, for the single hard contrast break in the
page. A three-way selector: **Solo · Duo · Group**. Selecting one swaps real content —
not a color change on the same copy.

Open-to-join lives here as a restrained closing paragraph within the Group mode:
*Some plans you can open up, so people already going can join.* One sentence. No
stranger language, no dating language, no imagery implying either.

### 4.8 CTA — `<GetTheApp />`

The one large orange field on the page. Card radius 32px, padding
`clamp(32px, 4vw, 64px)`. Ink text on orange, per §3.1.

```
Stop saying sometime.

[ App Store ]  [ Google Play ]      ⟨QR, desktop only⟩
```

### 4.9 Footer — `<SiteFooter />`

Oversized outline wordmark, `repeat(auto-fit, minmax(160px, 1fr))` link columns,
`gap: clamp(32px, 3vw, 48px)`, copyright bar separated by a hairline at
`margin-top: 56px; padding-top: 32px`.

---

## 5. Secondary pages

| Route | Purpose |
|---|---|
| `/contact` | Editorial contact form in the same system. Name, email, message. **No backend is in scope.** The form validates client-side, then submits via a `mailto:` composition to the address in `src/data/site.ts`. The button label states this plainly (`Open in your mail app`) so the behaviour is never a surprise. Swapping in a real POST endpoint later touches one handler. |
| `/privacy` | Minimal but real privacy policy. **App Store review requires a working public URL.** |
| `/terms` | Minimal but real terms. Same reason. |

`/privacy` and `/terms` ship as honest, clearly-marked drafts for the user's lawyer to
replace. They are not padding — a live app without them fails store review.

---

## 6. Phone mockup rules

Derived from the corpus study. Screens are **real DOM**, never images, so they stay
crisp at every density and can animate.

```css
width: 375px; height: 780px;   /* aspect 2.08, within the 2.05–2.18 band */
border-radius: 52px;
box-shadow:
  inset 0 0 0 2px rgba(255,255,255,0.08),  /* screen-glass highlight */
  0 0 0 1px  rgba(0,0,0,0.6),              /* seam */
  0 0 0 10px #1a1a1e,                      /* titanium rail */
  0 0 0 11px rgba(255,255,255,0.06),       /* rail specular */
  0 0 60px  rgba(0,0,0,0.18);              /* ambient, light stage */
```

- Dynamic Island: `126 × 37px`, radius 24px, `top: 12px`, centered, `z-index: 50`.
- Home indicator: `139 × 5px`, radius 100px, `z-index: 60`.
- Status bar time `9:41`, SF Pro weight **590** (not 600), 17px. Signal, wifi and
  battery glyphs are **inline SVG, never an icon font**.
- Screen content container gets **no `overflow: hidden`** — it breaks `backdrop-filter`
  on descendants. Clipping belongs on the frame.
- Never put a transform-based stagger class on a parent of a `backdrop-blur` child.
- `flex-shrink: 0` on every frame.
- **Phones are coplanar: no rotation, no fanning, no per-phone z-offset.** All depth
  comes from the background and the shadow. The tilted-floating-trio is the single
  clearest tell of a generated site.

---

## 7. Accessibility

- Semantic `header`, `nav`, `main`, `section`, `table`, `footer`. One `h1`.
- Visible-on-focus skip link to `#main-content`.
- Explicit default / hover / `:focus-visible` / active / disabled states on every
  control. Focus ring `2px solid var(--focus)` at `3px` offset, appearing immediately.
- WCAG AA contrast throughout (§3.1), 44px minimum touch targets.
- Everything works without hover and keyboard-only, including the §4.5 set-piece.
- Drawer traps focus, closes on Escape, restores focus to its trigger.
- Decorative SVG marked `aria-hidden="true"`; meaningful images get real alt text.

Under `prefers-reduced-motion: reduce`: no scroll-linked transforms, no scrub reveal,
no spring. Movement is replaced by opacity changes of ≤150ms. All content and controls
remain fully usable.

---

## 8. Responsive

Build mobile-first. Verify at **320, 375, 414, 640, 768, 960, 1024, 1280, 1440**.
Zero horizontal scroll from 320px to 1920px. Never solve overflow by clipping text
that should wrap.

| Breakpoint | Behaviour |
|---|---|
| < 960px | Story unsticks to document flow; header anchors → drawer; hero grid → single column |
| < 640px | Hero display drops to `clamp(3rem, 14vw, 5rem)`; set-piece week strip scrolls horizontally; index rail stacks its right column beneath |

---

## 9. Performance

- No blocking loading screen. First paint is real content.
- Fonts via `next/font` (self-hosted, no render-blocking network request).
- Explicit `width`/`height` on every image to prevent layout shift.
- Everything below the hero lazy-loads.
- Entrance animations gate on `document.fonts.ready` **with a 5s safety timeout** — a
  stalled asset must never block the reveal.
- Target Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO on a
  production build. Build target, not a claim printed on the page.

---

## 10. Stack

Next.js 16 App Router, TypeScript, Tailwind v4, `motion` (`motion/react`),
`lucide-react` for interface icons only.

**Do not install** GSAP, Three.js, React Three Fiber, Lenis, a carousel package, or a
charting library. Depth comes from composition, typography and a small number of
controlled transitions.

```
src/
  app/
    layout.tsx  page.tsx  contact/page.tsx  privacy/page.tsx  terms/page.tsx
  components/
    SiteHeader.tsx  NavDrawer.tsx  Hero.tsx  Manifesto.tsx  HowItWorks.tsx
    TryIt.tsx  BucketIndex.tsx  Modes.tsx  GetTheApp.tsx  SiteFooter.tsx
    Reveal.tsx  StoreButtons.tsx
    phone/  PhoneFrame.tsx  StatusBar.tsx  screens/{SomedayList,Matching,Locked}.tsx
  data/
    bucket.ts  chapters.ts  modes.ts  site.ts
  hooks/
    useReducedMotion.ts  useScrollProgress.ts  useDragToSchedule.ts
  styles/
    tokens.css  index.css
```

---

## 11. Assets

Generated via the **codex bridge** (`gpt-image-bridge` skill) exclusively. Higgsfield
is not used for any asset in this project.

Every generated image must have a section that actually consumes it. No orphan assets.

| Asset | Consumed by | Spec |
|---|---|---|
| 6 activity photographs | §4.6 `BucketIndex` — each row reveals its image on hover/focus-within, 180ms opacity, positioned right of the rail. Three of the six are reused inside the §4.4 phone screens as list-item thumbnails. | square 1:1, warm natural light, real people mid-activity, shot from a participant's eye level rather than a stock-photo hero angle — surf, aurora, pottery, hike, shared dinner, live music |
| App icon | §4.0 header wordmark, favicon, `apple-touch-icon` | Gora mark, `--orange` on `--paper` |
| OG card | `layout.tsx` metadata | 1200×630 |

On touch devices the `BucketIndex` hover-reveal has no trigger, so the image column is
hidden below 960px rather than left dangling — the rail is fully legible without it.

If an asset is missing at build time, render a **neutral placeholder showing the
filename and intended crop.** Never silently substitute a different image.

---

## 12. Known gaps

- **Store URLs are placeholders.** Both buttons point to `#` with a single TODO at
  `src/data/site.ts`. Swapping in real URLs is a one-line edit.
- **No proof/stats section.** Deliberately cut rather than fabricated. Add it back when
  real, citable numbers exist.
- `/privacy` and `/terms` are drafts requiring legal review.

---

## 13. Acceptance checklist

1. No fabricated metrics, testimonials, people, or quotes anywhere on the page.
2. No dating or stranger framing; Tinder never referenced.
3. Keyboard-only: drawer, anchors, set-piece, form, focus order, Escape — all work.
4. `prefers-reduced-motion` honored; page fully usable.
5. Zero horizontal scroll, 320px → 1920px; no clipped controls or wrapped button labels.
6. AA contrast verified, especially ink-on-orange and the `-deep` text variants.
7. Production build clean: no TypeScript, a11y, missing-key, or asset-path errors.
8. No `transition-all`; no animated width/height/top/left/padding/margin.
9. No custom cursor, particles, magnetic buttons, or mouse-follow effects.
10. Store-link placeholders clearly marked in code.

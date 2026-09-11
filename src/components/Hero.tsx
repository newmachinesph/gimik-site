import Link from "next/link";

import { StoreButtons } from "./StoreButtons";
import { Stage } from "./site/kit";

/**
 * The whole pitch in one screen: the sentence everybody says, and the thing
 * Gimik turns it into.
 *
 * The two halves are deliberately unequal. The sentence is set in the display
 * face and the word "sometime" in the serif accent, because "sometime" is the
 * problem; the date is set on the perforated orange stub, because a date is the
 * product. Everything below this section is evidence for that one exchange.
 *
 * The phone shows Activity rather than a prettier screen: it is the only
 * capture where dated plans and undated ones sit together, which is the
 * argument the page is making.
 */
export function Hero() {
  return (
    <section className="relative" style={{ paddingTop: "calc(var(--header-height) + 56px)" }}>
      <div className="container-page grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <p className="mono-label text-ink-muted">Starting in the Philippines</p>

          <h1
            className="display-head mt-6 font-bold"
            style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}
          >
            <span className="block">&ldquo;We should do</span>
            <span className="block">
              that <span className="serif-accent">sometime</span>.&rdquo;
            </span>
          </h1>

          <p
            className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-semibold"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
          >
            <span className="text-ink-muted">Becomes</span>
            <span className="date-ticket">SAT, 14 MAR</span>
          </p>

          <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-ink-muted">
            Gimik is for the plans you keep meaning to make. Keep the things you
            want to do, see who already wants the same, and give one of them a
            day. That is the entire app.
          </p>

          <div className="mt-10">
            <StoreButtons />
          </div>

          <p className="mt-8 text-[15px] text-ink-muted">
            Free, with nothing to buy.{" "}
            <Link href="/features" className="font-medium text-orange-deep underline underline-offset-4">
              See everything it does
            </Link>
          </p>
        </div>

        <Stage shot="activity" tone="orange" scale={0.78} preload />
      </div>
    </section>
  );
}

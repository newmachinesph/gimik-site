import { StoreButtons } from "./StoreButtons";
import { Reveal } from "./Reveal";

/**
 * The one large orange field on the page (spec §3.1, §4.8). Light (paper) type
 * per user direction 2026-08-09 — overrides the spec's original ink-text note,
 * which left the muted labels near-invisible on orange.
 */
export function GetTheApp() {
  return (
    <section
      id="get"
      className="below-fold"
      style={{ paddingBlock: "clamp(88px, 11vw, 160px)" }}
    >
      <div className="container-page">
        <Reveal>
          <div
            className="relative overflow-hidden bg-orange text-paper"
            style={{
              borderRadius: 32,
              padding: "clamp(32px, 4vw, 64px)",
            }}
          >
            {/* Ghost serif "sometime" — the word the card retires */}
            <span
              aria-hidden="true"
              className="serif-accent pointer-events-none absolute -right-8 -top-10 select-none opacity-[0.14]"
              style={{ fontSize: "clamp(8rem, 22vw, 20rem)", lineHeight: 1 }}
            >
              sometime
            </span>
            <p className="mono-label relative">Get the app</p>
            <h2
              className="display-head mt-5 max-w-[12ch] font-semibold"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
            >
              Stop saying{" "}
              <span className="serif-accent font-normal">sometime.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.65]">
              Free on iPhone and Android. Your list is waiting for a date.
            </p>
            <div className="mt-10">
              <StoreButtons tone="light" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

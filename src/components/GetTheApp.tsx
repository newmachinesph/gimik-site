import { StoreButtons } from "./StoreButtons";
import { Reveal } from "./Reveal";

/** The one large orange field on the page (spec §3.1, §4.8). Ink text, never white. */
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
            className="bg-orange text-ink"
            style={{
              borderRadius: 32,
              padding: "clamp(32px, 4vw, 64px)",
            }}
          >
            <p className="mono-label">Get the app</p>
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
              <StoreButtons qr />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

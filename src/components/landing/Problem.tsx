import { Reveal } from "@/components/Reveal";

/**
 * The turn. Everything above this is the promise; everything below is how.
 *
 * Set on night so the page has one hard break in it — the moment the reader
 * stops looking at a product and reads a sentence about their own life.
 */
export function Problem() {
  return (
    <section className="below-fold bg-night text-paper">
      <div className="container-page py-[clamp(88px,12vw,160px)]">
        <Reveal>
          <p
            className="display-head mx-auto max-w-[18ch] text-center font-bold"
            style={{ fontSize: "clamp(34px, 6vw, 76px)" }}
          >
            Everyone has the list.
            <br />
            <span style={{ color: "var(--sky)" }}>Nobody has the date.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-[54ch] text-center text-[17px] leading-[1.7] text-paper/70">
            The ideas survive. They sit in group chats, in notes apps, in the
            back of a conversation you had two years ago. What never happens is
            the part where someone picks a day. Gora is the app for that part.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

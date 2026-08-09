import { faqs } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionRule } from "./SectionRule";

/**
 * The answers, in plain sight.
 *
 * These are the same strings the FAQPage structured data emits. Native
 * <details> rather than a scripted accordion, so the text is in the DOM for a
 * crawler, findable by in-page search, and keyboard-operable with no JS.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="below-fold"
      style={{ paddingBlock: "clamp(88px, 11vw, 160px)" }}
    >
      <div className="container-page">
        <SectionRule index="05" label="Questions" />
        <Reveal>
          <h2
            className="display-head max-w-[14ch] font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            The short{" "}
            <span className="serif-accent font-normal text-sky-deep">answers.</span>
          </h2>
        </Reveal>

        <dl className="mt-16 max-w-[68ch]">
          {faqs.map((item) => (
            <Reveal key={item.q}>
              <details className="group border-t border-rule py-6">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                  <dt>{item.q}</dt>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-[15px] text-ink-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="mt-4 max-w-[58ch] text-[clamp(1rem,1vw,1.075rem)] leading-[1.65] text-ink-muted">
                  {item.a}
                </dd>
              </details>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

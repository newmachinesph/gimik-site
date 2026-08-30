import { FEATURES, CORE_FEATURE_IDS } from "@/data/features";
import { SectionHead } from "@/components/site/kit";
import { FeatureBlock } from "@/components/site/kit";
import { Reveal } from "@/components/Reveal";

const TONES = ["sky", "sky", "orange"] as const;

/**
 * Keep, match, lock — the three steps, in real screens.
 *
 * The tone runs sky, sky, orange on purpose: the ground under the phone turns
 * warm exactly where the product does, so the colour makes the argument before
 * the copy does.
 */
export function CoreLoop() {
  const core = CORE_FEATURE_IDS.map(
    (id) => FEATURES.find((f) => f.id === id)!,
  );

  return (
    <section id="how" className="below-fold">
      <div className="container-page py-[clamp(80px,10vw,140px)]">
        <Reveal>
          <SectionHead
            eyebrow="How it works"
            title="Three steps, and the third one is the whole point."
            align="center"
          />
        </Reveal>

        <div className="mt-[clamp(56px,7vw,96px)] space-y-[clamp(72px,9vw,128px)]">
          {core.map((feature, i) => (
            <FeatureBlock
              key={feature.id}
              eyebrow={feature.eyebrow}
              title={feature.title}
              body={feature.body}
              points={feature.points}
              shot={feature.shot}
              tone={TONES[i]}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

import discover from "../../../public/app-screens/01-discover.webp";
import somedays from "../../../public/app-screens/02-somedays.webp";
import activity from "../../../public/app-screens/03-activity.webp";
import invites from "../../../public/app-screens/04-invites.webp";
import profile from "../../../public/app-screens/05-profile.webp";
import messages from "../../../public/app-screens/06-messages.webp";
import friends from "../../../public/app-screens/07-friends.webp";
import groups from "../../../public/app-screens/08-groups.webp";
import settings from "../../../public/app-screens/09-settings.webp";
import thread from "../../../public/app-screens/10-thread.webp";
import someday from "../../../public/app-screens/11-someday.webp";

/**
 * Real captures of the Gora app from the shipping build. These are not
 * mockups: a drawing of the product drifts from it the moment either changes,
 * and this page is the only proof most people get before they download.
 *
 * Regenerate with `./scripts/capture-screens.sh` then
 * `node scripts/process-screens.mjs`. Both the status bar and the gesture bar
 * are cropped by that pipeline, so what lands here is app content only —
 * 1080x2190, which is exactly the aspect PhoneFrame is built around.
 *
 * Each shot is carried twice on purpose. `img` is a static import, which is
 * what next/image wants: it gets the intrinsic size and a blur placeholder for
 * free at build time, so a phone is never an empty white rectangle while its
 * capture arrives. `file` is the same bytes at their public path, for the press
 * kit's download links, which want a filename a writer can recognise rather
 * than a content hash.
 *
 * Alt text describes what is on the screen, not what the feature is called.
 * Someone who cannot see the image should learn the same thing a sighted
 * reader learns from looking at it.
 */
export const APP_SHOTS = {
  discover: {
    img: discover,
    file: "/app-screens/01-discover.webp",
    alt: "The Gora discover screen, headed “Things other people are actually doing”, with a search field, category filters and 137 somedays shown as photo cards — seeing the northern lights, riding a balloon at sunrise, learning to surf, a Friday food crawl.",
  },
  somedays: {
    img: somedays,
    file: "/app-screens/02-somedays.webp",
    alt: "A someday in Gora shown as a full-bleed photo card: two people at a loom, labelled Skills, “Learn a traditional craft”, with a note that one person wants this too.",
  },
  activity: {
    img: activity,
    file: "/app-screens/03-activity.webp",
    alt: "The Gora activity screen, “Where each of your somedays is”. Under Locked, seeing the northern lights is dated tomorrow with Mara Ilagan and riding a balloon at sunrise is dated Monday 14 September with Jon Reyes. Below, nine more somedays are kept and still waiting for a date.",
  },
  invites: {
    img: invites,
    file: "/app-screens/04-invites.webp",
    alt: "The Gora invites screen, “People who want to do one of your somedays with you”, listing five invites from Jon Reyes, Ana Cruz, Theo Lim, Noor Salcedo and Kaz Miyamoto. One is marked 2h left. A note reads that invites fade after a week.",
  },
  profile: {
    img: profile,
    file: "/app-screens/05-profile.webp",
    alt: "A Gora profile: Bea, 28, in Cebu City, “Saying yes to more weekends”, a dive instructor, with interests in spa days, surfing, freediving and beach days, and speaking Cebuano, Filipino and English. Below are 3 friends, 2 groups, and a record of 2 things already done.",
  },
  messages: {
    img: messages,
    file: "/app-screens/06-messages.webp",
    alt: "The Gora messages list, mixing a direct conversation with Mara Ilagan, group threads for Saturday People and Sunrise Crew, and plan threads for running a long-distance course, riding a hot-air balloon and seeing an aurora.",
  },
  friends: {
    img: friends,
    file: "/app-screens/07-friends.webp",
    alt: "The Gora friends screen, listing friends and pending requests.",
  },
  groups: {
    img: groups,
    file: "/app-screens/08-groups.webp",
    alt: "The Gora groups screen showing two groups — Saturday People with 4 members and Sunrise Crew with 1 — above a button to start a new one.",
  },
  settings: {
    img: settings,
    file: "/app-screens/09-settings.webp",
    alt: "The Gora settings screen, including account controls.",
  },
  thread: {
    img: thread,
    file: "/app-screens/10-thread.webp",
    alt: "A Gora conversation with Mara Ilagan about seeing the northern lights, headed with the someday itself and a prompt that there is no date yet and one can be proposed below.",
  },
  someday: {
    img: someday,
    file: "/app-screens/11-someday.webp",
    alt: "A someday in Gora — seeing the northern lights in Tromso, Norway — locked to a date in August, above a control choosing who can invite you to it: just me, friends, groups or everyone, with friends selected.",
  },
} as const;

export type ShotName = keyof typeof APP_SHOTS;

/** Clearance for the Dynamic Island, matching PhoneFrame's 12px top + 37px pill. */
const STATUS_BAND = 44;

/** PhoneFrame's untransformed width, which `scale` is applied to. */
const FRAME_W = 375;

/**
 * Fills a PhoneFrame with one capture. The frame itself carries the alt text
 * as a role="img" label, so the img stays decorative and nothing is read twice.
 *
 * `scale` has to be passed down rather than left to CSS. PhoneFrame lays the
 * chassis out at 375px and then shrinks it with a transform, so the browser
 * sizes the srcset against 375px while the reader only ever sees 375 × scale —
 * on a three-column row that is 195px, and the browser was fetching a capture
 * wide enough for a phone twice that size. Telling it the width it will
 * actually paint is the whole optimisation.
 */
export function PhoneShot({
  name,
  scale = 1,
  preload = false,
}: {
  name: ShotName;
  scale?: number;
  preload?: boolean;
}) {
  const shot = APP_SHOTS[name];
  return (
    <div className="flex h-full w-full flex-col bg-paper">
      {/* Empty band the Dynamic Island sits in. The captures carry no status
          bar, so without this the island would land on the app's own header. */}
      <div className="shrink-0" style={{ height: STATUS_BAND }} />
      <div className="relative min-h-0 flex-1">
        <Image
          src={shot.img}
          alt=""
          fill
          preload={preload}
          sizes={`${Math.round(FRAME_W * scale)}px`}
          placeholder="blur"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

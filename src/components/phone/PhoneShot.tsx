import Image from "next/image";

/**
 * Real captures of the Gora app from the shipping build. These replaced
 * hand-built DOM mockups: a mockup drifts from the product the moment either
 * one changes, and this page is the only proof most people get before they
 * download.
 *
 * Captured at 375x736, not 375x812 — the frame is 780 tall and STATUS_BAND
 * takes the top 44 for the Dynamic Island. Shooting at the height the app
 * actually gets means its bottom tab bar lands inside the frame instead of
 * being cropped off by a cover-fit.
 */
export const APP_SHOTS = {
  list: {
    src: "/app-screens/app-list.webp",
    alt: "The Gora app showing a bucket called Bea's brave year, with a locked someday to see the northern lights in Tromso, Norway.",
  },
  activity: {
    src: "/app-screens/app-activity.webp",
    alt: "The Gora activity screen listing plans that already have a date, including the northern lights on 14 February 2027 with two people in.",
  },
  calendar: {
    src: "/app-screens/app-calendar.webp",
    alt: "The Gora calendar with a someday, learning to surf a real break, ready to drag onto a day in September.",
  },
  discover: {
    src: "/app-screens/app-discover.webp",
    alt: "The Gora discover screen showing what other people are adding, including a Friday food crawl saved 1,503 times.",
  },
} as const;

export type ShotName = keyof typeof APP_SHOTS;

/** Clearance for the Dynamic Island, matching PhoneFrame's 12px top + 37px pill. */
const STATUS_BAND = 44;

/**
 * Fills a PhoneFrame with one capture. The frame itself carries the alt text
 * as a role="img" label, so the img stays decorative and nothing is read twice.
 */
export function PhoneShot({
  name,
  priority = false,
}: {
  name: ShotName;
  priority?: boolean;
}) {
  const shot = APP_SHOTS[name];
  return (
    <div className="flex h-full w-full flex-col bg-paper">
      {/* Empty band the Dynamic Island sits in. The captures have no iOS status
          bar, so without this the island lands on the app's own header. */}
      <div className="shrink-0" style={{ height: STATUS_BAND }} />
      <div className="relative min-h-0 flex-1">
        <Image
          src={shot.src}
          alt=""
          fill
          priority={priority}
          sizes="375px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

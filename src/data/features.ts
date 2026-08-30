import type { ShotName } from "@/components/phone/PhoneShot";

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: readonly string[];
  shot: ShotName;
};

/**
 * What Gora actually does, in the order a person meets it.
 *
 * Every claim here is checked against the shipping build and against the
 * capture named in `shot` — if a bullet is not visible in the app, it does not
 * belong on the site. The first three describe the core loop the product was
 * built around; the last three are the parts that used to have no page at all.
 */
export const FEATURES: readonly Feature[] = [
  {
    id: "keep",
    eyebrow: "01 — Keep",
    title: "Everything you keep meaning to do, in one place.",
    body: "Start from a catalogue of things other people are actually doing, or write your own. Keeping one costs nothing and commits you to nothing — that is the point. A list you are not afraid to add to is a list you will actually use.",
    points: [
      "Browse by category, or search",
      "Add your own someday, private by default",
      "Keep as many as you like, with no date attached",
    ],
    shot: "discover",
  },
  {
    id: "match",
    eyebrow: "02 — Match",
    title: "See who already wants the same thing.",
    body: "The overlap between your list and the people you know was always there. Gora is just the first thing that shows it to you — so the ask stops being “would you ever want to…” and starts being “you already do”.",
    points: [
      "See which friends kept the same someday",
      "Ask one person, or open it to a group",
      "Invites expire after a week, so nothing rots in a list",
    ],
    shot: "invites",
  },
  {
    id: "lock",
    eyebrow: "03 — Lock",
    title: "Give it a date and it stops being someday.",
    body: "This is the whole product in one action. A someday with a date leaves the maybe pile and becomes a plan with a day, a place and the people who said yes — sorted soonest first, so the next real thing is always at the top.",
    points: [
      "Pick a day everyone can make",
      "Locked plans sort soonest first",
      "Unlock it again if life moves",
    ],
    shot: "activity",
  },
  {
    id: "talk",
    eyebrow: "04 — Talk",
    title: "The conversation lives with the plan.",
    body: "Every plan gets its own thread, every group gets one, and you can message a friend directly. Nothing about Friday is three weeks up a group chat, because the thread and the date are the same object.",
    points: [
      "A thread per plan, per group, and per friend",
      "Messages arrive in real time",
      "Propose a date from inside the conversation",
    ],
    shot: "messages",
  },
  {
    id: "groups",
    eyebrow: "05 — Groups",
    title: "For the people you always mean to see.",
    body: "A group is a small standing cast — the ones you keep saying you should do something with. Share a link to bring people in, then let Gora surface the somedays the group already has in common.",
    points: [
      "Start a group and invite by link",
      "See what the group shares",
      "Open a plan up so people already going can join",
    ],
    shot: "groups",
  },
  {
    id: "record",
    eyebrow: "06 — Record",
    title: "The part a calendar throws away.",
    body: "When a plan happens it becomes a record rather than disappearing. Write what it was actually like, add photos, and keep it. Over a year the record is the answer to “what did we even do?” — which is the question the whole app exists to fix.",
    points: [
      "Mark a plan done and write it up",
      "Add photos to the entry",
      "Private unless you choose to share it",
    ],
    shot: "profile",
  },
] as const;

/** The three the landing page shows. The rest live on /features. */
export const CORE_FEATURE_IDS = ["keep", "match", "lock"] as const;

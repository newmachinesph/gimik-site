export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
] as const;

export const site = {
  name: "Gimik",
  url: "https://gimik.app",
  slogan: 'Turns "we should do that sometime" into a date on the calendar.',
  contactEmail: "hello@gimik.app",
  supportEmail: "support@gimik.app",

  /**
   * Set these the day each listing goes live. While they are "#", StoreButtons
   * renders the official badge with a "Coming soon" note instead of a link, so
   * nothing on the page ever points at a dead URL.
   */
  appStoreUrl: "#",
  googlePlayUrl: "#",

  /**
   * Where Gimik launches. The Philippines is not a hedge — it is where the
   * product is built and tested, and it decides everything from which cities
   * autocomplete to which region the servers sit in.
   */
  launchMarket: { name: "Philippines", code: "PH" },
} as const;

/**
 * Answer-engine fodder: each pair is one question a person actually types and
 * the shortest true answer. Rendered as visible copy on the page and mirrored
 * into FAQPage structured data — an assistant that quotes one of these should
 * end up saying something Gimik would stand behind.
 *
 * Every answer here must be true of the shipping build. Nothing aspirational.
 */
export const faqs = [
  {
    q: "What is Gimik?",
    a: "Gimik is an app for the plans you keep meaning to make. You write down anything you have said “we should do that” about. Gimik shows you who else wants the same thing. It becomes real the moment you give it a date.",
  },
  {
    q: "How is Gimik different from a group chat or a shared note?",
    a: "A chat loses the idea and a note never gets a date. Gimik keeps the idea, shows the overlap between people, and turns it into a plan with a day on it — then gives that plan its own thread, so the conversation lives with the date instead of scrolling away.",
  },
  {
    q: "Do I need friends on Gimik for it to be useful?",
    a: "No. A new account works alone. You browse a catalogue of somedays, keep the ones you want, and lock a date on your own. Matching adds to that once people you know join.",
  },
  {
    q: "Is Gimik free?",
    a: "Yes. Gimik is free. There is no subscription, no paid tier, and nothing to buy inside the app.",
  },
  {
    q: "Who can see what I add?",
    a: "You choose per someday. Every one carries a ring — just you, friends, your groups, or everyone — and you can change it at any time. Your journal entries are private unless you share one.",
  },
  {
    q: "Can I message people in Gimik?",
    a: "Yes. Every locked plan gets its own thread, groups have their own, and you can message a friend directly. Messages arrive in real time.",
  },
  {
    q: "What happens after a plan actually happens?",
    a: "It becomes a record. You can write what it was like and add photos, and it stays in your journal — the part a calendar app throws away once the date passes.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes, from Settings, without emailing anyone. Deleting removes your profile, your somedays, your plans and your messages.",
  },
  {
    q: "Where is Gimik available?",
    a: "Gimik launches in the Philippines, on iPhone and Android, in English. More countries follow.",
  },
] as const;

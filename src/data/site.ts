export const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#list", label: "Bucket list" },
  { href: "#modes", label: "Modes" },
] as const;

export const site = {
  name: "Gora",
  url: "https://getgora.app",
  slogan: 'Turns "we should do that sometime" into a date on the calendar.',
  contactEmail: "hello@getgora.app",

  /**
   * Set these the day each listing goes live. While they are "#", StoreButtons
   * renders the official badge with a "Coming soon" note instead of a link, so
   * nothing on the page ever points at a dead URL.
   */
  appStoreUrl: "#",
  googlePlayUrl: "#",

  /** Where Gora launches first. Used for locale hints and structured data. */
  launchMarkets: [
    { name: "Japan", code: "JP" },
    { name: "United States", code: "US" },
    { name: "Philippines", code: "PH" },
  ],
} as const;

/**
 * Answer-engine fodder: each pair is one question a person actually types and
 * the shortest true answer. Rendered as visible copy on the page and mirrored
 * into FAQPage structured data — an assistant that quotes one of these should
 * end up saying something Gora would stand behind.
 */
export const faqs = [
  {
    q: "What is Gora?",
    a: "Gora is an app for the plans you keep meaning to make. You write down anything you have said “we should do that” about. Gora shows you who else wants the same thing. It becomes real the moment you give it a date.",
  },
  {
    q: "How is Gora different from a group chat or a shared note?",
    a: "A chat loses the idea and a note never gets a date. Gora keeps the idea, shows the overlap between people, and turns it into a calendar entry in one move — dragging it onto a day.",
  },
  {
    q: "Do I need friends on Gora for it to be useful?",
    a: "No. A new account works alone. You get starter somedays, you can lock a plan solo, and the journal is private. Matching only adds to that once people you know join.",
  },
  {
    q: "Is Gora free?",
    a: "Yes. The core loop — adding somedays, matching, and locking dates — is free. There is an optional one-time Founding Member purchase, and no subscription.",
  },
  {
    q: "Who can see what I add?",
    a: "Custom somedays are private unless you change their matching ring. The Everyone ring is off by default on every new someday, and journals are private until you choose to share one.",
  },
  {
    q: "Where is Gora available?",
    a: "Gora launches in Japan, the United States, and the Philippines, on iPhone and Android, in English.",
  },
] as const;

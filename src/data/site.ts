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
  // TODO: replace with real store URLs before launch
  appStoreUrl: "#",
  googlePlayUrl: "#",
} as const;

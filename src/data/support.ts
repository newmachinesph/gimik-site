/**
 * Support content, kept as data so /support stays a thin renderer.
 *
 * This page is the support URL on both store listings, so it answers account
 * questions plainly rather than routing everything through a form. Every
 * answer describes the shipping build — if a step here does not exist in the
 * app, the page is wrong, not the app.
 */
export const SUPPORT_TOPICS = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I make an account?",
        a: "Open Gimik and sign up with your email address. You will be asked for a name, a handle and the city you are in — the city is what makes local somedays and nearby people useful.",
      },
      {
        q: "I do not know anyone on Gimik yet.",
        a: "That is fine. Browse the catalogue, keep what you want, and lock a date on your own. Nothing in the core loop needs a second person.",
      },
    ],
  },
  {
    title: "Account and sign-in",
    items: [
      {
        q: "I forgot my password.",
        a: "Tap Forgot password on the sign-in screen and enter your email. If an account exists you will get a reset link. The screen says the same thing either way, so it never reveals whether an address is registered.",
      },
      {
        q: "How do I change my profile?",
        a: "Profile, then the settings icon, then Edit profile. You can change your photo, bio, work, education, interests and city at any time.",
      },
      {
        q: "How do I delete my account?",
        a: "Settings, then Delete account. It is permanent and removes your profile, your somedays, your plans, your messages and your journal. You do not need to email anyone to do it.",
      },
    ],
  },
  {
    title: "Privacy",
    items: [
      {
        q: "Who can see the things I keep?",
        a: "You choose per someday. Each one carries a ring — just me, friends, groups, or everyone — and you can change it whenever you like from the someday itself.",
      },
      {
        q: "Are my journal entries private?",
        a: "Yes, unless you choose to share one.",
      },
      {
        q: "Can I stop someone contacting me?",
        a: "You can hide a person from your invites and suggestions, and you can report a plan or a person from its own screen.",
      },
    ],
  },
  {
    title: "Plans, invites and groups",
    items: [
      {
        q: "How long does an invite last?",
        a: "A week. After that it fades on its own — ignoring an invite is a valid answer, and nothing sits in your list forever.",
      },
      {
        q: "Can I change a date after locking it?",
        a: "Yes. Open the plan and unlock it. The someday goes back to your list with everyone still attached.",
      },
      {
        q: "How do people join a group?",
        a: "Open the group and share its link. Anyone with the link can join.",
      },
    ],
  },
] as const;

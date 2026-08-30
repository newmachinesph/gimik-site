# getgoraapp

Marketing site for **Gora** — the app that turns "we should do that sometime" into
a date on the calendar. Next.js 16, React 19, Tailwind 4, deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + typecheck
npx eslint .
```

## How it is put together

- `src/data/` is the content layer. Copy lives here, not in components:
  `site.ts` (name, URLs, FAQ), `features.ts` (what the app does),
  `support.ts` (help content). The landing page and `/features` render the
  same `FEATURES` array, so they cannot drift apart.
- `src/components/site/kit.tsx` holds the section primitives every page is
  built from — `SectionHead`, `Stage`, `FeatureBlock`.
- `src/styles/tokens.css` is the only place raw colour values appear. It
  mirrors the mobile app's palette (`gora-v2/src/lib/colors.ts`) exactly;
  change one and change the other.

## Screenshots

Every phone image on this site is a real capture of the shipping build, not a
mockup. To refresh them, connect an Android device with the app installed and:

```bash
./scripts/capture-screens.sh      # writes ./screens-raw (gitignored)
node scripts/process-screens.mjs  # crops + converts into public/app-screens
```

The capture script navigates by deep link rather than by tapping coordinates —
taps race with navigation and silently capture the previous screen — and forces
SystemUI demo mode so the status bar is identical in every shot. The processing
step crops the phone's status and gesture bars, since the site renders these
inside its own chassis.

After adding or renaming a screen, update `APP_SHOTS` in
`src/components/phone/PhoneShot.tsx`, including its alt text.

## Before launch

`site.appStoreUrl` and `site.googlePlayUrl` are `"#"`. While they are, the store
badges render with a "Coming soon" note instead of a link, so nothing on the
page points at a dead URL. Set them the day each listing goes live.

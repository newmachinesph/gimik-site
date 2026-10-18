# gimik-site

Marketing site for [Gimik](https://gimik.app) (formerly "Gora"), the mobile app that turns "we should do that sometime" into a date on the calendar. Built with Next.js 16, React 19 and Tailwind 4.

## Part of Gimik

| Repo | What it is |
|------|------------|
| [gimik-site](https://github.com/newmachinesph/gimik-site) | Marketing site (this repo) |
| [gimik-app](https://github.com/newmachinesph/gimik-app) | Mobile app (Expo) |
| [gimik-backend](https://github.com/newmachinesph/gimik-backend) | API (FastAPI) |

## What's on the site

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/features` | Feature walkthrough |
| `/about` | About |
| `/press` | Press |
| `/support` | Help and FAQ |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

Also generated: `robots.txt`, `sitemap.xml`, favicon/Apple icon and an Open Graph image.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- `motion` for animation, `lucide-react` for icons
- `@next/third-parties` (Google Analytics)
- ESLint 9 with `eslint-config-next`
- `sharp` for the screenshot processing script

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

No environment variables are required. `.env*` files are gitignored.

## Scripts

| Command | Does |
|---------|------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build and typecheck |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

```
src/
  app/          Routes (about, contact, features, press, privacy, support, terms),
                layout, robots, sitemap, icons, Open Graph image
  components/
    landing/    Landing page sections
    phone/      Phone chassis and app screenshots (PhoneShot.tsx)
    site/       Header, footer, section primitives (kit.tsx)
  data/         Content layer: site.ts, features.ts, support.ts
  hooks/        Shared hooks
  styles/       index.css, tokens.css
public/
  app-screens/  App screenshots (WebP)
  badges/       App Store and Google Play badges
  brand/        Logos and marks
scripts/        Screenshot capture and processing
docs/           Project docs
```

Conventions:

- `src/data/` is the content layer. Copy lives here, not in components: `site.ts` (name, URLs, FAQ), `features.ts` (what the app does), `support.ts` (help content). The landing page and `/features` render the same `FEATURES` array, so they cannot drift apart.
- `src/components/site/kit.tsx` holds the section primitives every page is built from: `SectionHead`, `Stage`, `FeatureBlock`.
- `src/styles/tokens.css` is the only place raw colour values appear. It mirrors the mobile app's palette in `gimik-app` exactly; change one and change the other.

## Screenshots

Every phone image on this site is a real capture of the shipping build, not a mockup. To refresh them, connect an Android device with the app installed and run:

```bash
./scripts/capture-screens.sh      # writes ./screens-raw (gitignored)
node scripts/process-screens.mjs  # crops and converts into public/app-screens
```

The capture script navigates by deep link rather than by tapping coordinates (taps race with navigation and silently capture the previous screen) and forces SystemUI demo mode so the status bar is identical in every shot. The processing step crops the phone's status and gesture bars, since the site renders these inside its own chassis.

After adding or renaming a screen, update `APP_SHOTS` in `src/components/phone/PhoneShot.tsx`, including its alt text.

## Store links

`site.appStoreUrl` and `site.googlePlayUrl` in `src/data/site.ts` are `"#"` until each listing goes live. While they are, the store badges render with a "Coming soon" note instead of a link, so nothing on the page points at a dead URL.

## Deployment

Deployed to a managed Next.js host from the main branch; any platform that runs `npm run build` and `npm run start` will work.

## Contact

hello@gimik.app, support@gimik.app

## License

MIT. See [LICENSE](LICENSE).

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteSchema } from "@/components/SiteSchema";
import { site } from "@/data/site";
import "@/styles/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-accent",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

const TITLE =
  'Gora — Turns "we should do that sometime" into a date on the calendar';
const DESCRIPTION =
  "Gora turns the ideas sitting in your group chat into plans with a date on them. Bucket-list items, small things, big things — solo, with one person, or with everyone.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: "%s — Gora" },
  description: DESCRIPTION,
  applicationName: site.name,
  category: "lifestyle",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gora — plans with people you like",
    description:
      "Write down the things you keep meaning to do, see who else wants the same, and give one a date.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteSchema />
      </body>
    </html>
  );
}

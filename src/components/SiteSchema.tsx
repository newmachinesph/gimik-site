import { faqs, site } from "@/data/site";

/**
 * One JSON-LD graph for the whole site.
 *
 * Three jobs, in the order search and answer engines use them:
 * - Organization and WebSite say who publishes this and what it is called.
 * - SoftwareApplication is the bit that earns an app result: category, the two
 *   platforms, the price, and the regions it serves.
 * - FAQPage mirrors the questions rendered on the page. Every answer here also
 *   exists as visible copy — structured data that says something the page does
 *   not is the fastest way to lose the rich result.
 *
 * `@id` values are stable so the nodes reference each other instead of
 * repeating themselves.
 */
export function SiteSchema() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.contactEmail,
      logo: `${site.url}/icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.slogan,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android",
      description: site.slogan,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      // GEO: the three markets Gora launches in, named as countries so a
      // regional query can match rather than guessing from the .app domain.
      areaServed: site.launchMarkets.map((market) => ({
        "@type": "Country",
        name: market.name,
        identifier: market.code,
      })),
      screenshot: [
        `${site.url}/app-screens/app-list.webp`,
        `${site.url}/app-screens/app-activity.webp`,
        `${site.url}/app-screens/app-calendar.webp`,
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, not user input, and JSON.stringify
      // escapes the quotes that would otherwise break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

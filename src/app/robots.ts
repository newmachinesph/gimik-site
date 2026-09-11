import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Open to everyone, including the answer engines. Gimik has nothing to gain by
 * blocking the crawlers that would otherwise describe it from second-hand
 * sources, so there is no assistant-specific disallow here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

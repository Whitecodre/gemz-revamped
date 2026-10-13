import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Served at /robots.txt. Crawlers may visit everything; the internal
// /design-system page keeps itself out of search results with its own `noindex`.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

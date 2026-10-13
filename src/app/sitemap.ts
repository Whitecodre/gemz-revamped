import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Served at /sitemap.xml. There is one public page for now; add a line here for
// every new page. /design-system is deliberately not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

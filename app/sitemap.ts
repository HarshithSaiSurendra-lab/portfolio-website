import type { MetadataRoute } from "next";

// Static sitemap for the two crawlable pages. SITE_URL mirrors the canonical
// origin used in layout metadata.
const SITE_URL = "https://sai-surendra.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

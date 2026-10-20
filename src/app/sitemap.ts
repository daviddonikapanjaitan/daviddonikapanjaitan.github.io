import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required for static export (GitHub Pages); harmless on Vercel.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

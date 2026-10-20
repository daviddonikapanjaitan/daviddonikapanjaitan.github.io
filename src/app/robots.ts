import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required for static export (GitHub Pages); harmless on Vercel.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

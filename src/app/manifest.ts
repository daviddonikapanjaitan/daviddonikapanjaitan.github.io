import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { asset } from "@/lib/site";

// Required for static export (GitHub Pages); harmless on Vercel.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | Portfolio`,
    short_name: "D. Panjaitan",
    description:
      "Portfolio of David Donika Panjaitan, Senior Backend Developer.",
    start_url: asset("/"),
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1e3a8a",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}

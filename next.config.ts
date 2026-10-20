import type { NextConfig } from "next";

/**
 * Default: a normal Next.js build for Vercel.
 *
 * GitHub Pages: build with STATIC_EXPORT=true (and NEXT_PUBLIC_BASE_PATH=/<repo>
 * when the repo is not <username>.github.io). This writes a fully static site
 * to `out/`. See README.md.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    // GitHub Pages cannot run the Next.js image optimizer; images in
    // public/ are already compressed by scripts/generate-assets.mjs.
    images: { unoptimized: true },
  }),
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

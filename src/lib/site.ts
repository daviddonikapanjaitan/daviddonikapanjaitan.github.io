/**
 * Site-wide settings. Content lives in `src/data`; this file only holds
 * switches and URL helpers.
 */
export const siteConfig = {
  /**
   * Show client names (CIMB, Allianz, Tokio Marine) publicly.
   * Set to `false` to replace them with anonymous descriptions if an NDA
   * does not allow naming them.
   */
  showClientNames: true,
  /** Show the GPA in the Education section. */
  showGpa: true,
  /** Optional link to this site's source code in the footer. */
  sourceUrl: undefined as string | undefined,
};

/** Base path when the site is served from a sub-folder (GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a `public/` file path with the base path. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

/**
 * Absolute site URL used for canonical links, Open Graph, sitemap and
 * robots. Set NEXT_PUBLIC_SITE_URL once you have a custom domain; on Vercel
 * the production URL is picked up automatically.
 */
export const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
})();

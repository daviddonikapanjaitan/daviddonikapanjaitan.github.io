import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {year} {name}
        </p>
        <p>
          Built with Next.js &amp; Tailwind CSS
          {siteConfig.sourceUrl && (
            <>
              {" · "}
              <a
                href={siteConfig.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Source
              </a>
            </>
          )}
        </p>
        <a
          href="#main"
          className="inline-flex min-h-11 items-center gap-1 hover:text-foreground"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="size-4" />
        </a>
      </div>
    </footer>
  );
}

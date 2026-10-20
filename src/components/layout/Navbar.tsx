"use client";

import { Download } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { navItems, sectionHref } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {
  name: string;
  resumeHref: string;
  resumeFileName: string;
};

/** Tracks which section is currently in view. */
function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "active" while it crosses a line ~35% from the top.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      // Clear the highlight when scrolled back up to the hero.
      if (sections[0] && window.scrollY < sections[0].offsetTop - 200) {
        setActive(null);
      }
      // The last section may be too short to reach the line, so highlight
      // it once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length > 0) {
        setActive(sections[sections.length - 1].id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

const sectionIds = navItems.map((item) => item.id);

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function Navbar({ name, resumeHref, resumeFileName }: NavbarProps) {
  const active = useActiveSection(sectionIds);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur transition-colors ${
        scrolled
          ? "border-border bg-background/85"
          : "border-transparent bg-background/60"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a
          href={sectionHref("hero")}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
          >
            DP
          </span>
          <span className="hidden sm:inline">{name}</span>
          <span className="sr-only sm:hidden">{name}</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <a
            href={resumeHref}
            download={resumeFileName}
            className="ml-1 hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download aria-hidden="true" className="size-4" />
            Download CV
          </a>

          <MobileMenu
            active={active}
            resumeHref={resumeHref}
            resumeFileName={resumeFileName}
          />
        </div>
      </nav>
    </header>
  );
}

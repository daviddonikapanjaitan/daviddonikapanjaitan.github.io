"use client";

import { Download, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, sectionHref } from "@/lib/navigation";

type MobileMenuProps = {
  active: string | null;
  resumeHref: string;
  resumeFileName: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  active,
  resumeHref,
  resumeFileName,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      // Keep focus inside the menu while it is open.
      if (event.key === "Tab" && panel) {
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    // Close if the window grows to the desktop layout.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      {/* Portal: the sticky header uses backdrop-filter, which would
          otherwise trap this fixed panel inside the header. */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-50 flex h-dvh flex-col bg-background px-4 sm:px-6"
          >
            <div className="flex h-16 items-center justify-end">
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`block rounded-lg px-4 py-3 text-2xl font-semibold tracking-tight transition-colors hover:bg-surface ${
                      active === item.id ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pb-8">
              <a
                href={resumeHref}
                download={resumeFileName}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
              >
                <Download aria-hidden="true" className="size-5" />
                Download CV
              </a>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

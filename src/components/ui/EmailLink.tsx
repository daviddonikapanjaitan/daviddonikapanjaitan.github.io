"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Email = { user: string; domain: string };

const noopSubscribe = () => () => {};

/**
 * The address is assembled in the browser, so it is not in the static HTML
 * that scrapers read.
 */
function useEmailAddress(email: Email): string | null {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return isClient ? `${email.user}@${email.domain}` : null;
}

/** Shows the address with a mailto link and a copy-to-clipboard button. */
export function EmailCard({ email }: { email: Email }) {
  const address = useEmailAddress(email);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand.
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={address ? `mailto:${address}` : undefined}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Mail aria-hidden="true" className="size-5" />
        <span className="break-all">
          {address ?? `${email.user} [at] ${email.domain}`}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        disabled={!address}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-semibold transition-colors hover:bg-surface disabled:opacity-60"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-5 text-accent-strong" />
        ) : (
          <Copy aria-hidden="true" className="size-5" />
        )}
        {copied ? "Copied!" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

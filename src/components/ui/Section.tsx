import type { SectionId } from "@/lib/navigation";

type SectionProps = {
  id: SectionId;
  /** Mono label shown above the title, e.g. "experience" -> "// experience". */
  label: string;
  title: string;
  intro?: React.ReactNode;
  alt?: boolean;
  children: React.ReactNode;
};

/** Page section with a consistent heading (h2) and spacing. */
export function Section({
  id,
  label,
  title,
  intro,
  alt = false,
  children,
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={alt ? "bg-surface" : undefined}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div data-reveal className="mb-12 max-w-2xl">
          <p className="font-mono text-sm text-accent-strong">
            {"// "}
            {label}
          </p>
          <h2
            id={headingId}
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

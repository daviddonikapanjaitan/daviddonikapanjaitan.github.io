import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { siteConfig } from "@/lib/site";
import { Section } from "@/components/ui/Section";

export function Education() {
  return (
    <Section id="education" label="education" title="Education & Certification">
      <ul className="grid gap-6 md:grid-cols-2">
        {education.map((entry) => {
          const Icon = entry.kind === "education" ? GraduationCap : Award;
          const meta = [
            entry.date,
            siteConfig.showGpa && entry.gpa ? `GPA ${entry.gpa}` : undefined,
          ].filter(Boolean);

          return (
            <li
              key={entry.title}
              data-reveal
              className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-accent-strong">
                  {entry.kind === "education" ? "Education" : "Certification"}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {entry.institution ?? entry.title}
                </h3>
                {entry.institution && <p className="mt-1">{entry.title}</p>}
                {meta.length > 0 && (
                  <p className="mt-1 text-sm text-muted">{meta.join(" · ")}</p>
                )}
                {entry.credentialUrl && (
                  <a
                    href={entry.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View credential
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

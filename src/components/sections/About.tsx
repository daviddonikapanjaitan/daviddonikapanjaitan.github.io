import { GraduationCap, Languages, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { yearsSince } from "@/lib/dates";
import { Section } from "@/components/ui/Section";

export function About() {
  const years = yearsSince(profile.careerStart);
  const degree = education.find((entry) => entry.kind === "education");

  const facts = [
    degree && {
      icon: GraduationCap,
      label: "Education",
      value: `${degree.institution}, ${degree.title}`,
    },
    {
      icon: Languages,
      label: "Languages",
      value: profile.spokenLanguages.join(", "),
    },
    { icon: MapPin, label: "Based in", value: profile.location },
  ].filter((fact) => !!fact);

  return (
    <Section id="about" label="about" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div
          data-reveal
          className="space-y-5 text-lg leading-relaxed text-muted"
        >
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>
              {paragraph.replace("{years}", String(years))}
            </p>
          ))}
        </div>

        <dl
          data-reveal
          className="h-fit space-y-5 rounded-2xl border border-border bg-surface p-6"
        >
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt className="flex items-center gap-3 text-sm font-medium text-muted">
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-accent-strong"
                />
                {label}
              </dt>
              <dd className="mt-0.5 pl-8 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

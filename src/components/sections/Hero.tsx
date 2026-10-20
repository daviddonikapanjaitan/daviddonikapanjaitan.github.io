import { Briefcase, Download, Languages, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { yearsSince } from "@/lib/dates";
import { asset } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Hero() {
  const years = yearsSince(profile.careerStart);

  const stats = [
    { icon: Briefcase, label: `${years}+ years of experience` },
    { icon: MapPin, label: profile.location },
    { icon: Languages, label: profile.spokenLanguages.join(" · ") },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-20 sm:px-6 md:grid-cols-[1fr_auto] md:gap-16 md:pt-20 md:pb-28">
        <div className="order-2 md:order-1">
          {profile.openToWork && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </p>
          )}

          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-primary sm:text-xl">
            {profile.headline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {profile.tagline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {stats.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon
                  aria-hidden="true"
                  className="size-4 text-accent-strong"
                />
                {label}
              </li>
            ))}
          </ul>

          <ul aria-label="Industries" className="mt-4 flex flex-wrap gap-2">
            {profile.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
              >
                {industry}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact Me
            </a>
            <a
              href={asset(profile.resumePath)}
              download={profile.resumeFileName}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-surface"
            >
              <Download aria-hidden="true" className="size-5" />
              Download CV
            </a>
            <div className="flex items-center gap-1">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="inline-flex size-12 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <LinkedInIcon className="size-5" />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="inline-flex size-12 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <GitHubIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="order-1 mx-auto md:order-2">
          <div className="relative size-44 sm:size-56 lg:size-72">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full border-2 border-accent/60"
            />
            <Image
              src={asset(profile.photo.src)}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 176px"
              loading="eager"
              className="size-full rounded-full object-cover shadow-xl ring-4 ring-background"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

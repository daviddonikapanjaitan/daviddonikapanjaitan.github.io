import { ExternalLink, Lock, Maximize2 } from "lucide-react";
import Image from "next/image";
import { personalProjects, projects } from "@/data/projects";
import { asset } from "@/lib/site";
import type { PersonalProject } from "@/types/content";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

function GroupHeading({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note?: string;
}) {
  return (
    <div data-reveal className="mb-6">
      <h3 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h3>
      {note && <p className="mt-1 text-muted">{note}</p>}
    </div>
  );
}

function PersonalProjectCard({ project }: { project: PersonalProject }) {
  return (
    <li
      data-reveal
      className="overflow-hidden rounded-2xl border border-border bg-background"
    >
      {project.image && (
        <a
          href={asset(project.image.src)}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block border-b border-border bg-surface"
        >
          <Image
            src={asset(project.image.src)}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="h-auto w-full"
          />
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1.5 text-xs font-medium text-background opacity-90 transition-opacity group-hover:opacity-100">
            <Maximize2 aria-hidden="true" className="size-3.5" />
            View full size
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </a>
      )}

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[3fr_2fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              {project.category}
            </span>
            {project.repoUrl && (
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-accent-strong">
                <GitHubIcon className="size-3" />
                Open source
              </span>
            )}
          </div>

          <h4 className="mt-4 text-2xl font-semibold tracking-tight">
            {project.title}
          </h4>
          <p className="mt-2 text-lg font-medium">{project.summary}</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 text-sm font-medium text-muted">Tech stack</p>
            <TagList
              items={project.tech}
              label={`Technologies used in ${project.title}`}
            />
          </div>

          <div className="flex flex-wrap gap-3 lg:mt-auto">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <GitHubIcon className="size-5" />
                View on GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-semibold transition-colors hover:bg-surface"
              >
                <ExternalLink aria-hidden="true" className="size-5" />
                Live demo
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="projects"
      title="Featured Projects"
      intro="A personal open-source project, followed by selected enterprise systems from my work."
      alt
    >
      {personalProjects.length > 0 && (
        <div className="mb-16">
          <GroupHeading id="personal-projects" title="Personal project" />
          <ul aria-labelledby="personal-projects" className="grid gap-6">
            {personalProjects.map((project) => (
              <PersonalProjectCard key={project.title} project={project} />
            ))}
          </ul>
        </div>
      )}

      <GroupHeading
        id="enterprise-projects"
        title="Enterprise work"
        note="These systems are confidential, so there are no public demos or repositories."
      />
      <ul
        aria-labelledby="enterprise-projects"
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <li
            key={project.title}
            data-reveal
            className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-[translate,box-shadow] duration-200 hover:shadow-lg motion-safe:hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {project.industry}
              </span>
              {project.confidential && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-muted">
                  <Lock aria-hidden="true" className="size-3" />
                  Enterprise · Confidential
                </span>
              )}
            </div>

            <h4 className="mt-4 text-xl font-semibold tracking-tight">
              {project.title}
            </h4>
            <p className="mt-2 font-medium">{project.summary}</p>
            <p className="mt-2 leading-relaxed text-muted">
              {project.description}
            </p>

            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-muted">Role</dt>
              <dd>
                {project.role}, {project.company}
              </dd>
              {project.client && (
                <>
                  <dt className="text-muted">Client</dt>
                  <dd>{project.client}</dd>
                </>
              )}
            </dl>

            <div className="mt-5 flex-1 content-end">
              <TagList
                items={project.tech}
                label={`Technologies used in ${project.title}`}
              />
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View project
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

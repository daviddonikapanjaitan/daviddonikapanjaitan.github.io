import { ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import { formatDuration, formatMonth, toDateTime } from "@/lib/dates";
import type { ExperienceEntry } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

/** Newest first, by start date (not by order in the data file). */
function sortNewestFirst(entries: ExperienceEntry[]): ExperienceEntry[] {
  return [...entries].sort((a, b) => b.start.localeCompare(a.start));
}

function TimelineItem({ job }: { job: ExperienceEntry }) {
  return (
    <li data-reveal className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-2 size-3.5 rounded-full border-2 border-background bg-accent ring-2 ring-accent/30"
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-xl font-semibold tracking-tight">
          {job.role}
          {job.note && " "}
          {job.note && (
            <span className="align-middle text-sm font-normal text-muted">
              ({job.note})
            </span>
          )}
        </h3>
        <p className="shrink-0 font-mono text-sm text-muted">
          <time dateTime={toDateTime(job.start)}>{formatMonth(job.start)}</time>
          {" – "}
          {job.end === "present" ? (
            "Present"
          ) : (
            <time dateTime={toDateTime(job.end)}>{formatMonth(job.end)}</time>
          )}
          <span>
            {" · "}
            {formatDuration(job.start, job.end)}
          </span>
        </p>
      </div>

      <p className="mt-1 font-medium text-primary">
        {job.company}
        {job.via && (
          <span className="font-normal text-muted"> · via {job.via}</span>
        )}
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent">
        {job.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {job.details && job.details.length > 0 && (
        <details className="group mt-3">
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-md text-sm font-semibold text-primary hover:underline">
            <span className="group-open:hidden">
              Show more ({job.details.length})
            </span>
            <span className="hidden group-open:inline">Show less</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform group-open:rotate-180"
            />
          </summary>
          <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent">
            {job.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      )}

      <div className="mt-4">
        <TagList
          items={job.tech}
          label={`Technologies used at ${job.company}`}
        />
      </div>
    </li>
  );
}

export function Experience() {
  const jobs = sortNewestFirst(experience);

  return (
    <Section
      id="experience"
      label="experience"
      title="Work Experience"
      intro="From my first role at XSIS in 2019 to my current role as a Senior Backend Developer."
    >
      <ol className="relative ml-2 border-l-2 border-border">
        {jobs.map((job) => (
          <TimelineItem key={`${job.company}-${job.start}`} job={job} />
        ))}
      </ol>
    </Section>
  );
}

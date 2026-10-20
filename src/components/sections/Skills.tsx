import {
  Activity,
  Boxes,
  Cloud,
  Coffee,
  Database,
  FlaskConical,
  Monitor,
  Network,
  Radio,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import type { SkillGroupIcon } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

const icons: Record<SkillGroupIcon, LucideIcon> = {
  coffee: Coffee,
  server: Server,
  network: Network,
  radio: Radio,
  monitor: Monitor,
  database: Database,
  boxes: Boxes,
  activity: Activity,
  cloud: Cloud,
  flask: FlaskConical,
  wrench: Wrench,
};

export function Skills() {
  return (
    <Section
      id="skills"
      label="skills"
      title="Skills"
      intro={
        <>
          Grouped by area.{" "}
          <span className="font-semibold text-accent-strong">Highlighted</span>{" "}
          skills are the ones I use most.
        </>
      }
      alt
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <li
              key={group.title}
              data-reveal
              className="rounded-2xl border border-border bg-background p-6"
            >
              <h3 className="flex items-center gap-3 font-semibold">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <Tag highlight={skill.core}>
                      {skill.name}
                      {skill.core && (
                        <span className="sr-only"> (core skill)</span>
                      )}
                    </Tag>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

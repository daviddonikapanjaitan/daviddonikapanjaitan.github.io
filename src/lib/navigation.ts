import { basePath } from "./site";

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

/**
 * Link to a section of the home page. Uses "/#id" (with the base path) so
 * the links also work from other pages, such as the 404 page.
 */
export function sectionHref(id: SectionId | "hero"): string {
  return `${basePath}/#${id}`;
}

/** Year and month, e.g. "2024-03". */
export type YearMonth = `${number}-${number}`;

export type Industry = "Banking" | "Payments" | "Insurance" | "Telco";

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  tagline: string;
  location: string;
  email: { user: string; domain: string };
  linkedinUrl: string;
  githubUrl: string;
  /** Optional wa.me link. Leave undefined to hide the WhatsApp button. */
  whatsappUrl?: string;
  resumePath: string;
  resumeFileName: string;
  photo: { src: string; alt: string; width: number; height: number };
  careerStart: YearMonth;
  openToWork: boolean;
  spokenLanguages: string[];
  industries: Industry[];
  about: string[];
  currentCompany: string;
}

export interface Skill {
  name: string;
  core?: boolean;
}

export type SkillGroupIcon =
  | "coffee"
  | "server"
  | "network"
  | "radio"
  | "monitor"
  | "database"
  | "boxes"
  | "activity"
  | "cloud"
  | "flask"
  | "wrench";

export interface SkillGroup {
  title: string;
  icon: SkillGroupIcon;
  skills: Skill[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  /** Contracting company, for placements (e.g. "PT. XSIS Mitra Utama"). */
  via?: string;
  /** Short note shown next to the role, e.g. "Training & internship". */
  note?: string;
  location?: string;
  start: YearMonth;
  end: YearMonth | "present";
  /** Shown by default. */
  highlights: string[];
  /** Shown under "Show more". */
  details?: string[];
  tech: string[];
  industries?: Industry[];
}

export interface Project {
  title: string;
  industry: string;
  summary: string;
  description: string;
  role: string;
  company: string;
  client?: string;
  tech: string[];
  confidential: boolean;
  link?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Personal / open-source project, shown with a screenshot and links. */
export interface PersonalProject {
  title: string;
  /** Short label, e.g. "Fintech · AI". */
  category: string;
  summary: string;
  highlights: string[];
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: ImageAsset;
}

export interface EducationEntry {
  kind: "education" | "certification";
  institution?: string;
  title: string;
  date?: string;
  gpa?: string;
  credentialUrl?: string;
}

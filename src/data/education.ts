import type { EducationEntry } from "@/types/content";

// TODO: add the graduation year (`date`) and the bootcamp issuer
// (`institution`) once confirmed. They are not in the CV.
export const education: EducationEntry[] = [
  {
    kind: "education",
    institution: "Bina Nusantara University",
    title: "Information Systems and Management",
    gpa: "3.25",
  },
  {
    kind: "certification",
    title: "Java Programming Bootcamp",
    date: "January 2020",
  },
];

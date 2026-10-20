import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { yearsSince } from "./dates";
import { siteUrl } from "./site";

export const siteTitle = `${profile.name} | Senior Backend & Full-Stack Developer`;

export function siteDescription(): string {
  const years = yearsSince(profile.careerStart);
  return `Senior Backend Developer in Jakarta with ${years}+ years building Java/Spring Boot, Node.js, Kafka and React systems for banking, payments, insurance and telco.`;
}

/** JSON-LD `Person` structured data for search engines. */
export function personJsonLd() {
  const degree = education.find((entry) => entry.kind === "education");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}${profile.photo.src}`,
    jobTitle: "Senior Backend Developer",
    worksFor: { "@type": "Organization", name: profile.currentCompany },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    sameAs: [profile.linkedinUrl, profile.githubUrl],
    ...(degree?.institution && {
      alumniOf: { "@type": "CollegeOrUniversity", name: degree.institution },
    }),
    knowsLanguage: profile.spokenLanguages,
  };
}

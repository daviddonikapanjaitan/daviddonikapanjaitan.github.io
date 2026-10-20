import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "David Donika Panjaitan",
  shortName: "David",
  headline:
    "Senior Backend Developer · Full-Stack (Java / Spring, Node.js, React)",
  tagline:
    "I build reliable backend systems and web apps for banking, payments, insurance, and telecom, from microservices and event-driven pipelines to responsive front ends.",
  location: "South Jakarta, Indonesia",
  // Stored in two parts and joined in the browser, to make scraping harder.
  email: { user: "daviddonikapanjaitan", domain: "gmail.com" },
  linkedinUrl: "https://www.linkedin.com/in/david-donika-panjaitan",
  githubUrl: "https://github.com/daviddonikapanjaitan",
  whatsappUrl: undefined,
  resumePath: "/resume.pdf",
  resumeFileName: "David-Donika-Panjaitan-CV.pdf",
  photo: {
    src: "/images/profile.webp",
    alt: "Portrait of David Donika Panjaitan",
    width: 800,
    height: 800,
  },
  careerStart: "2019-10",
  openToWork: true,
  spokenLanguages: ["Indonesian", "English"],
  industries: ["Banking", "Payments", "Insurance", "Telco"],
  currentCompany: "PT. Appfuxion Consulting Indonesia",
  // "{years}" is replaced with the calculated years of experience.
  about: [
    "I'm a Full-Stack Developer with {years}+ years of experience, currently working as a Senior Backend Developer at PT. Appfuxion Consulting Indonesia. Most of my work is on the backend: Java and Spring Boot, plus Node.js with Express.js, building microservices, middleware, and event-driven systems with Kafka, RabbitMQ, and Redis.",
    "I've delivered systems for banks, payment providers, insurers, and telecom companies in Indonesia and Malaysia. On the front end I work with React (Hooks), Next.js, and Angular, building Progressive Web Apps and responsive designs.",
    "I enjoy turning complex business processes, like claims adjudication, credit card onboarding, and teller transactions, into clean, dependable software.",
  ],
};

export const emailAddress = `${profile.email.user}@${profile.email.domain}`;

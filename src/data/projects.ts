import type { PersonalProject, Project } from "@/types/content";
import { capitalize, client, clientList } from "./clients";

// Personal / open-source projects, shown first with a screenshot.
// Screenshots: put the original in assets/ and run `npm run assets`.
export const personalProjects: PersonalProject[] = [
  {
    title: "Neraca Lab",
    category: "Fintech · AI / LLM",
    summary:
      "Financial statement analysis using LLMs for companies listed on the Indonesia Stock Exchange (IDX): AI ingestion of filings, an AI stock screener, and in-depth AI analysis of a single stock.",
    highlights: [
      "AI ingestion of IDX XBRL financial statements: Java parses and validates each workbook (Apache POI, accounting identity checks), then a Spring AI agent with tool calling (Plan-and-Execute, ReAct, reflection review) stores and verifies the data.",
      "AI stock screener: a quantitative stage in plain Java builds a shortlist, then a research agent and investor agents modeled on Warren Buffett, Charlie Munger, Peter Lynch, Philip Fisher, and Keith Gill, plus a Risk agent, score each shortlisted stock. Reports export to PDF, with the token cost of every model call recorded.",
      "RAG over company PDF filings and news with PostgreSQL pgvector, plus daily price ingestion, technical analysis (ta4j), and macro data (FRED, Bank Indonesia).",
      "Login with users, roles, and permissions; the full stack starts with one script in Docker.",
    ],
    tech: [
      "Java 21",
      "Spring Boot 4",
      "Spring AI",
      "PostgreSQL 17",
      "pgvector",
      "Redis",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Docker",
    ],
    repoUrl: "https://github.com/daviddonikapanjaitan/neraca-lab",
    image: {
      src: "/images/projects/neraca-lab.webp",
      alt: "Neraca Lab dashboard: the Companies page listing 40 IDX-listed companies with their sector, latest reported period, and latest price.",
      width: 1902,
      height: 930,
    },
  },
];

// Featured projects, in display order. All are confidential enterprise
// systems, so there are no public demo or repository links.
export const projects: Project[] = [
  {
    title: "AGIS Claims",
    industry: "Insurance",
    summary:
      "Automated claims adjudication: receipts and insurance documents in, approve or decline outcomes out.",
    description:
      "A claims adjudication system that derives decisions from receipt and insurance documents, producing approve or decline outcomes to support adjudication decision-making.",
    role: "Senior Backend Developer",
    company: "Appfuxion",
    client: capitalize(clientList("allianz", "tokioMarine")),
    tech: ["Java", "Spring Boot", "Redis", "Kafka"],
    confidential: true,
  },
  {
    title: "AGIS Test Suite",
    industry: "Banking · QA",
    summary:
      "Upload a source document, chat with it, and generate test cases from its contents.",
    description:
      "A platform that automatically generates test suites from a source document. The uploaded document is digested as context, so users can chat with it and turn its contents into test cases.",
    role: "Senior Backend Developer",
    company: "Appfuxion",
    client: capitalize(client("cimb")),
    tech: ["Java", "Spring Boot", "Redis", "Kafka"],
    confidential: true,
  },
  {
    title: "Credit Card Onboarding PWA",
    industry: "Banking",
    summary:
      "Mobile-first onboarding with e-KTP OCR, liveness detection, and blacklist and government-database validation.",
    description:
      "A Progressive Web App with camera access and responsive design that scans the e-KTP (Indonesian national ID card) with OCR, runs liveness detection, and validates applicants against blacklist and government databases.",
    role: "Software Developer",
    company: "XSIS Mitra Utama",
    client: "Bank Mega",
    tech: ["React", "Spring Boot", "Spring JPA", "MySQL", "PWA"],
    confidential: true,
  },
  {
    title: "Branch Delivery System",
    industry: "Banking",
    summary:
      "Teller transactions such as cash withdrawal, interbank transfer, and virtual account payment over ISO 8583.",
    description:
      "Node.js microservices for branch tellers, using Redis Pub/Sub as the message broker and a modified Node.js library to convert between ISO 8583 and JSON.",
    role: "Software Developer",
    company: "XSIS Mitra Utama",
    client: "Bank Mega",
    tech: ["Node.js", "Express.js", "Redis Pub/Sub", "MongoDB", "ISO 8583"],
    confidential: true,
  },
  {
    title: "SNAP API Middleware",
    industry: "Payments",
    summary:
      "Middleware aligning remittance services with Bank Indonesia's SNAP API standard.",
    description:
      "Middleware for SNAP API standardization on the Remittance team, followed by service tests written with Cucumber.",
    role: "Java Engineer",
    company: "DOKU",
    tech: ["Java", "Spring Boot", "RestTemplate", "Cucumber"],
    confidential: true,
  },
  {
    title: "AXIS Web Grosir",
    industry: "Telco",
    summary:
      "Wholesale voucher platform: Redis caching, Spring Cloud microservices, and a Next.js front end.",
    description:
      "Back-end enhancements with Redis caching for voucher purchases and OTP emails, Spring Cloud for centralized configuration, logging, and API gateway, and Oracle as the database.",
    role: "Software Developer",
    company: "XSIS Mitra Utama",
    client: "XL Axiata",
    tech: ["Spring Boot", "Spring Cloud", "Redis", "Oracle", "Next.js"],
    confidential: true,
  },
];

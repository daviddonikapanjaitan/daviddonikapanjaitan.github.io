import type { ExperienceEntry } from "@/types/content";
import { client, clientList } from "./clients";

const XSIS = "PT. XSIS Mitra Utama";

// Order in this file does not matter: entries are sorted newest first.
export const experience: ExperienceEntry[] = [
  {
    role: "Senior Backend Developer",
    company: "PT. Appfuxion Consulting Indonesia",
    start: "2024-03",
    end: "present",
    highlights: [
      `AGIS Test Suite: built a platform that automatically generates test suites from a source document. The document is uploaded and digested as context, so users can chat with it and generate test cases from its contents. Client: ${client("cimb")}.`,
      `AGIS Claims: built a claims adjudication system that derives approve or decline outcomes from receipts and insurance documents to support adjudication decisions. Clients: ${clientList("allianz", "tokioMarine")}.`,
    ],
    tech: ["Java", "Spring Boot", "Redis", "Kafka"],
    industries: ["Banking", "Insurance"],
  },
  {
    role: "Java Engineer",
    company: "PT. Nusa Satu Inti Artha (DOKU)",
    start: "2022-03",
    end: "2024-03",
    highlights: [
      "Remittance team: built middleware for SNAP API standardization with Java Spring Boot and RestTemplate, then helped build service tests with Cucumber.",
      "Sales Enablement team: built the Affiliation API, Sales Dashboard, KYB Dashboard, Blast Email, and Promo Engine, using Spring Boot, Redis for caching, PostgreSQL, Alibaba Cloud, and Kafka for message-queue integration.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "RestTemplate",
      "Redis",
      "PostgreSQL",
      "Kafka",
      "Alibaba Cloud",
      "Cucumber",
    ],
    industries: ["Payments"],
  },
  {
    role: "Software Developer",
    company: "PT. XL Axiata, Tbk.",
    via: XSIS,
    start: "2021-01",
    end: "2022-03",
    highlights: [
      "AXIS Web Grosir: enhanced the back end with Spring Boot and Redis caching for voucher purchases and OTP emails, with Next.js on the front end and Spring Cloud microservices (centralized configuration, centralized logging, API gateway).",
      "XL Bizcare: enhanced the back end with Spring Boot and an Angular front end, deployed on-premise with Jenkins and a Dockerfile and to a Kubernetes environment, with Kafka for asynchronous system integration.",
    ],
    details: [
      "AXIS Web Grosir: used Oracle as the database, GitLab for source control, and Docker Compose for local testing.",
      "XL Bizcare: documented APIs with Swagger and used Plop.js to auto-generate Angular and Spring Boot code.",
    ],
    tech: [
      "Spring Boot",
      "Spring Cloud",
      "Redis",
      "Oracle",
      "Next.js",
      "Angular",
      "Kafka",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitLab",
      "Swagger",
      "Plop.js",
    ],
    industries: ["Telco"],
  },
  {
    role: "Software Developer",
    company: "PT. Bank Mega, Tbk.",
    via: XSIS,
    start: "2020-03",
    end: "2020-12",
    highlights: [
      "Credit card onboarding app: a Progressive Web App with OCR scanning of the e-KTP (Indonesian national ID card), liveness detection, and blacklist and government-database validation, with camera access and responsive design.",
      "Branch delivery system for teller transactions (cash withdrawal, interbank transfer, credit card transactions, virtual account payment, journal printing, and purchases) built as Node.js and Express.js microservices with Redis Pub/Sub as the message broker.",
    ],
    details: [
      "Credit card onboarding app stack: React on the front end, Java Spring Boot with Spring Web and Spring JPA on the back end, MySQL, Log4j with daily rolling logs, and Material Bootstrap.",
      "Branch delivery system: modified a Node.js library to convert between ISO 8583 and JSON using regex and array splitting; used jQuery, MongoDB, and Bootstrap, with user roles.",
      "Funding onboarding app: bank customer registration, current accounts, and deposits, querying core banking via ISO 8583, with OCR and selfie detection for ID validation against the government database. Built with Node.js, Express.js, jQuery, and Material Bootstrap, plus a Spring REST API as middleware to the database log, IP request tracking, and IMEI detection (Android 9 and earlier).",
      "Content management system in vanilla PHP (no framework) to manage images, promotional information, product lists, and server files, including the credit card information and product descriptions for the onboarding app.",
    ],
    tech: [
      "React",
      "Spring Boot",
      "MySQL",
      "Node.js",
      "Express.js",
      "Redis Pub/Sub",
      "MongoDB",
      "ISO 8583",
      "PHP",
    ],
    industries: ["Banking"],
  },
  {
    role: "Software Developer",
    company: XSIS,
    note: "Training & internship",
    start: "2019-10",
    end: "2020-03",
    highlights: [
      "Completed a training and internship program, and built an internal Human Resource Management app with login, user roles, employee scheduling, leave scheduling, and employee registration.",
    ],
    tech: [
      "Spring Web",
      "Spring MVC",
      "Thymeleaf",
      "Spring Data JPA",
      "PostgreSQL",
      "jQuery",
    ],
  },
];

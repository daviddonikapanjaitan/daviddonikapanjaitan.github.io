<!-- markdownlint-disable MD013 -->

# PLANNING.md: David Donika Panjaitan Portfolio Website

> **Status:** v1 built (Phases 1 to 7 done locally, 2026-10-20). Next: push to GitHub and deploy to Vercel (Phase 8). See "Build Status" at the end.
> **Framework:** Next.js (App Router) + TypeScript
> **Goal:** A fast, professional, single-page portfolio that introduces David, shows his skills and experience, and makes it easy for recruiters to get in touch. It is pushed to GitHub and deployed as a live website.
> **Source of truth for content:** `assets/CV David Donika Panjaitan [ENG VER][ATS VERSION] (EDITED).pdf` (private, git-ignored)
> **Profile photo:** `assets/profile_photo.png` (private, git-ignored)

---

## Table of Contents

1. [Objectives & Audience](#1-objectives--audience)
2. [Before You Build: Decisions & Inputs Needed](#2-before-you-build-decisions--inputs-needed)
3. [Privacy & Content Safety](#3-privacy--content-safety)
4. [Tech Stack](#4-tech-stack)
5. [Information Architecture (Site Map)](#5-information-architecture-site-map)
6. [Section-by-Section Content Plan](#6-section-by-section-content-plan)
7. [Design System](#7-design-system)
8. [Project Structure](#8-project-structure)
9. [Content Data Model](#9-content-data-model)
10. [SEO, Metadata & Social Sharing](#10-seo-metadata--social-sharing)
11. [Accessibility](#11-accessibility)
12. [Performance Budget](#12-performance-budget)
13. [Assets Preparation](#13-assets-preparation)
14. [Deployment Plan (GitHub to Live)](#14-deployment-plan-github-to-live)
15. [Git & Repository Workflow](#15-git--repository-workflow)
16. [Quality Checklist (Definition of Done)](#16-quality-checklist-definition-of-done)
17. [Roadmap / Milestones](#17-roadmap--milestones)
18. [Future Enhancements (Optional)](#18-future-enhancements-optional)
19. [CV Review Notes (Fix Before Publishing)](#19-cv-review-notes-fix-before-publishing)
20. [Build Status](#20-build-status-2026-10-20)

---

## 1. Objectives & Audience

### Primary objectives

1. **Introduce David** with a clear headline, photo, and short summary in the first screen.
2. **Show skills** grouped so they are easy to scan (Backend, Microservices, Frontend, Databases, DevOps/Cloud).
3. **Show experience** as a timeline, from his current role at Appfuxion back to his start at XSIS in 2019.
4. **Highlight key projects** (AGIS Test Suite, AGIS Claims, Bank Mega onboarding, and others) as cards.
5. **Turn visits into contact:** one-click email, LinkedIn, GitHub, and a downloadable CV.

### Target audience

| Audience | What they want | How the site serves them |
| --- | --- | --- |
| Recruiters / HR | Role, years of experience, location, contact | Hero headline, "7+ years" stat, contact CTA above the fold |
| Engineering managers / Tech leads | Depth of stack and real project impact | Skills matrix, project cards with tech tags |
| Clients / Collaborators | Domain experience | Industry badges: Banking, Payments, Insurance, Telco |

### Success criteria

- A visitor can answer "Who is he, what does he do, how do I contact him?" within **5 seconds**.
- Lighthouse scores of **>= 95** in Performance, Accessibility, Best Practices, and SEO (mobile).
- The site works well on mobile first. Many recruiters open links from LinkedIn on a phone.
- Your full name ranks for searches of "David Donika Panjaitan" once Google indexes the site.

---

## 2. Before You Build: Decisions & Inputs Needed

These items are **not in the CV** and need to be decided or provided before or during the build:

| # | Item | Why it's needed | Recommendation |
| --- | --- | --- | --- |
| 1 | **Hosting choice** | Affects config (see Section 14) | **Vercel** (best fit for Next.js, free Hobby tier, auto-deploys from GitHub) |
| 2 | **GitHub username** | Repo URL, GitHub link in site, possible `*.github.io` domain | ✅ **Provided:** `daviddonikapanjaitan` (<https://github.com/daviddonikapanjaitan>) |
| 3 | **LinkedIn URL** | Main professional link | ✅ **Provided:** <https://www.linkedin.com/in/david-donika-panjaitan> |
| 4 | **Custom domain** (optional) | Looks more professional than `*.vercel.app` | e.g. `daviddonika.dev` or `davidpanjaitan.com`. Check if it's available and what it costs |
| 5 | **Public phone number?** | Spam risk | Show **email + LinkedIn only**. If you want the phone number, use a WhatsApp link instead of plain text |
| 6 | **Client names under NDA?** | CIMB, Allianz, Tokio Marine, Bank Mega, XL Axiata, DOKU | Check with your employer that client names can be shown publicly. If not, say "a major Malaysian bank" or similar |
| 7 | **Graduation year** | Education section has no dates | Add the year (and whether you want to show the GPA) |
| 8 | **Bootcamp issuer** | "Java Programming Bootcamp, Jan 2020" has no issuer | Add the issuer (likely XSIS Mitra Utama, so please confirm) |
| 9 | **Language(s) of the site** | English only, or English + Indonesian | **English for v1**, Indonesian as an optional v2 (Section 18) |
| 10 | **Dark mode** | Nice for developers | Include it: follow the system setting, with a manual toggle |
| 11 | **AGIS = AI/LLM?** | "Chat with the document" suggests GenAI/RAG | If true, say so explicitly. "LLM / RAG" is a strong keyword in 2026. Only claim it if accurate |

---

## 3. Privacy & Content Safety

The CV is written for private applications. A public website is **indexed by search engines and scraped by bots**, so adjust what you publish:

| CV data | Publish on website? | Notes |
| --- | --- | --- |
| Full name | Yes | |
| Headline / title | Yes | |
| Home address (Apartment Kalibata City, Tower Akasia, 10th Floor) | **No** | Show only **"South Jakarta, Indonesia"** (or "Jakarta, Indonesia") |
| Phone (+62 811 600 178) | Optional | Bots will scrape it. Prefer a WhatsApp button or leave it out |
| Email | Yes | Use a `mailto:` link. Light obfuscation, such as building the link client-side, reduces scraping |
| GPA | Optional | Your choice |
| Client names | Check NDA | See Section 2 #6 |

### Downloadable CV

- Create a **separate public version of the PDF** without the full home address (and without the phone number if you hide it on the site).
- Name it cleanly, e.g. `David-Donika-Panjaitan-CV.pdf`. Avoid spaces, brackets, and "(EDITED)" in public file names.
- **Do not commit the original private CV to the repository.** If the GitHub repo is public, every file in it is public, including git history.

### Photo

- The headshot looks professional and fits the site well (navy blazer, white shirt, soft office background).
- It looks AI-generated or AI-enhanced (from its file name). That's fine to use, as long as it still looks like you. Interviewers will compare it with the real you on video calls.

---

## 4. Tech Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | **Next.js, latest stable** (App Router) | Requested. Static generation gives fast, SEO-friendly pages. You also used Next.js at XL Axiata (AXIS Web Grosir), so the site itself shows the skill |
| Language | **TypeScript** | Type-safe content data, fewer mistakes |
| UI library | React (version bundled with Next.js) | |
| Styling | **Tailwind CSS** (latest, v4) | Fast to build, small CSS output, easy responsive design |
| Fonts | `next/font` (self-hosted, no layout shift) | e.g. **Inter** or **Geist** for text, **JetBrains Mono** / **Geist Mono** for code accents |
| Images | `next/image` | Automatic resizing, lazy loading, modern formats |
| Icons | `lucide-react` (UI icons) + `simple-icons` / `react-icons` (tech and brand logos like Java, Spring, Kafka) | Lucide has no brand logos, so a second set is needed for tech logos |
| Animation | **Motion** (formerly Framer Motion), kept minimal | Subtle fade/slide on scroll. Must respect `prefers-reduced-motion` |
| Theme | `next-themes` | Dark/light mode without flashes of the wrong theme |
| Linting / format | ESLint + Prettier | Consistent code |
| Analytics (optional) | Vercel Web Analytics **or** none | Privacy-friendly, no cookie banner needed |
| Package manager | npm (or pnpm) | Use one consistently and commit its lock file |
| Node.js | Current **LTS** version | Must match what the host uses |

### Architecture principles

- **100% static content.** No database and no backend. All CV data lives in typed data files in the repo, so the site is fast, free to host, and secure.
- **One source of truth.** Every section reads from the data files. To update the site later, you edit data, not layout.
- **Server Components by default.** Only interactive bits (theme toggle, mobile menu, scroll animations, copy-email button) are Client Components. This keeps JavaScript small.
- **Static-export compatible.** Avoid features that need a server (API routes, runtime image optimization, middleware), so the same project can deploy to Vercel *or* GitHub Pages.

---

## 5. Information Architecture (Site Map)

A **single-page site** with anchor navigation. This is the best fit for a CV portfolio: it's quick to scan and works well on mobile.

```text
/  (Home, single page)
|-- #hero          Hero / Intro
|-- #about         About Me
|-- #skills        Skills
|-- #experience    Work Experience (timeline)
|-- #projects      Featured Projects
|-- #education     Education & Certification
`-- #contact       Contact
/resume.pdf        Downloadable public CV (static file)
/404               Custom not-found page
```

### Navigation

- **Sticky top navbar:** logo/name on the left, section links on the right, theme toggle, and a "Download CV" button.
- **Mobile:** a hamburger menu that opens full-screen or as a drawer, closes when a link is tapped, and can be operated with the keyboard.
- **Active-section highlighting** while scrolling.
- **Smooth scrolling**, turned off when the user prefers reduced motion.
- A **"Skip to content"** link for keyboard users.

---

## 6. Section-by-Section Content Plan

All text below comes from the CV, reworded for the web. **Nothing has been invented.** Items marked *(confirm)* need your check.

### 6.1 Hero

- **Photo:** circular or rounded-square headshot.
- **Name:** David Donika Panjaitan
- **Headline:** *Senior Backend Developer - Full-Stack (Java / Spring, Node.js, React)*
  - Reason: your CV title says "Full-Stack Developer", but your current role is **Senior Backend Developer**. Leading with the current, more senior title is stronger, while "Full-Stack" stays visible.
- **Tagline (draft):** "I build reliable backend systems and web apps for banking, payments, insurance, and telecom, from microservices and event-driven pipelines to responsive front ends."
- **Location badge:** South Jakarta, Indonesia
- **Quick stats (badges):**
  - **7+ years** of experience (Oct 2019 to present). Calculate this automatically from the start date so it never goes stale.
  - **4 industries:** Banking - Payments - Insurance - Telco
  - **Languages:** Indonesian, English
- **CTAs:** `Contact Me` (primary) - `Download CV` (secondary) - LinkedIn and GitHub icon links
- *(Optional)* "Open to opportunities" badge, which you can switch on or off in the data file.

### 6.2 About Me

A short first-person version of the CV summary (2 to 3 paragraphs). Draft:

> I'm a Full-Stack Developer with 7+ years of experience. I currently work as a Senior Backend Developer at PT. Appfuxion Consulting Indonesia. Most of my work is backend: Java and Spring Boot, plus Node.js with Express.js, building microservices, middleware, and event-driven systems with Kafka, RabbitMQ, and Redis.
>
> I've delivered systems for banks, payment providers, insurers, and telecom companies in Indonesia and Malaysia. My front-end experience includes React with Hooks, Next.js, and Angular, building Progressive Web Apps and responsive designs.
>
> I enjoy turning complex business processes, like claims adjudication, credit card onboarding, and teller transactions, into clean, dependable software.

Also include: **Education** mini-line (Bina Nusantara University, Information Systems and Management) and the languages spoken.

### 6.3 Skills

Grouped cards with logos or tags. **Only list skills that are in the CV.**

| Group | Skills (from CV) |
| --- | --- |
| **Backend (Java)** | Java, Spring Boot, Spring Web, Spring MVC, Spring Data JPA (ORM), Thymeleaf, RestTemplate, Apache HttpClient |
| **Backend (Node.js)** | Node.js, Express.js, Mustache templates |
| **Microservices & Architecture** | RESTful APIs, Spring Cloud, API Gateway (Zuul), Service Discovery (Eureka), Spring Boot Admin, Circuit Breaker (Hystrix), Load Balancing (Ribbon, Feign), Event-driven architecture |
| **Messaging & Streaming** | Apache Kafka, RabbitMQ, Spring Cloud Stream, Redis Pub/Sub |
| **Frontend** | React (Hooks), Next.js, Angular, JavaScript, jQuery, Progressive Web Apps, Responsive Web Design (CSS Grid, media queries), WebSockets, Bootstrap / Material Bootstrap |
| **Databases (SQL)** | PostgreSQL, MySQL, Microsoft SQL Server, Oracle |
| **Databases (NoSQL)** | MongoDB, Redis, Elasticsearch |
| **Observability** | ELK Stack (centralized logging), Log4j |
| **DevOps & Cloud** | AWS, Alibaba Cloud, Docker / Docker Compose, Kubernetes, Jenkins, GitLab, Linux, Portainer, MinIO, RustFS |
| **Testing & Docs** | Cucumber (service tests), Swagger / OpenAPI, Plop.js (code generation) |
| **Other** | PHP (vanilla), ISO 8583 integration, OCR & liveness-detection integration |

**Display rules:**

- **No percentage skill bars** (like "Java 90%"). Recruiters and engineers find them meaningless. Use grouped tags instead.
- *(Optional)* mark a few **"Core"** skills (Java, Spring Boot, Kafka, Redis, PostgreSQL, Node.js, React) with a highlight style.

### 6.4 Work Experience (Timeline)

A vertical timeline, newest first. Each entry has the **role, company, dates, short bullets, and tech tags**. On mobile it becomes a single column.

| # | Role | Company | Period | Key points (shortened) | Tech tags |
| --- | --- | --- | --- | --- | --- |
| 1 | **Senior Backend Developer** | PT. Appfuxion Consulting Indonesia | Mar 2024 to Present | **AGIS Test Suite:** platform that generates test suites from uploaded source documents, with chat-with-document (client: CIMB Malaysia). **AGIS Claims:** claims adjudication system producing approve/decline decisions from receipts and insurance documents (clients: Allianz Malaysia, Tokio Marine Insurance Malaysia) | Java, Spring Boot, Redis, Kafka |
| 2 | **Java Engineer** | PT. Nusa Satu Inti Artha (DOKU) | Mar 2022 to Mar 2024 | Remittance team: middleware for **SNAP API** standardization, service tests with Cucumber. Sales Enablement team: Affiliation API, Sales Dashboard, KYB Dashboard, Blast Email, Promo Engine | Java, Spring Boot, RestTemplate, Redis, PostgreSQL, Kafka, Alibaba Cloud, Cucumber |
| 3 | **Software Developer** | PT. XL Axiata, Tbk. *(via PT. XSIS Mitra Utama)* | Jan 2021 to Mar 2022 | **AXIS Web Grosir:** backend enhancements, Redis caching for voucher purchases and OTP emails, Next.js front end, Spring Cloud microservices. **XL Bizcare:** Spring Boot + Angular, deployed with Jenkins/Docker on-premise and on Kubernetes, Kafka integration | Spring Boot, Spring Cloud, Redis, Oracle, Next.js, Angular, Kafka, Docker, Kubernetes, Jenkins, GitLab, Swagger, Plop.js |
| 4 | **Software Developer** | PT. Bank Mega, Tbk. *(via PT. XSIS Mitra Utama)* | Mar 2020 to Dec 2020 | Credit card onboarding PWA (e-KTP OCR, liveness detection). Branch delivery system for teller transactions (ISO 8583 <-> JSON). Funding onboarding app. CMS in vanilla PHP | React, Spring Boot, MySQL, Node.js, Express.js, Redis Pub/Sub, MongoDB, PHP |
| 5 | **Software Developer** (Trainee/Intern) | PT. XSIS Mitra Utama | Oct 2019 to Mar 2020 | Training and internship. Built an internal HR Management app (login, roles, scheduling, leave, registration) | Spring (Web, MVC, JPA), Thymeleaf, PostgreSQL, jQuery |

**UX details:**

- Show 2 to 3 bullets by default per role, with a **"Show more"** expander for the full detail. This keeps the page short.
- Group the two XSIS-contracted placements (XL Axiata and Bank Mega) visually under "PT. XSIS Mitra Utama (contracted placements)", **or** keep them separate with a "via XSIS" label. Pick one, and keep it the same everywhere.
- Calculate durations automatically (e.g. "2 yrs 1 mo") from the start and end dates in the data.

### 6.5 Featured Projects

Cards (2 columns on desktop, 1 on mobile) for the most impressive work. Each card has: **title, one-line problem -> solution, your role, industry badge, tech tags, client (if allowed)**. There's no public demo or repo link, since these are confidential enterprise systems. Mark them "Enterprise - Confidential".

| Priority | Project | Industry | One-liner |
| --- | --- | --- | --- |
| 1 | **AGIS Claims** | Insurance | Automated claims adjudication from receipts and policy documents -> approve/decline recommendations |
| 2 | **AGIS Test Suite** | Banking / QA | Upload a source document, chat with it, and auto-generate test cases |
| 3 | **Credit Card Onboarding PWA** (Bank Mega) | Banking | Mobile-first onboarding with e-KTP OCR, liveness detection, and blacklist/government DB validation |
| 4 | **Branch Delivery System** (Bank Mega) | Banking | Teller transactions (cash withdrawal, interbank transfer, VA payment) over ISO 8583 with Node.js microservices |
| 5 | **SNAP API Middleware** (DOKU) | Payments | Middleware aligning remittance services with Bank Indonesia's SNAP API standard |
| 6 | **AXIS Web Grosir** (XL Axiata) | Telco | Wholesale voucher platform: Redis caching, Spring Cloud microservices, Next.js front end |

*(Optional, later)* A **"Side Projects / Open Source"** subsection pulling public repos from GitHub, if you have any worth showing. This portfolio repo can be the first one.

### 6.6 Education & Certification

- **Bina Nusantara University**: Information Systems and Management - GPA 3.25 *(show or hide)* - *(add graduation year)*
- **Java Programming Bootcamp**, January 2020 - *(add issuer)*

### 6.7 Contact

- Headline: "Let's work together" / "Get in touch"
- Short line: "I'm open to backend and full-stack roles and collaborations. The fastest way to reach me is by email."
- **Buttons:** Email (with a "copy to clipboard" option) - LinkedIn - GitHub - *(optional)* WhatsApp
- **Contact form: not in v1.** A static site has no backend. If you want one later, use a form service (Formspree, Web3Forms) so no server is needed.

### 6.8 Footer

- (c) {current year} David Donika Panjaitan - "Built with Next.js & Tailwind CSS" - link to the source repo (optional) - back-to-top link.

---

## 7. Design System

### Visual direction

**Clean, corporate-modern, developer-flavored.** It fits a senior backend engineer who works in finance and insurance: trustworthy, not flashy.

### Color palette (based on the photo: navy blazer, white shirt)

| Token | Light mode | Dark mode | Use |
| --- | --- | --- | --- |
| Background | `#FFFFFF` | `#0B1120` | Page |
| Surface | `#F8FAFC` | `#111827` | Cards |
| Text primary | `#0F172A` | `#E2E8F0` | Headings / body |
| Text muted | `#475569` | `#94A3B8` | Secondary text |
| Primary (navy/blue) | `#1E3A8A` | `#60A5FA` | Buttons, links, highlights |
| Accent (teal) | `#0D9488` | `#2DD4BF` | Tags, timeline dots, small details |
| Border | `#E2E8F0` | `#1F2937` | Dividers, card outlines |

- All text/background pairs must pass **WCAG AA contrast** (4.5:1 for body text). Check with a contrast checker during build.

### Typography

- Headings: Inter or Geist, semi-bold to bold, tight letter-spacing.
- Body: same family, 16 to 18px base, line-height around 1.6.
- Mono accent (section labels like `// experience`, tech tags): JetBrains Mono / Geist Mono.

### Layout

- Max content width around 1100 to 1200px, centered, with generous whitespace.
- Responsive breakpoints: mobile (< 640px), tablet (640 to 1024px), desktop (> 1024px).
- Hero: photo on the right on desktop, above the text on mobile.
- 8px spacing grid.

### Motion

- Subtle fade-up on section enter (around 300ms), hover lift on cards, and smooth theme transitions.
- **Everything is turned off under `prefers-reduced-motion`.**
- No heavy parallax, no auto-playing elements, no custom cursors.

---

## 8. Project Structure

Planned folder layout (descriptive only):

```text
portfolio-website/
|-- public/
|   |-- images/
|   |   `-- profile.webp          <- optimized headshot (renamed, see Section 13)
|   |-- resume.pdf                <- PUBLIC CV version (no home address)
|   |-- favicon / app icons
|   `-- og-image.png              <- 1200x630 social share image
|-- src/
|   |-- app/
|   |   |-- layout                <- root layout, fonts, theme provider, metadata
|   |   |-- page                  <- single home page composing all sections
|   |   |-- not-found             <- custom 404
|   |   |-- sitemap               <- generated sitemap.xml
|   |   |-- robots                <- generated robots.txt
|   |   `-- globals.css           <- Tailwind + design tokens
|   |-- components/
|   |   |-- layout/               <- Navbar, MobileMenu, Footer, ThemeToggle, SkipLink
|   |   |-- sections/             <- Hero, About, Skills, Experience, Projects, Education, Contact
|   |   `-- ui/                   <- Button, Badge/Tag, Card, SectionHeading, TimelineItem, Reveal (animation wrapper)
|   |-- data/                     <- ALL CONTENT LIVES HERE (single source of truth)
|   |   |-- profile               <- name, headline, tagline, location, links, availability flag
|   |   |-- skills                <- grouped skills
|   |   |-- experience            <- jobs
|   |   |-- projects              <- featured projects
|   |   `-- education             <- education + certifications
|   |-- lib/                      <- helpers: date/duration formatting, years-of-experience calc, site config
|   `-- types/                    <- TypeScript types for the data model
|-- .gitignore                    <- node_modules, .next, out, .env*, private files
|-- README.md                     <- project overview, how to run, how to update content
|-- PLANNING.md                   <- this file
`-- LICENSE (optional)            <- MIT for code. Note that personal content/photo is NOT licensed for reuse
```

**Do not commit:** the original CV PDF, the original 1.9 MB PNG, `.env` files, or anything with your home address.

---

## 9. Content Data Model

The data files will follow these shapes (described here, not coded):

### Profile

- name, headline, tagline, location (city/country only), email, linkedin URL (`https://www.linkedin.com/in/david-donika-panjaitan`), github URL (`https://github.com/daviddonikapanjaitan`), optional whatsapp URL, resume path, photo path, career start date (`2019-10`), openToWork (true/false), spoken languages

### Skill group

- group title, optional icon, list of skills (each: name, optional logo key, optional "core" flag)

### Experience entry

- role, company, optional "via" company (for XSIS placements), location, start date (YYYY-MM), end date (YYYY-MM or "present"), summary bullets (shown by default), extra bullets (shown under "Show more"), tech tags, optional industry

### Project

- title, industry, one-line summary, description, your role, tech tags, client name (optional, NDA-safe), confidential flag, optional link

### Education / Certification

- institution or issuer, program or title, date or year, optional GPA, optional credential link

### Rules

- Dates are stored in one format (YYYY-MM) and formatted only for display, e.g. "Mar 2024 - Present".
- Experience is sorted newest first, by date and not by the order in the file.
- "Years of experience" is **calculated** from the career start date, never typed by hand.

---

## 10. SEO, Metadata & Social Sharing

- **Title:** `David Donika Panjaitan | Senior Backend & Full-Stack Developer`
- **Meta description (~155 chars):** "Senior Backend Developer in Jakarta with 7+ years building Java/Spring Boot, Node.js, Kafka and React systems for banking, payments, insurance and telco."
  - Note: this contains "7+ years". Generate it from the same calculation, or review it every year.
- **Open Graph & Twitter/X card:** title, description, `og-image.png` (1200x630, photo + name + title), so links look good on LinkedIn, WhatsApp, and Slack.
  - Use a **static image file**, which works on any host, including static export.
- **Canonical URL:** the final domain.
- **`sitemap.xml` and `robots.txt`:** generated by Next.js metadata routes.
- **Structured data (JSON-LD, `Person` schema):** name, jobTitle, worksFor (if allowed), address locality "Jakarta", sameAs [LinkedIn, GitHub], alumniOf "Bina Nusantara University". This helps Google show a rich result for your name.
- **Language:** `<html lang="en">`.
- **Favicon set:** favicon, apple-touch-icon, and a manifest (could be "DP" initials on navy).
- After launch: submit the site to **Google Search Console** and add the URL to your **LinkedIn profile** (Contact info + Featured section), GitHub profile, and your CV.

---

## 11. Accessibility

Target: **WCAG 2.2 AA**.

- Semantic landmarks: `header`, `nav`, `main`, `section` (each with a heading), `footer`.
- One `h1` (your name), then `h2` for each section and `h3` for items. No skipped levels.
- Meaningful `alt` text on the photo, e.g. "Portrait of David Donika Panjaitan".
- Every interactive element can be reached with the keyboard and has a **visible focus ring**.
- Mobile menu: `aria-expanded`, focus trapped while open, Esc closes it.
- Icon-only links (LinkedIn/GitHub) get accessible labels.
- Color is never the only way information is shown.
- `prefers-reduced-motion` and `prefers-color-scheme` are respected.
- Tap targets are at least 44x44px on mobile.

---

## 12. Performance Budget

| Metric | Target |
| --- | --- |
| Lighthouse (mobile), all 4 categories | >= 95 |
| Largest Contentful Paint (LCP) | < 2.0 s |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Interaction to Next Paint (INP) | < 200 ms |
| Client JavaScript (first load) | As small as possible: only the theme toggle, menu, and animations are interactive |
| Hero image | Under ~150 KB, served in WebP/AVIF, with `priority` loading because it is the LCP element |

Techniques: static generation, `next/font`, `next/image` with explicit sizes, no heavy UI libraries, tree-shaken icons, and no third-party scripts except optional lightweight analytics.

---

## 13. Assets Preparation

### Profile photo

- Current file: `assets/profile_photo.png` (originally `ChatGPT Image 29 Sep 2026, 15.02.13.png`, about 1.9 MB, PNG). **Too heavy, and the file name has spaces and commas.**
- Steps:
  1. Rename it to `profile` (lowercase, no spaces).
  2. Crop to a **square (1:1)** for the hero avatar, centered on the face. Keep a 4:5 version if the layout uses a tall card.
  3. Export at around **800x800px** as **WebP** (or high-quality JPG). `next/image` makes smaller sizes from it.
  4. Aim for **under 150 KB**.
  5. Remove metadata (EXIF) before publishing.

### Social share image (`og-image.png`)

- 1200x630px: navy background, cropped photo, name, title "Senior Backend & Full-Stack Developer", and a domain watermark.

### Favicon

- Simple monogram "DP" or "DDP" in the primary navy. Export favicon (ICO/PNG), a 180x180 apple-touch-icon, and 192/512 PNGs for the manifest.

### Public CV PDF

- Copy of the ATS CV **with the home address replaced by "South Jakarta, Indonesia"** (and the phone removed if you hide it), saved as `resume.pdf`.
- Also apply the CV fixes from Section 19 so the site and the PDF say the same things.

### Tech logos

- Use an icon library (Simple Icons) instead of downloading random PNGs. Follow each brand's logo guidelines (no recoloring that misrepresents the brand).

---

## 14. Deployment Plan (GitHub to Live)

### Option A (recommended): Vercel + GitHub

Best fit for Next.js, built by the same company. It's free for personal, non-commercial use on the Hobby plan.

1. Push the project to a GitHub repository (public or private; both work with Vercel).
2. Sign in to Vercel with GitHub -> **Import Project** -> select the repo. The Next.js framework is detected automatically.
3. Deploy. The site goes live at `https://<project-name>.vercel.app`.
4. Every push to `main` redeploys **production** automatically. Every pull request gets its own **preview URL**.
5. *(Optional)* Add a custom domain in Vercel -> Domains, then set the DNS records at your registrar. HTTPS is automatic.
6. *(Optional)* Turn on Vercel Web Analytics.

### Option B: GitHub Pages (free, everything stays on GitHub)

Works because the site is fully static, but needs extra configuration:

1. Next.js config: enable **static export** (`output: 'export'`) and set **unoptimized images**, because GitHub Pages can't run the Next.js image optimizer.
2. If the repo is **not** named `daviddonikapanjaitan.github.io`, the site lives at `https://daviddonikapanjaitan.github.io/<repo>/`, so a **basePath** (and asset prefix) equal to `/<repo>` must be set. Otherwise links, images, and the CV PDF break.
3. In the repo: **Settings -> Pages -> Source: GitHub Actions**, and use the official Next.js Pages workflow, which builds and uploads the `out/` folder on every push to `main`.
4. Compress images by hand beforehand (Section 13), since they won't be optimized automatically.
5. Custom domain: Settings -> Pages -> Custom domain, plus DNS records. Enable "Enforce HTTPS".

### Decision

**Go with Option A (Vercel)** unless you specifically want everything on GitHub. Because the project stays static-export compatible (Section 4), you can switch later with only config changes.

### Environment variables

None are needed for v1. If analytics or a form service is added later, keep its keys in the host's environment settings, **never in the repo**.

---

## 15. Git & Repository Workflow

- **Repo name:** `portfolio` or `david-donika-portfolio` (or `daviddonikapanjaitan.github.io` if you use GitHub Pages with a root URL). Repo lives under <https://github.com/daviddonikapanjaitan>.
- **Default branch:** `main` is production. Do feature work on short-lived branches (`feat/hero`, `feat/experience`) merged with PRs. This also gives you Vercel preview URLs.
- **Commit style:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `style:`).
- **Before the first push:** confirm `.gitignore` covers `node_modules/`, `.next/`, `out/`, `.env*`, OS files, **and private files** (original CV, raw photo).
- **README.md:** what the site is, the live URL, the tech stack, how to run it locally, and **how to update content** (edit `src/data/*`).
- **Repository "About":** live URL + topics (`nextjs`, `portfolio`, `typescript`, `tailwindcss`).
- *(Optional)* A GitHub Action that runs lint, type-check, and build on every PR, so broken builds never reach `main`.

---

## 16. Quality Checklist (Definition of Done)

### Content

- [ ] All facts match the CV (titles, companies, dates, tech). Do a **side-by-side check**.
- [ ] No home address, and the phone number is shown only if you chose to.
- [ ] Client names approved for public display (or anonymized).
- [ ] Spelling and grammar checked (e.g. "Portfolio", not "Portofolio", in the public site text).
- [ ] The downloadable CV opens and matches the site content.

### Functionality

- [ ] All nav links scroll to the right sections. The active state works.
- [ ] Mobile menu opens, closes, and is keyboard-accessible.
- [ ] Theme toggle works and remembers the choice, with no flash of the wrong theme on load.
- [ ] Email, LinkedIn, GitHub, and CV links all work (open external links in a new tab with `rel="noopener noreferrer"`).
- [ ] The 404 page shows for unknown URLs.

### Cross-device

- [ ] Tested on Chrome, Firefox, Safari (iOS), Edge, and Android Chrome.
- [ ] Tested at 360px, 768px, 1280px, and 1920px widths. No horizontal scroll.

### Quality gates

- [ ] `build` passes with no TypeScript or ESLint errors.
- [ ] Lighthouse >= 95 in all four categories (mobile).
- [ ] Automated accessibility check (axe DevTools / Lighthouse) shows no violations.
- [ ] Social preview verified with LinkedIn Post Inspector and a WhatsApp link preview.
- [ ] `sitemap.xml` and `robots.txt` are reachable on the live domain.

---

## 17. Roadmap / Milestones

| Phase | Scope | Output |
| --- | --- | --- |
| **0. Prep** | Answer Section 2 decisions, fix the CV (Section 19), prepare assets (Section 13), create the public CV PDF | All inputs ready |
| **1. Setup** | Create the Next.js app (TypeScript, Tailwind, App Router, ESLint), set up the folder structure, fonts, design tokens, theme provider, create the GitHub repo, first deploy of a placeholder to Vercel | A live "hello" URL from day one |
| **2. Data layer** | Write the types and fill all data files from the CV | Typed content, single source of truth |
| **3. Layout** | Navbar, mobile menu, footer, skip link, theme toggle, section wrapper | Page shell |
| **4. Sections** | Hero -> About -> Skills -> Experience -> Projects -> Education -> Contact | Full content on screen |
| **5. Polish** | Animations, hover states, dark-mode tuning, responsive fixes, 404 page | Production look and feel |
| **6. SEO & a11y** | Metadata, OG image, JSON-LD, sitemap/robots, favicon set, accessibility pass | Shareable, indexable, accessible |
| **7. QA** | Run the full Section 16 checklist and fix issues | Release candidate |
| **8. Launch** | Custom domain (optional), Search Console, update LinkedIn/GitHub/CV with the URL | **Live website** |

Each phase is a small PR. Since the site deploys from Phase 1 on, every merge is visible live.

---

## 18. Future Enhancements (Optional)

- **Bilingual (English / Bahasa Indonesia)** with a language switcher, using Next.js internationalized routes (`/en`, `/id`).
- **Blog / Notes** in MDX: write about Kafka, Spring Boot, or ISO 8583 lessons. This is great for SEO and shows expertise.
- **GitHub activity / pinned repos** section (fetched at build time so the site stays static).
- **Contact form** via Formspree or Web3Forms, with spam protection.
- **Case-study pages** (`/projects/agis-claims`) with architecture diagrams, if NDA allows.
- **Testimonials** from former leads or colleagues (with their permission).
- **Print-friendly stylesheet** so the page itself prints like a CV.

---

## 19. CV Review Notes (Fix Before Publishing)

While reading the CV I found these points. Fix them in both the CV and the site so they say the same thing:

1. **Headline vs. current role:** the CV header says "Full-Stack Developer", but the current role is "Senior Backend Developer". Consider "Senior Backend Developer | Full-Stack (Java / Spring, Node.js, React)".
2. **Summary has no seniority or numbers.** Add "7+ years" and the industries (banking, payments, insurance, telco). Recruiters scan for these.
3. **"PT. XSIS Mitra Utama, Tbk."**: "Tbk." means a publicly listed company. It's used in one place but not in the "contracted through PT. XSIS Mitra Utama" lines. Check which is correct and make them consistent.
4. **"prewash technology"** (Bank Mega credit card onboarding) is an unusual term. If it means pre-screening or data-cleansing checks against blacklists, reword it so readers understand.
5. **"E-KTP"** is usually written **"e-KTP"**. Consider adding "(Indonesian national ID card)" for international readers.
6. **Education:** add the graduation year (and degree type, e.g. "Bachelor's (S.Kom)" if applicable).
7. **Certification:** add the issuer of the Java Programming Bootcamp.
8. **AGIS projects:** if they use LLMs / RAG / OCR, say so explicitly. These are high-value keywords. Only if accurate.
9. **Impact metrics:** where possible, add numbers (e.g. "reduced claim processing time by X%", "handles N transactions/day"). Even rough, honest numbers help a lot.
10. **Legacy Netflix OSS stack (Zuul, Hystrix, Ribbon):** these are now in maintenance mode or replaced (Spring Cloud Gateway, Resilience4j, Spring Cloud LoadBalancer). Listing them is fine because they're real experience. If you've also used the modern equivalents, add them. Don't add tools you haven't used.
11. **Public CV:** remove the full apartment address for the public download (see Section 3).

---

## 20. Build Status (2026-10-20)

**Done:** Next.js 16 + TypeScript + Tailwind v4 project, typed data layer (`src/data/*`), all sections, dark mode, mobile menu, 404 page, SEO (metadata, OG image, JSON-LD, sitemap, robots, manifest, favicon set), optimized photo (40 KB WebP), public `resume.pdf` (home address and phone removed), README, CI workflow, static-export option for GitHub Pages.

**Verified locally:** lint, type-check, and build pass. No horizontal scroll at 360/768/1280/1920 px. axe: 0 violations in light and dark mode. Lighthouse desktop 100/100/100/100. Lighthouse mobile: Accessibility, Best Practices, and SEO 100; Performance 89 to 95 under simulated throttling on localhost (re-check on the live Vercel URL).

**Defaults chosen (change in `src/lib/site.ts` / `src/data/*`):**

| Section 2 item | Default used |
| --- | --- |
| #1 Hosting | Vercel (static export also works for GitHub Pages) |
| #4 Custom domain | None yet; set `NEXT_PUBLIC_SITE_URL` when you have one |
| #5 Phone | Hidden (site and public CV). WhatsApp button off (`whatsappUrl`) |
| #6 Client names | Shown (`showClientNames: true`). Set to `false` to anonymize CIMB / Allianz / Tokio Marine |
| #7 Graduation year | Not shown (unknown). GPA shown (`showGpa`) |
| #8 Bootcamp issuer | Not shown (unknown) |
| #10 Dark mode | Follows system, with toggle |
| #11 AGIS = AI/LLM | Not claimed; CV wording kept |
| Open to opportunities badge | On (`openToWork` in `profile.ts`) |
| XSIS placements | Kept separate with a "via PT. XSIS Mitra Utama" label; "Tbk." dropped for XSIS |
| Section 19 #4 / #5 | "prewash technology" reworded as "blacklist and government-database validation"; "e-KTP (Indonesian national ID card)" |

**Deviations from the plan:** scroll animations use a tiny IntersectionObserver + CSS instead of the Motion library (less JavaScript, same effect, off under reduced motion). Tech logos are not used; skills are grouped tags.

**Still to do (needs you):** create the GitHub repo and push, import it in Vercel, confirm the open items above, apply the remaining Section 19 CV fixes to the PDF, then Search Console and LinkedIn/GitHub/CV links (Phase 8).

---

*End of plan.*

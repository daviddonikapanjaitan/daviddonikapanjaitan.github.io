import type { SkillGroup } from "@/types/content";

// Only skills that appear in the CV. `core: true` gets a highlight style.
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend (Java)",
    icon: "coffee",
    skills: [
      { name: "Java", core: true },
      { name: "Spring Boot", core: true },
      { name: "Spring Web" },
      { name: "Spring MVC" },
      { name: "Spring Data JPA (ORM)" },
      { name: "Thymeleaf" },
      { name: "RestTemplate" },
      { name: "Apache HttpClient" },
    ],
  },
  {
    title: "Backend (Node.js)",
    icon: "server",
    skills: [
      { name: "Node.js", core: true },
      { name: "Express.js" },
      { name: "Mustache templates" },
    ],
  },
  {
    title: "Microservices & Architecture",
    icon: "network",
    skills: [
      { name: "RESTful APIs" },
      { name: "Spring Cloud" },
      { name: "API Gateway (Zuul)" },
      { name: "Service Discovery (Eureka)" },
      { name: "Spring Boot Admin" },
      { name: "Circuit Breaker (Hystrix)" },
      { name: "Load Balancing (Ribbon, Feign)" },
      { name: "Event-driven architecture" },
    ],
  },
  {
    title: "Messaging & Streaming",
    icon: "radio",
    skills: [
      { name: "Apache Kafka", core: true },
      { name: "RabbitMQ" },
      { name: "Spring Cloud Stream" },
      { name: "Redis Pub/Sub" },
    ],
  },
  {
    title: "Frontend",
    icon: "monitor",
    skills: [
      { name: "React (Hooks)", core: true },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "JavaScript" },
      { name: "jQuery" },
      { name: "Progressive Web Apps" },
      { name: "Responsive Web Design" },
      { name: "WebSockets" },
      { name: "Bootstrap / Material Bootstrap" },
    ],
  },
  {
    title: "Databases (SQL)",
    icon: "database",
    skills: [
      { name: "PostgreSQL", core: true },
      { name: "MySQL" },
      { name: "Microsoft SQL Server" },
      { name: "Oracle" },
    ],
  },
  {
    title: "Databases (NoSQL)",
    icon: "boxes",
    skills: [
      { name: "Redis", core: true },
      { name: "MongoDB" },
      { name: "Elasticsearch" },
    ],
  },
  {
    title: "Observability",
    icon: "activity",
    skills: [{ name: "ELK Stack (centralized logging)" }, { name: "Log4j" }],
  },
  {
    title: "DevOps & Cloud",
    icon: "cloud",
    skills: [
      { name: "AWS" },
      { name: "Alibaba Cloud" },
      { name: "Docker / Docker Compose" },
      { name: "Kubernetes" },
      { name: "Jenkins" },
      { name: "GitLab" },
      { name: "Linux" },
      { name: "Portainer" },
      { name: "MinIO" },
      { name: "RustFS" },
    ],
  },
  {
    title: "Testing & Docs",
    icon: "flask",
    skills: [
      { name: "Cucumber (service tests)" },
      { name: "Swagger / OpenAPI" },
      { name: "Plop.js (code generation)" },
    ],
  },
  {
    title: "Other",
    icon: "wrench",
    skills: [
      { name: "PHP (vanilla)" },
      { name: "ISO 8583 integration" },
      { name: "OCR & liveness-detection integration" },
    ],
  },
];

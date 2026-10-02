/**
 * ==============================================================================
 * SAHIL MODAN - PORTFOLIO MASTER CONFIGURATION
 * ==============================================================================
 * 
 * Welcome! This single file powers your entire DevOps Portfolio website.
 * You can customize your name, roles, headline, Bryan Garage narrative,
 * hover peek cards, projects, timeline, skills, and theme here.
 * 
 * Any changes made here immediately update all sections of the site!
 * ==============================================================================
 */

import { projects as defaultProjects, type Project } from "./projects"

export interface WordToken {
  text: string
  bold?: boolean
  accent?: boolean
  green?: boolean
  peek?: "stibo" | "azure" | "kubernetes" | "terraform"
  key?: string
}

export interface PeekCardData {
  domain: string
  badge: string
  title: string
  description: string
  roleOrNote?: string
  datesOrStatus?: string
  tags?: string[]
  podCount?: number
}

export interface HeroConfig {
  kicker: string
  sentenceWords: WordToken[]
  philosophyQuote: string
  peekCards: Record<string, PeekCardData>
}

export interface PersonalConfig {
  name: string
  badgeTitle: string
  role: string
  headline: string
  summary: string
  statusBeacon: string
  location: string
  timezone: string
  coordinates: string
  email: string
  phone: string
  github: string
  linkedin: string
  linkedinAlt?: string
  resumePath: string
  company: string
  companyRole: string
  companyDescription: string
  startedAt: string
}

export interface QuickStat {
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}

export type FeaturedProject = Project & {
  kicker?: string
  status?: "PRODUCTION" | "COMPLETED" | "ACTIVE"
}

export interface TimelineMilestone {
  id: string
  title: string
  subtitle: string
  organization: string
  fromYear: number
  toYear: number | "Present"
  color: string
  type: "work" | "education" | "milestone"
  logo: "stibo" | "university" | "azure"
  details: string
  badge?: string
  link?: string
}

export interface PortfolioConfig {
  personal: PersonalConfig
  hero: HeroConfig
  stats: QuickStat[]
  projects: FeaturedProject[]
  timeline: TimelineMilestone[]
}

export const portfolioConfig: PortfolioConfig = {
  // 1. Personal Identity & Contact Information
  personal: {
    name: "Sahil Modan",
    badgeTitle: "Cloud Operations → DevOps Engineering",
    role: "Azure DevOps / Cloud Operations Engineer",
    headline: "Building reliable cloud infrastructure, automation & deployment systems.",
    summary:
      "Azure Cloud Operations Engineer with 4+ years of experience supporting production Microsoft Azure environments and building Azure DevOps CI/CD pipelines. Skilled in Terraform, ARM Templates, Docker, Kubernetes, Ansible, and Linux infrastructure automation. Microsoft Certified: DevOps Engineer Expert (AZ-400), focused on reliability, monitoring, and production platform engineering.",
    statusBeacon: "Available for DevOps & Cloud Operations roles",
    location: "Bengaluru, Karnataka, India",
    timezone: "Asia/Kolkata",
    coordinates: "12.9716° N, 77.5946° E",
    email: "sahilmodan333@gmail.com",
    phone: "+91 83201 22323",
    github: "https://github.com/SahilModan333",
    linkedin: "https://www.linkedin.com/in/sahil-modan-b5a73b184/",
    linkedinAlt: "https://www.linkedin.com/in/sahil-modan",
    resumePath: "/resume.pdf",
    company: "Stibo Systems",
    companyRole: "Associate Systems Engineer — Cloud Operations",
    companyDescription: "Enterprise multi-tenant SaaS Master Data Management platform on Microsoft Azure",
    startedAt: "2022-05",
  },

  // 2. Bryan Garage Narrative Hero (Blur reveal word stream + interactive hover peek cards)
  hero: {
    kicker: "DevOps & Cloud Platform Engineering",
    sentenceWords: [
      { text: "Cloud", bold: false },
      { text: "Operations", bold: false },
      { text: "→", bold: false, accent: true },
      { text: "DevOps", bold: false },
      { text: "Engineering", bold: false },
      { text: "by", bold: false },
      { text: "Sahil", bold: true, key: "name" },
      { text: "Modan.", bold: true, key: "name" },
      { text: "Based", bold: false },
      { text: "in", bold: false },
      { text: "Bengaluru,", bold: false },
      { text: "supporting", bold: false },
      { text: "enterprise", bold: false },
      { text: "multi-tenant", bold: false },
      { text: "Azure", bold: false, peek: "azure" },
      { text: "SaaS", bold: false },
      { text: "at", bold: false },
      { text: "Stibo Systems.", bold: false, peek: "stibo" },
      { text: "4+ years in:", bold: true },
      { text: "authoring", bold: false },
      { text: "20+ Azure DevOps", bold: false, peek: "azure" },
      { text: "YAML", bold: false },
      { text: "pipelines,", bold: false },
      { text: "provisioning", bold: false },
      { text: "immutable", bold: false },
      { text: "Terraform", bold: false, peek: "terraform" },
      { text: "& ARM", bold: false },
      { text: "infrastructure,", bold: false },
      { text: "orchestrating", bold: false },
      { text: "Docker", bold: false },
      { text: "and", bold: false },
      { text: "Kubernetes (AKS)", bold: false, peek: "kubernetes" },
      { text: "workloads,", bold: false },
      { text: "and", bold: false },
      { text: "eliminating", bold: false },
      { text: "configuration", bold: false },
      { text: "drift", bold: false },
      { text: "with", bold: false },
      { text: "Ansible", bold: false },
      { text: "across", bold: false },
      { text: "50+ servers", bold: false },
      { text: "to sustain", bold: false },
      { text: "99.9% platform availability.", bold: true, green: true },
    ],
    philosophyQuote:
      "I believe automated infrastructure is the foundation of high-velocity software delivery. Eliminating manual drift, packaging immutable containers, and engineering proactive observability is how 99.9% uptime is sustained.",
    peekCards: {
      stibo: {
        domain: "stibo-systems.azure",
        badge: "Live SaaS",
        title: "Stibo Systems",
        description: "Enterprise Master Data Management SaaS Platform",
        roleOrNote: "Role: Assoc Systems Eng",
        datesOrStatus: "2022 — Present",
      },
      azure: {
        domain: "portal.azure.com",
        badge: "AZ-400 Expert",
        title: "Microsoft Azure Cloud",
        description: "20+ YAML Pipelines across Dev, QA, UAT & Production",
        tags: ["Terraform", "ARM", "Key Vault", "Entra ID"],
      },
      kubernetes: {
        domain: "aks-prod-westeurope",
        badge: "12 / 12 Pods Ready",
        title: "Kubernetes (AKS) Workloads",
        description: "Zero-downtime rolling updates with readiness health probes",
        podCount: 12,
      },
      terraform: {
        domain: "registry.terraform.io",
        badge: "IaC State Lock",
        title: "Immutable Terraform Modules",
        description: "Declarative Azure Resource Manager (ARM) & Terraform remote backend locking",
        tags: ["AzureRM", "Blob Backend", "Key Vault Secrets"],
      },
    },
  },

  // 3. Quick Stats & SLAs
  stats: [
    {
      label: "Pipelines in Service",
      value: "20+",
      sublabel: "Across 4 environments (Dev, QA, UAT, Prod)",
      highlight: true,
    },
    {
      label: "Servers Automated",
      value: "50+",
      sublabel: "Ansible managed · Zero configuration drift",
    },
    {
      label: "Platform Uptime",
      value: "99.9%",
      sublabel: "Enterprise SLA sustained across SaaS tenants",
      highlight: true,
    },
    {
      label: "Cloud Experience",
      value: "4+ Yrs",
      sublabel: "Production Azure & DevOps engineering",
    },
  ],

  // 4. Featured Architectural Builds (The Garage Grid)
  // 4. Featured Architectural Builds (The Garage Grid)
  projects: defaultProjects.map((p, idx) => ({
    ...p,
    kicker: [
      "01 · INFRASTRUCTURE · TERRAFORM & AZURE",
      "02 · ORCHESTRATION · DOCKER & KUBERNETES",
      "03 · OBSERVABILITY · PROMETHEUS & GRAFANA",
      "04 · AUTOMATION · ANSIBLE & LINUX FLEET",
    ][idx] || `0${idx + 1} · PRODUCTION BUILD`,
    status: "PRODUCTION" as const,
  })),

  // 5. Visual Timeline Events (2016 - 2027 Ruler Track)
  timeline: [
    {
      id: "stibo-systems",
      title: "Associate Systems Engineer — Cloud Operations",
      subtitle: "Cloud Operations & DevOps",
      organization: "Stibo Systems",
      fromYear: 2022,
      toYear: "Present",
      color: "from-sky-500 to-indigo-600",
      type: "work",
      logo: "stibo",
      badge: "Current Role",
      details: "Supporting enterprise multi-tenant Azure SaaS platform. Architecting 20+ CI/CD YAML pipelines, Terraform IaC, AKS container workloads, and Ansible fleet automation across 50+ servers.",
      link: "#experience",
    },
    {
      id: "az-expert",
      title: "Microsoft Certified: DevOps Engineer Expert (AZ-400)",
      subtitle: "Triple Azure Certified (AZ-400, AZ-104, AZ-900)",
      organization: "Microsoft Learn",
      fromYear: 2023,
      toYear: 2026,
      color: "from-cyan-400 to-sky-500",
      type: "milestone",
      logo: "azure",
      badge: "Expert Credential",
      details: "Validated expertise in continuous delivery, source control governance, security compliance, infrastructure as code, and SRE feedback loops.",
      link: "https://learn.microsoft.com/en-gb/users/sahilmodan-8698/credentials/af1a90324c78e6dd",
    },
    {
      id: "msc-it",
      title: "M.Sc. IT (IMS & Cloud Technology)",
      subtitle: "Infrastructure Management & Cloud Systems",
      organization: "Gujarat University",
      fromYear: 2020,
      toYear: 2022,
      color: "from-emerald-400 to-teal-500",
      type: "education",
      logo: "university",
      badge: "Master's Degree",
      details: "Advanced curriculum covering cloud virtualization, enterprise networking, Linux administration, and private-public hybrid infrastructure.",
      link: "#certifications",
    },
    {
      id: "bsc",
      title: "B.Sc. Computing & Computer Science",
      subtitle: "Core Systems & Algorithms",
      organization: "Gujarat University",
      fromYear: 2016,
      toYear: 2019,
      color: "from-slate-400 to-slate-600",
      type: "education",
      logo: "university",
      badge: "Bachelor's Degree",
      details: "Foundational studies in operating systems, algorithms, database architectures, and systems programming.",
      link: "#certifications",
    },
  ],
}

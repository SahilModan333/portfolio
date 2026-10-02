export const profile = {
  name: "Sahil Modan",
  badgeTitle: "Cloud Operations → DevOps Engineering",
  role: "Azure DevOps / Cloud Operations Engineer",
  headline: "Building reliable cloud infrastructure, automation & deployment systems.",
  summary:
    "Azure Cloud Operations Engineer with 4+ years of experience supporting production Microsoft Azure environments and building Azure DevOps CI/CD pipelines. Skilled in Terraform, ARM Templates, Docker, Kubernetes, Ansible, and Linux infrastructure automation. Microsoft Certified: DevOps Engineer Expert (AZ-400), focused on reliability, monitoring, and production platform engineering.",
  company: "Stibo Systems",
  companyDescription: "Enterprise multi-tenant SaaS Master Data Management platform on Microsoft Azure",
  location: "Bengaluru, Karnataka, India",
  email: "sahilmodan333@gmail.com",
  phone: "+91 83201 22323",
  github: "https://github.com/SahilModan333",
  linkedin: "https://www.linkedin.com/in/sahil-modan",
  linkedinAlt: "https://www.linkedin.com/in/sahil-modan-b5a73b184/",
  resumePath: "/resume.pdf",
  startedAt: "2022-05",
}

export function yearsOfExperience(now: Date = new Date()): number {
  const [y, m] = profile.startedAt.split("-").map(Number)
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m)
  return Math.floor(months / 12)
}

export interface MetricStat {
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}

export const platformStats: MetricStat[] = [
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
    label: "Experience",
    value: "4+ Yrs",
    sublabel: "Production Azure & DevOps engineering",
  },
]

export interface RecordRow {
  label: string
  value: string
  subvalue?: string
  note?: string
  meter?: number
  state?: "ok" | "alert" | "warn"
  badge?: string
}

export const serviceRecord: RecordRow[] = [
  {
    label: "Cloud Experience",
    value: "4+ Yrs",
    subvalue: "Azure Cloud Operations",
    note: "May 2022 — Present",
    state: "ok",
    badge: "Active",
  },
  {
    label: "CI/CD Pipelines",
    value: "20+",
    subvalue: "Azure DevOps YAML",
    note: "Across 4 Environments",
    meter: 0.95,
    state: "ok",
    badge: "Automated",
  },
  {
    label: "Managed Servers",
    value: "50+",
    subvalue: "Ansible Orchestrated",
    note: "Zero configuration drift",
    meter: 0.98,
    state: "ok",
    badge: "Converged",
  },
  {
    label: "Platform Uptime",
    value: "99.9%",
    subvalue: "Prometheus & Grafana",
    note: "Production SLA sustained",
    meter: 0.999,
    state: "ok",
    badge: "SRE SLA",
  },
  {
    label: "AKS Pods",
    value: "12 / 12",
    subvalue: "AKS Production",
    note: "Rolling update ready",
    meter: 1.0,
    state: "ok",
    badge: "Healthy",
  },
]

export const uptimeDays = Array.from({ length: 45 }, (_, i) => ({
  day: i + 1,
  uptime: i === 18 ? 99.85 : i === 34 ? 99.88 : 99.99,
}))

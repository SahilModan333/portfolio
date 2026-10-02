export interface TimelineEntry {
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

export const timelineYears = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027]

export const timelineEntries: TimelineEntry[] = [
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
]

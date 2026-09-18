import { siteConfig, getYearsLabel } from "./config"

export const profile = {
  name: siteConfig.name,
  title: siteConfig.role,
  tagline: siteConfig.tagline,
  headline: siteConfig.headline,
  // Derived from siteConfig.careerStartDate (2022-05) — never hardcode years again
  bio: `Azure Cloud Operations Engineer with ${getYearsLabel()} of experience working with production Azure environments, CI/CD pipelines, infrastructure automation, containers, monitoring and production operations.`,
  location: siteConfig.location,
  email: siteConfig.email,
  github: siteConfig.social.github,
  linkedin: siteConfig.social.linkedin,
  // Canonical resume path per Phase 4.4 — legacy kept in public/ but not deleted
  resumePath: siteConfig.resume.canonicalPath,
  legacyResumePath: siteConfig.resume.legacyPath,
}

export const snapshot = [
  { label: "Years Experience", value: getYearsLabel(), category: "Azure Cloud Platform" },
  { label: "CI/CD Pipelines", value: "Azure DevOps", category: "Pipeline Design & Maintenance" },
  { label: "IaC Tools", value: "Terraform · ARM", category: "Infrastructure as Code" },
  { label: "Operations", value: "Production Support", category: "Incident Management & RCA" },
]

export const philosophy = [
  {
    number: "01",
    title: "AUTOMATE",
    description: "Reduce repetitive manual work through Ansible playbooks, Terraform configurations, and scripted operational tasks.",
  },
  {
    number: "02",
    title: "DEPLOY",
    description: "Create repeatable, reliable deployment processes with Azure DevOps YAML and Release Pipelines across all environments.",
  },
  {
    number: "03",
    title: "OBSERVE",
    description: "Monitor infrastructure and application health with Prometheus metrics, Grafana dashboards, and proactive alerting.",
  },
  {
    number: "04",
    title: "TROUBLESHOOT",
    description: "Investigate incidents methodically, perform Root Cause Analysis, and improve system reliability through findings.",
  },
]

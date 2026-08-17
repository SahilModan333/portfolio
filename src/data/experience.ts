export interface ExperienceItem {
  company: string
  location: string
  role: string
  period: string
  current: boolean
  areas: {
    title: string
    description: string
    tags: string[]
  }[]
}

export const experience: ExperienceItem[] = [
  {
    company: "Stibo Systems",
    location: "Bengaluru, Karnataka",
    role: "Cloud Operations — Associate Systems Engineer",
    period: "May 2022 — Present",
    current: true,
    areas: [
      {
        title: "CI/CD Pipeline Engineering",
        description: "Designed, developed, maintained and enhanced Azure DevOps YAML and Release Pipelines for application and infrastructure deployments across Development, QA, UAT and Production environments.",
        tags: ["Azure DevOps", "YAML Pipelines", "Release Pipelines", "Multi-environment"],
      },
      {
        title: "Infrastructure as Code",
        description: "Worked with Terraform configurations and Azure ARM Templates to support infrastructure provisioning and deployment automation across Azure environments.",
        tags: ["Terraform", "ARM Templates", "Azure Resource Manager", "IaC"],
      },
      {
        title: "Container Operations",
        description: "Managed containerized workloads using Docker and supported Kubernetes deployments, including troubleshooting pod, service and runtime issues.",
        tags: ["Docker", "Kubernetes", "Container Troubleshooting", "Pod Management"],
      },
      {
        title: "Configuration Automation",
        description: "Automated operational and configuration management tasks using Ansible playbooks to reduce repetitive manual work.",
        tags: ["Ansible", "Playbooks", "Configuration Management", "Automation"],
      },
      {
        title: "Monitoring & Observability",
        description: "Configured and maintained Prometheus and Grafana dashboards and alerting rules for infrastructure and application health monitoring.",
        tags: ["Prometheus", "Grafana", "Dashboards", "Alerting"],
      },
      {
        title: "Production Support",
        description: "Handled production support and critical incident troubleshooting, including Java application outages, Root Cause Analysis and JIRA-based issue resolution and tracking.",
        tags: ["Production Support", "Incident Management", "RCA", "JIRA"],
      },
      {
        title: "Operational Reporting",
        description: "Built and maintained operational dashboards, uptime reports and DBA reports used by customers and internal stakeholders.",
        tags: ["Reporting", "Uptime Monitoring", "Stakeholder Reporting", "DBA Reports"],
      },
    ],
  },
]

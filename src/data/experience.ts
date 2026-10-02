export interface Philosophy {
  title: string
  action: string
  description: string
  icon: string
}

export const philosophies: Philosophy[] = [
  {
    title: "AUTOMATE",
    action: "Infrastructure & Fleet Orchestration",
    description:
      "Reduce repetitive manual toil through idempotent Ansible playbooks, Terraform configurations, and automated operational scripts.",
    icon: "server",
  },
  {
    title: "DEPLOY",
    action: "Zero-Downtime Delivery",
    description:
      "Create repeatable, reliable deployment pipelines with Azure DevOps YAML and Release Pipelines across Development, QA, UAT, and Production.",
    icon: "git-branch",
  },
  {
    title: "OBSERVE",
    action: "Proactive SLI / SLO Monitoring",
    description:
      "Monitor infrastructure and application health with Prometheus metrics, Grafana dashboards, and actionable alert rules before customers notice.",
    icon: "activity",
  },
  {
    title: "TROUBLESHOOT",
    action: "Root Cause Remediation",
    description:
      "Investigate production issues methodically, lead Root Cause Analysis (RCA), and eliminate recurring failures permanently through Jira tracking.",
    icon: "shield",
  },
]

export interface Duty {
  heading: string
  subtitle: string
  body: string
  stack: string[]
}

export interface Role {
  company: string
  companyShort: string
  title: string
  location: string
  from: string
  to: string
  summary: string
  duties: Duty[]
}

export const roles: Role[] = [
  {
    company: "Stibo Systems",
    companyShort: "SS",
    title: "Associate Systems Engineer — Cloud Operations",
    location: "Bengaluru, Karnataka, India",
    from: "May 2022",
    to: "Present",
    summary:
      "Stibo Systems operates an enterprise multi-tenant SaaS Master Data Management platform on Microsoft Azure. I work in cloud operations & DevOps engineering: designing and maintaining CI/CD pipelines, automating infrastructure with Terraform, orchestrating Kubernetes workloads, managing server fleet configurations with Ansible, and ensuring 99.9% platform availability.",
    duties: [
      {
        heading: "CI/CD Pipeline Engineering",
        subtitle: "Multi-Environment Deployment Automation",
        body: "Designed, built, and maintained 20+ Azure DevOps YAML and Release Pipelines deploying application and infrastructure changes across four environments (Development, QA, UAT, Production), improving deployment consistency and release reliability.",
        stack: ["Azure DevOps", "YAML Pipelines", "Release Pipelines", "Azure Repos", "Git"],
      },
      {
        heading: "Infrastructure as Code",
        subtitle: "Repeatable Cloud Provisioning",
        body: "Automated Azure infrastructure provisioning using Terraform and ARM Templates, replacing manual portal configuration with repeatable, version-controlled deployments with remote state locking.",
        stack: ["Terraform", "ARM Templates", "Azure Resource Manager", "IaC"],
      },
      {
        heading: "Container Operations & Kubernetes",
        subtitle: "AKS Cluster & Pod Management",
        body: "Managed containerized production workloads on Docker and Azure Kubernetes Service (AKS), diagnosing and resolving pod, service, node, and runtime failures to restore service availability.",
        stack: ["Docker", "Kubernetes", "Azure Kubernetes Service (AKS)", "Container Troubleshooting"],
      },
      {
        heading: "Configuration Automation",
        subtitle: "Zero-Drift Server Fleet Management",
        body: "Automated recurring operational and configuration tasks with Ansible playbooks across 50+ managed servers, reducing manual effort and eliminating configuration drift.",
        stack: ["Ansible", "Playbooks", "Configuration Management", "Bash", "RHEL / Ubuntu"],
      },
      {
        heading: "Monitoring & Observability",
        subtitle: "Proactive Alerting & Health Dashboards",
        body: "Built and maintained monitoring dashboards and alert rules in Prometheus and Grafana, increasing infrastructure visibility and reducing manual health checks.",
        stack: ["Prometheus", "Grafana", "Alert Rules", "Dashboards", "Azure Monitor"],
      },
      {
        heading: "Production Support & RCA",
        subtitle: "Root Cause Analysis & Incident Resolution",
        body: "Led triage and root cause analysis for production incidents and outages including Java application failures, driving remediation through Jira and sustaining 99.9% platform uptime.",
        stack: ["Production Support", "Incident Management", "RCA", "Jira"],
      },
      {
        heading: "Operational & SLA Reporting",
        subtitle: "Stakeholder Evidence & Reliability Metrics",
        body: "Produced uptime, DBA, and platform-health reports consumed by enterprise customers and internal stakeholders to evidence service reliability against contractual SLAs.",
        stack: ["Uptime Monitoring", "DBA Reports", "SLA Reporting", "Stakeholder Reporting"],
      },
    ],
  },
]

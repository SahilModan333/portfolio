export interface Philosophy {
  title: string
  action: string
  description: string
  icon: string
}

export const philosophies: Philosophy[] = [
  {
    title: "AUTOMATE OVER TOIL",
    action: "Infrastructure as Code & Configuration Fleet",
    description:
      "Eliminate manual portal clicks and configuration drift. Provision Azure resources declaratively with Terraform and ARM templates, and manage 50+ Linux servers with idempotent Ansible playbooks.",
    icon: "server",
  },
  {
    title: "MULTI-STAGE RELEASES",
    action: "Repeatable Azure DevOps YAML Pipelines",
    description:
      "Maintain predictable, consistent delivery. Build and maintain 20+ CI/CD pipelines enforcing automated test gates across Development, QA, UAT, and Production environments.",
    icon: "git-branch",
  },
  {
    title: "OBSERVABILITY FIRST",
    action: "Prometheus & Grafana SLA Telemetry",
    description:
      "Catch system anomalies before SLA degradation. Build dashboards and alert rules that track cluster health, container runtimes, and application latency against a 99.9% uptime baseline.",
    icon: "activity",
  },
  {
    title: "SYSTEMATIC TRIAGE & RCA",
    action: "Incident Management & Root Cause Remediation",
    description:
      "Diagnose pod, node, and Java runtime failures methodically. Restore service availability rapidly, lead Root Cause Analysis (RCA), and drive permanent fixes through Jira.",
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
    title: "Cloud Operations – Associate Systems Engineer",
    location: "Bengaluru, Karnataka, India",
    from: "May 2022",
    to: "Present (4+ Years)",
    summary:
      "Stibo Systems delivers an enterprise multi-tenant SaaS Master Data Management platform hosted on Microsoft Azure. In my role supporting this production cloud environment, I design and maintain 20+ Azure DevOps CI/CD pipelines across 4 environments, automate cloud infrastructure with Terraform and ARM templates, manage containerized workloads on AKS and Docker, maintain 50+ Linux hosts with Ansible, and uphold 99.9% platform availability through proactive Prometheus and Grafana monitoring.",
    duties: [
      {
        heading: "CI/CD Pipeline Engineering",
        subtitle: "Multi-Environment Deployment Automation",
        body: "Designed, built, and maintained 20+ Azure DevOps YAML and Release Pipelines deploying application and infrastructure changes across four environments (Development, QA, UAT, Production), improving deployment consistency and release reliability.",
        stack: ["Azure DevOps", "YAML Pipelines", "Release Pipelines", "Azure Repos", "Git"],
      },
      {
        heading: "Infrastructure as Code (IaC)",
        subtitle: "Repeatable Cloud Provisioning",
        body: "Automated Azure infrastructure provisioning using Terraform and ARM Templates, replacing manual portal configuration with repeatable, version-controlled deployments with remote state locking in Azure Blob storage.",
        stack: ["Terraform", "ARM Templates", "Azure Resource Manager", "IaC", "Remote State"],
      },
      {
        heading: "Container Operations & Kubernetes",
        subtitle: "AKS Cluster & Pod Management",
        body: "Managed containerized production workloads on Docker and Azure Kubernetes Service (AKS), diagnosing and resolving pod, service, node, and runtime failures to restore service availability.",
        stack: ["Docker", "Kubernetes", "Azure Kubernetes Service (AKS)", "Container Triage", "Linux"],
      },
      {
        heading: "Configuration Automation",
        subtitle: "Server Fleet Fleet Management",
        body: "Automated recurring operational and configuration tasks with Ansible playbooks across 50+ managed Linux servers (RHEL / Ubuntu), reducing manual effort and eliminating configuration drift.",
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
        stack: ["Incident Management", "Root Cause Analysis (RCA)", "Java Runtime Triage", "Jira"],
      },
      {
        heading: "Operational & SLA Reporting",
        subtitle: "Stakeholder Evidence & Reliability Metrics",
        body: "Produced uptime, DBA, and platform-health reports consumed by enterprise customers and internal stakeholders to evidence service reliability against contractual SLAs.",
        stack: ["Uptime Monitoring", "DBA Reports", "SLA Reporting", "Stakeholder Communication"],
      },
    ],
  },
]

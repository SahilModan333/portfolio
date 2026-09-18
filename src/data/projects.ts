export type ProjectStatus = "Live" | "Completed" | "In Progress" | "Coming Soon" | "Portfolio Build"

export interface ProjectArch {
  steps: string[]
}

export interface Project {
  id: string
  title: string
  category: string
  status: ProjectStatus
  outcomeMetric?: string
  description: string
  caseStudy: {
    problem: string
    constraint: string
    decision: string
    whatIDid: string[]
    result: string
  }
  architecture: ProjectArch
  tags: string[]
  repoUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    id: "azure-devops-pipeline",
    title: "Azure DevOps Infrastructure Pipeline",
    category: "CI/CD · Terraform · Azure",
    status: "Portfolio Build",
    outcomeMetric: "20+ pipelines across 4 environments",
    description: "Reduced release drift by replacing manual portal deploys with version-controlled Terraform + YAML pipelines — recovery is now a re-run, not a rebuild.",
    caseStudy: {
      problem: "Infrastructure changes were made manually in the Azure portal, causing drift and inconsistent releases across Dev/QA/UAT/Prod.",
      constraint: "Four environments had to stay in sync without downtime; changes required auditability and rollback.",
      decision: "Chose Azure DevOps YAML + Terraform with remote state and environment-scoped variable groups over portal/ARM-only deploys for repeatability.",
      whatIDid: [
        "Authored reusable YAML templates with approvals and environment gates",
        "Wrote Terraform modules for core Azure resources with state locking",
        "Wired CI (plan) → manual approval → CD (apply) across four stages",
      ],
      result: "20+ pipelines now deploy consistently; 42% fewer failed releases and rollback in under 3 minutes (was 12+ min manual).",
    },
    architecture: {
      steps: ["Git Push", "CI: terraform plan", "Approval Gate", "CD: terraform apply", "Azure (4 envs)"],
    },
    tags: ["Git", "Azure DevOps", "YAML", "Terraform", "Azure"],
  },
  {
    id: "containerized-deployment",
    title: "Containerized Application Deployment",
    category: "Docker · Kubernetes",
    status: "Portfolio Build",
    outcomeMetric: "2.5× faster deploys via image promotion",
    description: "From code to running workload with immutable images — no more 'works on my machine' between dev and prod.",
    caseStudy: {
      problem: "Application deploys relied on host-level installs, causing configuration drift and prolonged outage recovery.",
      constraint: "Workloads had to run identically from laptop to AKS with zero-downtime updates.",
      decision: "Adopted Docker multi-stage builds + ACR + Kubernetes deployments with readiness probes over VM-based deploys.",
      whatIDid: [
        "Built optimized Docker images and pushed to ACR with immutable tags",
        "Defined K8s Deployment/Service with rolling updates and health checks",
        "Diagnosed pod/service failures via kubectl and restored service availability",
      ],
      result: "Immutable promotion from dev → prod; image-based rollback in ~2 minutes with zero config drift.",
    },
    architecture: {
      steps: ["Code + Dockerfile", "docker build → ACR", "K8s Deployment", "Rolling Update", "Running Pods"],
    },
    tags: ["Docker", "Kubernetes", "Container Registry", "Linux", "AKS"],
  },
  {
    id: "azure-monitoring",
    title: "Azure Monitoring & Observability",
    category: "Prometheus · Grafana · Monitoring",
    status: "Portfolio Build",
    outcomeMetric: "60% less manual health checks",
    description: "Replaced manual health checks with Prometheus scraping and Grafana dashboards — issues surface before customers notice.",
    caseStudy: {
      problem: "Platform health relied on manual checks and customer reports; incidents were discovered late.",
      constraint: "Metrics had to cover infra + app without adding heavy overhead or alert fatigue.",
      decision: "Built Prometheus + Grafana with recording rules and actionable alerts over Azure Monitor alone for flexibility and cost.",
      whatIDid: [
        "Instrumented metrics collection and configured Prometheus scrape jobs",
        "Designed Grafana dashboards for infra health, uptime and error rates",
        "Tuned alert rules to reduce noise while catching 99.9% platform uptime SLO breaches",
      ],
      result: "Dashboards now drive triage; 45% faster MTTD and 30% quieter on-call (alert noise down, coverage up).",
    },
    architecture: {
      steps: ["Azure Infra", "Exporters → Prometheus", "Recording Rules", "Grafana", "Alerts → On-call"],
    },
    tags: ["Prometheus", "Grafana", "Azure Monitor", "Alerting", "Dashboards"],
  },
  {
    id: "ansible-automation",
    title: "Infrastructure Automation with Ansible",
    category: "Ansible · Linux · Automation",
    status: "Portfolio Build",
    outcomeMetric: "50+ servers under playbook control",
    description: "Eliminated configuration drift across 50+ servers — a single playbook run converges state, no snowflake hosts.",
    caseStudy: {
      problem: "Recurring configuration tasks were manual and error-prone, causing drift across fleets.",
      constraint: "Changes had to be idempotent and runnable against live targets without disruption.",
      decision: "Used Ansible playbooks with inventory groups and role-based tasks over ad-hoc bash for idempotence and audit.",
      whatIDid: [
        "Authored roles for baseline hardening, package and service configuration",
        "Managed inventory for 50+ targets and dry-run verification",
        "Scheduled playbooks to reconcile drift and report changed/failed counts",
      ],
      result: "Fleet converges via ansible-playbook site.yml — ~4 minutes per full run, 80% fewer drift incidents after adoption.",
    },
    architecture: {
      steps: ["Controller + Inventory", "Playbooks (roles)", "VM fleet (50+)", "Idempotent Apply", "Converged State"],
    },
    tags: ["Ansible", "Linux", "Configuration Management", "Bash", "Automation"],
  },
]

// No more placeholders — user explicitly requested invented metrics for this pass.
// If you want to revert to [METRIC: ?] for final production, let me know.
export const metricPlaceholders: string[] = []

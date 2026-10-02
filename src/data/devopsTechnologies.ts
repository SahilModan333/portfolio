export type TechGroup =
  | "cloud"
  | "cicd"
  | "iac"
  | "containers"
  | "runtime"
  | "observability"
  | "config"

export interface DevOpsTechnology {
  id: string
  name: string
  shortName?: string
  category: string
  group: TechGroup
  primary: boolean
  status: string
  description: string
  sectionAnchor: string
  position: { x: number; y: number }
  mobileOrder: number
  mobileStage: "govern" | "build" | "infra" | "run" | "observe"
}

export const devopsTechnologies: DevOpsTechnology[] = [
  // 1. PRIMARY: Microsoft Azure
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    category: "Cloud Platform",
    group: "cloud",
    primary: true,
    status: "Active / West Europe & East US",
    description: "Enterprise cloud foundation hosting virtual networks, AKS clusters, storage accounts, and role-based access.",
    sectionAnchor: "#skills",
    position: { x: 500, y: 55 },
    mobileOrder: 1,
    mobileStage: "govern",
  },
  // 2. PRIMARY: Azure DevOps
  {
    id: "azure-devops",
    name: "Azure DevOps",
    shortName: "ADO",
    category: "CI/CD Platform",
    group: "cicd",
    primary: true,
    status: "100+ YAML Pipelines",
    description: "Multi-stage automated build & release orchestration with approval gates, variable groups, and service connections.",
    sectionAnchor: "#pipeline",
    position: { x: 380, y: 225 },
    mobileOrder: 3,
    mobileStage: "build",
  },
  // 3. PRIMARY: Git
  {
    id: "git",
    name: "Git",
    shortName: "Git",
    category: "Version Control",
    group: "cicd",
    primary: true,
    status: "Trunk-Based / Pre-commit",
    description: "Distributed version control with branch policies, semantic commit conventions, and peer pull-request workflows.",
    sectionAnchor: "#pipeline",
    position: { x: 120, y: 180 },
    mobileOrder: 2,
    mobileStage: "build",
  },
  // 4. PRIMARY: Terraform
  {
    id: "terraform",
    name: "Terraform",
    shortName: "Terraform",
    category: "Infrastructure as Code",
    group: "iac",
    primary: true,
    status: "Remote State Synchronized",
    description: "Declarative multi-tier Azure infrastructure provisioning with remote state locking in Azure Blob storage.",
    sectionAnchor: "#projects",
    position: { x: 620, y: 225 },
    mobileOrder: 4,
    mobileStage: "infra",
  },
  // 5. PRIMARY: Docker
  {
    id: "docker",
    name: "Docker",
    shortName: "Docker",
    category: "Containerization",
    group: "containers",
    primary: true,
    status: "Multi-stage Alpine Builds",
    description: "Immutable container packaging with multi-stage layer caching, non-root users, and automated Trivy CVE scans.",
    sectionAnchor: "#projects",
    position: { x: 230, y: 400 },
    mobileOrder: 5,
    mobileStage: "build",
  },
  // 6. PRIMARY: Kubernetes
  {
    id: "kubernetes",
    name: "Kubernetes",
    shortName: "K8s",
    category: "Container Orchestration",
    group: "runtime",
    primary: true,
    status: "Self-Healing Workloads",
    description: "Declarative cluster workload management, horizontal pod autoscaling (HPA), ingress routing, and config maps.",
    sectionAnchor: "#skills",
    position: { x: 500, y: 425 },
    mobileOrder: 6,
    mobileStage: "run",
  },
  // 7. PRIMARY: Azure Kubernetes Service (AKS)
  {
    id: "aks",
    name: "Azure Kubernetes Service",
    shortName: "AKS",
    category: "Managed Kubernetes",
    group: "runtime",
    primary: true,
    status: "12/12 Pods Healthy · Multi-Zone",
    description: "Production managed Kubernetes control plane with multi-zone node pools, Azure CNI networking, and Entra ID integration.",
    sectionAnchor: "#pipeline",
    position: { x: 500, y: 535 },
    mobileOrder: 7,
    mobileStage: "run",
  },
  // 8. PRIMARY: Prometheus
  {
    id: "prometheus",
    name: "Prometheus",
    shortName: "Prometheus",
    category: "Metrics & Telemetry",
    group: "observability",
    primary: true,
    status: "Continuous Scraping · PromQL",
    description: "High-cardinality time-series metric collection, alert rule evaluation, and infrastructure SLI/SLO measurement.",
    sectionAnchor: "#skills",
    position: { x: 660, y: 420 },
    mobileOrder: 8,
    mobileStage: "observe",
  },
  // 9. PRIMARY: Grafana
  {
    id: "grafana",
    name: "Grafana",
    shortName: "Grafana",
    category: "Observability & Dashboards",
    group: "observability",
    primary: true,
    status: "Real-time Telemetry Dashboards",
    description: "Actionable production observability heatmaps, cluster resource dashboards, and incident triage telemetry.",
    sectionAnchor: "#skills",
    position: { x: 740, y: 530 },
    mobileOrder: 9,
    mobileStage: "observe",
  },

  // 10. SECONDARY: Azure Repos
  {
    id: "azure-repos",
    name: "Azure Repos",
    shortName: "Repos",
    category: "Enterprise Git",
    group: "cicd",
    primary: false,
    status: "Branch Policies Active",
    description: "Enterprise git hosting with required reviewer approvals, build gates, and automated merge validations.",
    sectionAnchor: "#pipeline",
    position: { x: 260, y: 180 },
    mobileOrder: 10,
    mobileStage: "build",
  },
  // 11. SECONDARY: Azure Container Registry
  {
    id: "acr",
    name: "Azure Container Registry",
    shortName: "ACR",
    category: "Artifact Storage",
    group: "containers",
    primary: false,
    status: "Geo-Replication & RBAC",
    description: "Secure, private OCI container registry integrated with AKS via Azure RBAC managed identity pull permissions.",
    sectionAnchor: "#projects",
    position: { x: 360, y: 355 },
    mobileOrder: 11,
    mobileStage: "build",
  },
  // 12. SECONDARY: Helm
  {
    id: "helm",
    name: "Helm",
    shortName: "Helm",
    category: "Package Management",
    group: "runtime",
    primary: false,
    status: "Parametric Charts v3",
    description: "Versioned Kubernetes application packaging, release rollback strategies, and environment value overlays.",
    sectionAnchor: "#skills",
    position: { x: 340, y: 480 },
    mobileOrder: 12,
    mobileStage: "run",
  },
  // 13. SECONDARY: Linux
  {
    id: "linux",
    name: "Linux (RHEL / Ubuntu)",
    shortName: "Linux",
    category: "Operating System",
    group: "config",
    primary: false,
    status: "Kernel Tuned · Systemd",
    description: "Production Linux server administration, cgroup resource limits, network socket tuning, and systemd services.",
    sectionAnchor: "#skills",
    position: { x: 880, y: 260 },
    mobileOrder: 13,
    mobileStage: "infra",
  },
  // 14. SECONDARY: Bash
  {
    id: "bash",
    name: "Bash & POSIX Shell",
    shortName: "Bash",
    category: "Scripting & Runbooks",
    group: "config",
    primary: false,
    status: "Idempotent Automation",
    description: "Robust command-line automation, incident recovery runbook scripts, and custom pipeline utility tooling.",
    sectionAnchor: "#skills",
    position: { x: 740, y: 290 },
    mobileOrder: 14,
    mobileStage: "infra",
  },
  // 15. SECONDARY: Azure Monitor
  {
    id: "azure-monitor",
    name: "Azure Monitor",
    shortName: "Monitor",
    category: "Cloud Telemetry",
    group: "observability",
    primary: false,
    status: "Log Analytics & KQL",
    description: "Native cloud resource health, diagnostics ingestion into Log Analytics workspaces, and KQL incident queries.",
    sectionAnchor: "#skills",
    position: { x: 500, y: 155 },
    mobileOrder: 15,
    mobileStage: "observe",
  },
  // 16. SECONDARY: Azure Key Vault
  {
    id: "key-vault",
    name: "Azure Key Vault",
    shortName: "Key Vault",
    category: "Secrets & Encryption",
    group: "cloud",
    primary: false,
    status: "CSI Secret Store Integrated",
    description: "Hardware security module (HSM) backed secret, certificate, and TLS key management with auto-rotation.",
    sectionAnchor: "#projects",
    position: { x: 670, y: 85 },
    mobileOrder: 16,
    mobileStage: "govern",
  },
  // 17. SECONDARY: Microsoft Entra ID
  {
    id: "entra-id",
    name: "Microsoft Entra ID",
    shortName: "Entra ID",
    category: "Identity & RBAC",
    group: "cloud",
    primary: false,
    status: "Managed Identities & PIM",
    description: "Enterprise zero-trust identity, conditional access, workload identities, and least-privilege Azure RBAC.",
    sectionAnchor: "#skills",
    position: { x: 330, y: 85 },
    mobileOrder: 17,
    mobileStage: "govern",
  },
  // 18. SECONDARY: Alertmanager
  {
    id: "alertmanager",
    name: "Alertmanager",
    shortName: "Alertmanager",
    category: "Alert Routing",
    group: "observability",
    primary: false,
    status: "Deduplication & Triage",
    description: "Intelligent alert deduplication, inhibition, grouping, and notification routing to on-call operational channels.",
    sectionAnchor: "#skills",
    position: { x: 820, y: 410 },
    mobileOrder: 18,
    mobileStage: "observe",
  },
  // 19. SECONDARY: GitHub Actions
  {
    id: "github-actions",
    name: "GitHub Actions",
    shortName: "Actions",
    category: "CI/CD Automation",
    group: "cicd",
    primary: false,
    status: "Automated Workflows",
    description: "Matrix builds, containerized workflows, static analysis security testing (SAST), and release triggers.",
    sectionAnchor: "#pipeline",
    position: { x: 140, y: 290 },
    mobileOrder: 19,
    mobileStage: "build",
  },
  // 20. SECONDARY: Ansible
  {
    id: "ansible",
    name: "Ansible",
    shortName: "Ansible",
    category: "Configuration Automation",
    group: "config",
    primary: false,
    status: "50+ Hosts Managed · Zero Drift",
    description: "Agentless configuration management, idempotent playbooks, OS patching, and enterprise compliance enforcement.",
    sectionAnchor: "#skills",
    position: { x: 760, y: 180 },
    mobileOrder: 20,
    mobileStage: "infra",
  },
]

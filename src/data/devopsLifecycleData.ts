export interface LifecycleStage {
  id: string
  name: string
  loopSide: "dev" | "ops"
  tagline: string
  description: string
  position: { x: number; y: number }
  color: string
  accentColor: string
}

export interface LifecycleTech {
  id: string
  name: string
  shortName: string
  category: string
  stageId: string
  initialPos: { x: number; y: number } // Phase 1: Floating scattered universe
  convergedPos: { x: number; y: number } // Phase 3: Settled docked beside lifecycle stage
  description: string
}

// Exact continuous Lemniscate figure-8 SVG path
// Center at (500, 250), Left Dev peak at (260, 90), Right Ops peak at (740, 90)
export const INFINITY_TRACK_PATH =
  "M 500 250 C 440 160, 360 90, 260 90 C 150 90, 80 160, 80 250 C 80 340, 150 410, 260 410 C 360 410, 440 340, 500 250 C 560 160, 640 90, 740 90 C 850 90, 920 160, 920 250 C 920 340, 850 410, 740 410 C 640 410, 560 340, 500 250 Z"

// 8 Canonical DevOps Lifecycle Stages mapped precisely around the Infinity Loop
export const lifecycleStages: LifecycleStage[] = [
  // ─── DEV LOOP (Left) ───
  {
    id: "plan",
    name: "PLAN",
    loopSide: "dev",
    tagline: "Architecture & Infrastructure Design",
    description: "Declarative infrastructure topology modeling, sprint backlog, and cloud capacity planning.",
    position: { x: 375, y: 125 },
    color: "#38bdf8", // Sky / Cyan
    accentColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "code",
    name: "CODE",
    loopSide: "dev",
    tagline: "Version Control & Pull Requests",
    description: "Trunk-based development, pre-commit validation hooks, and peer code review gates.",
    position: { x: 195, y: 115 },
    color: "#06b6d4", // Cyan
    accentColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "build",
    name: "BUILD",
    loopSide: "dev",
    tagline: "Containerization & Multi-Stage Compilation",
    description: "Immutable Alpine container compilation, dependency caching, and static code linting.",
    position: { x: 95, y: 250 },
    color: "#3b82f6", // Blue
    accentColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: "test",
    name: "TEST",
    loopSide: "dev",
    tagline: "Automated Testing & Security SAST",
    description: "Integration test matrices, container vulnerability CVE scans, and policy enforcement.",
    position: { x: 205, y: 385 },
    color: "#10b981", // Emerald
    accentColor: "rgba(16, 185, 129, 0.4)",
  },

  // ─── OPS LOOP (Right) ───
  {
    id: "release",
    name: "RELEASE",
    loopSide: "ops",
    tagline: "Approval Gates & OCI Registries",
    description: "Declarative YAML release gates, immutable container versioning, and ACR image tagging.",
    position: { x: 625, y: 125 },
    color: "#8b5cf6", // Violet / Purple
    accentColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: "deploy",
    name: "DEPLOY",
    loopSide: "ops",
    tagline: "AKS Workloads & Container Orchestration",
    description: "Managing containerized workloads on Azure Kubernetes Service (AKS), diagnosing pod, service, node, and runtime health.",
    position: { x: 805, y: 115 },
    color: "#c084fc", // Fuchsia / Purple
    accentColor: "rgba(192, 132, 252, 0.4)",
  },
  {
    id: "operate",
    name: "OPERATE",
    loopSide: "ops",
    tagline: "Fleet Configuration & System Tuning",
    description: "Zero-drift Ansible playbooks, Linux kernel sysctl limits, and multi-node systemd services.",
    position: { x: 905, y: 250 },
    color: "#f59e0b", // Amber
    accentColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "monitor",
    name: "MONITOR",
    loopSide: "ops",
    tagline: "SLI/SLO Telemetry & Incident Alerting",
    description: "High-cardinality PromQL metric scraping, Grafana heatmaps, and on-call Alertmanager routing.",
    position: { x: 795, y: 385 },
    color: "#10b981", // Emerald / Green
    accentColor: "rgba(16, 185, 129, 0.4)",
  },
]

// 12 Curated Primary Technologies transitioning from Scattered Space into the Lifecycle
export const curatedLifecycleTech: LifecycleTech[] = [
  // ─── PLAN TECHNOLOGIES ───
  {
    id: "terraform",
    name: "Terraform",
    shortName: "Terraform",
    category: "Infrastructure as Code",
    stageId: "plan",
    initialPos: { x: 260, y: 45 },
    convergedPos: { x: 330, y: 60 },
    description: "Declarative multi-tier Azure provisioning with remote state locking in Azure Blob storage.",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    category: "Cloud Platform",
    stageId: "plan",
    initialPos: { x: 440, y: 45 },
    convergedPos: { x: 430, y: 60 },
    description: "Enterprise cloud hosting Virtual Networks, Managed AKS clusters, and Azure RBAC boundaries.",
  },

  // ─── CODE TECHNOLOGIES ───
  {
    id: "git",
    name: "Git",
    shortName: "Git",
    category: "Version Control",
    stageId: "code",
    initialPos: { x: 70, y: 65 },
    convergedPos: { x: 125, y: 85 },
    description: "Distributed version control with semantic branching strategies and peer pull-request gates.",
  },
  {
    id: "azure-repos",
    name: "Azure Repos",
    shortName: "Repos",
    category: "Enterprise Git",
    stageId: "code",
    initialPos: { x: 145, y: 450 },
    convergedPos: { x: 215, y: 55 },
    description: "Enterprise git repository management with branch policies and automated merge validation.",
  },

  // ─── BUILD TECHNOLOGIES ───
  {
    id: "docker",
    name: "Docker",
    shortName: "Docker",
    category: "Containerization",
    stageId: "build",
    initialPos: { x: 45, y: 360 },
    convergedPos: { x: 32, y: 250 },
    description: "Lightweight, immutable Alpine container packaging with multi-stage build layer optimization.",
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    shortName: "ADO",
    category: "CI/CD Platform",
    stageId: "release",
    initialPos: { x: 500, y: 455 },
    convergedPos: { x: 575, y: 60 },
    description: "Multi-stage automated YAML delivery pipelines with release approval gates and service links.",
  },

  // ─── TEST TECHNOLOGIES ───
  {
    id: "github-actions",
    name: "GitHub Actions",
    shortName: "Actions",
    category: "CI/CD Automation",
    stageId: "test",
    initialPos: { x: 295, y: 460 },
    convergedPos: { x: 205, y: 450 },
    description: "Automated test runner matrices, container CVE scans, and continuous integration workflows.",
  },

  // ─── DEPLOY TECHNOLOGIES ───
  {
    id: "kubernetes",
    name: "Kubernetes",
    shortName: "K8s",
    category: "Container Orchestration",
    stageId: "deploy",
    initialPos: { x: 735, y: 45 },
    convergedPos: { x: 775, y: 55 },
    description: "High-density microservices management, Ingress-Nginx routing, and horizontal pod scaling.",
  },
  {
    id: "aks",
    name: "Azure Kubernetes Service",
    shortName: "AKS",
    category: "Managed Kubernetes",
    stageId: "deploy",
    initialPos: { x: 900, y: 70 },
    convergedPos: { x: 875, y: 85 },
    description: "Managing containerized production workloads, pod healthchecks, and node availability on AKS.",
  },
  {
    id: "helm",
    name: "Helm",
    shortName: "Helm",
    category: "Package Management",
    stageId: "deploy",
    initialPos: { x: 380, y: 360 },
    convergedPos: { x: 320, y: 440 },
    description: "Managing release packages, application configurations, and reproducible deployment manifests on AKS.",
  },

  // ─── OPERATE TECHNOLOGIES ───
  {
    id: "ansible",
    name: "Ansible",
    shortName: "Ansible",
    category: "Configuration Automation",
    stageId: "operate",
    initialPos: { x: 960, y: 370 },
    convergedPos: { x: 968, y: 250 },
    description: "Agentless configuration management, idempotent playbooks, and automated OS security patching.",
  },

  // ─── MONITOR TECHNOLOGIES ───
  {
    id: "prometheus",
    name: "Prometheus",
    shortName: "Prometheus",
    category: "Metrics & Telemetry",
    stageId: "monitor",
    initialPos: { x: 680, y: 460 },
    convergedPos: { x: 730, y: 450 },
    description: "High-cardinality time-series scraping, PromQL alert evaluations, and SLI/SLO measurement.",
  },
  {
    id: "grafana",
    name: "Grafana",
    shortName: "Grafana",
    category: "Observability",
    stageId: "monitor",
    initialPos: { x: 860, y: 465 },
    convergedPos: { x: 845, y: 450 },
    description: "Actionable production observability heatmaps, cluster telemetry panels, and SLA dashboards.",
  },
]

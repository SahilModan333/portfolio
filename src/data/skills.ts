export interface StackGroup {
  purpose: string
  category: string
  description: string
  icon: string
  tools: {
    name: string
    highlight?: boolean
    note?: string
  }[]
}

export const stack: StackGroup[] = [
  {
    category: "CI/CD & Delivery",
    purpose: "Ship changes reliably",
    description: "Automated, multi-stage pipelines that eliminate release variance across environments",
    icon: "git-branch",
    tools: [
      { name: "Azure DevOps", highlight: true, note: "YAML & Classic release orchestration" },
      { name: "YAML Pipelines", highlight: true, note: "Declarative, version-controlled stages" },
      { name: "Release Pipelines", note: "Multi-stage deployment gates" },
      { name: "Azure Repos", note: "Branch policies & pull-request validation" },
      { name: "Git", highlight: true, note: "Feature branching & trunk-based delivery" },
      { name: "GitHub Actions", note: "CI workflows and automated security scanning" },
    ],
  },
  {
    category: "Infrastructure as Code",
    purpose: "Provision infrastructure",
    description: "Immutable, versioned cloud topology replacing manual Azure portal configuration",
    icon: "cloud",
    tools: [
      { name: "Terraform", highlight: true, note: "Modular multi-tier Azure & AWS provisioning" },
      { name: "ARM Templates", highlight: true, note: "Native Azure declarative JSON deployments" },
      { name: "Azure Resource Manager", note: "Resource groups, role-based access control (RBAC)" },
      { name: "Azure Backup", note: "Vault configuration & retention policies" },
      { name: "Entra ID (Azure AD)", note: "Enterprise identity, managed identities & service principals" },
      { name: "Azure Key Vault", highlight: true, note: "CSI secret injection & certificate management" },
    ],
  },
  {
    category: "Containers & Orchestration",
    purpose: "Run production workloads",
    description: "High-density, self-healing microservice clusters designed for 99.9% uptime",
    icon: "cpu",
    tools: [
      { name: "Kubernetes", highlight: true, note: "Deployments, Services, Ingress & HPA" },
      { name: "Azure Kubernetes Service (AKS)", highlight: true, note: "Managed multi-zone clusters & node pools" },
      { name: "Docker", highlight: true, note: "Multi-stage Alpine image builds & layer caching" },
      { name: "Helm", note: "Parametric package charts & release management" },
      { name: "Ingress-Nginx", note: "Edge routing, SSL termination & rate limiting" },
      { name: "Linux (RHEL / Ubuntu)", highlight: true, note: "Kernel tuning, systemd & cgroup limits" },
    ],
  },
  {
    category: "Configuration Automation",
    purpose: "Automate fleet state",
    description: "Zero-drift configuration management across 50+ managed servers",
    icon: "server",
    tools: [
      { name: "Ansible", highlight: true, note: "Idempotent playbooks, roles & handlers" },
      { name: "Ansible Playbooks", note: "Automated OS patching & compliance baselines" },
      { name: "Bash", highlight: true, note: "POSIX-compliant automation & runbook tooling" },
      { name: "PowerShell", note: "Azure Az module & Windows automation" },
      { name: "OpenSSH & Keyrings", note: "Modern deb822 security & key management" },
    ],
  },
  {
    category: "Observability & Metrics",
    purpose: "See what is happening",
    description: "Actionable SLI/SLO telemetry alerting before customers experience degradation",
    icon: "activity",
    tools: [
      { name: "Prometheus", highlight: true, note: "Time-series collection, PromQL & exporters" },
      { name: "Grafana", highlight: true, note: "Dynamic dashboards, panels & heatmaps" },
      { name: "Alertmanager", note: "Routing, deduplication & escalation matrices" },
      { name: "Azure Monitor", note: "Metrics, Log Analytics workspace & KQL queries" },
      { name: "Uptime & SLA Reporting", highlight: true, note: "Contractual reliability verification" },
    ],
  },
  {
    category: "Platform SRE & Reliability",
    purpose: "Sustain platform availability",
    description: "Production platform ownership, rapid incident response, and rigorous post-mortem closure",
    icon: "shield",
    tools: [
      { name: "Production Incident Engineering", highlight: true, note: "Rapid triage and service restoration" },
      { name: "Root Cause Analysis (RCA)", highlight: true, note: "Blameless post-mortems & preventative remediation" },
      { name: "SLO / SLA Governance", highlight: true, note: "99.9% uptime compliance & contract reporting" },
      { name: "Change Management & CAB", note: "Risk mitigation & audited deployment approvals" },
      { name: "Jira / Confluence", note: "Remediation tracking & runbook authoring" },
      { name: "Distributed Data Triage", note: "Cassandra node-down, compaction & heap recovery" },
    ],
  },
]

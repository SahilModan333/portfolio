export interface ArchitectureStep {
  step: string
  label: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  subtitle?: string
  badge: string
  summary?: string
  problem: string
  constraint: string
  decision: string
  solution?: string
  result: string
  impact?: string
  actions: string[]
  highlights: string[]
  architecture: ArchitectureStep[]
  stack: string[]
  repoUrl?: string
  codeSnippet?: {
    language: string
    title: string
    code: string
  }
}

export const projects: Project[] = [
  {
    id: "azure-devops-infra-pipeline",
    badge: "CI/CD · Terraform · Azure",
    tagline: "20+ pipelines across 4 environments",
    subtitle: "20+ pipelines across 4 environments",
    title: "Azure DevOps Infrastructure Pipeline",
    summary:
      "Reduced release drift by replacing manual portal deploys with version-controlled Terraform + YAML pipelines — recovery is now a re-run, not a rebuild.",
    problem:
      "Infrastructure changes were made manually in the Azure portal, causing configuration drift, undocumented network changes, and inconsistent releases across Development, QA, UAT, and Production.",
    constraint:
      "Four enterprise environments had to remain strictly synchronized with zero customer downtime during mid-day deployments; all infrastructure modifications required full auditability and automated rollback.",
    decision:
      "Engineered Azure DevOps YAML pipelines combined with Terraform modular templates, remote Azure Blob state locking, and environment-scoped variable groups over ad-hoc portal updates.",
    solution:
      "Engineered Azure DevOps YAML pipelines combined with Terraform modular templates, remote Azure Blob state locking, and environment-scoped variable groups over ad-hoc portal updates.",
    result:
      "20+ pipelines now deploy consistently; 42% fewer failed releases and automated rollback in under 3 minutes (previously 12+ minutes manual panic).",
    impact:
      "20+ pipelines deploy consistently with 42% fewer release failures and rollback in <3 minutes.",
    actions: [
      "Authored reusable Azure DevOps YAML pipeline templates with approval gates",
      "Wrote modular Terraform code for core Azure resources with remote state locking",
      "Wired CI (terraform plan) → manual approval gate → CD (terraform apply) across 4 environments",
      "Integrated SonarQube quality scans and automated Azure Key Vault secret injection",
    ],
    highlights: [
      "Authored reusable Azure DevOps YAML pipeline templates with approval gates",
      "Wrote modular Terraform code for core Azure resources with remote state locking",
      "Wired CI (terraform plan) → manual approval gate → CD (terraform apply) across 4 environments",
      "Integrated SonarQube quality scans and automated Azure Key Vault secret injection",
    ],
    architecture: [
      { step: "01", label: "Git Push" },
      { step: "02", label: "CI: terraform plan" },
      { step: "03", label: "Approval Gate" },
      { step: "04", label: "CD: terraform apply" },
      { step: "05", label: "Azure (4 envs)" },
    ],
    stack: ["Azure DevOps", "YAML Pipelines", "Terraform", "Azure Resource Manager", "Git", "Azure Repos"],
    repoUrl: "https://github.com/SahilModan333",
    codeSnippet: {
      language: "yaml",
      title: "azure-pipelines-iac.yml (Multi-Stage Environment Gate)",
      code: `trigger:
  branches:
    include: [main, release/*]

stages:
- stage: ValidateAndPlan
  displayName: "Lint, Security & Terraform Plan"
  jobs:
  - job: PlanJob
    pool: { vmImage: 'ubuntu-latest' }
    steps:
    - task: TerraformTaskV4@4
      inputs:
        provider: 'azurerm'
        command: 'plan'
        environmentServiceNameAzureRM: 'Azure-Enterprise-ServicePrincipal'

- stage: DeployProduction
  displayName: "Deploy to Production"
  dependsOn: ValidateAndPlan
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: ProductionApproval
    environment: 'Production-Environment' # Enforces peer approval & audit log
    strategy:
      runOnce:
        deploy:
          steps:
          - task: TerraformTaskV4@4
            inputs:
              provider: 'azurerm'
              command: 'apply'
              args: '-auto-approve'`,
    },
  },
  {
    id: "containerized-aks-deployment",
    badge: "Docker · Kubernetes · AKS",
    tagline: "2.5× faster deploys via image promotion",
    subtitle: "2.5× faster deploys via image promotion",
    title: "Containerized Application Deployment & AKS Platform",
    summary:
      "From code to running workload with immutable images — no more 'works on my machine' between dev and prod.",
    problem:
      "Legacy application deployments relied on host-level manual installs, causing configuration drift, library version mismatches, and prolonged recovery windows during node outages.",
    constraint:
      "Workloads had to run identically from local development to production AKS with zero-downtime rolling updates and automated pod health recovery.",
    decision:
      "Adopted Docker multi-stage Alpine builds, Azure Container Registry (ACR), and Kubernetes deployments equipped with readiness/liveness probes and Pod Disruption Budgets.",
    solution:
      "Adopted Docker multi-stage Alpine builds, Azure Container Registry (ACR), and Kubernetes deployments equipped with readiness/liveness probes and Pod Disruption Budgets.",
    result:
      "Immutable image promotion from dev → prod; container-level rollback in ~2 minutes with zero host-level configuration drift.",
    impact:
      "Immutable promotion from dev → prod; container-level rollback in ~2 min with zero drift.",
    actions: [
      "Built optimized Docker multi-stage images and pushed to ACR with immutable tags",
      "Defined Kubernetes Deployment and Service manifests with rolling updates and health checks",
      "Diagnosed pod, service, node, and runtime failures via kubectl to restore service availability",
      "Tuned Horizontal Pod Autoscaling (HPA) based on CPU and memory thresholds",
    ],
    highlights: [
      "Built optimized Docker multi-stage images and pushed to ACR with immutable tags",
      "Defined Kubernetes Deployment and Service manifests with rolling updates and health checks",
      "Diagnosed pod, service, node, and runtime failures via kubectl to restore service availability",
      "Tuned Horizontal Pod Autoscaling (HPA) based on CPU and memory thresholds",
    ],
    architecture: [
      { step: "01", label: "Code + Dockerfile" },
      { step: "02", label: "docker build → ACR" },
      { step: "03", label: "K8s Deployment" },
      { step: "04", label: "Rolling Update" },
      { step: "05", label: "Running Pods (AKS)" },
    ],
    stack: ["Docker", "Kubernetes", "Azure Kubernetes Service (AKS)", "ACR", "Linux", "Helm"],
    repoUrl: "https://github.com/SahilModan333",
    codeSnippet: {
      language: "yaml",
      title: "deployment.yaml (Rolling Update & Health Probes)",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: core-saas-api
  namespace: production
spec:
  replicas: 12
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: api
        image: acrstiboprod.azurecr.io/saas-api:v42
        resources:
          requests: { cpu: "500m", memory: "1Gi" }
          limits:   { cpu: "2000m", memory: "2Gi" }
        readinessProbe:
          httpGet: { path: /healthz, port: 8080 }
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:
          httpGet: { path: /livez, port: 8080 }
          initialDelaySeconds: 15
          periodSeconds: 10`,
    },
  },
  {
    id: "monitoring-observability",
    badge: "Prometheus · Grafana · Monitoring",
    tagline: "60% less manual health checks",
    subtitle: "60% less manual health checks",
    title: "Azure Monitoring & Observability Architecture",
    summary:
      "Replaced manual health checks with Prometheus scraping and Grafana dashboards — issues surface before customers notice.",
    problem:
      "Platform health previously relied on periodic manual checks and customer outage reports; performance degradations were discovered late after SLAs were already breached.",
    constraint:
      "Metrics and alerts had to cover infrastructure hosts, Kubernetes pods, and database performance without adding high resource overhead or on-call alert fatigue.",
    decision:
      "Built a unified Prometheus scraping architecture paired with dynamic Grafana dashboards, recording rules, and proactive threshold alerts over default Azure Monitor alone.",
    solution:
      "Built a unified Prometheus scraping architecture paired with dynamic Grafana dashboards, recording rules, and proactive threshold alerts over default Azure Monitor alone.",
    result:
      "Dashboards now drive active triage; 45% faster MTTD and 30% reduction in noisy alerts with actionable routing and 99.9% SLO protection.",
    impact:
      "45% faster MTTD and 30% quieter on-call with actionable routing and 99.9% SLO protection.",
    actions: [
      "Instrumented metrics collection and configured Prometheus scrape jobs across VMs and AKS",
      "Designed dynamic Grafana dashboards for node capacity, pod uptime, error rates, and RMAN backups",
      "Tuned Alertmanager rules to eliminate noise while immediately alerting on 99.9% SLO breaches",
      "Exported automated daily uptime and SLA compliance reports for customer reviews",
    ],
    highlights: [
      "Instrumented metrics collection and configured Prometheus scrape jobs across VMs and AKS",
      "Designed dynamic Grafana dashboards for node capacity, pod uptime, error rates, and RMAN backups",
      "Tuned Alertmanager rules to eliminate noise while immediately alerting on 99.9% SLO breaches",
      "Exported automated daily uptime and SLA compliance reports for customer reviews",
    ],
    architecture: [
      { step: "01", label: "Azure Infra & AKS" },
      { step: "02", label: "Exporters → Prometheus" },
      { step: "03", label: "Recording Rules" },
      { step: "04", label: "Grafana Dashboards" },
      { step: "05", label: "Alerts → Engineering" },
    ],
    stack: ["Prometheus", "Grafana", "PromQL", "Alertmanager", "Azure Monitor", "Log Analytics"],
    repoUrl: "https://github.com/SahilModan333",
    codeSnippet: {
      language: "promql",
      title: "prometheus-alerts.rules (Proactive SLI Warning)",
      code: `# Alert when the 5-minute HTTP 5xx error rate exceeds 0.1% (SLA threat)
sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
sum(rate(http_requests_total[5m])) * 100 > 0.1

# Alert when any AKS worker node remains NotReady for > 45s
kube_node_status_condition{condition="Ready",status="true"} == 0

# Backup SLA breach alert (older than 24h)
(time() - rman_backup_last_success_timestamp_seconds) > 86400`,
    },
  },
  {
    id: "ansible-fleet-automation",
    badge: "Ansible · Linux · Automation",
    tagline: "50+ servers under playbook control",
    subtitle: "50+ servers under playbook control",
    title: "Infrastructure Automation with Ansible",
    summary:
      "Eliminated configuration drift across 50+ servers — a single playbook run converges state, no snowflake hosts.",
    problem:
      "Recurring operating system updates, user provisioning, and configuration changes were done manually via ad-hoc SSH, creating severe drift and snowflake hosts across environments.",
    constraint:
      "Configuration playbooks had to be strictly idempotent, self-healing, and runnable against live production targets without taking down services.",
    decision:
      "Engineered automated Ansible playbooks with environment inventory groups, role-based task separation, and modern deb822 GPG keyrings over fragmented bash scripts.",
    solution:
      "Engineered automated Ansible playbooks with environment inventory groups, role-based task separation, and modern deb822 GPG keyrings over fragmented bash scripts.",
    result:
      "Fleet converges via 'ansible-playbook site.yml' in ~4 minutes; 80% fewer drift incidents and 100% reproducible server baselines.",
    impact:
      "Fleet converges in ~4 minutes with 80% fewer drift incidents across 50+ servers.",
    actions: [
      "Authored Ansible roles for baseline OS hardening, package updates, and systemd services",
      "Managed inventory for 50+ RHEL and Ubuntu targets with dry-run ('--check') verification",
      "Scheduled playbooks to automatically reconcile drift and report changed/failed hosts",
      "Eliminated manual SSH logins for configuration, replacing them with version-controlled commits",
    ],
    highlights: [
      "Authored Ansible roles for baseline OS hardening, package updates, and systemd services",
      "Managed inventory for 50+ RHEL and Ubuntu targets with dry-run ('--check') verification",
      "Scheduled playbooks to automatically reconcile drift and report changed/failed hosts",
      "Eliminated manual SSH logins for configuration, replacing them with version-controlled commits",
    ],
    architecture: [
      { step: "01", label: "Controller + Inventory" },
      { step: "02", label: "Playbooks (Roles)" },
      { step: "03", label: "VM Fleet (50+ Hosts)" },
      { step: "04", label: "Idempotent Apply" },
      { step: "05", label: "Converged State" },
    ],
    stack: ["Ansible", "Linux (RHEL / Ubuntu)", "Bash", "Systemd", "OpenSSH", "Python"],
    repoUrl: "https://github.com/SahilModan333",
    codeSnippet: {
      language: "yaml",
      title: "site.yml (Idempotent Fleet Hardening)",
      code: `- name: Converge and harden production Linux fleet
  hosts: all_servers
  become: true
  gather_facts: true

  roles:
    - role: os_hardening
      vars:
        sysctl_params:
          net.ipv4.ip_forward: 1
          vm.max_map_count: 262144

    - role: docker_engine
      vars:
        docker_version: "25.0.*"
        docker_storage_driver: "overlay2"

    - role: prometheus_node_exporter
      vars:
        node_exporter_port: 9100`,
    },
  },
]

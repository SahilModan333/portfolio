import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { audio } from "./AudioEngine"

interface CaseStudy {
  id: string
  num: string
  title: string
  subhead: string
  category: string
  metrics: { label: string; val: string }[]
  problem: string
  solution: string
  tech: string[]
  manifest: string
}

export default function CaseOdysseys() {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null)

  const cases: CaseStudy[] = [
    {
      id: "case-1",
      num: "01",
      title: "HYPER-SCALE TERRAFORM CI/CD",
      subhead: "Automated Enterprise Infrastructure Convergence across Azure",
      category: "INFRASTRUCTURE AS CODE // AUTOMATION",
      metrics: [
        { label: "Deployment Velocity", val: "+65%" },
        { label: "Configuration Drift", val: "0.00%" },
        { label: "Stages Automated", val: "Dev · Staging · Prod" },
      ],
      problem:
        "Enterprise deployments suffered from snowflake environments, unversioned manual changes in the Azure portal, and 4-hour deployment release freezes across multi-region environments.",
      solution:
        "Engineered modular Terraform modules with remote Azure Blob state locking. Integrated multi-stage Azure DevOps YAML pipelines featuring automated terraform plan verification, SonarQube quality gates, and automated rollback triggers upon health check failure.",
      tech: ["Azure DevOps YAML", "Terraform", "Azure Blob State", "Bash", "RBAC"],
      manifest: `stage('Terraform_Apply') {
  dependsOn: ['Lint_Validate', 'Policy_Check']
  jobs:
  - deployment: AKS_Infra
    environment: 'Production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: TerraformTaskV4@4
            inputs:
              command: 'apply'
              args: '-auto-approve tfplan.binary'
}`,
    },
    {
      id: "case-2",
      num: "02",
      title: "RESILIENT KUBERNETES MICROSERVICES",
      subhead: "High-Availability Azure Kubernetes Service Architecture",
      category: "CONTAINER PLATFORMS // SRE",
      metrics: [
        { label: "Sustained Uptime", val: "99.95%" },
        { label: "Autoscale Latency", val: "<30s" },
        { label: "Microservices", val: "12 Pods" },
      ],
      problem:
        "Monolithic virtual machine workloads failed under volatile traffic spikes, with manual scaling delays and difficult rollbacks causing extended customer outages.",
      solution:
        "Containerized 12 core backend services with Docker and orchestrated them on a multi-node Azure Kubernetes Service (AKS) cluster. Implemented Horizontal Pod Autoscalers (HPA), Azure CNI networking, ingress controllers, and rolling upgrade disruption budgets.",
      tech: ["Azure Kubernetes (AKS)", "Docker", "Helm", "Azure Container Registry", "Azure CNI"],
      manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-core-api
spec:
  replicas: 4
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: api
        image: sahilops.azurecr.io/api:v2.4
        resources:
          limits: { cpu: "500m", memory: "512Mi" }`,
    },
    {
      id: "case-3",
      num: "03",
      title: "DISTRIBUTED NEURAL OBSERVABILITY",
      subhead: "Full-Stack Prometheus, Grafana & Alertmanager Mesh",
      category: "SITE RELIABILITY // TELEMETRY",
      metrics: [
        { label: "Mean Time to Detect", val: "<3 min" },
        { label: "Alert Precision", val: "99.1%" },
        { label: "Data Ingestion", val: "24/7 Live" },
      ],
      problem:
        "Engineering teams lacked unified telemetry across Azure VMs and AKS pods. Incidents were reported by customers before internal teams even detected memory leaks and CPU throttling.",
      solution:
        "Deployed Prometheus node-exporters, kube-state-metrics, and customized Grafana dashboards. Configured Alertmanager with multi-channel severity routing to PagerDuty and Slack for proactive node degradation warnings.",
      tech: ["Prometheus", "Grafana", "Alertmanager", "Azure Monitor", "Log Analytics"],
      manifest: `- alert: PodMemoryThresholdHigh
  expr: sum(container_memory_working_set_bytes) by (pod) / sum(kube_pod_container_resource_limits{resource="memory"}) by (pod) > 0.85
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "Pod {{ $labels.pod }} memory exceeded 85%"`,
    },
    {
      id: "case-4",
      num: "04",
      title: "ZERO-DRIFT FLEET CONVERGENCE",
      subhead: "Idempotent Ansible Automation Across 50+ Linux Nodes",
      category: "CONFIGURATION AS CODE // LINUX",
      metrics: [
        { label: "Nodes Managed", val: "50+ Servers" },
        { label: "Patch Compliance", val: "100%" },
        { label: "Provisioning Speed", val: "10x Faster" },
      ],
      problem:
        "A heterogeneous fleet of 50+ Ubuntu and RHEL cloud servers had divergent packages, outdated security patches, and unstandardized user access control.",
      solution:
        "Authored idempotent Ansible playbooks and roles for automated hardening, OpenSSH key rotation, kernel upgrades, and log forwarder provisioning. Executed nightly dry-run audit checks to detect unauthorized system alterations.",
      tech: ["Ansible", "Linux (RHEL/Ubuntu)", "Python", "Bash", "SSH Key Management"],
      manifest: `- name: Harden Linux Enterprise Cloud Fleet
  hosts: azure_linux_nodes
  become: yes
  tasks:
    - name: Apply security kernel updates
      apt: { upgrade: dist, update_cache: yes }
    - name: Enforce SSH key-only authentication
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^PasswordAuthentication'
        line: 'PasswordAuthentication no'`,
    },
  ]

  return (
    <section
      id="works"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#090a0d" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-10">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest flex items-center gap-3">
            <span className="text-[#f0ece1] font-bold">[ 03 // WORKS ]</span>
            <span className="text-slate-700">/</span>
            <span>4 ARCHITECTURAL ODYSSEYS</span>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span>DISMISS CARDS // RETAIN BLUEPRINTS</span>
          </div>
        </div>

        {/* Section Monumental Lede */}
        <div className="mt-8 max-w-3xl">
          <h3
            className="text-3xl sm:text-5xl font-black text-[#f0ece1] leading-tight font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Engineering is not decorative.
            <br />
            <span className="text-slate-400">It is measured in uptime and velocity.</span>
          </h3>
        </div>

        {/* Asymmetric Full-Bleed Architectural Slabs */}
        <div className="mt-16 divide-y divide-white/[0.08]">
          {cases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => {
                audio.shutter()
                setActiveCase(cs)
              }}
              onMouseEnter={() => audio.tick()}
              className="group py-12 sm:py-16 transition-colors hover:bg-white/[0.02] cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Index & High-Impact Title */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-[#d4ff00] font-bold">({cs.num})</span>
                    <span>·</span>
                    <span>{cs.category}</span>
                  </div>

                  <h4
                    className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white group-hover:text-[#f0ece1] transition-colors"
                    style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                  >
                    {cs.title}
                  </h4>

                  <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl">
                    {cs.subhead}
                  </p>
                </div>

                {/* Right: Key Metric & Open Trigger */}
                <div className="flex items-center gap-6">
                  <div className="text-left lg:text-right font-mono">
                    <span className="block text-sm sm:text-base font-bold text-[#d4ff00] uppercase tracking-wider">
                      {cs.metrics[0].val} {cs.metrics[0].label}
                    </span>
                    <span className="block text-[0.7rem] text-slate-500 mt-1">
                      Click to inspect technical manifesto
                    </span>
                  </div>

                  <div className="h-12 w-12 rounded-full border border-white/20 bg-white/[0.04] text-white flex items-center justify-center group-hover:bg-[#f0ece1] group-hover:text-black transition-all">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full-Screen Architectural Drawer */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md"
            onClick={() => setActiveCase(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full max-w-2xl bg-[#090a0d] border-l border-white/[0.1] p-8 sm:p-12 overflow-y-auto text-[#f0ece1]"
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  ARCHITECTURAL BLUEPRINT // ({activeCase.num})
                </span>

                <button
                  type="button"
                  onClick={() => {
                    audio.click()
                    setActiveCase(null)
                  }}
                  className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-slate-300 hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  DISMISS [✕]
                </button>
              </div>

              {/* Title & Subhead */}
              <div className="mt-8">
                <h3
                  className="text-3xl sm:text-4xl font-black tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                >
                  {activeCase.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-slate-400">
                  {activeCase.subhead}
                </p>
              </div>

              {/* Metrics Readout */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/[0.08] py-6 font-mono">
                {activeCase.metrics.map((m, i) => (
                  <div key={i}>
                    <span className="block text-xl sm:text-2xl font-black text-white font-sans">{m.val}</span>
                    <span className="block text-[0.68rem] text-slate-500 uppercase mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* The Architectural Failure Mode */}
              <div className="mt-8 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  01 // THE FAILURE MODE
                </h4>
                <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeCase.problem}
                </p>
              </div>

              {/* The Engineering Solution */}
              <div className="mt-8 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  02 // THE CONVERGENCE SOLUTION
                </h4>
                <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>

              {/* Code Manifest Preview */}
              <div className="mt-8 space-y-2 font-mono">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  03 // PRODUCTION MANIFEST SPEC
                </h4>
                <pre className="rounded-xl border border-white/10 bg-[#050608] p-4 text-[0.72rem] text-[#d4ff00] overflow-x-auto leading-relaxed">
                  <code>{activeCase.manifest}</code>
                </pre>
              </div>

              {/* Technology Stack Tags */}
              <div className="mt-8 border-t border-white/[0.08] pt-6 font-mono text-xs">
                <span className="text-slate-500 uppercase tracking-widest block mb-3">
                  CORE TOOLING &amp; RUNTIMES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCase.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[0.68rem] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

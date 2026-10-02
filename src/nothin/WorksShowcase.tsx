import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { sound } from "./SoundEngine"
import { MechanicalArrow } from "./TactileArtifacts"

interface ProjectCase {
  id: string
  num: string
  title: string
  subtitle: string
  category: string
  impact: string
  problem: string
  solution: string
  stack: string[]
  metrics: { label: string; val: string }[]
  codeSnippet: string
}

export default function WorksShowcase() {
  const [activeProject, setActiveProject] = useState<ProjectCase | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHoveringWork, setIsHoveringWork] = useState(false)
  const worksContainerRef = useRef<HTMLDivElement>(null)

  const projects: ProjectCase[] = [
    {
      id: "work-1",
      num: "01",
      title: "HYPER-SCALE CI/CD",
      subtitle: "Multi-Stage Azure DevOps & Terraform Engine",
      category: "INFRASTRUCTURE AS CODE // AUTOMATION",
      impact: "65% Faster Release Velocity · 0 Manual Drift",
      problem:
        "Enterprise deployments suffered from snowflake environments, manual portal changes, unversioned ARM templates, and 4-hour deployment release freezes across dev, staging, and production tiers.",
      solution:
        "Engineered modular Terraform modules with remote Azure Blob state locking. Integrated multi-stage Azure DevOps YAML pipelines featuring automated terraform plan verification, SonarQube quality gates, and automated rollback triggers upon health check failure.",
      stack: ["Azure DevOps YAML", "Terraform", "Azure Blob State", "Bash", "RBAC"],
      metrics: [
        { label: "Deployment Velocity", val: "65% Faster" },
        { label: "Configuration Drift", val: "Zero" },
        { label: "Environments Automated", val: "3 Stages" },
      ],
      codeSnippet: `stage('Terraform_Apply') {
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
      id: "work-2",
      num: "02",
      title: "RESILIENT ORCHESTRATION",
      subtitle: "Azure Kubernetes Service Microservices Architecture",
      category: "CONTAINER PLATFORMS // HIGH AVAILABILITY",
      impact: "99.95% Sustained Uptime · Zero Downtime Upgrades",
      problem:
        "Monolithic legacy virtual machines experienced cascading outages under traffic spikes, with manual scaling delays and difficult rollbacks causing extended customer downtime.",
      solution:
        "Containerized 12 core backend services with Docker and orchestrated them on a multi-node Azure Kubernetes Service (AKS) cluster. Implemented Horizontal Pod Autoscalers (HPA), Azure CNI networking, ingress controllers, and rolling upgrade disruption budgets.",
      stack: ["Azure Kubernetes (AKS)", "Docker", "Helm", "Azure Container Registry", "Azure CNI"],
      metrics: [
        { label: "Service Availability", val: "99.95%" },
        { label: "Autoscale Latency", val: "<30s" },
        { label: "Microservices", val: "12 Pods" },
      ],
      codeSnippet: `apiVersion: apps/v1
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
      id: "work-3",
      num: "03",
      title: "NEURAL OBSERVABILITY",
      subtitle: "Prometheus, Grafana & Distributed Alerting Fabric",
      category: "SITE RELIABILITY // TELEMETRY",
      impact: "MTTD cut from 45m to <3m · Proactive Incident Prevention",
      problem:
        "Engineering teams lacked centralized telemetry across Azure VMs and AKS pods. Incidents were reported by customers before internal teams even detected memory leaks and CPU throttling.",
      solution:
        "Deployed Prometheus node-exporters, kube-state-metrics, and customized Grafana dashboards. Configured Alertmanager with multi-channel severity routing to PagerDuty and Slack for proactive node degradation warnings.",
      stack: ["Prometheus", "Grafana", "Alertmanager", "Azure Monitor", "Log Analytics"],
      metrics: [
        { label: "Mean Time to Detect", val: "<3 min" },
        { label: "Alert Precision", val: "99.1%" },
        { label: "Telemetry Ingestion", val: "24/7 Live" },
      ],
      codeSnippet: `- alert: PodMemoryThresholdHigh
  expr: sum(container_memory_working_set_bytes) by (pod) / sum(kube_pod_container_resource_limits{resource="memory"}) by (pod) > 0.85
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "Pod {{ $labels.pod }} memory exceeded 85%"`,
    },
    {
      id: "work-4",
      num: "04",
      title: "FLEET CONVERGENCE",
      subtitle: "Zero-Drift Ansible Configuration Across 50+ Linux Nodes",
      category: "CONFIGURATION AUTOMATION // LINUX",
      impact: "100% Patch Compliance · 10x Setup Velocity",
      problem:
        "A heterogeneous fleet of 50+ Ubuntu and RHEL cloud servers had divergent packages, outdated security patches, and unstandardized user access control.",
      solution:
        "Authored idempotent Ansible playbooks and roles for automated hardening, OpenSSH key rotation, kernel upgrades, and log forwarder provisioning. Executed nightly dry-run audit checks to detect unauthorized system alterations.",
      stack: ["Ansible", "Linux (RHEL/Ubuntu)", "Python", "Bash", "SSH Key Management"],
      metrics: [
        { label: "Nodes Managed", val: "50+ Servers" },
        { label: "Patch Compliance", val: "100%" },
        { label: "Provisioning Speed", val: "10x Faster" },
      ],
      codeSnippet: `- name: Harden Linux Enterprise Cloud Fleet
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!worksContainerRef.current) return
    const rect = worksContainerRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      id="works"
      ref={worksContainerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#08090b" }}
    >
      {/* Dynamic Floating Magnetic Cursor Follower */}
      <AnimatePresence>
        {isHoveringWork && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none absolute z-50 hidden lg:flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[0.68rem] font-bold text-black shadow-2xl"
          >
            <span>EXPLORE</span>
            <MechanicalArrow size={14} color="#000" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Kinetic Spaced-Out Letterheader: W O R K S */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-10">
          <div className="flex items-baseline gap-4 sm:gap-8 font-black tracking-widest text-white text-4xl sm:text-7xl lg:text-8xl font-sans">
            <span style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}>W</span>
            <span style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}>O</span>
            <span style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}>R</span>
            <span style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}>K</span>
            <span style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}>S</span>
          </div>

          <div className="font-mono text-xs text-slate-500 hidden sm:block">
            <span>( 04 CASE ODYSSEYS )</span>
          </div>
        </div>

        {/* Editorial Subheader */}
        <div className="mt-8 max-w-2xl">
          <h3 className="font-sans text-xl sm:text-2xl font-light text-slate-300">
            Good infrastructure runs.{" "}
            <span className="text-white font-bold italic">Great architecture disappears.</span>
          </h3>
        </div>

        {/* 4 Monumental Project Vignettes */}
        <div className="mt-16 divide-y divide-white/[0.08]">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                sound.shutter()
                setActiveProject(proj)
              }}
              onMouseEnter={() => {
                sound.tick()
                setIsHoveringWork(true)
              }}
              onMouseLeave={() => setIsHoveringWork(false)}
              className="group py-12 sm:py-16 transition-colors hover:bg-white/[0.02] cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Index & High-Impact Title */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                    <span>({proj.num})</span> · <span>{proj.category}</span>
                  </div>

                  <h4
                    className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors"
                    style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                  >
                    {proj.title}
                  </h4>

                  <p className="font-mono text-sm text-slate-400 max-w-xl">
                    {proj.subtitle}
                  </p>
                </div>

                {/* Right: Quantified Impact & Mechanical Arrow */}
                <div className="flex items-center gap-6">
                  <div className="text-left lg:text-right font-mono">
                    <span className="block text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      {proj.impact}
                    </span>
                    <span className="block text-[0.72rem] text-slate-500 mt-1">
                      Click to inspect technical manifesto
                    </span>
                  </div>

                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white group-hover:bg-white group-hover:text-black transition-all">
                    <MechanicalArrow size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Odyssey Deep-Dive Modal Drawer */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full max-w-2xl bg-[#0b0d11] border-l border-white/[0.1] p-8 sm:p-12 overflow-y-auto text-white"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  CASE ARCHITECTURE // ({activeProject.num})
                </span>

                <button
                  type="button"
                  onClick={() => {
                    sound.click()
                    setActiveProject(null)
                  }}
                  className="rounded-full border border-white/20 px-3.5 py-1 font-mono text-xs text-slate-300 hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  CLOSE [✕]
                </button>
              </div>

              <div className="mt-8">
                <h3
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                >
                  {activeProject.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Verified Metrics Strip */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/[0.08] py-6 font-mono">
                {activeProject.metrics.map((m, i) => (
                  <div key={i}>
                    <span className="block text-lg sm:text-xl font-bold text-white font-sans">{m.val}</span>
                    <span className="block text-[0.68rem] text-slate-500 uppercase mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* The Problem */}
              <div className="mt-8 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  01 // The Architectural Problem
                </h4>
                <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              {/* The Engineered Solution */}
              <div className="mt-8 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  02 // The Engineering Solution
                </h4>
                <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeProject.solution}
                </p>
              </div>

              {/* Production Manifest Code Preview */}
              <div className="mt-8 space-y-2 font-mono">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  03 // Production Manifest Spec
                </h4>
                <pre className="rounded-xl border border-white/10 bg-[#060709] p-4 text-[0.72rem] text-sky-300 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>

              {/* Tech Tooling */}
              <div className="mt-8 border-t border-white/[0.08] pt-6 font-mono text-xs">
                <span className="text-slate-500 uppercase tracking-widest block mb-3">
                  TECHNOLOGY STACK:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((t) => (
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

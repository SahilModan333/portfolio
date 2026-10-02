import { useState } from "react"
import Section from "../ui/Section"
import SpotlightCard from "../ui/SpotlightCard"
import { GitBranchIcon, CpuIcon, CloudIcon, ServerIcon, ActivityIcon, ShieldIcon, CheckIcon } from "../ui/Icons"

interface PipelineStep {
  number: string
  title: string
  subtitle: string
  description: string
  tools: string[]
  icon: typeof GitBranchIcon
}

const pipelineSteps: PipelineStep[] = [
  {
    number: "01",
    title: "Developer",
    subtitle: "Code → Commit",
    description: "Feature development with pre-commit git hooks, linting, and local test validation.",
    tools: ["VS Code", "Git Hooks", "Shell"],
    icon: GitBranchIcon,
  },
  {
    number: "02",
    title: "Git",
    subtitle: "Version Control",
    description: "Trunk-based branching strategy, peer pull-request reviews, and semantic release tagging.",
    tools: ["Git", "PR Policies", "Branch Gates"],
    icon: GitBranchIcon,
  },
  {
    number: "03",
    title: "Azure Repos",
    subtitle: "Remote Repository",
    description: "Enterprise git hosting with required reviewer approvals, branch locks, and build triggers.",
    tools: ["Azure Repos", "Branch Policies"],
    icon: CloudIcon,
  },
  {
    number: "04",
    title: "Azure DevOps",
    subtitle: "CI/CD Platform",
    description: "Automated YAML orchestration executing build, lint, and security scan pipelines.",
    tools: ["Azure DevOps", "YAML Pipelines", "Variable Groups"],
    icon: CpuIcon,
  },
  {
    number: "05",
    title: "Build",
    subtitle: "Compile · Test",
    description: "Multi-stage Docker builds creating lightweight, immutable Alpine container images with zero CVEs.",
    tools: ["Docker", "ACR", "SonarQube"],
    icon: CpuIcon,
  },
  {
    number: "06",
    title: "Terraform",
    subtitle: "Infrastructure as Code",
    description: "Automated 'terraform plan' and state synchronization with remote Azure Blob storage locks.",
    tools: ["Terraform", "HCL", "Remote State"],
    icon: CloudIcon,
  },
  {
    number: "07",
    title: "Azure Infrastructure",
    subtitle: "Cloud Resources",
    description: "Multi-environment resource groups, virtual networks, Key Vaults, and compute scale sets.",
    tools: ["Microsoft Azure", "ARM", "Key Vault"],
    icon: CloudIcon,
  },
  {
    number: "08",
    title: "Deploy",
    subtitle: "Release · Container",
    description: "Zero-downtime rolling updates on Azure Kubernetes Service (AKS) with readiness probe verification.",
    tools: ["AKS", "Kubernetes", "Helm", "HPA"],
    icon: ServerIcon,
  },
  {
    number: "09",
    title: "Monitor",
    subtitle: "Prometheus · Grafana",
    description: "Continuous SLI/SLO telemetry scraping, alert rule evaluations, and real-time operational dashboards.",
    tools: ["Prometheus", "Grafana", "Alertmanager"],
    icon: ActivityIcon,
  },
]

export default function DevOpsPipeline() {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <Section
      id="pipeline"
      label="DevOps Pipeline"
      title="From code to production infrastructure"
      intro="The end-to-end DevOps delivery workflow from developer commit through CI/CD automation, cloud infrastructure provisioning, and proactive monitoring. Hover any stage to explore."
      sunk
    >
      {/* 9-Stage Pipeline Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-9">
        {pipelineSteps.map((step, idx) => {
          const isSelected = activeStep === idx
          const Icon = step.icon

          return (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(idx)}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                isSelected
                  ? "border-sky-400 bg-sky-500/20 shadow-xl shadow-sky-500/10 scale-105"
                  : "border-white/[0.08] bg-slate-900/60 hover:border-white/20 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-400">
                  {step.number}
                </span>
                <Icon size={14} className={isSelected ? "text-sky-300" : "text-slate-400"} />
              </div>

              <h4 className="mt-3 text-xs font-bold tracking-tight text-white">
                {step.title}
              </h4>
              <p className="mt-0.5 font-mono text-[0.65rem] text-slate-400 leading-tight">
                {step.subtitle}
              </p>
            </div>
          )
        })}
      </div>

      {/* Selected Stage Detail Drawer */}
      <SpotlightCard className="mt-8 p-6 sm:p-8" spotlightColor="rgba(56, 189, 248, 0.2)">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 font-mono text-lg font-bold text-sky-400">
              {pipelineSteps[activeStep].number}
            </span>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                Pipeline Stage {pipelineSteps[activeStep].number} of 09
              </span>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {pipelineSteps[activeStep].title} — {pipelineSteps[activeStep].subtitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
            <span className="pulse-beacon bg-emerald-400" />
            <span>Automated &amp; Governed</span>
          </div>
        </div>

        <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-300">
          {pipelineSteps[activeStep].description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
            Stage Toolchain:
          </span>
          {pipelineSteps[activeStep].tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-200"
            >
              <CheckIcon size={12} className="text-sky-400" />
              {tool}
            </span>
          ))}
        </div>
      </SpotlightCard>

      {/* Core Toolchain Footer Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-slate-950/70 p-4 font-mono text-xs text-slate-400">
        <span className="text-slate-300">// core toolchain</span>
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span>Azure DevOps</span>
          <span className="text-slate-600">·</span>
          <span>Terraform</span>
          <span className="text-slate-600">·</span>
          <span>Docker</span>
          <span className="text-slate-600">·</span>
          <span>Kubernetes</span>
          <span className="text-slate-600">·</span>
          <span>Ansible</span>
          <span className="text-slate-600">·</span>
          <span>Prometheus</span>
          <span className="text-slate-600">·</span>
          <span>Grafana</span>
          <span className="text-slate-600">·</span>
          <span>Bash</span>
        </div>
      </div>
    </Section>
  )
}

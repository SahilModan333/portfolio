import { motion } from "motion/react"
import { GitBranchIcon, CpuIcon, ShieldIcon, CloudIcon, ServerIcon } from "./Icons"

interface BeamNode {
  id: string
  label: string
  sublabel: string
  icon: typeof GitBranchIcon
  status: string
}

const pipelineNodes: BeamNode[] = [
  {
    id: "repo",
    label: "Azure Repos",
    sublabel: "main branch / PR",
    icon: GitBranchIcon,
    status: "Triggered",
  },
  {
    id: "build",
    label: "Docker Multi-Stage",
    sublabel: "Alpine Build & Cache",
    icon: CpuIcon,
    status: "100% Passed",
  },
  {
    id: "security",
    label: "Security & Lint",
    sublabel: "Secret / CVE Scan",
    icon: ShieldIcon,
    status: "0 Critical",
  },
  {
    id: "iac",
    label: "Terraform Gate",
    sublabel: "Plan & Approval",
    icon: CloudIcon,
    status: "Validated",
  },
  {
    id: "aks",
    label: "AKS Production",
    sublabel: "Container Health & Uptime",
    icon: ServerIcon,
    status: "99.9% SLA",
  },
]

export default function AnimatedBeam() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/70 p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-sky-400">
            Multi-Environment CI/CD Workflow
          </span>
          <h4 className="mt-0.5 font-mono text-sm font-semibold text-slate-100">
            Automated Azure DevOps YAML Pipeline across 4 Environments (Dev, QA, UAT, Prod)
          </h4>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
          <span className="pulse-beacon bg-emerald-400" />
          <span>Active CI/CD Flow</span>
        </div>
      </div>

      {/* Nodes and Animated Connector Beams */}
      <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-5">
        {/* Animated Connecting Beam Line across nodes on wider screens */}
        <div className="pointer-events-none absolute top-7 right-8 left-8 -z-0 hidden h-0.5 bg-slate-800 sm:block">
          <motion.div
            className="h-full w-24 bg-gradient-to-r from-transparent via-sky-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {pipelineNodes.map((node, index) => {
          const Icon = node.icon
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              {/* Node Icon Circle */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-sky-400 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-sky-500/50 group-hover:bg-sky-500/15 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <Icon size={22} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[0.6rem] font-bold text-emerald-400 border border-emerald-500/40">
                  ✓
                </span>
              </div>

              {/* Node Metadata */}
              <h5 className="mt-3 font-mono text-xs font-semibold text-slate-100 group-hover:text-sky-300">
                {node.label}
              </h5>
              <p className="font-mono text-[0.7rem] text-slate-400">
                {node.sublabel}
              </p>
              <span className="mt-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-sky-400">
                {node.status}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

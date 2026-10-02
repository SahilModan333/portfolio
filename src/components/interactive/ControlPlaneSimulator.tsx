import { useState } from "react"
import confetti from "canvas-confetti"
import { PlayIcon, CheckIcon, RefreshCwIcon, ServerIcon, CloudIcon, CpuIcon, ActivityIcon, GitBranchIcon } from "../ui/Icons"

interface PipelineStage {
  id: string
  name: string
  badge: string
  detail: string
  icon: typeof GitBranchIcon
}

const stages: PipelineStage[] = [
  { id: "commit", name: "01 · Commit", badge: "git push", detail: "Branch PR gate approved", icon: GitBranchIcon },
  { id: "build", name: "02 · Build", badge: "az pipelines", detail: "YAML test & compile", icon: CpuIcon },
  { id: "image", name: "03 · Container", badge: "acr: v43", detail: "Immutable Docker packaging", icon: ServerIcon },
  { id: "apply", name: "04 · IaC Gate", badge: "terraform", detail: "Remote state plan & lock", icon: CloudIcon },
  { id: "rollout", name: "05 · Rollout", badge: "aks prod", detail: "Pod healthcheck verification", icon: ServerIcon },
  { id: "observe", name: "06 · Observe", badge: "prom · grafana", detail: "99.9% SLA baseline green", icon: ActivityIcon },
]

const initialLogs = [
  "$ az pipelines run --name release-production --branch main [last build: #142 success]",
  "$ kubectl rollout status deploy/api — 12/12 pods ready • 0 restarts [aks-prod-westeurope]",
  "$ terraform plan — Infrastructure synced with Azure remote state lock",
  "$ prometheus query — rate(http_requests_total[5m]) p95: 24ms • 0 error rate",
]

export default function ControlPlaneSimulator() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(5)
  const [isDeploying, setIsDeploying] = useState<boolean>(false)
  const [logs, setLogs] = useState<string[]>(initialLogs)
  const [activePods, setActivePods] = useState<number>(12)

  const triggerDeploy = () => {
    if (isDeploying) return
    setIsDeploying(true)
    setLogs(["$ az pipelines run --name release-production --branch main", "→ Multi-environment release initiated across Dev → QA → UAT → Production..."])
    setActiveStageIndex(0)
    setActivePods(6)

    const deploySteps = [
      {
        stage: 1,
        log: "$ docker build -t acrstiboprod.azurecr.io/api:v43 . — build complete in 16.2s",
      },
      {
        stage: 2,
        log: "$ az acr repository push — image pushed with SHA256 digest verified",
      },
      {
        stage: 3,
        log: "$ terraform apply -auto-approve — Infrastructure verified; 0 drift detected",
      },
      {
        stage: 4,
        log: "$ kubectl set image deploy/api api=acrstiboprod.azurecr.io/api:v43 — pod rollout active",
      },
      {
        stage: 5,
        log: "$ kubectl rollout status deploy/api — success • 12/12 pods healthy • 0 restarts [SLA 99.9%]",
      },
    ]

    deploySteps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStageIndex(step.stage)
        setLogs((prev) => [...prev, step.log])
        if (step.stage >= 4) {
          setActivePods(12)
        }
        if (idx === deploySteps.length - 1) {
          setIsDeploying(false)
          try {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.65 },
              colors: ["#38bdf8", "#10b981", "#818cf8"],
            })
          } catch {
            // graceful fallback
          }
        }
      }, (idx + 1) * 700)
    })
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14]/90 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
      {/* Top Header: Title & Prominent Trigger Deploy Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">
              Interactive Deployment Simulation
            </span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-xs text-slate-300">
              Stibo Systems Release Workflow
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Simulates Azure DevOps YAML pipeline execution across Dev, QA, UAT, and Production AKS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-emerald-400 sm:flex">
            <span className="pulse-beacon bg-emerald-400" />
            Live Simulator
          </span>

          {/* Prominent, high-contrast, larger Trigger Deploy button */}
          <button
            type="button"
            onClick={triggerDeploy}
            disabled={isDeploying}
            className="group relative inline-flex items-center gap-2.5 rounded-xl border border-sky-400/50 bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-600 px-5 py-2.5 font-mono text-xs sm:text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all duration-200 hover:scale-105 hover:shadow-sky-500/40 hover:text-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            title="Click to run interactive multi-stage deployment simulation"
          >
            {isDeploying ? (
              <>
                <RefreshCwIcon size={15} className="animate-spin text-slate-950" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <PlayIcon size={15} className="text-slate-950 fill-current transition-transform group-hover:translate-x-0.5" />
                <span>Trigger Deploy Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 6 Pipeline Stages Flow - Compact & Informative */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((st, idx) => {
          const isActive = activeStageIndex === idx
          const isPassed = activeStageIndex > idx
          const Icon = st.icon

          return (
            <div
              key={st.id}
              className={`relative flex flex-col justify-between rounded-xl border p-2.5 transition-all duration-300 ${
                isActive
                  ? "border-sky-400 bg-sky-500/20 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/40"
                  : isPassed
                  ? "border-emerald-500/30 bg-slate-900/80"
                  : "border-white/[0.06] bg-slate-950/60 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                  {st.name}
                </span>
                <span>
                  {isPassed ? (
                    <CheckIcon size={13} className="text-emerald-400" />
                  ) : (
                    <Icon size={13} className={isActive ? "text-sky-400 animate-pulse" : "text-slate-500"} />
                  )}
                </span>
              </div>

              <div className="mt-1.5 font-mono text-xs font-bold text-white">
                {st.badge}
              </div>

              <div className="mt-0.5 font-mono text-[0.65rem] text-slate-400 truncate">
                {st.detail}
              </div>
            </div>
          )
        })}
      </div>

      {/* Compact Dual-Pane View: Pod Status + Live Log Stream */}
      <div className="mt-3.5 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Left: AKS Pod Status Indicator */}
        <div className="rounded-xl border border-white/[0.08] bg-[#04070e] p-3 lg:col-span-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300">
              AKS Pods: <strong className="text-emerald-400">{activePods}/12 Ready</strong>
            </span>
            <span className="font-mono text-[0.68rem] text-slate-400">
              westeurope
            </span>
          </div>

          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`flex h-6 items-center justify-center rounded-md border font-mono text-[0.65rem] font-bold transition-all duration-300 ${
                  i < activePods
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-300 animate-pulse"
                }`}
                title={`Pod api-prod-${i + 1}: ${i < activePods ? "Ready" : "Deploying..."}`}
              >
                ✓
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Tail Console */}
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#03050a] p-3 font-mono text-[0.72rem] leading-snug text-slate-300 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 text-[0.68rem] text-slate-400">
            <span>deployment-event-stream · /var/log/release.log</span>
            <span className="text-emerald-400">● live</span>
          </div>
          <div className="mt-1.5 space-y-1 max-h-[72px] overflow-y-auto">
            {logs.slice(-3).map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith("$")
                    ? "text-sky-300"
                    : log.includes("success") || log.includes("healthy") || log.includes("green")
                    ? "text-emerald-400 font-medium"
                    : "text-slate-300"
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

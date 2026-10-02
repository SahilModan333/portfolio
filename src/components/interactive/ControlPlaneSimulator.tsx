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
  { id: "commit", name: "commit", badge: "a1b2c3d", detail: "git push origin main", icon: GitBranchIcon },
  { id: "build", name: "build", badge: "az pipelines", detail: "multi-stage test & compile", icon: CpuIcon },
  { id: "image", name: "image", badge: "acr: v42", detail: "immutable docker build", icon: ServerIcon },
  { id: "apply", name: "apply", badge: "terraform", detail: "remote state lock & plan", icon: CloudIcon },
  { id: "rollout", name: "rollout", badge: "aks prod", detail: "zero-downtime rolling update", icon: ServerIcon },
  { id: "observe", name: "observe", badge: "prom · grafana", detail: "SLI metrics & healthcheck", icon: ActivityIcon },
]

const initialLogs = [
  "$ kubectl rollout status deploy/api — success • 12 pods ready • 0 restarts",
  "$ terraform plan — Plan: 3 to add, 0 to change, 0 to destroy",
  "$ ansible-playbook site.yml — ok=12 changed=4 failed=0",
  "$ az webapp log tail — streaming… [status=200 ok]",
]

export default function ControlPlaneSimulator() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(5)
  const [isDeploying, setIsDeploying] = useState<boolean>(false)
  const [logs, setLogs] = useState<string[]>(initialLogs)
  const [activePods, setActivePods] = useState<number>(12)

  const triggerDeploy = () => {
    if (isDeploying) return
    setIsDeploying(true)
    setLogs(["$ az pipelines run --name release-production --branch refs/heads/main", "→ Deployment initiated..."])
    setActiveStageIndex(0)
    setActivePods(6)

    const deploySteps = [
      {
        stage: 1,
        log: "$ docker build -t acrstiboprod.azurecr.io/api:v43 . — build complete in 18.4s",
      },
      {
        stage: 2,
        log: "$ az acr repository push — image pushed with SHA256 digest verified",
      },
      {
        stage: 3,
        log: "$ terraform apply -auto-approve — Plan: 0 to add, 1 to change (tag: v43), 0 to destroy",
      },
      {
        stage: 4,
        log: "$ kubectl set image deploy/api api=acrstiboprod.azurecr.io/api:v43 — rolling update started",
      },
      {
        stage: 5,
        log: "$ kubectl rollout status deploy/api — success • 12/12 pods ready • 0 restarts [p95: 28ms]",
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
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#38bdf8", "#10b981", "#818cf8"],
          })
        }
      }, (idx + 1) * 750)
    })
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14]/90 p-5 backdrop-blur-2xl shadow-2xl sm:p-7">
      {/* Top Bar with Status Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-slate-200">
            control-plane · prod
          </span>
          <span className="text-slate-500">|</span>
          <span className="font-mono text-xs text-sky-400">
            4+ years · Stibo Systems live
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold text-emerald-400">
            <span className="pulse-beacon bg-emerald-400" />
            live deployment simulator
          </span>

          <button
            onClick={triggerDeploy}
            disabled={isDeploying}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-500/20 px-3 py-1 font-mono text-xs font-semibold text-sky-300 shadow-md shadow-sky-500/15 transition-all hover:bg-sky-500/30 active:scale-95 disabled:opacity-50"
          >
            {isDeploying ? (
              <>
                <RefreshCwIcon size={12} className="animate-spin text-sky-400" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <PlayIcon size={12} />
                <span>Trigger deploy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Flow Stages */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((st, idx) => {
          const isActive = activeStageIndex === idx
          const isPassed = activeStageIndex > idx
          const Icon = st.icon

          return (
            <div
              key={st.id}
              className={`relative flex flex-col justify-between rounded-xl border p-3 transition-all duration-300 ${
                isActive
                  ? "border-sky-400 bg-sky-500/15 shadow-lg shadow-sky-500/20"
                  : isPassed
                  ? "border-emerald-500/30 bg-slate-900/80"
                  : "border-white/[0.06] bg-slate-950/60 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-slate-400">
                  {st.name}
                </span>
                <span className="text-slate-400">
                  {isPassed ? (
                    <CheckIcon size={13} className="text-emerald-400" />
                  ) : (
                    <Icon size={13} className={isActive ? "text-sky-400" : "text-slate-500"} />
                  )}
                </span>
              </div>

              <div className="mt-2 font-mono text-xs font-bold text-slate-100">
                {st.badge}
              </div>

              <div className="mt-1 font-mono text-[0.65rem] text-slate-400 truncate">
                {st.detail}
              </div>
            </div>
          )
        })}
      </div>

      {/* Real-time Metric Indicators from User's Site */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
        <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 p-2.5 text-center">
          <span className="font-mono text-[0.65rem] uppercase text-slate-400 block">pipelines</span>
          <span className="font-mono text-base font-bold text-sky-400 sm:text-xl">20+</span>
          <span className="font-mono text-[0.65rem] text-slate-400 block">across 4 envs</span>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 p-2.5 text-center">
          <span className="font-mono text-[0.65rem] uppercase text-slate-400 block">servers</span>
          <span className="font-mono text-base font-bold text-emerald-400 sm:text-xl">50+</span>
          <span className="font-mono text-[0.65rem] text-slate-400 block">Ansible managed</span>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 p-2.5 text-center">
          <span className="font-mono text-[0.65rem] uppercase text-slate-400 block">p95 reliability</span>
          <span className="font-mono text-base font-bold text-white sm:text-xl">99.9%</span>
          <span className="font-mono text-[0.65rem] text-slate-400 block">uptime sustained</span>
        </div>
      </div>

      {/* Visual AKS Pods Grid */}
      <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#04070e] p-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-slate-300">
            // aks · pods <strong className="text-emerald-400">{activePods} running</strong>
          </span>
          <span className="font-mono text-[0.7rem] text-slate-400">
            cluster: aks-prod-westeurope
          </span>
        </div>

        {/* 12 Pod Status Checkmarks */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[0.7rem] transition-all duration-300 ${
                i < activePods
                  ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-300 animate-pulse"
              }`}
              title={`Pod api-prod-${i + 1}: ${i < activePods ? "Ready" : "Updating..."}`}
            >
              ✓
            </div>
          ))}
        </div>
      </div>

      {/* Live Log Stream Console */}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#03050a] p-3.5 font-mono text-[0.75rem] leading-relaxed text-slate-300">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[0.7rem] text-slate-400">
          <span>live logtail -f /var/log/deploy.log</span>
          <span className="text-emerald-400">● connected</span>
        </div>
        <div className="mt-2 space-y-1">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={log.startsWith("$") ? "text-sky-300" : log.includes("success") || log.includes("ok") ? "text-emerald-400" : "text-slate-300"}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[0.7rem] text-slate-400">
        → click &quot;Trigger deploy&quot; to run the pipeline visually • visual execution • mono for data
      </p>
    </div>
  )
}

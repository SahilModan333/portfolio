import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { PlayIcon, RefreshCwIcon, CheckIcon } from "../ui/Icons"

export interface SimulationStep {
  step: number
  nodeId: string
  title: string
  detail: string
  durationMs: number
}

export const pipelineSimulationSteps: SimulationStep[] = [
  {
    step: 1,
    nodeId: "git",
    title: "Version Control",
    detail: "Feature commit pushed with pre-commit git validation",
    durationMs: 1400,
  },
  {
    step: 2,
    nodeId: "azure-repos",
    title: "Remote PR Gate",
    detail: "Branch policy checks passed, required peer approval verified",
    durationMs: 1300,
  },
  {
    step: 3,
    nodeId: "azure-devops",
    title: "CI/CD Pipeline",
    detail: "Multi-stage YAML pipeline started on hosted Linux agent",
    durationMs: 1500,
  },
  {
    step: 4,
    nodeId: "docker",
    title: "Container Build",
    detail: "Multi-stage Alpine image packaged & vulnerability scanned",
    durationMs: 1400,
  },
  {
    step: 5,
    nodeId: "acr",
    title: "Container Registry",
    detail: "Tagged image pushed to Azure Container Registry with RBAC",
    durationMs: 1300,
  },
  {
    step: 6,
    nodeId: "terraform",
    title: "Infrastructure Gate",
    detail: "Terraform state synchronized with Azure Blob storage lock",
    durationMs: 1500,
  },
  {
    step: 7,
    nodeId: "aks",
    title: "Production Rollout",
    detail: "Rolling update deployed with zero downtime & health checks",
    durationMs: 1600,
  },
  {
    step: 8,
    nodeId: "prometheus",
    title: "Telemetry Scraping",
    detail: "SLI/SLO scrape active, response latency within 18ms baseline",
    durationMs: 1300,
  },
  {
    step: 9,
    nodeId: "grafana",
    title: "Observability Verified",
    detail: "Live production dashboards reporting 99.9% uptime SLA",
    durationMs: 1400,
  },
]

interface PipelineSimulationProps {
  activeNodeId: string | null
  activeStepIndex: number
  isRunning: boolean
  isCompleted: boolean
  onStart: () => void
  onReset: () => void
}

export function usePipelineSimulation() {
  const [isRunning, setIsRunning] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  const [isCompleted, setIsCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startSimulation = () => {
    if (isRunning) return
    setIsCompleted(false)
    setActiveStepIndex(0)
    setIsRunning(true)
  }

  const resetSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsRunning(false)
    setActiveStepIndex(-1)
    setIsCompleted(false)
  }

  useEffect(() => {
    if (!isRunning || activeStepIndex < 0) return

    if (activeStepIndex >= pipelineSimulationSteps.length) {
      setIsRunning(false)
      setIsCompleted(true)
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.65 },
          colors: ["#38bdf8", "#10b981", "#818cf8"],
        })
      } catch {
        // Fallback gracefully if confetti fails
      }
      return
    }

    const currentStep = pipelineSimulationSteps[activeStepIndex]
    timerRef.current = setTimeout(() => {
      setActiveStepIndex((prev) => prev + 1)
    }, currentStep.durationMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isRunning, activeStepIndex])

  const activeNodeId =
    isRunning && activeStepIndex >= 0 && activeStepIndex < pipelineSimulationSteps.length
      ? pipelineSimulationSteps[activeStepIndex].nodeId
      : null

  return {
    isRunning,
    isCompleted,
    activeStepIndex,
    activeNodeId,
    startSimulation,
    resetSimulation,
  }
}

export default function PipelineSimulationHUD({
  activeStepIndex,
  isRunning,
  isCompleted,
  onStart,
  onReset,
}: PipelineSimulationProps) {
  const currentStep =
    activeStepIndex >= 0 && activeStepIndex < pipelineSimulationSteps.length
      ? pipelineSimulationSteps[activeStepIndex]
      : null

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-slate-950/80 p-3 sm:p-4 backdrop-blur-md">
      {/* Simulation Trigger & Reset Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onStart}
          disabled={isRunning}
          className={`group inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 font-mono text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 active:scale-95 ${
            isRunning
              ? "cursor-not-allowed border border-sky-500/40 bg-sky-500/25 text-sky-200"
              : isCompleted
                ? "border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 hover:border-emerald-300 hover:shadow-emerald-500/20"
                : "border border-sky-400/50 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-200 hover:from-sky-500/30 hover:to-indigo-500/30 hover:border-sky-400 hover:text-white hover:scale-102 shadow-sky-500/10"
          }`}
        >
          {isCompleted ? (
            <>
              <CheckIcon size={15} className="text-emerald-400" />
              <span>Simulate Again</span>
            </>
          ) : isRunning ? (
            <>
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span>Pipeline In Motion...</span>
            </>
          ) : (
            <>
              <PlayIcon size={15} className="text-sky-400 fill-current" />
              <span>Run Pipeline Simulation</span>
            </>
          )}
        </button>

        {(isRunning || isCompleted) && (
          <button
            type="button"
            onClick={onReset}
            title="Reset Simulation"
            aria-label="Reset Simulation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-slate-900 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <RefreshCwIcon size={14} />
          </button>
        )}
      </div>

      {/* Real-time Status Readout */}
      <div className="flex flex-1 items-center justify-end gap-3 min-w-[280px]">
        {isRunning && currentStep ? (
          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-300">
            <span className="flex h-5 items-center rounded bg-sky-500/15 px-2 font-bold text-sky-400 border border-sky-500/30">
              STEP {currentStep.step}/9
            </span>
            <span className="text-white font-semibold">{currentStep.title}:</span>
            <span className="truncate text-slate-400">{currentStep.detail}</span>
          </div>
        ) : isCompleted ? (
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="pulse-beacon bg-emerald-400" />
            <span className="font-semibold">
              Deployment Verified · 12/12 Pods Healthy · 99.9% SLA Green
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span>Interactive Constellation: Hover any node to trace relationships</span>
          </div>
        )}
      </div>
    </div>
  )
}

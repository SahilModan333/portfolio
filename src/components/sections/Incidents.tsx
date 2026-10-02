import { useState } from "react"
import confetti from "canvas-confetti"
import { incidents, type IncidentClass } from "../../data/incidents"
import Section from "../ui/Section"
import { AlertTriangleIcon, CheckIcon, CopyIcon, ShieldIcon } from "../ui/Icons"
import SpotlightCard from "../ui/SpotlightCard"

export default function Incidents() {
  const [activeIncidentId, setActiveIncidentId] = useState<string>(incidents[0].id)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  const activeIncident = incidents.find((i) => i.id === activeIncidentId) || incidents[0]
  const currentStep = activeIncident.diagnosticSteps[activeStepIndex] || activeIncident.diagnosticSteps[0]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCmd(text)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  const handleSelectIncident = (inc: IncidentClass) => {
    setActiveIncidentId(inc.id)
    setActiveStepIndex(0)
  }

  const handleNextStep = () => {
    const next = activeStepIndex + 1
    if (next === activeIncident.diagnosticSteps.length - 1) {
      // Trigger subtle celebration when reaching final resolution step
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#38bdf8", "#34d399", "#818cf8"],
      })
    }
    setActiveStepIndex(next)
  }

  return (
    <Section
      id="incidents"
      label="Platform SRE &amp; Reliability"
      title="Incident triage &amp; post-mortem simulator"
      intro="Production platform engineering means rapid diagnosis, containment, and blameless remediation before customer SLAs are impacted. Explore the recurring failure classes and the exact CLI runbooks used to resolve them."
      sunk
    >
      {/* Incident Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-4">
        {incidents.map((inc) => {
          const isSelected = inc.id === activeIncident.id
          return (
            <button
              key={inc.id}
              onClick={() => handleSelectIncident(inc)}
              className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-left font-mono text-xs transition-all ${
                isSelected
                  ? "border border-sky-500/50 bg-sky-500/15 text-white shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30"
                  : "border border-white/[0.08] bg-slate-900/50 text-slate-400 hover:border-white/20 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  inc.severity === "crit"
                    ? "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                    : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                }`}
              />
              <span className="font-semibold">{inc.page}</span>
              <span className="hidden text-[0.7rem] text-slate-400 sm:inline">
                [{inc.surface.split("/")[0].trim()}]
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Incident Workbench */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Metadata, Alert, Blast Radius & Triage */}
        <div className="space-y-6 lg:col-span-5">
          {/* Header Card with Spotlight */}
          <SpotlightCard
            spotlightColor={activeIncident.severity === "crit" ? "rgba(244, 63, 94, 0.15)" : "rgba(245, 158, 11, 0.15)"}
            className="p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                  activeIncident.severity === "crit"
                    ? "border border-rose-500/30 bg-rose-500/10 text-rose-300"
                    : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                }`}
              >
                <AlertTriangleIcon size={13} />
                {activeIncident.severity === "crit" ? "Severity 1 · Critical" : "Severity 2 · Degraded"}
              </span>

              <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                <span>MTTD: <strong className="text-emerald-400">{activeIncident.mttd}</strong></span>
                <span>MTTR: <strong className="text-sky-400">{activeIncident.mttr}</strong></span>
              </div>
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
              {activeIncident.page}
            </h3>
            <p className="mt-1 font-mono text-xs text-slate-400">
              {activeIncident.surface}
            </p>

            {/* Fired Alert Box */}
            <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 font-mono text-xs text-rose-300">
              <div className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider text-rose-400">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Alertmanager Notification
              </div>
              <p className="mt-1 break-all">{activeIncident.triggerAlert}</p>
            </div>

            {/* Blast Radius Box */}
            <div className="mt-4 border-t border-white/[0.06] pt-3 text-xs">
              <span className="font-mono uppercase tracking-wider text-slate-400">Blast Radius:</span>
              <p className="mt-1 text-slate-300">{activeIncident.blastRadius}</p>
            </div>
          </SpotlightCard>

          {/* Triage Protocol Steps */}
          <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-5">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              Standard Operating Triage Checklist
            </h4>
            <ol className="mt-3 space-y-2 text-xs">
              {activeIncident.triage.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sky-500/10 font-mono text-[0.7rem] font-bold text-sky-400 border border-sky-500/20">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Root Cause & Prevention */}
          <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-5 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-slate-300 font-semibold uppercase tracking-wider">
              <ShieldIcon size={14} className="text-emerald-400" />
              Post-Mortem &amp; Prevention
            </div>
            <div className="mt-2 text-slate-300">
              <strong className="text-slate-100">Root Cause: </strong>
              {activeIncident.rootCause}
            </div>
            <div className="mt-2 text-slate-300">
              <strong className="text-emerald-400">Permanent Mitigation: </strong>
              {activeIncident.prevention}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic CLI Runbook Terminal */}
        <div className="space-y-4 lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-white/[0.12] bg-[#070b12] shadow-2xl">
            {/* Terminal Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-slate-950/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  ops-runbook — {activeIncident.id}
                </span>
              </div>

              {/* Step Navigation Pills */}
              <div className="flex items-center gap-1">
                {activeIncident.diagnosticSteps.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`rounded px-2.5 py-1 font-mono text-[0.7rem] transition-colors ${
                      activeStepIndex === idx
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1] hover:text-slate-200"
                    }`}
                  >
                    Step {step.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Content Body */}
            <div className="p-5 font-mono text-xs">
              <div className="mb-4 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-sky-400">
                    DIAGNOSTIC RUNBOOK #{currentStep.step}: {currentStep.name}
                  </span>
                  <span className="text-[0.7rem] text-slate-400">
                    Step {activeStepIndex + 1} of {activeIncident.diagnosticSteps.length}
                  </span>
                </div>
                <p className="mt-1 font-sans text-xs text-slate-300">
                  {currentStep.action}
                </p>
              </div>

              {/* CLI Command Line */}
              {currentStep.cliCommand && (
                <div className="relative group mb-4 rounded-lg bg-slate-950/90 p-3 border border-white/[0.08]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sky-300">
                      <span className="text-emerald-400 select-none">sahil@azure-ops:~$</span>
                      <code className="text-slate-100 font-semibold">{currentStep.cliCommand}</code>
                    </div>

                    <button
                      onClick={() => handleCopy(currentStep.cliCommand || "")}
                      className="flex-none rounded p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                      title="Copy command"
                    >
                      {copiedCmd === currentStep.cliCommand ? (
                        <CheckIcon size={14} className="text-emerald-400" />
                      ) : (
                        <CopyIcon size={14} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Command Output Window */}
              {currentStep.outputPreview && (
                <div>
                  <span className="text-[0.7rem] uppercase tracking-wider text-slate-400">
                    System Telemetry &amp; Execution Output:
                  </span>
                  <pre className="mt-1.5 overflow-x-auto rounded-lg border border-white/[0.06] bg-[#04060a] p-4 text-[0.8rem] leading-relaxed text-slate-300 select-all">
                    {currentStep.outputPreview}
                  </pre>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="rounded px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                >
                  ← Previous Step
                </button>

                <button
                  disabled={activeStepIndex === activeIncident.diagnosticSteps.length - 1}
                  onClick={handleNextStep}
                  className="rounded bg-sky-500/20 border border-sky-500/40 px-4 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next Triage Step →
                </button>
              </div>
            </div>
          </div>

          {/* Incident Outcome Banner */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckIcon size={14} />
              </span>
              <div>
                <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Remediation Resolution &amp; SLA Impact
                </h5>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {activeIncident.resolution}
                </p>
                <p className="mt-1.5 font-mono text-[0.75rem] text-emerald-400">
                  ✓ {activeIncident.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { portfolioConfig, type FeaturedProject } from "../../data/portfolio.config"
import Section from "../ui/Section"
import { GithubIcon, ArrowUpRightIcon, CodeIcon, CheckIcon, CopyIcon, CloudIcon, ServerIcon, ActivityIcon, CpuIcon } from "../ui/Icons"
import { sound } from "../../lib/sound"

const projectGlyphs: Record<string, typeof CloudIcon> = {
  "azure-devops-infra-pipeline": CloudIcon,
  "containerized-aks-deployment": CpuIcon,
  "monitoring-observability": ActivityIcon,
  "ansible-fleet-automation": ServerIcon,
}

const defaultKickers: Record<string, string> = {
  "azure-devops-infra-pipeline": "01 · INFRASTRUCTURE · TERRAFORM & AZURE",
  "containerized-aks-deployment": "02 · ORCHESTRATION · DOCKER & KUBERNETES",
  "monitoring-observability": "03 · OBSERVABILITY · PROMETHEUS & GRAFANA",
  "ansible-fleet-automation": "04 · AUTOMATION · ANSIBLE & LINUX FLEET",
}

function GarageCell({ project }: { project: FeaturedProject }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const Glyph = projectGlyphs[project.id] || CloudIcon
  const kicker = project.kicker || defaultKickers[project.id] || "00 · PRODUCTION BUILD"

  const handleCopy = (code: string) => {
    sound.playSuccess()
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? "border-sky-400/60 bg-[#090e1a]/95 ring-1 ring-sky-400/30"
          : "border-white/[0.1] bg-[#070b14]/85 hover:border-white/25 hover:bg-[#0a0f1d]"
      } p-6 sm:p-8`}
    >
      <div>
        {/* Kicker & Status Pill */}
        <div className="flex items-center justify-between text-[0.7rem] font-mono text-slate-400">
          <span className="text-sky-400 font-semibold tracking-wider uppercase">
            {kicker}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PRODUCTION
          </span>
        </div>

        {/* Title Row */}
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sky-400 group-hover:border-sky-400/40 group-hover:bg-sky-500/10 transition-colors">
            <Glyph size={18} />
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors sm:text-2xl">
            {project.title}
          </h3>
        </div>

        {/* Tagline / Subtitle */}
        <p className="mt-1 font-mono text-xs text-sky-300/80">
          {project.tagline}
        </p>

        {/* Description / Summary */}
        <p className="mt-3.5 text-sm leading-relaxed text-slate-300 sm:text-base">
          {project.summary || project.problem}
        </p>

        {/* The Measured Impact */}
        <div className="mt-5 rounded-xl border border-white/[0.06] bg-slate-950/60 p-3.5 text-xs">
          <span className="font-mono text-slate-400 uppercase tracking-wider block text-[0.68rem]">
            Measured Production Impact:
          </span>
          <p className="mt-1 font-medium text-emerald-300">
            {project.impact || project.result}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        {/* Footer Tags & Expand Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
            {project.stack.slice(0, 4).map((tool) => (
              <li
                key={tool}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-slate-300 text-[0.72rem]"
              >
                {tool}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {project.codeSnippet && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
              >
                <CodeIcon size={13} />
                <span>{isExpanded ? "Close" : "Inspect"}</span>
              </button>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
                title="GitHub Repo"
              >
                <ArrowUpRightIcon size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Expandable Architecture & Manifest Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 space-y-4 overflow-hidden border-t border-white/[0.08] pt-4"
            >
              {/* Architecture Steps Flow */}
              <div>
                <span className="font-mono text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Architecture Pipeline Flow:
                </span>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {project.architecture.map((arch, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-slate-200">
                        <strong className="text-sky-400 mr-1">{arch.step}.</strong>
                        {arch.label}
                      </span>
                      {idx < project.architecture.length - 1 && (
                        <span className="text-slate-600">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Highlights */}
              <div className="space-y-1 text-xs text-slate-300">
                {project.actions.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckIcon size={13} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Code Snippet */}
              {project.codeSnippet && (
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#04070e]">
                  <div className="flex items-center justify-between border-b border-white/[0.06] bg-slate-950 px-3.5 py-1.5 text-[0.7rem] font-mono text-slate-400">
                    <span>{project.codeSnippet.title}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(project.codeSnippet?.code || "")}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckIcon size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="max-h-60 overflow-y-auto p-3.5 font-mono text-[0.75rem] leading-relaxed text-slate-300">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function GarageGrid() {
  return (
    <Section
      id="projects"
      label="Engineered Systems"
      title="The Garage Grid: Production builds &amp; infrastructure"
      intro="Four core architectural builds: multi-stage YAML pipelines, containerized AKS platforms, unified Prometheus observability, and automated Ansible fleet management."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {portfolioConfig.projects.map((project) => (
          <GarageCell key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}


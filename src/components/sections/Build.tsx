import { useState } from "react"
import { projects, type Project } from "../../data/projects"
import Section from "../ui/Section"
import { GithubIcon, ArrowUpRightIcon, CodeIcon, CheckIcon, CopyIcon } from "../ui/Icons"
import SpotlightCard from "../ui/SpotlightCard"

function ProjectCard({ project }: { project: Project }) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SpotlightCard
      spotlightColor="rgba(56, 189, 248, 0.18)"
      className="p-6 transition-all duration-300 hover:border-sky-500/50 sm:p-8"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Header Tags & Links */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-[0.7rem] font-semibold tracking-wide uppercase text-sky-400">
              {project.stack[0]} · Production Architecture
            </span>

            <div className="flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  title="View GitHub Repository"
                >
                  <GithubIcon size={14} />
                  <span>Repo</span>
                  <ArrowUpRightIcon size={11} className="text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-sky-400/90">
            {project.subtitle}
          </p>

          {/* Summary */}
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {project.summary}
          </p>

          {/* Problem vs Solution vs Impact */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-white/[0.06] bg-slate-950/70 p-4 text-xs">
            <div>
              <span className="font-mono font-semibold uppercase tracking-wider text-rose-400">
                The Challenge:
              </span>
              <p className="mt-0.5 text-slate-400">{project.problem}</p>
            </div>
            <div className="border-t border-white/[0.06] pt-2">
              <span className="font-mono font-semibold uppercase tracking-wider text-sky-400">
                DevOps Solution:
              </span>
              <p className="mt-0.5 text-slate-300">{project.solution}</p>
            </div>
            <div className="border-t border-white/[0.06] pt-2">
              <span className="font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Measured SLA Impact:
              </span>
              <p className="mt-0.5 font-medium text-emerald-300/90">{project.impact}</p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              Key Architectural Highlights:
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon size={14} className="mt-0.5 flex-none text-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          {/* Stack Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-slate-300"
                >
                  {tool}
                </li>
              ))}
            </ul>

            {project.codeSnippet && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
              >
                <CodeIcon size={14} />
                <span>{showCode ? "Hide Manifest" : "View Code / Query"}</span>
              </button>
            )}
          </div>

          {/* Expandable Code Snippet Drawer */}
          {showCode && project.codeSnippet && (
            <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.12] bg-[#05080e] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-slate-950/90 px-4 py-2 text-xs">
                <span className="font-mono text-slate-400">
                  {project.codeSnippet.title}
                </span>
                <button
                  onClick={() => handleCopy(project.codeSnippet?.code || "")}
                  className="flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                  title="Copy snippet"
                >
                  {copied ? (
                    <>
                      <CheckIcon size={13} className="text-emerald-400" />
                      <span className="font-mono text-[0.7rem] text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={13} />
                      <span className="font-mono text-[0.7rem]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="max-h-80 overflow-y-auto p-4 font-mono text-[0.78rem] leading-relaxed text-slate-300">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default function Build() {
  if (projects.length === 0) return null

  return (
    <Section
      id="projects"
      label="Engineered Systems"
      title="Featured enterprise projects &amp; infrastructure"
      intro="Work architected to solve real operational bottlenecks: observability suites, declarative cloud storage modules, multi-stage Azure YAML pipelines, and automated configuration management."
    >
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

import { useState, useRef, useEffect, type FormEvent } from "react"
import Section from "../ui/Section"
import { profile } from "../../data/profile"
import { projects } from "../../data/projects"
import { stack } from "../../data/skills"
import { certifications } from "../../data/certifications"
import { incidents } from "../../data/incidents"

interface OutputLine {
  id: string
  type: "input" | "output" | "error" | "ascii"
  content: string
}

const welcomeBanner = `
   _____       _     _ _   __  __           _             
  / ____|     | |   (_) | |  \\/  |         | |            
 | (___   __ _| |__  _| | | \\  / | ___   __| | __ _ _ __  
  \\___ \\ / _\` | '_ \\| | | | |\\/| |/ _ \\ / _\` |/ _\` | '_ \\ 
  ____) | (_| | | | | | | | |  | | (_) | (_| | (_| | | | |
 |_____/ \\__,_|_| |_|_|_| |_|  |_|\\___/ \\__,_|\\__,_|_| |_|
==========================================================
Sahil Modan — Azure DevOps & Cloud Operations Engineer
Type 'help' to inspect available system commands.
`

const archDiagram = `
┌────────────────────────────────────────────────────────┐
│             AZURE PRODUCTION ARCHITECTURE              │
└────────────────────────────────────────────────────────┘
                       │ [Public Edge / Cloudflare]
                       ▼
            ┌─────────────────────┐
            │   Azure App Gateway │ (WAF + SSL Termination)
            └──────────┬──────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│  AKS Cluster     │       │  Managed Fleet   │
│  (Ingress-Nginx) │       │  (50+ Linux VMs) │
├──────────────────┤       ├──────────────────┤
│ • Microservices  │       │ • RHEL / Ubuntu  │
│ • HPA Autoscaler │       │ • Docker Daemon  │
│ • Secrets Store  │       │ • Ansible Drift  │
└────────┬─────────┘       └─────────┬────────┘
         │                           │
         ├───────────────────────────┤
         ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│ Cassandra Ring   │       │ Prometheus &     │
│ (Multi-Rack RF=3)│       │ Grafana Exporter │
└──────────────────┘       └──────────────────┘
`

export default function Terminal() {
  const [history, setHistory] = useState<OutputLine[]>([
    { id: "init-banner", type: "ascii", content: welcomeBanner.trim() },
    {
      id: "init-help",
      type: "output",
      content: "Type 'help' to view all commands or click the shortcut buttons below.",
    },
  ])
  const [inputVal, setInputVal] = useState("")
  const [cmdIndex, setCmdIndex] = useState<number>(-1)
  const [pastCommands, setPastCommands] = useState<string[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    if (!trimmed) return

    setPastCommands((prev) => [...prev, cmdStr])
    setCmdIndex(-1)

    const newLines: OutputLine[] = [
      { id: `${Date.now()}-input`, type: "input", content: `sahil@azure-ops:~$ ${cmdStr}` },
    ]

    const args = trimmed.split(" ")
    const cmd = args[0]

    switch (cmd) {
      case "help":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `Available commands:
  help              List all operational CLI commands
  whoami            Candidate summary, role, and current enterprise status
  skills            Detailed list of tools, categorized by operational function
  projects          Summary of featured enterprise projects
  metrics           Simulated real-time cluster telemetry & SLI metrics
  arch              Render ASCII topology diagram of the production platform
  incidents         List production incident classes & runbooks
  incident-replay   Replay specific incident triage runbook (e.g. 'incident-replay 1')
  certs             List verified Microsoft certifications
  contact           Output verified email, phone, LinkedIn, and GitHub
  resume            Direct link to download PDF resume
  clear             Clear the terminal window`,
        })
        break

      case "whoami":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `${profile.name} — ${profile.role}
Current Company: ${profile.company} (Enterprise SaaS Platform on Microsoft Azure)
Experience: 4+ years architecting and operating Azure cloud infrastructure across 4 environments (Dev, QA, UAT, Production).
Core Focus: 20+ Azure DevOps YAML pipelines, Terraform IaC, AKS orchestration, and 99.9% uptime.
Location: ${profile.location}`,
        })
        break

      case "skills":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: stack
            .map(
              (g) =>
                `[${g.category.toUpperCase()}] (${g.purpose})\n  ` +
                g.tools.map((t) => `${t.name}${t.note ? ` — ${t.note}` : ""}`).join("\n  ")
            )
            .join("\n\n"),
        })
        break

      case "projects":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: projects
            .map(
              (p, idx) =>
                `${idx + 1}. ${p.title}\n   Stack: ${p.stack.join(", ")}\n   Impact: ${p.impact}\n   Repo: ${p.repoUrl || "Internal Production"}`
            )
            .join("\n\n"),
        })
        break

      case "arch":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "ascii",
          content: archDiagram.trim(),
        })
        break

      case "metrics":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `[LIVE AZURE CLUSTER TELEMETRY — PROMETHEUS]
--------------------------------------------------
Cluster:            aks-prod-westeurope-01
Status:             READY (3/3 system, 8/8 user nodes)
Platform Uptime:    99.94% (30-day trailing)
Total Pods:         142 Running / 0 Failed / 0 CrashLoop
CPU Utilization:    41.8% of 32 Cores
Memory Allocation:  68.2 GiB of 128 GiB (53.2%)
Ingress Requests:   4,180 req/sec (p95 latency: 28ms)
Active Pipelines:   20 YAML pipelines validated
Ansible Fleet:      52/52 Nodes OK (0% drift)`,
        })
        break

      case "incidents":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: incidents
            .map(
              (i, idx) =>
                `[${idx + 1}] ${i.page} (${i.severity.toUpperCase()} / ${i.surface})\n    MTTD: ${i.mttd} | MTTR: ${i.mttr}\n    Trigger: ${i.triggerAlert}\n    Run 'incident-replay ${idx + 1}' to walk through the runbook.`
            )
            .join("\n\n"),
        })
        break

      case "incident-replay": {
        const index = parseInt(args[1] || "1", 10) - 1
        const target = incidents[index] || incidents[0]
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `>>> REPLAYING RUNBOOK: ${target.page.toUpperCase()} <<<
Trigger: ${target.triggerAlert}
Blast Radius: ${target.blastRadius}

Steps executed:
${target.diagnosticSteps
  .map(
    (s) =>
      `[STEP ${s.step}: ${s.name}]\n  Action:  ${s.action}\n  Command: ${s.cliCommand}\n  Result:  ${s.outputPreview?.split("\n")[0]}...`
  )
  .join("\n\n")}

Resolution: ${target.resolution}
Root Cause: ${target.rootCause}`,
        })
        break
      }

      case "certs":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: certifications
            .map(
              (c) =>
                `• ${c.code}: ${c.title} (${c.level})\n  Verify: ${c.credentialUrl}`
            )
            .join("\n\n"),
        })
        break

      case "contact":
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `Email:    ${profile.email}
Phone:    ${profile.phone}
LinkedIn: ${profile.linkedin}
GitHub:   ${profile.github}
Location: ${profile.location}`,
        })
        break

      case "resume":
        window.open(profile.resumePath, "_blank")
        newLines.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: `Opening résumé at ${profile.resumePath}...`,
        })
        break

      case "clear":
        setHistory([])
        setInputVal("")
        return

      default:
        newLines.push({
          id: `${Date.now()}-err`,
          type: "error",
          content: `command not found: '${cmd}'. Type 'help' to see valid operations commands.`,
        })
        break
    }

    setHistory((prev) => [...prev, ...newLines])
    setInputVal("")
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    executeCommand(inputVal)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (pastCommands.length === 0) return
      const nextIndex = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1)
      setCmdIndex(nextIndex)
      setInputVal(pastCommands[nextIndex] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (cmdIndex === -1) return
      const nextIndex = cmdIndex + 1
      if (nextIndex >= pastCommands.length) {
        setCmdIndex(-1)
        setInputVal("")
      } else {
        setCmdIndex(nextIndex)
        setInputVal(pastCommands[nextIndex])
      }
    }
  }

  return (
    <Section
      id="terminal"
      label="Interactive Shell"
      title="Operations command console"
      intro="A direct terminal emulator wired into my service record, cluster telemetry, and incident runbooks. Type commands directly or use the quick buttons below."
    >
      <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070a10] shadow-2xl">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-slate-950/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              sahil@azure-ops: ~ (zsh / k8s-context: aks-prod)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[0.7rem] text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>SESSION ESTABLISHED</span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="max-h-[460px] min-h-[320px] overflow-y-auto p-5 font-mono text-xs leading-relaxed">
          {history.map((line) => (
            <div key={line.id} className="mb-2">
              {line.type === "input" && (
                <div className="font-semibold text-emerald-400">{line.content}</div>
              )}
              {line.type === "output" && (
                <pre className="font-mono text-slate-300 whitespace-pre-wrap">{line.content}</pre>
              )}
              {line.type === "ascii" && (
                <pre className="font-mono text-sky-400 whitespace-pre overflow-x-auto text-[0.7rem] sm:text-xs">
                  {line.content}
                </pre>
              )}
              {line.type === "error" && (
                <div className="text-rose-400">{line.content}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-white/[0.08] bg-slate-950/90 px-4 py-3"
        >
          <span className="flex-none font-mono text-xs font-semibold text-emerald-400 select-none">
            sahil@azure-ops:~$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'metrics', 'projects', 'arch'..."
            className="flex-1 bg-transparent font-mono text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </form>

        {/* Suggested Shortcut Command Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] bg-slate-950/50 p-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate-400">
            Quick Commands:
          </span>
          {["help", "whoami", "metrics", "projects", "arch", "incidents", "certs", "clear"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] text-slate-300 transition-colors hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-300"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { sound } from "../../lib/sound"

interface HistoryItem {
  id: string
  command?: string
  output: string | string[]
  isPrompt?: boolean
  isSystem?: boolean
}

export default function VintageMacTerminal() {
  const [inputVal, setInputVal] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      output: [
        "Welcome to Sahil Modan's DevOps Control Console.",
        "System: Azure Cloud / Linux x86_64 / Kubernetes v1.29",
        "Type 'help' or click [Help] to list available commands.",
      ],
      isSystem: true,
    },
  ])
  const [notes, setNotes] = useState([
    { id: "note-1", side: "left", color: "yellow", text: "welcome to the cloud!", rotate: "-rotate-6", top: "15%" },
    { id: "note-2", side: "left", color: "pink", text: "[Tip] type 'help' in CLI", rotate: "rotate-3", top: "42%" },
    { id: "note-3", side: "left", color: "yellow", text: "99.9% uptime SLA sustained", rotate: "-rotate-3", top: "70%" },
    { id: "note-4", side: "right", color: "pink", text: "Triple Azure Certified ☁️", rotate: "rotate-4", top: "18%" },
    { id: "note-5", side: "right", color: "yellow", text: "yo", rotate: "-rotate-6", top: "45%" },
    { id: "note-6", side: "right", color: "yellow", text: "+ new note", rotate: "rotate-2", top: "72%", isAdd: true },
  ])

  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    sound.playClick()

    let response: string | string[] = ""

    if (trimmed === "help") {
      response = [
        "Available commands:",
        "  help       - List available CLI commands",
        "  ask        - Learn why Sahil chose DevOps & Cloud Systems",
        "  skills     - View primary technical stack & tooling",
        "  projects   - Summary of 4 production architectural builds",
        "  certs      - View Microsoft Azure verified credentials",
        "  uptime     - Check live platform SLA & infrastructure health",
        "  contact    - View email, LinkedIn, and phone",
        "  clear      - Clear terminal screen",
      ]
    } else if (trimmed.startsWith("ask")) {
      response = [
        "sahil@cloud: \"Why Cloud Platform & DevOps Engineering?\"",
        "──────────────────────────────────────────────────────────",
        "\"I believe automated infrastructure is the foundation of high-velocity software delivery.",
        "Eliminating manual drift with Terraform & Ansible, packaging immutable container workloads",
        "with AKS, and engineering proactive observability is how 99.9% uptime is sustained.\"",
      ]
    } else if (trimmed === "skills") {
      response = [
        "⚡ PRIMARY TECH STACK:",
        "  • Cloud & IaC:      Microsoft Azure, Terraform, ARM Templates, Bicep",
        "  • CI/CD & Deploy:   Azure DevOps YAML, Multi-Stage Pipelines, GitHub Actions",
        "  • Containers:       Docker, Kubernetes (AKS), Helm, Azure Container Registry",
        "  • Configuration:    Ansible, Linux (RHEL/Ubuntu), Bash, Python",
        "  • Observability:    Prometheus, Grafana, Alertmanager, Azure Monitor",
      ]
    } else if (trimmed === "projects") {
      response = [
        "🚀 PRODUCTION BUILDS:",
        "  [01] Multi-Stage Azure DevOps CI/CD & Terraform Pipeline (65% faster releases)",
        "  [02] Containerized Microservices on Azure Kubernetes Service (99.95% availability)",
        "  [03] Prometheus & Grafana Observability (MTTD cut from 45m to <3m)",
        "  [04] Ansible Fleet Automation across 50+ Linux Servers (zero drift)",
        "Scroll down to 'The Garage Grid' for code manifests.",
      ]
    } else if (trimmed === "certs") {
      response = [
        "🎖️ MICROSOFT AZURE CERTIFICATIONS:",
        "  • AZ-400: DevOps Engineer Expert (Credential af1a90324c78e6dd)",
        "  • AZ-104: Azure Administrator Associate",
        "  • AZ-900: Azure Fundamentals",
      ]
    } else if (trimmed === "uptime") {
      response = [
        "● PLATFORM HEALTH: 99.92% (Sustained)",
        "  • Total nodes active: 52 / 52",
        "  • AKS Pods ready:     12 / 12",
        "  • CI/CD Success Rate: 98.4%",
      ]
    } else if (trimmed === "contact") {
      response = [
        "📬 CONTACT SAHIL MODAN:",
        "  • Email:    sahilmodan333@gmail.com",
        "  • LinkedIn: linkedin.com/in/sahil-modan-b5a73b184",
        "  • GitHub:   github.com/SahilModan333",
        "  • Phone:    +91 83201 22323",
      ]
    } else if (trimmed === "clear") {
      setHistory([])
      setInputVal("")
      return
    } else {
      response = `Command not recognized: '${trimmed}'. Type 'help' for commands.`
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), command: cmd, output: response, isPrompt: true },
    ])
    setInputVal("")
  }

  const handleAddNote = () => {
    sound.playSwitch()
    const userNote = prompt("Add a sticky note to Sahil's monitor:", "Awesome DevOps!")
    if (userNote) {
      setNotes((prev) => [
        ...prev.filter((n) => !n.isAdd),
        {
          id: Date.now().toString(),
          side: "right",
          color: "yellow",
          text: userNote.slice(0, 32),
          rotate: "rotate-2",
          top: "60%",
        },
        {
          id: "add-note",
          side: "right",
          color: "yellow",
          text: "+ new note",
          rotate: "-rotate-1",
          top: "80%",
          isAdd: true,
        },
      ])
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl py-6 select-none">
      {/* 1. Capybara Pixel Mascot Sitting on Top of Monitor */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 drop-shadow-md">
        <svg
          viewBox="0 0 48 40"
          width="54"
          height="45"
          className="image-render-pixel"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Pixel Art Capybara */}
          {/* Ears */}
          <rect x="14" y="6" width="4" height="4" fill="#6d3916" />
          <rect x="30" y="6" width="4" height="4" fill="#6d3916" />
          {/* Head */}
          <rect x="12" y="10" width="24" height="14" fill="#a05a2c" />
          {/* Snout */}
          <rect x="10" y="14" width="28" height="10" fill="#b86b36" />
          <rect x="18" y="20" width="12" height="4" fill="#52290d" />
          {/* Eyes */}
          <rect x="14" y="12" width="3" height="3" fill="#1f1007" />
          <rect x="31" y="12" width="3" height="3" fill="#1f1007" />
          {/* Body */}
          <rect x="8" y="24" width="32" height="14" fill="#914f24" />
          {/* Little Paws */}
          <rect x="12" y="38" width="6" height="2" fill="#52290d" />
          <rect x="30" y="38" width="6" height="2" fill="#52290d" />
        </svg>
      </div>

      {/* 2. Left Post-It Sticky Notes */}
      <div className="hidden md:block absolute -left-16 top-0 bottom-0 w-28 z-20 pointer-events-auto">
        {notes
          .filter((n) => n.side === "left")
          .map((n) => (
            <motion.div
              key={n.id}
              whileHover={{ scale: 1.08, zIndex: 40 }}
              style={{ top: n.top }}
              className={`absolute w-24 p-2 shadow-lg cursor-pointer transition-transform ${n.rotate} ${
                n.color === "pink"
                  ? "bg-[#fbcfe8] text-[#831843] border border-[#f472b6]/40"
                  : "bg-[#fef08a] text-[#713f12] border border-[#facc15]/40"
              }`}
            >
              {/* Post-it pin/tape mark */}
              <div className="mx-auto h-1.5 w-6 bg-white/40 mb-1 rounded-xs" />
              <p className="font-mono text-[0.62rem] font-bold leading-tight text-center">
                {n.text}
              </p>
            </motion.div>
          ))}
      </div>

      {/* 3. Right Post-It Sticky Notes */}
      <div className="hidden md:block absolute -right-16 top-0 bottom-0 w-28 z-20 pointer-events-auto">
        {notes
          .filter((n) => n.side === "right")
          .map((n) => (
            <motion.div
              key={n.id}
              onClick={n.isAdd ? handleAddNote : undefined}
              whileHover={{ scale: 1.08, zIndex: 40 }}
              style={{ top: n.top }}
              className={`absolute w-24 p-2 shadow-lg cursor-pointer transition-transform ${n.rotate} ${
                n.color === "pink"
                  ? "bg-[#fbcfe8] text-[#831843] border border-[#f472b6]/40"
                  : "bg-[#fef08a] text-[#713f12] border border-[#facc15]/40"
              }`}
            >
              {/* Post-it pin/tape mark */}
              <div className="mx-auto h-1.5 w-6 bg-white/40 mb-1 rounded-xs" />
              <p className="font-mono text-[0.62rem] font-bold leading-tight text-center">
                {n.text}
              </p>
              {n.isAdd && (
                <span className="block text-[0.55rem] text-center opacity-75 font-mono">
                  (click to pin)
                </span>
              )}
            </motion.div>
          ))}
      </div>

      {/* 4. The Vintage Macintosh CRT Case Frame */}
      <div className="relative rounded-[2rem] border-4 border-[#3a3f4b] bg-gradient-to-b from-[#2a2e37] via-[#1e222a] to-[#15181f] p-4 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.15)] ring-1 ring-black/80">
        {/* Bezel Stickers Attached to Monitor Frame */}
        {/* GAME! Sticker */}
        <div className="absolute top-2 left-10 sm:left-16 z-30 -rotate-12 drop-shadow-md pointer-events-none">
          <div className="rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 p-[2px]">
            <div className="rounded-full bg-white px-2 py-0.5 font-black tracking-wider text-[0.62rem] text-slate-900 shadow">
              GAME!
            </div>
          </div>
        </div>

        {/* Y2K Hologram Sticker */}
        <div className="absolute top-2 right-24 sm:right-32 z-30 rotate-6 drop-shadow-md pointer-events-none">
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-2.5 py-0.5 text-[0.65rem] font-black italic tracking-widest text-white border border-white/60 shadow">
            Y2K
          </div>
        </div>

        {/* Yellow Star Sticker */}
        <div className="absolute top-3 right-10 sm:right-16 z-30 rotate-12 drop-shadow-md pointer-events-none">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#facc15" stroke="#ffffff" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>

        {/* Flower Daisy Sticker on right bezel */}
        <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-30 drop-shadow-md pointer-events-none">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="7" r="4" fill="#f472b6" stroke="#fff" strokeWidth="1" />
            <circle cx="17" cy="12" r="4" fill="#f472b6" stroke="#fff" strokeWidth="1" />
            <circle cx="12" cy="17" r="4" fill="#f472b6" stroke="#fff" strokeWidth="1" />
            <circle cx="7" cy="12" r="4" fill="#f472b6" stroke="#fff" strokeWidth="1" />
            <circle cx="12" cy="12" r="3.5" fill="#facc15" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>

        {/* Yellow Smiley Sticker on left bezel */}
        <div className="absolute top-1/3 -left-2 z-30 drop-shadow-md pointer-events-none">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="12" cy="12" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="9" cy="10" r="1.2" fill="#000" />
            <circle cx="15" cy="10" r="1.2" fill="#000" />
            <path d="M8 14.5c1.2 1.8 4.8 1.8 6 0" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 5. CRT Monitor Bevel Rim & Screen Inset */}
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#121418] bg-[#eef1f5] shadow-[inset_0_4px_12px_rgba(0,0,0,0.5),0_0_20px_rgba(0,0,0,0.4)] text-slate-900">
          {/* Subtle CRT Phosphor Scanline Texture */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-30"
            style={{
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 2px)",
            }}
          />

          {/* Classic Mac OS Menu Bar */}
          <div className="flex items-center justify-between border-b-2 border-black/80 bg-[#e4e7ec] px-3 py-1 font-mono text-[0.68rem] font-bold text-black select-none">
            <div className="flex items-center gap-3">
              {/* Classic Apple Icon */}
              <span className="text-sm leading-none font-sans"></span>
              <span className="hover:bg-black hover:text-white px-1 cursor-default">File</span>
              <span className="hover:bg-black hover:text-white px-1 cursor-default">Edit</span>
              <span className="hover:bg-black hover:text-white px-1 cursor-default">Screen</span>
              <span className="hover:bg-black hover:text-white px-1 cursor-default">Special</span>
              <span className="hover:bg-black hover:text-white px-1 cursor-default">Help</span>
            </div>
            <div className="flex items-center gap-2">
              <span>DevOps OS v1.0</span>
            </div>
          </div>

          {/* Window Header with Mac Classic Striped Texture */}
          <div className="flex items-center justify-between border-b border-black/40 bg-[#d8dce2] px-3 py-1">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs border border-black bg-white shadow-xs" />
            </div>
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-black">
              ● Garage CLI v1.0
            </div>
            <div className="flex gap-1">
              <span className="h-3 w-3 border border-black bg-white flex items-center justify-center text-[0.6rem] font-black">
                +
              </span>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="relative h-[340px] sm:h-[380px] overflow-y-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-black cursor-text"
            style={{ backgroundColor: "#f3f5f8" }}
          >
            {/* Chunky Pixel Art Header */}
            <div className="text-center pt-2 pb-1">
              <h2
                className="text-3xl sm:text-4xl font-black tracking-widest text-black"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  textShadow: "1px 1px 0px #fff, 2px 2px 0px #94a3b8",
                  letterSpacing: "0.15em",
                }}
              >
                GARAGE CLI
              </h2>
              <p className="mt-1 font-mono text-[0.72rem] tracking-wider text-slate-700">
                engineered by sahil · cloud platform &amp; sre
              </p>
            </div>

            {/* Divider rule */}
            <div className="my-3 border-b-2 border-dashed border-black/30" />

            {/* Instruction and Interactive Buttons */}
            <div className="mb-4 text-center">
              <p className="text-[0.75rem] text-slate-800">
                Type <strong className="underline underline-offset-2">"help"</strong>, or{" "}
                <strong className="underline underline-offset-2">"ask"</strong> me anything about Sahil.
              </p>

              {/* Classic Mac Bevel Buttons */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    executeCommand("help")
                  }}
                  className="rounded-xs border-2 border-black bg-[#e2e5ea] px-4 py-1 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-white transition-all cursor-pointer"
                >
                  Help
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    executeCommand("ask why devops")
                  }}
                  className="rounded-xs border-2 border-black bg-black px-4 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#64748b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-slate-900 transition-all cursor-pointer"
                >
                  Ask Sahil
                </button>
              </div>
            </div>

            {/* Terminal History Log */}
            <div className="space-y-2 mt-4 text-[0.78rem]">
              {history.map((item) => (
                <div key={item.id}>
                  {item.isPrompt && (
                    <div className="font-bold text-slate-950 flex items-center gap-1.5">
                      <span className="text-sky-700">sahil@cloud</span>
                      <span className="text-slate-500">~ %</span>
                      <span>{item.command}</span>
                    </div>
                  )}

                  {Array.isArray(item.output) ? (
                    <div className="mt-1 space-y-0.5 text-slate-800">
                      {item.output.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-1 text-slate-800">{item.output}</div>
                  )}
                </div>
              ))}

              {/* Active Command Line Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  executeCommand(inputVal)
                }}
                className="flex items-center gap-1.5 pt-1 text-slate-950"
              >
                <span className="font-bold text-sky-700">sahil@cloud</span>
                <span className="font-bold text-slate-500">~ %</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'help', 'ask', 'skills'..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[0.78rem] text-black placeholder:text-slate-400 font-bold"
                  autoCapitalize="none"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { profile } from "../../data/profile"
import { TerminalIcon, ShieldIcon, ServerIcon, CpuIcon } from "../ui/Icons"
import DevOpsWorldCanvas from "../3d/DevOpsWorldCanvas"
import MagneticButton from "../ui/MagneticButton"

interface PeekCardProps {
  type: "stibo" | "azure" | "kubernetes"
}

function PeekCard({ type }: PeekCardProps) {
  if (type === "stibo") {
    return (
      <div className="w-72 rounded-xl border border-white/20 bg-[#080d18]/95 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 text-left">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[0.7rem] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-sky-400">
            <ServerIcon size={12} />
            <span>stibo-systems.azure</span>
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live SaaS
          </span>
        </div>
        <div className="mt-2.5">
          <h4 className="font-mono text-xs font-bold text-white">Stibo Systems</h4>
          <p className="mt-0.5 font-mono text-[0.68rem] text-slate-400">
            Enterprise Master Data Management SaaS Platform
          </p>
          <div className="mt-2.5 flex items-center justify-between font-mono text-[0.65rem] text-slate-300">
            <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-sky-300 border border-sky-500/20">
              Role: Assoc Systems Eng
            </span>
            <span className="text-emerald-400">2022 — Present</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === "azure") {
    return (
      <div className="w-72 rounded-xl border border-white/20 bg-[#080d18]/95 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 text-left">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[0.7rem] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-sky-400">
            <ShieldIcon size={12} />
            <span>portal.azure.com</span>
          </span>
          <span className="rounded bg-sky-500/20 px-1 py-0.5 text-[0.62rem] text-sky-300">
            AZ-400 Expert
          </span>
        </div>
        <div className="mt-2.5">
          <h4 className="font-mono text-xs font-bold text-white">Microsoft Azure Cloud</h4>
          <p className="mt-0.5 font-mono text-[0.68rem] text-slate-400">
            20+ YAML Pipelines across Dev, QA, UAT &amp; Production
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1 font-mono text-[0.62rem]">
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">Terraform</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">ARM</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">Key Vault</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 rounded-xl border border-white/20 bg-[#080d18]/95 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[0.7rem] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-sky-400">
          <CpuIcon size={12} />
          <span>aks-prod-westeurope</span>
        </span>
        <span className="text-emerald-400">12 / 12 Pods Ready</span>
      </div>
      <div className="mt-2.5">
        <h4 className="font-mono text-xs font-bold text-white">Kubernetes (AKS) Workloads</h4>
        <p className="mt-0.5 font-mono text-[0.68rem] text-slate-400">
          Zero-downtime rolling updates with readiness health probes
        </p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-xs bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
          ))}
        </div>
      </div>
    </div>
  )
}

interface GarageHeroProps {
  onOpenTerminal?: () => void
}

export default function GarageHero({ onOpenTerminal }: GarageHeroProps) {
  const [activePeek, setActivePeek] = useState<"stibo" | "azure" | "kubernetes" | null>(null)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Word-by-word animation items
  const sentenceWords = [
    { text: "Cloud", bold: false },
    { text: "Operations", bold: false },
    { text: "→", bold: false, accent: true },
    { text: "DevOps", bold: false },
    { text: "Engineering", bold: false },
    { text: "by", bold: false },
    { text: "Sahil", bold: true, key: "name" },
    { text: "Modan.", bold: true, key: "name" },
    { text: "Based", bold: false },
    { text: "in", bold: false },
    { text: "Bengaluru,", bold: false },
    { text: "supporting", bold: false },
    { text: "enterprise", bold: false },
    { text: "multi-tenant", bold: false },
    { text: "Azure", bold: false, peek: "azure" },
    { text: "SaaS", bold: false },
    { text: "at", bold: false },
    { text: "Stibo Systems.", bold: false, peek: "stibo" },
    { text: "4+ years in:", bold: true },
    { text: "authoring", bold: false },
    { text: "20+ Azure DevOps", bold: false, peek: "azure" },
    { text: "YAML", bold: false },
    { text: "pipelines,", bold: false },
    { text: "provisioning", bold: false },
    { text: "immutable", bold: false },
    { text: "Terraform", bold: false },
    { text: "& ARM", bold: false },
    { text: "infrastructure,", bold: false },
    { text: "orchestrating", bold: false },
    { text: "Docker", bold: false },
    { text: "and", bold: false },
    { text: "Kubernetes (AKS)", bold: false, peek: "kubernetes" },
    { text: "workloads,", bold: false },
    { text: "and", bold: false },
    { text: "eliminating", bold: false },
    { text: "configuration", bold: false },
    { text: "drift", bold: false },
    { text: "with", bold: false },
    { text: "Ansible", bold: false },
    { text: "across", bold: false },
    { text: "50+ servers", bold: false },
    { text: "to sustain", bold: false },
    { text: "99.9% platform availability.", bold: true, green: true },
  ]

  return (
    <section id="about" className="relative min-h-[85vh] overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* ThreeUI 3D Cloud Topology Canvas (Behind Right Side) */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-[650px] w-full max-w-[850px] opacity-75 lg:opacity-85">
        <DevOpsWorldCanvas />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Editorial Lede (Bryan Garage style) */}
          <div className="lg:col-span-8">
            {/* Top Minimal Kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/80 px-3.5 py-1 text-xs text-sky-300 backdrop-blur-md mb-6 shadow-md shadow-sky-500/10">
              <span className="pulse-beacon bg-sky-400" />
              <span className="font-mono font-semibold uppercase tracking-wider">
                DevOps &amp; Cloud Platform Engineering
              </span>
            </div>

            {/* Word-by-word blur-to-sharp animated narrative lede */}
            <h1 className="text-2xl font-light tracking-tight text-slate-100 sm:text-4xl sm:leading-[1.4] font-sans">
              {sentenceWords.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.025,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative inline-block mr-1.5 ${
                    item.bold ? "font-bold text-white" : ""
                  } ${item.green ? "font-mono font-semibold text-emerald-400" : ""} ${
                    item.accent ? "text-sky-400 font-bold" : ""
                  }`}
                >
                  {item.peek ? (
                    <span
                      onMouseEnter={() => setActivePeek(item.peek as any)}
                      onMouseLeave={() => setActivePeek(null)}
                      className="cursor-pointer border-b border-sky-400/40 text-slate-100 transition-colors hover:border-sky-400 hover:text-sky-300"
                    >
                      {item.text}
                      {/* Floating Hover Peek Card */}
                      <AnimatePresence>
                        {activePeek === item.peek && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="pointer-events-none absolute bottom-full left-0 z-50 mb-3"
                          >
                            <PeekCard type={item.peek as any} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  ) : (
                    item.text
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Secondary Philosophy Lede */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-slate-400 sm:text-base"
            >
              I believe automated infrastructure is the foundation of high-velocity software delivery.
              Eliminating manual drift, packaging immutable containers, and engineering proactive observability is how 99.9% uptime is sustained.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#projects">
                <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-mono text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95">
                  <span>Explore Engineered Builds</span>
                  <span>→</span>
                </span>
              </MagneticButton>

              <MagneticButton href={profile.resumePath} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 font-mono text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-white/10">
                  <span>Download Résumé</span>
                  <span className="text-slate-400">↗</span>
                </span>
              </MagneticButton>

              <MagneticButton href="#contact">
                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-mono text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20">
                  <span>Hire Me / Say Hi</span>
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Status Readout (Bryan Garage style) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="rounded-2xl border border-white/[0.1] bg-slate-950/70 p-6 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-200 uppercase">
                    Platform Status
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="font-mono text-[0.7rem] text-slate-400">
                  Bengaluru (IST)
                </span>
              </div>

              {/* Real-time Clock & Uptime */}
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-slate-400 block">
                  Local Time
                </span>
                <span className="font-mono text-2xl font-bold text-white tracking-wider">
                  {currentTime || "06:58:00"}
                </span>
                <span className="font-mono text-[0.65rem] text-emerald-400 block mt-1">
                  ● 99.9% Production SLA Sustained
                </span>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 font-mono text-xs text-slate-200 transition-colors hover:border-sky-400 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <TerminalIcon size={14} className="text-sky-400" />
                    <span>Launch Terminal Shell</span>
                  </div>
                  <span className="text-slate-500">&gt;_</span>
                </button>

                <a
                  href="#contact"
                  className="flex w-full items-center justify-between rounded-xl border border-sky-500/30 bg-sky-500/10 px-3.5 py-2.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
                >
                  <div className="flex items-center gap-2">
                    {/* Paper Airplane SVG */}
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" className="text-sky-400">
                      <path d="M22.5 4.3 1.5 11.5l5.3 1.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M22.5 4.3 6.8 13l2.1 6.8 1.4-5.5 8.5 3.4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    <span>Say hi / Get in touch</span>
                  </div>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useCustomization } from "../../context/CustomizationContext"
import { TerminalIcon, ShieldIcon, ServerIcon, CpuIcon, CloudIcon, SettingsIcon } from "../ui/Icons"
import DevOpsWorldCanvas from "../3d/DevOpsWorldCanvas"
import MagneticButton from "../ui/MagneticButton"
import { sound } from "../../lib/sound"

interface PeekCardProps {
  type: string
}

function PeekCard({ type }: PeekCardProps) {
  const { config } = useCustomization()
  const data = config.hero.peekCards[type]

  if (!data) return null

  const getIcon = () => {
    switch (type) {
      case "stibo":
        return <ServerIcon size={12} />
      case "azure":
        return <ShieldIcon size={12} />
      case "kubernetes":
        return <CpuIcon size={12} />
      case "terraform":
      default:
        return <CloudIcon size={12} />
    }
  }

  return (
    <div className="w-72 rounded-xl border border-white/20 bg-[#080d18]/95 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[0.7rem] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-sky-400">
          {getIcon()}
          <span>{data.domain}</span>
        </span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {data.badge}
        </span>
      </div>
      <div className="mt-2.5">
        <h4 className="font-mono text-xs font-bold text-white">{data.title}</h4>
        <p className="mt-0.5 font-mono text-[0.68rem] text-slate-400">
          {data.description}
        </p>

        {data.tags && (
          <div className="mt-2.5 flex flex-wrap gap-1 font-mono text-[0.62rem]">
            {data.tags.map((t) => (
              <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">
                {t}
              </span>
            ))}
          </div>
        )}

        {data.podCount && (
          <div className="mt-2 flex gap-1">
            {Array.from({ length: data.podCount }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-xs bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]"
              />
            ))}
          </div>
        )}

        {(data.roleOrNote || data.datesOrStatus) && (
          <div className="mt-2.5 flex items-center justify-between font-mono text-[0.65rem] text-slate-300">
            {data.roleOrNote && (
              <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-sky-300 border border-sky-500/20">
                {data.roleOrNote}
              </span>
            )}
            {data.datesOrStatus && (
              <span className="text-emerald-400">{data.datesOrStatus}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface GarageHeroProps {
  onOpenTerminal?: () => void
}

export default function GarageHero({ onOpenTerminal }: GarageHeroProps) {
  const { config, features, setIsCustomizerOpen } = useCustomization()
  const [activePeek, setActivePeek] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: config.personal.timezone || "Asia/Kolkata",
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
  }, [config.personal.timezone])

  const nameParts = config.personal.name.split(" ")
  const firstName = nameParts[0] || "Sahil"
  const lastName = nameParts.slice(1).join(" ") || "Modan"

  return (
    <section id="about" className="relative min-h-[85vh] overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* 3D Cloud Topology Canvas (conditionally rendered via features toggle) */}
      {features.enable3D && (
        <div className="pointer-events-none absolute top-0 right-0 z-0 h-[650px] w-full max-w-[850px] opacity-75 lg:opacity-85">
          <DevOpsWorldCanvas />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Editorial Lede (Bryan Garage style) */}
          <div className="lg:col-span-8">
            {/* Top Minimal Kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/80 px-3.5 py-1 text-xs text-sky-300 backdrop-blur-md mb-6 shadow-md shadow-sky-500/10">
              <span className="pulse-beacon bg-sky-400" />
              <span className="font-mono font-semibold uppercase tracking-wider">
                {config.hero.kicker}
              </span>
            </div>

            {/* Word-by-word blur-to-sharp animated narrative lede */}
            <h1 className="text-2xl font-light tracking-tight text-slate-100 sm:text-4xl sm:leading-[1.4] font-sans">
              {config.hero.sentenceWords.map((item, idx) => {
                // If it's the personal name token, dynamically inject current configured name
                let displayWord = item.text
                if (item.key === "name") {
                  if (item.text.toLowerCase().includes("sahil")) {
                    displayWord = firstName
                  } else if (item.text.toLowerCase().includes("modan")) {
                    displayWord = lastName + "."
                  }
                }

                return (
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
                        onMouseEnter={() => {
                          sound.playClick()
                          setActivePeek(item.peek!)
                        }}
                        onMouseLeave={() => setActivePeek(null)}
                        className="cursor-pointer border-b border-sky-400/40 text-slate-100 transition-colors hover:border-sky-400 hover:text-sky-300"
                      >
                        {displayWord}
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
                              <PeekCard type={item.peek} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </span>
                    ) : (
                      displayWord
                    )}
                  </motion.span>
                )
              })}
            </h1>

            {/* Secondary Philosophy Lede */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-slate-400 sm:text-base"
            >
              {config.hero.philosophyQuote}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#projects">
                <span
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-mono text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95"
                >
                  <span>Explore Engineered Builds</span>
                  <span>→</span>
                </span>
              </MagneticButton>

              <MagneticButton href={config.personal.resumePath} target="_blank" rel="noopener noreferrer">
                <span
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 font-mono text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-white/10"
                >
                  <span>Download Résumé</span>
                  <span className="text-slate-400">↗</span>
                </span>
              </MagneticButton>

              <MagneticButton href="#contact">
                <span
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-mono text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
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
                  {config.personal.location.split(",")[0]} (IST)
                </span>
              </div>

              {/* Real-time Clock & Uptime */}
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-slate-400 block">
                  Local Time
                </span>
                <span className="font-mono text-2xl font-bold text-white tracking-wider">
                  {currentTime || "07:00:00"}
                </span>
                <span className="font-mono text-[0.65rem] text-emerald-400 block mt-1">
                  ● {config.personal.statusBeacon || "99.9% Production SLA Sustained"}
                </span>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                {config.stats.slice(0, 2).map((st) => (
                  <div key={st.label} className="rounded-lg bg-white/[0.03] p-2.5">
                    <span className="font-mono text-[0.65rem] text-slate-400 block">
                      {st.label}
                    </span>
                    <span className="font-mono text-base font-bold text-white">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Controls */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                {/* Customize Button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick()
                    setIsCustomizerOpen(true)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-sky-400/30 bg-sky-500/10 px-3.5 py-2.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
                >
                  <div className="flex items-center gap-2">
                    <SettingsIcon size={14} className="text-sky-400" />
                    <span>Customize Portfolio</span>
                  </div>
                  <span className="text-[0.65rem] rounded bg-sky-400/20 px-1 py-0.5">EDIT</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick()
                    if (onOpenTerminal) onOpenTerminal()
                  }}
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
                  onClick={() => sound.playClick()}
                  className="flex w-full items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 font-mono text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" className="text-emerald-400">
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

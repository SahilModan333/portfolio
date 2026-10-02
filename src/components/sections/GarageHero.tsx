import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { portfolioConfig } from "../../data/portfolio.config"
import { ShieldIcon, ServerIcon, CpuIcon, CloudIcon, TerminalIcon } from "../ui/Icons"
import MagneticButton from "../ui/MagneticButton"
import VintageMacTerminal from "../interactive/VintageMacTerminal"
import { sound } from "../../lib/sound"

interface PeekCardProps {
  type: string
}

function PeekCard({ type }: PeekCardProps) {
  const data = portfolioConfig.hero.peekCards[type]
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
  onOpenCommandPalette?: () => void
}

export default function GarageHero({ onOpenTerminal, onOpenCommandPalette }: GarageHeroProps) {
  const [activePeek, setActivePeek] = useState<string | null>(null)
  const p = portfolioConfig.personal
  const hero = portfolioConfig.hero

  return (
    <section id="about" className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background Top: Dark Scanline Header (#121316 with 2px scanline texture) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[580px] z-0"
        style={{
          backgroundColor: "#111317",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Background Bottom: Crisp Modern Silver/Platinum (#eaecf0 transitioning down) */}
      <div className="pointer-events-none absolute top-[580px] left-0 right-0 bottom-0 z-0 bg-[#070b14]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Top Control Bar: Cursive Signature Monogram & Quick Controls */}
        <div className="flex items-center justify-between pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/90 px-3.5 py-1 text-xs text-sky-300 backdrop-blur-md shadow-md shadow-sky-500/10">
            <span className="pulse-beacon bg-sky-400" />
            <span className="font-mono font-semibold uppercase tracking-wider">
              {hero.kicker}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cursive Monogram "SM" (Bryan Garage style signature "BO") */}
            <div
              className="text-white text-3xl sm:text-4xl italic font-serif tracking-tighter select-none opacity-90 hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "Georgia, 'Times New Roman', 'Playfair Display', serif",
                textShadow: "0 0 12px rgba(255,255,255,0.4)",
              }}
            >
              SM
            </div>
          </div>
        </div>

        {/* Editorial Narrative with Word-by-Word Blur Reveal */}
        <div className="max-w-4xl">
          <h1 className="text-2xl font-light tracking-tight text-slate-100 sm:text-4xl sm:leading-[1.4] font-sans">
            {hero.sentenceWords.map((item, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
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
                          <PeekCard type={item.peek} />
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

          {/* Secondary Philosophy Note */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            {hero.philosophyQuote}
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects">
              <span
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95"
              >
                <span>Explore Engineered Builds</span>
                <span>→</span>
              </span>
            </MagneticButton>

            <MagneticButton href={p.resumePath} target="_blank" rel="noopener noreferrer">
              <span
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 font-mono text-xs font-medium text-slate-200 backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-white/10"
              >
                <span>Download Résumé</span>
                <span className="text-slate-400">↗</span>
              </span>
            </MagneticButton>

            <MagneticButton href="#contact">
              <span
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 font-mono text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
              >
                {/* Paper Airplane SVG */}
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" className="text-emerald-400">
                  <path d="M22.5 4.3 1.5 11.5l5.3 1.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M22.5 4.3 6.8 13l2.1 6.8 1.4-5.5 8.5 3.4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                <span>Say hi</span>
                <span>→</span>
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Centerpiece: The Vintage Macintosh CRT Terminal Monitor with Post-Its & Stickers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16"
        >
          <VintageMacTerminal />
        </motion.div>
      </div>
    </section>
  )
}

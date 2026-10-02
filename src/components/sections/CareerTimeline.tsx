import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useCustomization } from "../../context/CustomizationContext"
import { timelineYears, type TimelineEntry } from "../../data/timeline"
import { ArrowUpRightIcon, CheckIcon, ShieldIcon, ServerIcon } from "../ui/Icons"
import SpotlightCard from "../ui/SpotlightCard"
import { sound } from "../../lib/sound"

export default function CareerTimeline() {
  const { config } = useCustomization()
  const entries = config.timeline as TimelineEntry[]
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(entries[0] || null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Calculate year position percentage across 2016 to 2027
  const minYear = 2016
  const maxYear = 2027
  const totalSpan = maxYear - minYear

  const getLeftPercent = (year: number) => {
    return ((year - minYear) / totalSpan) * 100
  }

  const getWidthPercent = (fromYear: number, toYear: number | "Present") => {
    const to = toYear === "Present" ? 2026.75 : toYear
    return ((to - fromYear) / totalSpan) * 100
  }

  return (
    <section id="timeline" className="relative border-t border-white/[0.08] py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs text-sky-300">
              <span className="pulse-beacon bg-sky-400" />
              <span className="font-mono font-semibold uppercase tracking-wider">
                Engineering Timeline Track
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Career, platform milestones &amp; education
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Scroll horizontally through the timeline track. Click or hover any era to inspect responsibilities &amp; architecture.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>2016 — 2026+ Present</span>
          </div>
        </div>

        {/* Timeline Ruler Container */}
        <div className="mt-8 rounded-2xl border border-white/[0.1] bg-[#070b14]/90 p-5 backdrop-blur-xl shadow-2xl">
          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10"
          >
            <div className="min-w-[850px] relative pt-8 pb-4">
              {/* Year Axis Numbers & Tick Marks */}
              <div className="relative h-8 border-b border-white/15">
                {timelineYears.map((year) => {
                  const left = getLeftPercent(year)
                  return (
                    <div
                      key={year}
                      className="absolute -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${left}%` }}
                    >
                      <span className="font-mono text-xs font-semibold text-slate-400">
                        {year}
                      </span>
                      <span className="mt-1 h-2 w-px bg-white/20" />
                    </div>
                  )
                })}
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 top-16 pointer-events-none opacity-20">
                {timelineYears.map((year) => (
                  <div
                    key={year}
                    className="absolute top-0 bottom-0 w-px bg-white/30"
                    style={{ left: `${getLeftPercent(year)}%` }}
                  />
                ))}
              </div>

              {/* Career Bars */}
              <div className="relative mt-8 space-y-4 pt-2">
                {entries.map((entry) => {
                  const left = getLeftPercent(entry.fromYear)
                  const width = getWidthPercent(entry.fromYear, entry.toYear)
                  const isSelected = activeEntry?.id === entry.id

                  return (
                    <div key={entry.id} className="relative h-14">
                      <motion.button
                        onClick={() => {
                          sound.playClick()
                          setActiveEntry(entry)
                        }}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className={`absolute top-0 flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all shadow-lg ${
                          isSelected
                            ? "border-sky-400 bg-sky-500/25 shadow-sky-500/20 ring-1 ring-sky-400/50 text-white"
                            : "border-white/15 bg-slate-900/80 hover:border-white/30 text-slate-300 hover:text-white"
                        }`}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          minWidth: "220px",
                        }}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-sky-400 font-mono text-xs font-bold">
                            {entry.logo === "stibo" ? (
                              <ServerIcon size={14} />
                            ) : entry.logo === "azure" ? (
                              <ShieldIcon size={14} />
                            ) : (
                              "GU"
                            )}
                          </span>

                          <div className="truncate">
                            <span className="block font-mono text-xs font-bold truncate">
                              {entry.title}
                            </span>
                            <span className="block font-mono text-[0.65rem] text-slate-400 truncate">
                              {entry.organization}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-300">
                            {entry.fromYear}–{entry.toYear}
                          </span>
                          {entry.toYear === "Present" && (
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          )}
                        </div>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-2 text-center font-mono text-[0.7rem] text-slate-500">
            ← Drag or scroll track horizontally • Click any milestone to reveal details below →
          </div>
        </div>

        {/* Selected Milestone Inspection Drawer */}
        <AnimatePresence mode="wait">
          {activeEntry && (
            <motion.div
              key={activeEntry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.2)"
                className="rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/90 to-[#070b14] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold uppercase text-sky-400">
                        {activeEntry.subtitle}
                      </span>
                      {activeEntry.badge && (
                        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-sky-300">
                          {activeEntry.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      {activeEntry.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">
                      {activeEntry.organization} · {activeEntry.fromYear} — {activeEntry.toYear}
                    </p>
                  </div>

                  {activeEntry.link && (
                    <a
                      href={activeEntry.link}
                      target={activeEntry.link.startsWith("http") ? "_blank" : undefined}
                      rel={activeEntry.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.05] px-3.5 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:border-sky-400 hover:text-white"
                    >
                      <span>Explore Milestone</span>
                      <ArrowUpRightIcon size={12} className="text-sky-400" />
                    </a>
                  )}
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                  {activeEntry.details}
                </p>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

import { motion } from "motion/react"
import { DevOpsTechnology } from "../../data/devopsTechnologies"
import { technologyLogosMap } from "./TechnologyLogos"

interface TechnologyTooltipProps {
  technology: DevOpsTechnology
  position: { x: number; y: number }
  containerWidth: number
  containerHeight: number
}

const groupColors: Record<string, { badge: string; text: string; border: string }> = {
  cloud: { badge: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/30" },
  cicd: { badge: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  iac: { badge: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  containers: { badge: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  runtime: { badge: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  observability: { badge: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  config: { badge: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30" },
}

export default function TechnologyTooltip({
  technology,
  position,
  containerWidth,
  containerHeight,
}: TechnologyTooltipProps) {
  const Icon = technologyLogosMap[technology.id]
  const colors = groupColors[technology.group] || groupColors.cloud

  // Compute adaptive offset so tooltip doesn't get clipped near edges
  const isNearRight = position.x > containerWidth * 0.7
  const isNearBottom = position.y > containerHeight * 0.75
  const isNearTop = position.y < containerHeight * 0.2

  const left = isNearRight ? position.x - 240 : position.x + 24
  const top = isNearBottom
    ? position.y - 140
    : isNearTop
      ? position.y + 24
      : position.y - 45

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{ left: `${left}px`, top: `${top}px` }}
      className="pointer-events-none absolute z-50 w-64 rounded-xl border border-white/15 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900 p-1.5 shadow-inner">
            {Icon && <Icon size={20} />}
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold tracking-tight text-white">
              {technology.name}
            </h4>
            <span
              className={`inline-block font-mono text-[0.65rem] font-semibold uppercase tracking-wider ${colors.text}`}
            >
              {technology.category}
            </span>
          </div>
        </div>

        <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
      </div>

      <p className="mt-2.5 text-[0.72rem] leading-relaxed text-slate-300">
        {technology.description}
      </p>

      <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.08] pt-2 font-mono text-[0.65rem] text-slate-400">
        <span className="truncate">{technology.status}</span>
        <span className="text-sky-400">View →</span>
      </div>
    </motion.div>
  )
}

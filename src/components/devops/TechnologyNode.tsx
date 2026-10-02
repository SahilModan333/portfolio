import { useMemo } from "react"
import { motion } from "motion/react"
import { DevOpsTechnology } from "../../data/devopsTechnologies"
import { technologyLogosMap } from "./TechnologyLogos"

export type SimulationNodeState = "idle" | "queued" | "running" | "success"

interface TechnologyNodeProps {
  technology: DevOpsTechnology
  index: number
  isHovered: boolean
  isNeighbor: boolean
  isDimmed: boolean
  simState: SimulationNodeState
  prefersReducedMotion: boolean
  onMouseEnter: (e: React.MouseEvent) => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
  onClick: () => void
}

export default function TechnologyNode({
  technology,
  index,
  isHovered,
  isNeighbor,
  isDimmed,
  simState,
  prefersReducedMotion,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: TechnologyNodeProps) {
  const Icon = technologyLogosMap[technology.id]

  // Deterministic floating drift parameters based on index
  const floatDuration = useMemo(() => 4.5 + ((index * 0.47) % 2.5), [index])
  const floatDelay = useMemo(() => (index * 0.3) % 2, [index])
  const driftY = useMemo(() => 3 + (index % 3), [index])

  // Size hierarchy
  const isPrimary = technology.primary
  const nodeSize = isPrimary ? 54 : 44
  const iconSize = isPrimary ? 26 : 21

  // Color styles based on group
  const groupBorder = useMemo(() => {
    switch (technology.group) {
      case "cicd":
        return "border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
      case "iac":
        return "border-purple-500/30 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
      case "runtime":
        return "border-emerald-500/30 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
      case "observability":
        return "border-amber-500/30 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
      case "config":
        return "border-blue-500/30 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
      case "cloud":
      default:
        return "border-sky-500/30 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]"
    }
  }, [technology.group])

  // Simulation state styling overrides
  const simulationRing = useMemo(() => {
    switch (simState) {
      case "running":
        return "ring-2 ring-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.8)] scale-110 animate-pulse"
      case "success":
        return "ring-2 ring-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.5)] border-emerald-400"
      case "queued":
        return "opacity-50"
      case "idle":
      default:
        return ""
    }
  }, [simState])

  return (
    <div
      style={{
        left: `${technology.position.x}px`,
        top: `${technology.position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute z-20"
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -driftY, 0, driftY, 0],
                x: [0, (index % 2 === 0 ? 1 : -1) * 2, 0, (index % 2 === 0 ? -1 : 1) * 2, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              }
        }
      >
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={`${technology.name} - ${technology.category}`}
          style={{ width: `${nodeSize}px`, height: `${nodeSize}px` }}
          className={`group relative flex items-center justify-center rounded-2xl border bg-slate-950/90 shadow-xl backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${groupBorder} ${
            isHovered
              ? "scale-115 z-30 border-white/60 bg-slate-900 shadow-2xl"
              : isNeighbor
                ? "scale-105 border-white/40 bg-slate-900/90"
                : isDimmed
                  ? "opacity-35 scale-95"
                  : "opacity-100"
          } ${simulationRing}`}
        >
          {/* Real SVG Logo */}
          <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {Icon && <Icon size={iconSize} />}
          </div>

          {/* Tiny Operational Status Dot / Beacon */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center">
            {simState === "success" ? (
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[0.55rem] font-bold text-slate-950 shadow">
                ✓
              </span>
            ) : simState === "running" ? (
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
            ) : (
              <>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </>
            )}
          </span>

          {/* Always-visible compact label beneath primary nodes */}
          <div className="pointer-events-none absolute -bottom-5.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span
              className={`font-mono text-[0.62rem] font-medium tracking-tight transition-colors duration-200 ${
                isHovered
                  ? "text-sky-300 font-bold"
                  : isPrimary
                    ? "text-slate-200"
                    : "text-slate-400"
              }`}
            >
              {technology.shortName || technology.name}
            </span>
          </div>
        </button>
      </motion.div>
    </div>
  )
}

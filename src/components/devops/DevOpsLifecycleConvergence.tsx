import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  lifecycleStages,
  curatedLifecycleTech,
  INFINITY_TRACK_PATH,
  LifecycleStage,
  LifecycleTech,
} from "../../data/devopsLifecycleData"
import { technologyLogosMap } from "./TechnologyLogos"
import { RefreshCwIcon, CheckIcon, ArrowUpRightIcon } from "../ui/Icons"

type Phase = "floating" | "converging" | "converged"

export default function DevOpsLifecycleConvergence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>("converged") // Default to converged or trigger on scroll
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false)
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null)
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null)
  const [selectedEntity, setSelectedEntity] = useState<{
    type: "tech" | "stage"
    id: string
  }>({ type: "stage", id: "deploy" })
  const [viewMode, setViewMode] = useState<"loop" | "flow">("loop")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    if (mq.matches) {
      setPhase("converged")
      setHasAnimatedOnce(true)
    }

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Scroll observer to trigger convergence when scrolled into view
  useEffect(() => {
    if (prefersReducedMotion || hasAnimatedOnce) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimatedOnce) {
          setHasAnimatedOnce(true)
          // Run the 3-phase visual story:
          // 1. Floating for 1.6s
          setPhase("floating")
          setTimeout(() => {
            // 2. Converging for 2.6s
            setPhase("converging")
            setTimeout(() => {
              // 3. Converged & settled
              setPhase("converged")
            }, 2600)
          }, 1600)
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimatedOnce, prefersReducedMotion])

  // Manual replay function for user testing
  const handleReplay = () => {
    setPhase("floating")
    setTimeout(() => {
      setPhase("converging")
      setTimeout(() => {
        setPhase("converged")
      }, 2600)
    }, 1600)
  }

  // Active highlighted stage based on either hovered tech or hovered stage
  const activeStageId = useMemo(() => {
    if (hoveredStageId) return hoveredStageId
    if (hoveredTechId) {
      const tech = curatedLifecycleTech.find((t) => t.id === hoveredTechId)
      return tech?.stageId || null
    }
    return null
  }, [hoveredStageId, hoveredTechId])

  // Get currently selected stage data
  const currentStage = useMemo(() => {
    const stageId =
      activeStageId ||
      (selectedEntity.type === "stage"
        ? selectedEntity.id
        : curatedLifecycleTech.find((t) => t.id === selectedEntity.id)?.stageId || "deploy")
    return lifecycleStages.find((s) => s.id === stageId) || lifecycleStages[5]
  }, [activeStageId, selectedEntity])

  // Get technologies associated with the active stage
  const stageTechnologies = useMemo(() => {
    return curatedLifecycleTech.filter((t) => t.stageId === currentStage.id)
  }, [currentStage])

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-6xl">
      {/* ─── SECTION HEADER & STORY STATUS ─── */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              DevOps Continuous Lifecycle · Infinity Architecture
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Technologies Becoming DevOps
          </h2>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
            Independent cloud and automation tools converging into one seamless, continuous loop of delivery, operations, and feedback.
          </p>
        </div>

        {/* Story Phase Status & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Phase Badge */}
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 font-mono text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                phase === "floating"
                  ? "bg-amber-400 animate-pulse"
                  : phase === "converging"
                    ? "bg-sky-400 animate-ping"
                    : "bg-emerald-400"
              }`}
            />
            <span className="text-slate-300">
              {phase === "floating"
                ? "Phase 1: Floating Tools"
                : phase === "converging"
                  ? "Phase 2: Convergence"
                  : "Phase 3: Continuous Flow"}
            </span>
          </div>

          {/* Replay Transformation Button */}
          <button
            type="button"
            onClick={handleReplay}
            title="Replay Convergence Story"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/90 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-300"
          >
            <RefreshCwIcon size={12} className={phase === "converging" ? "animate-spin" : ""} />
            <span>Replay Story</span>
          </button>

          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/80 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("loop")}
              className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors ${
                viewMode === "loop"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ◈ Infinity Loop
            </button>
            <button
              type="button"
              onClick={() => setViewMode("flow")}
              className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors ${
                viewMode === "flow"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ☷ Stage Flow
            </button>
          </div>
        </div>
      </div>

      {/* ─── VIEW 1: THE CONTINUOUS INFINITY LOOP (Desktop & Tablet) ─── */}
      {viewMode === "loop" ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070a10] p-2 shadow-2xl backdrop-blur-xl sm:p-5">
          {/* Subtle Ambient Background Mesh */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 28% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 50%), radial-gradient(circle at 72% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)",
            }}
          />

          {/* Master 1000x500 Responsive Canvas */}
          <div
            className="relative mx-auto w-full aspect-[1000/500] max-h-[560px] select-none"
            style={{ minHeight: "380px" }}
          >
            {/* SVG Track, Flow Beacons & Connection Trails */}
            <svg
              viewBox="0 0 1000 500"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                {/* Continuous Infinity Gradient */}
                <linearGradient id="infinity-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.85" />
                  <stop offset="65%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="85%" stopColor="#10b981" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>

                {/* Soft Halo Filter */}
                <filter id="loop-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Watermark Section Labels inside the two lobes */}
              <text
                x="280"
                y="262"
                textAnchor="middle"
                className="fill-white/[0.04] font-mono text-5xl font-black tracking-widest uppercase select-none"
              >
                DEV
              </text>
              <text
                x="720"
                y="262"
                textAnchor="middle"
                className="fill-white/[0.04] font-mono text-5xl font-black tracking-widest uppercase select-none"
              >
                OPS
              </text>

              {/* Background Guide Trace */}
              <path
                d={INFINITY_TRACK_PATH}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Glowing Infinity Loop Base */}
              <path
                d={INFINITY_TRACK_PATH}
                fill="none"
                stroke="url(#infinity-glow-gradient)"
                strokeWidth={phase === "floating" ? "1.5" : "3.5"}
                strokeOpacity={phase === "floating" ? 0.25 : 0.85}
                filter="url(#loop-blur)"
                className="transition-all duration-1000"
              />

              {/* Crisp Inner Infinity Track Core */}
              <path
                d={INFINITY_TRACK_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity={phase === "floating" ? 0.2 : 0.7}
                strokeDasharray={phase === "floating" ? "4 6" : undefined}
                className="transition-all duration-1000"
              />

              {/* Flow Direction Indicator Arrows */}
              {phase !== "floating" && (
                <>
                  {/* Dev Loop Directional Pulse (Top: left to right toward center) */}
                  <path
                    d="M 410 170 L 420 160 L 410 150"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={0.7}
                  />
                  {/* Ops Loop Directional Pulse (Bottom: right to left toward feedback) */}
                  <path
                    d="M 590 330 L 580 340 L 590 350"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={0.7}
                  />
                </>
              )}

              {/* Continuous Traveling Photon Packets (Phase 3 Settled State) */}
              {!prefersReducedMotion && phase !== "floating" && (
                <g>
                  {/* Packet 1 (Primary Cyan Beam) */}
                  <circle r="4.5" fill="#38bdf8" filter="url(#packet-glow)">
                    <animateMotion
                      path={INFINITY_TRACK_PATH}
                      dur="9s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                  <circle r="2" fill="#ffffff">
                    <animateMotion
                      path={INFINITY_TRACK_PATH}
                      dur="9s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>

                  {/* Packet 2 (Secondary Emerald Beam offset by 4.5s) */}
                  <circle r="4.5" fill="#10b981" filter="url(#packet-glow)">
                    <animateMotion
                      path={INFINITY_TRACK_PATH}
                      dur="9s"
                      begin="-4.5s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                  <circle r="2" fill="#ffffff">
                    <animateMotion
                      path={INFINITY_TRACK_PATH}
                      dur="9s"
                      begin="-4.5s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                </g>
              )}
            </svg>

            {/* ─── 8 LIFECYCLE STAGE STATIONS ─── */}
            {lifecycleStages.map((stage) => {
              const isStageActive = activeStageId === stage.id
              const isDimmed = Boolean(activeStageId) && activeStageId !== stage.id

              return (
                <div
                  key={stage.id}
                  style={{
                    left: `${stage.position.x}px`,
                    top: `${stage.position.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-20"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedEntity({ type: "stage", id: stage.id })}
                    onMouseEnter={() => setHoveredStageId(stage.id)}
                    onMouseLeave={() => setHoveredStageId(null)}
                    aria-label={`DevOps Stage: ${stage.name} - ${stage.tagline}`}
                    className={`group relative flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isStageActive
                        ? "border-sky-400 bg-sky-500/30 text-white shadow-[0_0_22px_rgba(56,189,248,0.6)] scale-110 z-30"
                        : isDimmed
                          ? "border-white/10 bg-slate-950/70 text-slate-500 opacity-40 scale-95"
                          : "border-white/15 bg-slate-950/90 text-slate-200 hover:border-white/40 hover:bg-slate-900"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span>{stage.name}</span>
                  </button>
                </div>
              )
            })}

            {/* ─── CENTER INTERSECTION: DEVOPS EMBLEM ─── */}
            <div
              style={{
                left: "500px",
                top: "250px",
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-30 pointer-events-none"
            >
              <div
                className={`flex flex-col items-center justify-center rounded-2xl border bg-slate-950/95 px-5 py-3 shadow-2xl backdrop-blur-md transition-all duration-700 ${
                  phase === "floating"
                    ? "opacity-30 scale-90 border-white/10"
                    : "opacity-100 scale-100 border-sky-500/40 shadow-[0_0_35px_rgba(56,189,248,0.3)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-mono text-sm font-black tracking-widest uppercase text-white">
                    DEVOPS
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="font-mono text-[0.62rem] tracking-wider uppercase text-sky-400/90 font-medium">
                  Continuous Loop
                </span>
              </div>
            </div>

            {/* ─── 12 CURATED TECHNOLOGY NODES (Floating → Converging) ─── */}
            {curatedLifecycleTech.map((tech, idx) => {
              const Icon = technologyLogosMap[tech.id]
              const isHovered = hoveredTechId === tech.id
              const isStageHighlighted = activeStageId === tech.stageId
              const isDimmed =
                Boolean(activeStageId) && activeStageId !== tech.stageId && !isHovered

              // Determine current target position based on phase
              const currentPos = phase === "floating" ? tech.initialPos : tech.convergedPos

              // Floating sine drift in idle
              const driftY = phase === "floating" ? (idx % 2 === 0 ? 5 : -5) : (idx % 2 === 0 ? 2 : -2)
              const duration = 3.5 + (idx % 3) * 0.6

              return (
                <motion.div
                  key={tech.id}
                  initial={false}
                  animate={{
                    left: `${currentPos.x}px`,
                    top: `${currentPos.y}px`,
                    y: prefersReducedMotion ? 0 : [0, driftY, 0, -driftY, 0],
                  }}
                  transition={{
                    left: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
                    top: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
                    y: prefersReducedMotion
                      ? { duration: 0 }
                      : { duration, repeat: Infinity, ease: "easeInOut", delay: (idx * 0.2) % 1.5 },
                  }}
                  style={{ transform: "translate(-50%, -50%)" }}
                  className="absolute z-20"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedEntity({ type: "tech", id: tech.id })}
                    onMouseEnter={() => setHoveredTechId(tech.id)}
                    onMouseLeave={() => setHoveredTechId(null)}
                    aria-label={`${tech.name} - Part of ${tech.stageId.toUpperCase()} stage`}
                    className={`group relative flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-2xl border bg-slate-950/90 p-2.5 shadow-xl backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isHovered || isStageHighlighted
                        ? "scale-115 border-sky-400 bg-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.45)] z-30"
                        : isDimmed
                          ? "border-white/5 opacity-35 scale-95"
                          : "border-white/10 hover:border-white/30 hover:bg-slate-900/90"
                    }`}
                  >
                    <div className="flex items-center justify-center transition-transform group-hover:scale-110">
                      {Icon && <Icon size={30} />}
                    </div>

                    {/* Small Status Indicator Dot */}
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />

                    {/* Label below logo when hovered or in settled state */}
                    <div className="pointer-events-none absolute -bottom-5.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span
                        className={`font-mono text-[0.68rem] transition-colors ${
                          isHovered || isStageHighlighted
                            ? "font-bold text-sky-300"
                            : "text-slate-300"
                        }`}
                      >
                        {tech.shortName}
                      </span>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ─── VIEW 2: STREAMLINED ARCHITECTURE FLOW (Mobile & Structured View) ─── */
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Dev Lobe Stages */}
            <div className="rounded-2xl border border-sky-500/20 bg-sky-950/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Development Loop (Continuous Delivery)
                  </h3>
                </div>
                <span className="rounded bg-sky-500/10 px-2 py-0.5 font-mono text-xs text-sky-300">
                  Plan → Code → Build → Test
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {lifecycleStages
                  .filter((s) => s.loopSide === "dev")
                  .map((stage) => {
                    const techList = curatedLifecycleTech.filter((t) => t.stageId === stage.id)
                    return (
                      <div
                        key={stage.id}
                        onClick={() => setSelectedEntity({ type: "stage", id: stage.id })}
                        className="cursor-pointer rounded-xl border border-white/[0.06] bg-slate-950/60 p-3.5 transition-all hover:border-sky-500/30 hover:bg-slate-900"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-sky-300">
                            {stage.name}
                          </span>
                          <span className="font-mono text-[0.68rem] text-slate-400">
                            {stage.tagline}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-300">{stage.description}</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {techList.map((tech) => (
                            <span
                              key={tech.id}
                              className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 font-mono text-[0.68rem] text-slate-200 border border-white/10"
                            >
                              <CheckIcon size={10} className="text-sky-400" />
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Ops Lobe Stages */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Operations Loop (Continuous Feedback)
                  </h3>
                </div>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-300">
                  Release → Deploy → Operate → Monitor
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {lifecycleStages
                  .filter((s) => s.loopSide === "ops")
                  .map((stage) => {
                    const techList = curatedLifecycleTech.filter((t) => t.stageId === stage.id)
                    return (
                      <div
                        key={stage.id}
                        onClick={() => setSelectedEntity({ type: "stage", id: stage.id })}
                        className="cursor-pointer rounded-xl border border-white/[0.06] bg-slate-950/60 p-3.5 transition-all hover:border-emerald-500/30 hover:bg-slate-900"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-emerald-300">
                            {stage.name}
                          </span>
                          <span className="font-mono text-[0.68rem] text-slate-400">
                            {stage.tagline}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-300">{stage.description}</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {techList.map((tech) => (
                            <span
                              key={tech.id}
                              className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 font-mono text-[0.68rem] text-slate-200 border border-white/10"
                            >
                              <CheckIcon size={10} className="text-emerald-400" />
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── LIVE STAGE & TOOL INSPECTOR HUD ─── */}
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-slate-950/90 p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-sm font-bold"
              style={{
                borderColor: currentStage.color,
                backgroundColor: currentStage.accentColor,
                color: currentStage.color,
              }}
            >
              {currentStage.name.slice(0, 3)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                  // Lifecycle Stage: {currentStage.loopSide.toUpperCase()} LOOP
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 border border-emerald-500/20">
                  Continuous Feedback
                </span>
              </div>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                {currentStage.name} — {currentStage.tagline}
              </h3>
            </div>
          </div>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20 hover:text-white"
          >
            <span>Explore Engineering Work</span>
            <ArrowUpRightIcon size={12} />
          </a>
        </div>

        <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-300">
          {currentStage.description}
        </p>

        {/* Technologies powering this stage */}
        <div className="mt-4 border-t border-white/[0.06] pt-3">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-slate-400">
            Technologies Powering This Stage:
          </span>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {stageTechnologies.map((tech) => {
              const Icon = technologyLogosMap[tech.id]
              return (
                <div
                  key={tech.id}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1.5"
                >
                  {Icon && <Icon size={16} />}
                  <span className="font-mono text-xs font-semibold text-white">{tech.name}</span>
                  <span className="text-[0.68rem] text-slate-400">· {tech.category}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

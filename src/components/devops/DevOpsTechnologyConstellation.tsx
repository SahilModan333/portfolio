import { useState, useRef, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { devopsTechnologies, DevOpsTechnology } from "../../data/devopsTechnologies"
import { devopsConnections, DevOpsConnection } from "../../data/devopsConnections"
import TechnologyNode, { SimulationNodeState } from "./TechnologyNode"
import ConnectionPath from "./ConnectionPath"
import TechnologyTooltip from "./TechnologyTooltip"
import PipelineSimulationHUD, {
  usePipelineSimulation,
  pipelineSimulationSteps,
} from "./PipelineSimulation"
import { DevOpsControlPlaneEmblem, technologyLogosMap } from "./TechnologyLogos"
import { ArrowUpRightIcon, CheckIcon } from "../ui/Icons"

export default function DevOpsTechnologyConstellation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 620 })
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("azure-devops")
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<"constellation" | "flow">("constellation")
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Pipeline simulation state machine
  const {
    isRunning,
    isCompleted,
    activeStepIndex,
    activeNodeId: simActiveNodeId,
    startSimulation,
    resetSimulation,
  } = usePipelineSimulation()

  // Track prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // ResizeObserver for dynamic SVG viewport scaling
  useEffect(() => {
    if (!containerRef.current) return
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.width > 0) {
          setDimensions({ width: rect.width, height: rect.height })
        }
      }
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Map of connected neighbor IDs for the currently hovered node
  const neighborNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>()
    const set = new Set<string>()
    for (const conn of devopsConnections) {
      if (conn.from === hoveredNodeId) set.add(conn.to)
      if (conn.to === hoveredNodeId) set.add(conn.from)
    }
    return set
  }, [hoveredNodeId])

  // Get currently selected technology object for detail HUD
  const selectedTechnology = useMemo(() => {
    const id = hoveredNodeId || selectedNodeId || "azure-devops"
    return devopsTechnologies.find((t) => t.id === id) || devopsTechnologies[1]
  }, [hoveredNodeId, selectedNodeId])

  // Get upstream / downstream connections for the inspector
  const relatedConnections = useMemo(() => {
    const id = selectedTechnology.id
    const upstream = devopsConnections
      .filter((c) => c.to === id && c.from !== "devops-core")
      .map((c) => devopsTechnologies.find((t) => t.id === c.from)?.name || c.from)
    const downstream = devopsConnections
      .filter((c) => c.from === id)
      .map((c) => devopsTechnologies.find((t) => t.id === c.to)?.name || c.to)
    return { upstream, downstream }
  }, [selectedTechnology])

  // Handle subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xRel = (e.clientX - rect.left) / rect.width - 0.5
    const yRel = (e.clientY - rect.top) / rect.height - 0.5
    setMouseParallax({ x: xRel * 12, y: yRel * 10 })
  }

  const handleMouseLeave = () => {
    setHoveredNodeId(null)
    setMouseParallax({ x: 0, y: 0 })
  }

  // Smooth scroll to portfolio section on node click
  const handleNodeClick = (tech: DevOpsTechnology) => {
    setSelectedNodeId(tech.id)
    if (tech.sectionAnchor) {
      const el = document.querySelector(tech.sectionAnchor)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Grouped stages for mobile architecture flow view
  const stageGroups = useMemo(() => {
    return [
      {
        id: "govern",
        name: "1. Cloud, Security & Governance",
        description: "Enterprise foundation, identity boundaries & secrets management",
        color: "text-sky-400 border-sky-500/20 bg-sky-500/5",
        nodes: devopsTechnologies.filter((t) => t.mobileStage === "govern"),
      },
      {
        id: "build",
        name: "2. Version Control & CI/CD Delivery",
        description: "Feature branching, pull requests & automated container packaging",
        color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        nodes: devopsTechnologies.filter((t) => t.mobileStage === "build"),
      },
      {
        id: "infra",
        name: "3. Infrastructure as Code & Fleet State",
        description: "Declarative Terraform topologies & zero-drift configuration",
        color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        nodes: devopsTechnologies.filter((t) => t.mobileStage === "infra"),
      },
      {
        id: "run",
        name: "4. Container Orchestration & AKS Runtime",
        description: "High-density microservices, multi-zone AKS clusters & Helm",
        color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        nodes: devopsTechnologies.filter((t) => t.mobileStage === "run"),
      },
      {
        id: "observe",
        name: "5. Observability, Telemetry & SRE",
        description: "Continuous SLI/SLO metrics, PromQL scraping & real-time Grafana",
        color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        nodes: devopsTechnologies.filter((t) => t.mobileStage === "observe"),
      },
    ]
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* ─── HEADER BAR & VIEW CONTROLS ─── */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Interactive Topology · DevOps Control Plane
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            DevOps Technology Constellation
          </h2>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-400">
            How infrastructure, delivery, runtime, and observability connect together across the production stack.
          </p>
        </div>

        {/* View Mode Toggle & Telemetry Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/80 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("constellation")}
              className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors ${
                viewMode === "constellation"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ◈ Constellation Network
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
              ☷ Architecture Flow
            </button>
          </div>

          <div className="hidden items-center gap-3 rounded-lg border border-white/[0.08] bg-slate-950/60 px-3 py-1.5 font-mono text-xs text-slate-300 lg:flex">
            <span className="text-slate-400">NODES:</span>
            <span className="font-bold text-sky-400">20 CONNECTED</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">SLA:</span>
            <span className="font-bold text-emerald-400">99.9%</span>
          </div>
        </div>
      </div>

      {/* ─── SIMULATION HUD CONTROLLER ─── */}
      <div className="mb-6">
        <PipelineSimulationHUD
          activeStepIndex={activeStepIndex}
          activeNodeId={simActiveNodeId}
          isRunning={isRunning}
          isCompleted={isCompleted}
          onStart={startSimulation}
          onReset={resetSimulation}
        />
      </div>

      {/* ─── VIEW 1: CONSTELLATION NETWORK GRAPH (Desktop & Tablet) ─── */}
      {viewMode === "constellation" ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090d16] p-2 shadow-2xl backdrop-blur-xl sm:p-4">
          {/* Background Technical Grid & Polar Orbit Rings */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.05) 45%, transparent 70%)",
            }}
          />

          {/* Master Responsive Constellation Surface */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto w-full aspect-[1000/620] max-h-[640px] select-none"
            style={{ minHeight: "440px" }}
          >
            {/* SVG Connection Paths Layer */}
            <svg
              viewBox="0 0 1000 620"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <filter id="constellation-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Polar Guide Rings from Center */}
              <circle cx="500" cy="305" r="160" fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 6" />
              <circle cx="500" cy="305" r="260" fill="none" stroke="rgba(255,255,255,0.02)" strokeDasharray="4 6" />

              {/* Render Connections */}
              {devopsConnections.map((conn) => {
                const fromTech =
                  conn.from === "devops-core"
                    ? { position: { x: 500, y: 305 } }
                    : devopsTechnologies.find((t) => t.id === conn.from)
                const toTech =
                  conn.to === "devops-core"
                    ? { position: { x: 500, y: 305 } }
                    : devopsTechnologies.find((t) => t.id === conn.to)

                if (!fromTech || !toTech) return null

                const isDirectlyHighlighted =
                  hoveredNodeId === conn.from || hoveredNodeId === conn.to
                const isDimmed =
                  Boolean(hoveredNodeId) &&
                  hoveredNodeId !== conn.from &&
                  hoveredNodeId !== conn.to

                const isSimulatingActive =
                  isRunning &&
                  conn.isPipelineStep &&
                  (simActiveNodeId === conn.from || simActiveNodeId === conn.to)

                return (
                  <ConnectionPath
                    key={conn.id}
                    connection={conn}
                    fromPos={fromTech.position}
                    toPos={toTech.position}
                    isHighlighted={isDirectlyHighlighted}
                    isDimmed={isDimmed}
                    isSimulatingActive={Boolean(isSimulatingActive)}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )
              })}
            </svg>

            {/* Parallax Container for Nodes */}
            <div
              className="pointer-events-auto relative h-full w-full transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
              }}
            >
              {/* ─── CENTRAL HUB NODE: DEVOPS CONTROL PLANE ─── */}
              <div
                style={{
                  left: "500px",
                  top: "305px",
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20"
              >
                <div className="relative flex flex-col items-center justify-center rounded-2xl border border-sky-500/40 bg-slate-950/95 px-5 py-3 shadow-[0_0_30px_rgba(56,189,248,0.25)] backdrop-blur-xl">
                  {/* Outer Pulsing Radar Ring */}
                  <span className="pointer-events-none absolute -inset-2 rounded-2xl border border-sky-400/20 animate-pulse" />

                  <div className="flex items-center gap-2">
                    <DevOpsControlPlaneEmblem size={22} />
                    <span className="font-mono text-xs font-bold tracking-wider uppercase text-white">
                      DEVOPS CORE
                    </span>
                  </div>

                  <span className="mt-0.5 font-mono text-[0.62rem] text-sky-400">
                    Control Plane Backbone
                  </span>
                </div>
              </div>

              {/* ─── TECHNOLOGY NODES (20 Total) ─── */}
              {devopsTechnologies.map((tech, idx) => {
                const isHovered = hoveredNodeId === tech.id
                const isNeighbor = neighborNodeIds.has(tech.id)
                const isDimmed = Boolean(hoveredNodeId) && !isHovered && !isNeighbor

                // Compute simulation state for this node
                let simState: SimulationNodeState = "idle"
                if (isRunning) {
                  const stepIndex = pipelineSimulationSteps.findIndex((s) => s.nodeId === tech.id)
                  if (stepIndex !== -1) {
                    if (stepIndex === activeStepIndex) simState = "running"
                    else if (stepIndex < activeStepIndex) simState = "success"
                    else simState = "queued"
                  }
                } else if (isCompleted) {
                  const isPartOfSim = pipelineSimulationSteps.some((s) => s.nodeId === tech.id)
                  if (isPartOfSim) simState = "success"
                }

                return (
                  <TechnologyNode
                    key={tech.id}
                    technology={tech}
                    index={idx}
                    isHovered={isHovered}
                    isNeighbor={isNeighbor}
                    isDimmed={isDimmed}
                    simState={simState}
                    prefersReducedMotion={prefersReducedMotion}
                    onMouseEnter={(e) => {
                      setHoveredNodeId(tech.id)
                      const rect = containerRef.current?.getBoundingClientRect()
                      if (rect) {
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        })
                      }
                    }}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onFocus={() => {
                      setHoveredNodeId(tech.id)
                      setTooltipPos({
                        x: (tech.position.x / 1000) * dimensions.width,
                        y: (tech.position.y / 620) * dimensions.height,
                      })
                    }}
                    onBlur={() => setHoveredNodeId(null)}
                    onClick={() => handleNodeClick(tech)}
                  />
                )
              })}
            </div>

            {/* ─── RICH TECHNICAL HOVER TOOLTIP ─── */}
            <AnimatePresence>
              {hoveredNodeId && (
                <TechnologyTooltip
                  technology={devopsTechnologies.find((t) => t.id === hoveredNodeId)!}
                  position={tooltipPos}
                  containerWidth={dimensions.width}
                  containerHeight={dimensions.height}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* ─── VIEW 2: STREAMLINED ARCHITECTURE FLOW (Mobile & Structured View) ─── */
        <div className="space-y-6">
          {stageGroups.map((stage) => (
            <div
              key={stage.id}
              className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md ${stage.color}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-white">
                    {stage.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {stage.description}
                  </p>
                </div>
                <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-[0.7rem] text-slate-300 border border-white/10">
                  {stage.nodes.length} Nodes
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {stage.nodes.map((tech) => {
                  const Icon = technologyLogosMap[tech.id]
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => handleNodeClick(tech)}
                      className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-slate-950/70 p-3.5 text-left transition-all duration-200 hover:border-sky-500/40 hover:bg-slate-900"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900 p-2 shadow-inner group-hover:border-sky-500/30 group-hover:bg-sky-500/10">
                        {Icon && <Icon size={22} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="truncate font-sans text-xs font-bold text-white group-hover:text-sky-300">
                            {tech.name}
                          </h4>
                          {tech.primary && (
                            <span className="rounded bg-sky-500/10 px-1.5 py-0.2 font-mono text-[0.62rem] text-sky-400 border border-sky-500/20">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate font-mono text-[0.65rem] text-slate-400">
                          {tech.category}
                        </p>
                        <p className="mt-1.5 line-clamp-2 text-[0.72rem] leading-relaxed text-slate-300">
                          {tech.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── LIVE NODE INSPECTOR HUD (Click any node to inspect) ─── */}
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-slate-950/80 p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-slate-900 p-2.5 shadow-lg">
              {technologyLogosMap[selectedTechnology.id] && (
                technologyLogosMap[selectedTechnology.id]({ size: 28 })
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                  // Selected Infrastructure Node
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 border border-emerald-500/20">
                  {selectedTechnology.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                {selectedTechnology.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNodeClick(selectedTechnology)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20 hover:text-white"
          >
            <span>Jump to Portfolio Section</span>
            <ArrowUpRightIcon size={12} />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
          {selectedTechnology.description}
        </p>

        {/* Upstream & Downstream Integration Traces */}
        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
          <div>
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-slate-400">
              Upstream Inputs / Triggers:
            </span>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {relatedConnections.upstream.length > 0 ? (
                relatedConnections.upstream.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 font-mono text-xs text-slate-200 border border-white/10"
                  >
                    <CheckIcon size={11} className="text-sky-400" />
                    {name}
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-slate-500">Root Infrastructure Entity</span>
              )}
            </div>
          </div>

          <div>
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-slate-400">
              Downstream Production Hand-offs:
            </span>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {relatedConnections.downstream.length > 0 ? (
                relatedConnections.downstream.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 font-mono text-xs text-slate-200 border border-white/10"
                  >
                    <CheckIcon size={11} className="text-emerald-400" />
                    {name}
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-slate-500">Terminal Telemetry Surface</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMemo } from "react"
import { DevOpsConnection } from "../../data/devopsConnections"

interface NodePos {
  x: number
  y: number
}

interface ConnectionPathProps {
  connection: DevOpsConnection
  fromPos: NodePos
  toPos: NodePos
  isHighlighted: boolean
  isDimmed: boolean
  isSimulatingActive: boolean
  prefersReducedMotion: boolean
}

// Generate organic curved SVG path between two nodes
function generateCurvedPath(from: NodePos, to: NodePos): string {
  const dx = to.x - from.x
  const dy = to.y - from.y

  // Calculate subtle perpendicular bend
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2

  // Curvature factor based on distance and orientation
  const curvature = 0.12
  const ctrlX = midX - dy * curvature
  const ctrlY = midY + dx * curvature

  return `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`
}

export default function ConnectionPath({
  connection,
  fromPos,
  toPos,
  isHighlighted,
  isDimmed,
  isSimulatingActive,
  prefersReducedMotion,
}: ConnectionPathProps) {
  const pathD = useMemo(() => generateCurvedPath(fromPos, toPos), [fromPos, toPos])

  // Color mapping
  const baseColor = useMemo(() => {
    switch (connection.type) {
      case "cicd":
        return "#38bdf8" // Cyan / Electric blue
      case "iac":
        return "#c084fc" // Purple / Indigo
      case "runtime":
        return "#10b981" // Green / Emerald
      case "observability":
        return "#f59e0b" // Amber / Orange
      case "config":
        return "#60a5fa" // Soft Blue
      case "cloud":
        return "#0284c7" // Deep Sky
      default:
        return "#64748b"
    }
  }, [connection.type])

  const strokeColor = isSimulatingActive
    ? "#38bdf8"
    : isHighlighted
      ? baseColor
      : baseColor

  const strokeWidth = isSimulatingActive ? 2.5 : isHighlighted ? 2.2 : 1.2
  const strokeOpacity = isSimulatingActive ? 1 : isHighlighted ? 0.95 : isDimmed ? 0.08 : 0.28
  const isDashed = connection.type === "config" || connection.from === "devops-core"

  const particleColor = isSimulatingActive ? "#ffffff" : connection.particleColor || baseColor
  const particleDuration = isSimulatingActive ? 1.0 : connection.particleSpeed || 3.5

  return (
    <g className="transition-opacity duration-300" style={{ opacity: strokeOpacity }}>
      {/* Background soft glow line on highlight */}
      {(isHighlighted || isSimulatingActive) && (
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth + 4}
          strokeOpacity={0.3}
          strokeLinecap="round"
        />
      )}

      {/* Main Connection SVG Path */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={isDashed ? "4 4" : undefined}
        strokeLinecap="round"
        className="transition-colors duration-300"
      />

      {/* Traveling Data Packet / Particle along the path */}
      {!prefersReducedMotion && (connection.animated || isSimulatingActive) && (
        <g>
          {/* Outer glow circle */}
          <circle r={isSimulatingActive ? 4.5 : 3} fill={particleColor} opacity={0.6}>
            <animateMotion
              path={pathD}
              dur={`${particleDuration}s`}
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
          {/* Inner core particle */}
          <circle r={isSimulatingActive ? 2.5 : 1.8} fill="#ffffff">
            <animateMotion
              path={pathD}
              dur={`${particleDuration}s`}
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
        </g>
      )}
    </g>
  )
}

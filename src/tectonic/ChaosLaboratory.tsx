import { useEffect, useRef, useState } from "react"
import { audio } from "./AudioEngine"

interface ClusterNode {
  id: number
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  status: "healthy" | "degraded" | "recovering"
  role: string
}

export default function ChaosLaboratory() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clusterHealth, setClusterHealth] = useState("100% HEALTHY")
  const [activePods, setActivePods] = useState("12 / 12")

  const nodesRef = useRef<ClusterNode[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    let height = (canvas.height = 420)

    const mouse = { x: -1000, y: -1000 }

    // Initialize 12 cluster nodes arranged in a clean distributed ring
    const initCluster = () => {
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.32
      const count = 12

      nodesRef.current = Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const ox = centerX + Math.cos(angle) * radius
        const oy = centerY + Math.sin(angle) * radius
        return {
          id: i,
          ox,
          oy,
          x: ox,
          y: oy,
          vx: 0,
          vy: 0,
          status: "healthy",
          role: `aks-pod-${i + 1}`,
        }
      })
    }

    initCluster()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || 800
      height = canvas.height = 420
      initCluster()
    }
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Physics Engine: Spring Restoring Force toward Desired State + Intersite Tension
    const springK = 0.06
    const damping = 0.86
    const mouseRepel = 120

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const nodes = nodesRef.current

      // Draw elastic interconnect lines between neighboring cluster nodes
      ctx.lineWidth = 0.8
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(212, 255, 0, ${0.15 * (1 - dist / 180)})`
            ctx.stroke()
          }
        }
      }

      // Update and render nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // 1. Mouse Repel
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < mouseRepel && dist > 1) {
          const force = (1 - dist / mouseRepel) * 3.5
          const angle = Math.atan2(dy, dx)
          n.vx += Math.cos(angle) * force
          n.vy += Math.sin(angle) * force
        }

        // 2. Spring pull toward origin (desired state)
        const fx = -springK * (n.x - n.ox)
        const fy = -springK * (n.y - n.oy)

        n.vx = (n.vx + fx) * damping
        n.vy = (n.vy + fy) * damping

        n.x += n.vx
        n.y += n.vy

        // Draw node
        ctx.beginPath()
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2)
        ctx.fillStyle =
          n.status === "healthy"
            ? "#d4ff00"
            : n.status === "recovering"
            ? "#38bdf8"
            : "#ef4444"
        ctx.fill()

        // Outer pulse ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, 11, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
        ctx.stroke()

        // Label
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.font = "9px monospace"
        ctx.textAlign = "center"
        ctx.fillText(n.role, n.x, n.y + 18)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Action: Inject Chaos Spike (Explosive physical shockwave)
  const injectChaosSpike = () => {
    audio.thud()
    setClusterHealth("DEGRADED // HEALING")
    setActivePods("8 / 12")

    const nodes = nodesRef.current
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const angle = Math.random() * Math.PI * 2
      const power = 15 + Math.random() * 20
      n.vx += Math.cos(angle) * power
      n.vy += Math.sin(angle) * power
      n.status = i % 3 === 0 ? "recovering" : "healthy"
    }

    // Auto-heal back to healthy within 1.2 seconds
    setTimeout(() => {
      audio.chime()
      setClusterHealth("100% HEALTHY")
      setActivePods("12 / 12")
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].status = "healthy"
      }
    }, 1400)
  }

  // Action: Trigger Rolling Restart
  const triggerRollingRestart = () => {
    audio.click()
    setClusterHealth("ROLLING RESTART // ZERO DOWNTIME")

    const nodes = nodesRef.current
    nodes.forEach((n, idx) => {
      setTimeout(() => {
        audio.tick()
        n.status = "recovering"
        n.vx += (Math.random() - 0.5) * 8
        n.vy += (Math.random() - 0.5) * 8

        setTimeout(() => {
          n.status = "healthy"
          if (idx === nodes.length - 1) {
            setClusterHealth("100% HEALTHY")
          }
        }, 500)
      }, idx * 100)
    })
  }

  return (
    <section
      id="chaos-lab"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#060709" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-10">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest flex items-center gap-3">
            <span className="text-[#f0ece1] font-bold">[ 04 // THE CHAOS LAB ]</span>
            <span className="text-slate-700">/</span>
            <span>INTERACTIVE PHYSICS EXPERIMENTATION</span>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span>INSPIRED BY ZACH SAUCIER PHYSICS GRID</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="mt-8 max-w-3xl">
          <h3
            className="text-3xl sm:text-5xl font-black text-[#f0ece1] leading-tight font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Chaos engineering
            <br />
            <span className="text-slate-400">as physical reality.</span>
          </h3>
          <p className="mt-4 font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
            Move your cursor across the cluster to induce physical displacement.
            Inject chaos spikes to test automated resilience and watch pods self-heal.
          </p>
        </div>

        {/* The Interactive Sandbox Container */}
        <div className="mt-12 rounded-2xl border border-white/[0.1] bg-[#090a0d] p-6 sm:p-8 backdrop-blur-xl">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#d4ff00] animate-pulse" />
              <span className="text-white font-bold">{clusterHealth}</span>
            </div>

            <div className="flex items-center gap-6 text-slate-400">
              <span>PODS: {activePods}</span>
              <span>RECONCILIATION LOOP: ACTIVE</span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative h-[360px] sm:h-[420px] w-full my-4 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={injectChaosSpike}
                className="rounded-full bg-[#f0ece1] px-5 py-2.5 font-bold text-black hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                INJECT CHAOS SPIKE [💥]
              </button>

              <button
                type="button"
                onClick={triggerRollingRestart}
                className="rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-slate-200 hover:border-white/50 active:scale-95 transition-all cursor-pointer"
              >
                TRIGGER ROLLING UPGRADE [↻]
              </button>
            </div>

            <div className="text-[0.7rem] text-slate-500">
              <span>F = -kx - cv // SPRING EQUILIBRIUM RESTORED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { sound } from "./SoundEngine"
import { MechanicalArrow, ChromeAsterisk } from "./TactileArtifacts"

export default function MonolithHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Ambient particle mesh ether canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Subtly drifting constellation nodes representing cloud fabric
    const particles = Array.from({ length: 42 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connecting lines if within distance
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.x += p1.vx
        p1.y += p1.vy

        if (p1.x < 0 || p1.x > width) p1.vx *= -1
        if (p1.y < 0 || p1.y > height) p1.vy *= -1

        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)"
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 130)})`
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden select-none"
      style={{ backgroundColor: "#08090b" }}
    >
      {/* Background Generative Cloud Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
      />

      {/* Top Editorial Row */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-white font-bold">( 01 )</span>
          <span className="text-slate-600">/</span>
          <span>THE ARCHITECTURAL SYSTEM</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:block text-slate-500"
        >
          BENGALURU &amp; PARIS // GLOBAL PRODUCTION PLATFORMS
        </motion.div>
      </div>

      {/* Center Monumental Typography & Philosophical Lede */}
      <div className="relative z-10 mx-auto w-full max-w-7xl my-auto py-12">
        {/* Massive Screen-Spanning Monumental Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full select-none"
        >
          <svg
            viewBox="0 0 1200 240"
            className="w-full h-auto text-white overflow-visible"
            fill="currentColor"
          >
            <text
              x="50%"
              y="58%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-black tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-display, 'Syne', sans-serif)",
                fontSize: "172px",
                letterSpacing: "-0.05em",
              }}
            >
              SAHIL
            </text>
          </svg>
        </motion.div>

        {/* Floating Tactile Chrome Accent Node */}
        <div className="flex justify-center -mt-6 sm:-mt-10 mb-6">
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="cursor-pointer"
            onClick={() => sound.tick()}
          >
            <ChromeAsterisk size={75} />
          </motion.div>
        </div>

        {/* Philosophical Narrative Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-light text-slate-200 tracking-tight leading-snug font-sans">
            When infrastructure is flawless, it is{" "}
            <span className="font-bold text-white italic">invisible</span>.
            <br />
            Architecting the silent, self-healing digital systems that power modern enterprise.
          </h2>

          <p className="mt-4 font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Azure Cloud Operations &amp; SRE · 20+ CI/CD Pipelines · Terraform IaC · Kubernetes AKS · 99.9% Platform SLA.
          </p>

          {/* Action Row: High-Contrast Magnetic Agency Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:sahilmodan333@gmail.com"
              onClick={() => sound.click()}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 font-mono text-xs font-bold text-black shadow-2xl transition-all hover:bg-slate-200 active:scale-95 cursor-pointer"
            >
              <span>Let's talk</span>
              <MechanicalArrow size={18} color="#000" className="group-hover:translate-x-1" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 font-mono text-xs font-medium text-slate-200 backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10 active:scale-95 cursor-pointer"
            >
              <span>Download Résumé</span>
              <span className="text-slate-400 group-hover:text-white transition-colors">↗</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Minimal HUD Coordinates */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-[0.72rem] text-slate-500">
        <div>
          <span>CREATIVE INFRASTRUCTURE // PERSPECTIVE</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>99.92% PRODUCTION SLA SUSTAINED</span>
        </div>
        <div className="hidden sm:block">
          <span>( SCROLL TO ENTER THE SYSTEM ↓ )</span>
        </div>
      </div>
    </section>
  )
}

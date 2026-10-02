import { useEffect, useRef } from "react"
import { audio } from "./AudioEngine"

interface TectonicPhysicsFieldProps {
  className?: string
  interactive?: boolean
  density?: number
}

interface NodePoint {
  ox: number // origin x
  oy: number // origin y
  x: number  // current x
  y: number  // current y
  vx: number // velocity x
  vy: number // velocity y
  symbol: "+" | "·" | "×"
  displaced: number
}

export default function TectonicPhysicsField({
  className = "",
  interactive = true,
  density = 48,
}: TectonicPhysicsFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    // Mouse coordinates and velocity tracking
    const mouse = {
      x: -1000,
      y: -1000,
      lastX: -1000,
      lastY: -1000,
      vx: 0,
      vy: 0,
      down: false,
    }

    let nodes: NodePoint[] = []

    const initNodes = () => {
      nodes = []
      const step = density
      const cols = Math.ceil(width / step) + 1
      const rows = Math.ceil(height / step) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * step
          const oy = r * step
          const symbolType = (c + r) % 3 === 0 ? "+" : (c + r) % 3 === 1 ? "·" : "×"

          nodes.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            symbol: symbolType,
            displaced: 0,
          })
        }
      }
    }

    initNodes()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      initNodes()
    }
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      mouse.vx = currentX - mouse.lastX
      mouse.vy = currentY - mouse.lastY
      mouse.x = currentX
      mouse.y = currentY
      mouse.lastX = currentX
      mouse.lastY = currentY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
      mouse.vx = 0
      mouse.vy = 0
    }

    // Shockwave explosion on click (CodePen inspired)
    const handleClick = (e: MouseEvent) => {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      audio.thud()

      const blastRadius = 240
      const blastPower = 18

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = n.x - clickX
        const dy = n.y - clickY
        const dist = Math.hypot(dx, dy)

        if (dist < blastRadius && dist > 1) {
          const factor = (1 - dist / blastRadius) * blastPower
          const angle = Math.atan2(dy, dx)
          n.vx += Math.cos(angle) * factor
          n.vy += Math.sin(angle) * factor
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || !e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.touches[0].clientX - rect.left
      mouse.y = e.touches[0].clientY - rect.top
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive || !e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      const clickX = e.touches[0].clientX - rect.left
      const clickY = e.touches[0].clientY - rect.top

      audio.thud()

      const blastRadius = 200
      const blastPower = 14

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = n.x - clickX
        const dy = n.y - clickY
        const dist = Math.hypot(dx, dy)

        if (dist < blastRadius && dist > 1) {
          const factor = (1 - dist / blastRadius) * blastPower
          const angle = Math.atan2(dy, dx)
          n.vx += Math.cos(angle) * factor
          n.vy += Math.sin(angle) * factor
        }
      }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
      canvas.addEventListener("click", handleClick)
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true })
      canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    }

    // Physics Loop: Spring damping F = -kx - cv
    const springK = 0.08
    const damping = 0.84
    const repelRadius = 140

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // 1. Mouse Repulsion Force
        const dxMouse = n.x - mouse.x
        const dyMouse = n.y - mouse.y
        const distMouse = Math.hypot(dxMouse, dyMouse)

        if (distMouse < repelRadius && distMouse > 1) {
          const repelFactor = (1 - distMouse / repelRadius) * 4.2
          const angle = Math.atan2(dyMouse, dxMouse)
          n.vx += Math.cos(angle) * repelFactor
          n.vy += Math.sin(angle) * repelFactor
        }

        // 2. Spring Hooke's Law toward Origin
        const fx = -springK * (n.x - n.ox)
        const fy = -springK * (n.y - n.oy)

        n.vx = (n.vx + fx) * damping
        n.vy = (n.vy + fy) * damping

        n.x += n.vx
        n.y += n.vy

        // Calculate displacement amount
        const disp = Math.hypot(n.x - n.ox, n.y - n.oy)
        n.displaced = disp

        // Render point or crosshair
        if (disp > 3) {
          // Highlight active/displaced nodes with slight phosphor lime hue
          ctx.fillStyle = `rgba(212, 255, 0, ${Math.min(0.8, disp / 20)})`
          ctx.fillText(n.symbol, n.x, n.y)

          // Draw tension tether line back to origin
          ctx.beginPath()
          ctx.moveTo(n.ox, n.oy)
          ctx.lineTo(n.x, n.y)
          ctx.strokeStyle = `rgba(212, 255, 0, ${Math.min(0.3, disp / 40)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        } else {
          // Resting state: whisper-quiet charcoal / bone white
          ctx.fillStyle = "rgba(255, 255, 255, 0.12)"
          ctx.fillText(n.symbol, n.ox, n.oy)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseleave", handleMouseLeave)
        canvas.removeEventListener("click", handleClick)
        canvas.removeEventListener("touchmove", handleTouchMove)
        canvas.removeEventListener("touchstart", handleTouchStart)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [interactive, density])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto cursor-crosshair ${className}`}
    />
  )
}

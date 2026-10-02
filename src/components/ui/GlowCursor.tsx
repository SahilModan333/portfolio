import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on pointer-enabled desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" })
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" })

    const followerX = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3" })
    const followerY = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3" })

    const handleMouseMove = (e: MouseEvent) => {
      cursorX(e.clientX)
      cursorY(e.clientY)
      followerX(e.clientX)
      followerY(e.clientY)
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.2 })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2 })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Center dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 opacity-0 shadow-[0_0_8px_rgba(56,189,248,0.9)] lg:block"
        aria-hidden="true"
      />
      {/* Trailing soft aura */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/30 bg-sky-400/10 opacity-0 blur-[1px] lg:block"
        aria-hidden="true"
      />
    </>
  )
}

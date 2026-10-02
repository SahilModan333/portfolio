import { useRef, useEffect, type ReactNode, type MouseEvent } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" })

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      if (Math.abs(distanceX) < rect.width * 1.2 && Math.abs(distanceY) < rect.height * 1.2) {
        xTo(distanceX * strength)
        yTo(distanceY * strength)
      } else {
        xTo(0)
        yTo(0)
      }
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  const content = (
    <div ref={elementRef} className={`inline-block ${className}`}>
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className="inline-block">
        {content}
      </a>
    )
  }

  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {content}
    </div>
  )
}

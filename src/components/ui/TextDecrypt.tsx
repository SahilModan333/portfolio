import { useEffect, useState, useRef } from "react"

const CHARS = "ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

interface TextDecryptProps {
  text: string
  className?: string
  duration?: number
  triggerOnHover?: boolean
  as?: "h1" | "h2" | "h3" | "span" | "p"
}

export default function TextDecrypt({
  text,
  className = "",
  duration = 800,
  triggerOnHover = true,
  as: Component = "span",
}: TextDecryptProps) {
  const [displayText, setDisplayText] = useState(text)
  const isScrambling = useRef(false)

  const scramble = () => {
    if (isScrambling.current) return
    isScrambling.current = true

    const length = text.length
    const startTime = performance.now()

    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const revealedChars = Math.floor(progress * length)

      let result = ""
      for (let i = 0; i < length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          result += text[i]
        } else if (i < revealedChars) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplayText(result)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        setDisplayText(text)
        isScrambling.current = false
      }
    }

    requestAnimationFrame(update)
  }

  useEffect(() => {
    scramble()
  }, [text])

  return (
    <Component
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={className}
    >
      {displayText}
    </Component>
  )
}

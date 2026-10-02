import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { sound } from "./SoundEngine"
import { MechanicalArrow } from "./TactileArtifacts"

interface NavigationProps {
  onOpenContact?: () => void
}

export default function Navigation({ onOpenContact }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsSoundOn(sound.isEnabled())
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSoundToggle = () => {
    const next = sound.toggle()
    setIsSoundOn(next)
  }

  const navigateTo = (hash: string) => {
    sound.click()
    setIsMenuOpen(false)
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { num: "01", label: "THE ARCHITECTURE", href: "#hero" },
    { num: "02", label: "THE MANIFESTO", href: "#manifesto" },
    { num: "03", label: "WORKS", href: "#works" },
    { num: "04", label: "TAXONOMY", href: "#taxonomy" },
    { num: "05", label: "COLLISION", href: "#collision" },
    { num: "06", label: "FROM ZERO", href: "#contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#08090b]/90 backdrop-blur-xl py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Left Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("#hero")
            }}
            className="group flex items-center gap-3 font-mono text-xs text-white"
          >
            <span className="font-bold tracking-wider uppercase group-hover:text-slate-300 transition-colors">
              SAHIL MODAN
            </span>
            <span className="text-slate-600">/</span>
            <span className="hidden sm:inline text-slate-400 text-[0.68rem] tracking-wider uppercase">
              CLOUD SRE &amp; ARCHITECTURE
            </span>
          </a>

          {/* Right Controls: Sound Toggle & Menu Button */}
          <div className="flex items-center gap-4 font-mono text-xs">
            {/* Interactive Sound Toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[0.68rem] text-slate-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
              title="Toggle Micro Audio"
            >
              <span>SOUND</span>
              <span className={`h-1.5 w-1.5 rounded-full ${isSoundOn ? "bg-emerald-400" : "bg-slate-600"}`} />
            </button>

            {/* Menu Trigger with 4-square grid icon */}
            <button
              type="button"
              onClick={() => {
                sound.click()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <span>{isMenuOpen ? "CLOSE" : "MENU"}</span>
              <svg width="10" height="10" viewBox="0 0 6 6" fill="currentColor">
                <rect width="2" height="2" />
                <rect x="4" width="2" height="2" />
                <rect y="4" width="2" height="2" />
                <rect x="4" y="4" width="2" height="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#08090b] px-6 pt-28 pb-10 sm:px-12 lg:px-20 text-white overflow-y-auto"
          >
            {/* Main Links List */}
            <div className="my-auto max-w-4xl py-6">
              <div className="space-y-4 sm:space-y-6">
                {navLinks.map((link) => (
                  <div key={link.num} className="group overflow-hidden">
                    <button
                      type="button"
                      onClick={() => navigateTo(link.href)}
                      onMouseEnter={() => sound.tick()}
                      className="flex items-baseline gap-4 sm:gap-8 text-left transition-transform group-hover:translate-x-3 cursor-pointer w-full"
                    >
                      <span className="font-mono text-xs sm:text-sm text-slate-500 font-light">
                        ({link.num})
                      </span>
                      <span className="font-sans text-3xl sm:text-6xl font-bold tracking-tighter text-white group-hover:text-slate-300 transition-colors">
                        {link.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Direct Contact & Socials */}
            <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
              <div className="flex flex-col gap-1 text-slate-400">
                <span className="text-white font-bold">SAHIL MODAN</span>
                <span>sahilmodan333@gmail.com · +91 83201 22323</span>
                <span className="text-emerald-400">99.92% Platform SLA Sustained</span>
              </div>

              <div className="flex items-center gap-6 text-slate-300">
                <a
                  href="https://www.linkedin.com/in/sahil-modan-b5a73b184/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://github.com/SahilModan333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GITHUB ↗
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  RÉSUMÉ ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

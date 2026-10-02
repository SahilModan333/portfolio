import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { audio } from "./AudioEngine"

export default function TectonicHUD() {
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const [isAudioActive, setIsAudioActive] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsAudioActive(audio.isEnabled())
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAudioToggle = () => {
    const next = audio.toggle()
    setIsAudioActive(next)
  }

  const navigateTo = (id: string) => {
    audio.click()
    setIsIndexOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const movements = [
    { num: "01", name: "THE EMERGENCE", id: "hero", tag: "IDENTITY & EQUILIBRIUM" },
    { num: "02", name: "THE MANIFESTO", id: "manifesto", tag: "CHAOS VS CONVERGENCE" },
    { num: "03", name: "SELECTED WORK", id: "works", tag: "4 PRODUCTION ODYSSEYS" },
    { num: "04", name: "THE CHAOS LAB", id: "chaos-lab", tag: "PHYSICS EXPERIMENTATION" },
    { num: "05", name: "CAPABILITY TAXONOMY", id: "taxonomy", tag: "ENGINEERING MATRIX" },
    { num: "06", name: "GROUND ZERO", id: "contact", tag: "CONVERGENCE & DIRECT ACCESS" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#090a0d]/90 backdrop-blur-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Identity Stamp */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("hero")
            }}
            className="flex items-center gap-3 font-mono text-xs text-white"
          >
            <span className="font-bold tracking-widest text-[#f0ece1] uppercase">
              SAHIL MODAN
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-[0.68rem] tracking-wider text-slate-400 uppercase hidden sm:inline">
              AZURE CLOUD SRE &amp; ARCHITECT
            </span>
          </a>

          {/* Right Controls HUD */}
          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[0.68rem] text-slate-300">
            {/* Live Telemetry Pill */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
              <span>99.92% SLA</span>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleAudioToggle}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-slate-300 hover:border-white/40 hover:text-white transition-all cursor-pointer"
            >
              <span>AUDIO</span>
              <span className={`h-1.5 w-1.5 rounded-full ${isAudioActive ? "bg-[#d4ff00]" : "bg-slate-600"}`} />
            </button>

            {/* Index Trigger */}
            <button
              type="button"
              onClick={() => {
                audio.click()
                setIsIndexOpen(!isIndexOpen)
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <span>{isIndexOpen ? "DISMISS" : "INDEX"}</span>
              <span className="text-[0.62rem] text-[#d4ff00]">[::]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Index Overlay */}
      <AnimatePresence>
        {isIndexOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#08090b] px-6 pt-28 pb-10 sm:px-12 lg:px-20 text-[#f0ece1] overflow-y-auto"
          >
            {/* Movements List */}
            <div className="my-auto max-w-4xl py-6">
              <div className="space-y-4 sm:space-y-6">
                {movements.map((m) => (
                  <div key={m.num} className="group overflow-hidden">
                    <button
                      type="button"
                      onClick={() => navigateTo(m.id)}
                      onMouseEnter={() => audio.tick()}
                      className="flex items-baseline justify-between w-full text-left transition-transform group-hover:translate-x-3 cursor-pointer py-1 border-b border-white/[0.04]"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className="font-mono text-xs sm:text-sm text-slate-500 font-light">
                          ({m.num})
                        </span>
                        <span
                          className="font-sans text-2xl sm:text-5xl font-black tracking-tight text-white group-hover:text-[#d4ff00] transition-colors"
                          style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                        >
                          {m.name}
                        </span>
                      </div>
                      <span className="hidden sm:inline font-mono text-[0.68rem] text-slate-500 uppercase tracking-widest">
                        {m.tag}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Footer */}
            <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
              <div className="space-y-1 text-slate-400">
                <span className="text-white font-bold block">SAHIL MODAN</span>
                <span>sahilmodan333@gmail.com · +91 83201 22323</span>
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

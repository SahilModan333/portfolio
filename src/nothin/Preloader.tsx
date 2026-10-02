import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChromeAsterisk, LiquidChromeTorus, PrismaticCube, MetallicFoilStar } from "./TactileArtifacts"
import { sound } from "./SoundEngine"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [activeShape, setActiveShape] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // If already played this session, brief 500ms flash or complete
    const hasPlayed = sessionStorage.getItem("nothin:preloader-done") === "1"
    const totalDuration = hasPlayed ? 600 : 1800
    const stepTime = totalDuration / 100

    let current = 0
    const timer = setInterval(() => {
      current += 1
      setProgress(current)

      // Cycle shape every 25%
      if (current === 25) {
        setActiveShape(1)
        sound.tick()
      } else if (current === 50) {
        setActiveShape(2)
        sound.tick()
      } else if (current === 75) {
        setActiveShape(3)
        sound.tick()
      } else if (current % 12 === 0) {
        sound.tick()
      }

      if (current >= 100) {
        clearInterval(timer)
        sound.chime()
        sessionStorage.setItem("nothin:preloader-done", "1")
        setTimeout(() => {
          setIsDone(true)
          setTimeout(onComplete, 600)
        }, 300)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0.95 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#08090b] px-6 py-8 sm:px-12 sm:py-10 text-white select-none overflow-hidden"
        >
          {/* Top Row: System Identity */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase">SAHIL MODAN // INITIALIZING</span>
            </div>
            <div className="tracking-widest uppercase text-slate-500 hidden sm:block">
              EX NIHILO // ARCHITECTURE 2026
            </div>
          </div>

          {/* Center: Morphing Tactile Metallic Sculpture */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="relative flex items-center justify-center h-44 w-44"
            >
              <AnimatePresence mode="wait">
                {activeShape === 0 && (
                  <motion.div
                    key="shape-0"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChromeAsterisk size={130} />
                  </motion.div>
                )}
                {activeShape === 1 && (
                  <motion.div
                    key="shape-1"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LiquidChromeTorus size={130} />
                  </motion.div>
                )}
                {activeShape === 2 && (
                  <motion.div
                    key="shape-2"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PrismaticCube size={120} />
                  </motion.div>
                )}
                {activeShape === 3 && (
                  <motion.div
                    key="shape-3"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <MetallicFoilStar size={130} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="mt-8 font-mono text-[0.72rem] text-slate-400 tracking-wider text-center">
              <span>ORCHESTRATING INVISIBLE INFRASTRUCTURE</span>
            </div>
          </div>

          {/* Bottom Row: Counter 000 -> 100 */}
          <div className="flex items-end justify-between border-t border-white/[0.08] pt-6 font-mono">
            <div className="text-xs text-slate-500">
              <span>( CLOUD SYSTEMS )</span>
            </div>
            <div className="text-4xl sm:text-6xl font-light tracking-tighter text-white">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

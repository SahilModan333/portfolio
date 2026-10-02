import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { sound } from "./SoundEngine"

export default function GlitchManifesto() {
  const [glitchPhase, setGlitchPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchPhase((prev) => (prev + 1) % 4)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="collision"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#050608" }}
    >
      {/* Background Subtle Digital Static Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Section Marker */}
        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
          <span className="text-white font-bold">( 05 )</span>
          <span className="text-slate-700">/</span>
          <span>THE KINETIC COLLISION // MANIFESTO</span>
        </div>

        {/* Glitch Cascade Stack */}
        <div className="relative space-y-3 font-mono text-xs sm:text-sm text-slate-500 select-none">
          <div className="opacity-40 tracking-wider">
            system.converge() // terraform_state: locked // 200 OK
          </div>

          <div
            className={`transition-opacity duration-300 ${
              glitchPhase % 2 === 0 ? "opacity-75 text-sky-400" : "opacity-30"
            }`}
          >
            aks-cluster-prod // pods: 12/12 // zero downtime rolling upgrade
          </div>

          <div className="opacity-50 tracking-wider">
            telemetry.scrape() // prometheus: 99.92% SLA // latency: 1.2ms
          </div>

          <div
            className={`transition-opacity duration-200 ${
              glitchPhase === 2 ? "opacity-80 text-emerald-400 font-bold" : "opacity-30"
            }`}
          >
            ansible.fleet.audit // 50+ nodes // configuration_drift: 0.00%
          </div>

          <div className="opacity-25 tracking-widest">
            0x7F4B9A // SYSTEM CONVERGED // REPEAT FOREVER // EX NIHILO
          </div>
        </div>

        {/* Monumental Resolution Headline */}
        <div className="mt-16 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Reliability is never accidental.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              It is engineered from zero.
            </span>
          </motion.h2>

          <p className="mt-6 font-mono text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Eliminating guesswork with deterministic infrastructure as code, automated pipelines,
            and continuous observability.
          </p>
        </div>
      </div>
    </section>
  )
}

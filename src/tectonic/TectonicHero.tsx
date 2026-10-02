import { motion } from "motion/react"
import TectonicPhysicsField from "./TectonicPhysicsField"
import { audio } from "./AudioEngine"

export default function TectonicHero() {
  const scrollTo = (id: string) => {
    audio.click()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden select-none"
      style={{ backgroundColor: "#090a0d" }}
    >
      {/* Background Interactive Tectonic Physics Field */}
      <TectonicPhysicsField className="z-0 opacity-60" density={52} />

      {/* Top Coordinate Strip */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 font-mono text-[0.72rem] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[#f0ece1] font-bold">[ 01 // IDENTITY ]</span>
          <span className="text-slate-600">/</span>
          <span>THE KINETIC TECTONICS OF CLOUD SYSTEMS</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-500">
          <span>LATENCY: 0.8ms</span>
          <span>·</span>
          <span>BENGALURU &amp; PARIS // GLOBAL AZURE RUNTIMES</span>
        </div>
      </div>

      {/* Monumental Typographic Anchor */}
      <div className="relative z-10 mx-auto w-full max-w-7xl my-auto py-12">
        <div className="space-y-1 sm:space-y-3">
          {/* EQUILIBRIUM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full select-none"
          >
            <h1
              className="text-5xl sm:text-8xl lg:text-[9.5rem] font-black tracking-[-0.05em] leading-[0.88] text-[#f0ece1] uppercase"
              style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
            >
              EQUILIBRIUM
            </h1>
          </motion.div>

          {/* UNDER TENSION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full select-none flex items-baseline gap-4 sm:gap-8 flex-wrap"
          >
            <span
              className="text-4xl sm:text-7xl lg:text-[7.5rem] font-black tracking-[-0.04em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 uppercase"
              style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
            >
              UNDER TENSION
            </span>

            <span className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase border border-[#d4ff00]/40 rounded-full px-3 py-1 bg-[#d4ff00]/10">
              [ 99.92% SUSTAINED SLA ]
            </span>
          </motion.div>
        </div>

        {/* Narrative & High-Impact Action Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-12 max-w-3xl space-y-6"
        >
          <p className="font-sans text-lg sm:text-2xl font-light text-slate-300 leading-relaxed">
            In cloud infrastructure, stability is never static. It is a continuous, high-velocity{" "}
            <strong className="text-white font-bold">equilibrium under tension</strong>.
            Architecting deterministic, self-healing platforms that transform production chaos into absolute silence.
          </p>

          <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
            Sahil Modan · Azure Cloud Operations &amp; SRE · 20+ CI/CD Pipelines · Terraform IaC · AKS Microservices.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => scrollTo("works")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#f0ece1] px-7 py-3.5 font-bold text-black shadow-2xl transition-all hover:bg-white active:scale-95 cursor-pointer"
            >
              <span>DISCOVER ARCHITECTURE</span>
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </button>

            <a
              href="mailto:sahilmodan333@gmail.com"
              onClick={() => audio.click()}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 font-medium text-slate-200 backdrop-blur-md transition-all hover:border-[#d4ff00]/60 hover:text-white active:scale-95 cursor-pointer"
            >
              <span>INITIATE CONVERGENCE</span>
              <span className="text-[#d4ff00] transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.click()}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>RÉSUMÉ ↗</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Coordinates */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-[0.7rem] text-slate-500">
        <div>
          <span>INTERACTIVE PHYSICS FIELD // CLICK OR DRAG TO DISPLACE</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00]" />
          <span>AUTOSCALING CLUSTER DESIRED STATE: 100% HEALTHY</span>
        </div>
      </div>
    </section>
  )
}

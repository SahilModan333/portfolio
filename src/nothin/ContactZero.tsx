import { motion } from "motion/react"
import { sound } from "./SoundEngine"
import { MechanicalArrow } from "./TactileArtifacts"

export default function ContactZero() {
  return (
    <footer
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#040507" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Section Marker */}
        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
          <span className="text-white font-bold">( 06 )</span>
          <span className="text-slate-700">/</span>
          <span>ENGAGEMENT // FROM ZERO</span>
        </div>

        {/* Massive Headline: Let's start from zero */}
        <div className="max-w-4xl">
          <h2
            className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Let's start
            <br />
            from zero.
          </h2>

          <p className="mt-6 font-mono text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            Open for Senior Azure Cloud Operations, DevOps Engineering, and Infrastructure Architecture contracts.
            Let's engineer your platform's next 99.9% uptime milestone.
          </p>
        </div>

        {/* Action Buttons: High-Contrast Agency Style */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:sahilmodan333@gmail.com"
            onClick={() => sound.click()}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-mono text-xs font-bold text-black shadow-2xl transition-all hover:bg-slate-200 active:scale-95 cursor-pointer"
          >
            <span>drop an email</span>
            <span className="text-sm font-sans">@</span>
          </a>

          <a
            href="tel:+918320122323"
            onClick={() => sound.click()}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 font-mono text-xs font-medium text-slate-200 backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10 active:scale-95 cursor-pointer"
          >
            <span>call +91 83201 22323</span>
            <MechanicalArrow size={16} color="#fff" className="group-hover:translate-x-1" />
          </a>
        </div>

        {/* Social Navigation Links */}
        <div className="mt-16 flex flex-wrap items-center gap-8 font-mono text-xs text-slate-400 border-t border-white/[0.08] pt-8">
          <a
            href="https://www.linkedin.com/in/sahil-modan-b5a73b184/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.tick()}
            className="hover:text-white transition-colors"
          >
            LINKEDIN ↗
          </a>
          <a
            href="https://github.com/SahilModan333"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.tick()}
            className="hover:text-white transition-colors"
          >
            GITHUB ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.tick()}
            className="hover:text-white transition-colors"
          >
            RÉSUMÉ ↗
          </a>
          <a
            href="mailto:sahilmodan333@gmail.com"
            onMouseEnter={() => sound.tick()}
            className="hover:text-white transition-colors"
          >
            SAHILMODAN333@GMAIL.COM
          </a>
        </div>
      </div>

      {/* Massive Signature Monogram Vector Spanning Bottom Edge */}
      <div className="relative z-0 mt-16 pt-8 border-t border-white/[0.04] w-full overflow-hidden select-none pointer-events-none">
        <svg
          viewBox="0 0 1200 140"
          className="w-full h-auto text-white/[0.07]"
          fill="currentColor"
        >
          <text
            x="50%"
            y="65%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-black tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-display, 'Syne', sans-serif)",
              fontSize: "128px",
              letterSpacing: "-0.04em",
            }}
          >
            SAHIL MODAN
          </text>
        </svg>
      </div>

      {/* Fine-Print Colophon */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[0.68rem] text-slate-500 pt-4">
        <div>
          <span>© 2026 — Sahil Modan · Azure Cloud Operations &amp; DevOps Engineering</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>All production systems 99.9% operational</span>
        </div>
      </div>
    </footer>
  )
}

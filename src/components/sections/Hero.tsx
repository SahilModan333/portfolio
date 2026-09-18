import { motion } from "framer-motion"
import { ChevronDown, FileText, ArrowRight } from "lucide-react"
import { profile } from "../../data/profile"
import { getYearsLabel } from "../../data/config"
import GithubIcon from "../ui/GithubIcon"
import LinkedinIcon from "../ui/LinkedinIcon"
import DevOpsExcite from "../DevOpsExcite"
import AzureBadgeStrip from "../AzureBadgeStrip"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
}

export default function Hero({ onResumeOpen }: { onResumeOpen: () => void }) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#080d1a" }}
      aria-label="Hero"
    >
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Radial gradient glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 mb-7"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-sky-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
              <span
                className="text-xs font-semibold text-sky-400 tracking-[0.2em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Cloud Operations → DevOps Engineering
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-4xl lg:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Building reliable{" "}
              <span className="text-sky-400">cloud infrastructure</span>,
              automation &amp; deployment systems.
            </motion.h1>

            {/* Bio — derived from siteConfig.careerStartDate (2022-05) */}
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-base lg:text-lg text-slate-400 leading-relaxed mb-9 max-w-xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              Azure Cloud Operations Engineer with {getYearsLabel()} of experience working with
              production Azure environments, CI/CD pipelines, infrastructure automation,
              containers, monitoring and production operations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-sky-500 text-white font-semibold text-sm hover:bg-sky-400 active:scale-[0.97] transition-all duration-150"
              >
                Explore My Engineering Work
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onResumeOpen}
                aria-label="Open resume preview — popup with download"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-slate-300 font-medium text-sm hover:bg-white/6 hover:text-white hover:border-white/30 active:scale-[0.97] transition-all duration-150"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <FileText size={14} />
                Preview & Download Resume
              </button>
            </motion.div>

            {/* Social + Azure badges — load excitement right away */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-5">
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                  <GithubIcon size={15} /> GitHub
                </a>
                <span className="w-px h-3.5 bg-slate-800" />
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </div>
              {/* Official Microsoft Azure badge strip — appears on first paint, stagger 60ms */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <AzureBadgeStrip />
              </motion.div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            {/* DevOps Control Plane — signature interaction: pipeline scrub + pod scale + sparkline + deploy trigger */}
            <DevOpsExcite />
            <p className="text-xs text-slate-600 text-center hidden lg:block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              → click &quot;Trigger deploy&quot; to run the pipeline visually • count-up once, mono for data
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  )
}

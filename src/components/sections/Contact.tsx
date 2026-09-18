import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { profile } from "../../data/profile"
import { Mail, FileText, ArrowRight } from "lucide-react"
import GithubIcon from "../ui/GithubIcon"
import LinkedinIcon from "../ui/LinkedinIcon"

export default function Contact({ onResumeOpen }: { onResumeOpen: () => void }) {
  const { ref, isInView } = useInView()

  return (
    <section id="contact" className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(56,189,248,0.05) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-sky-500/40" />
            <span
              className="text-xs font-medium text-sky-400 tracking-[0.18em] uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Get in Touch
            </span>
            <div className="h-px w-8 bg-sky-500/40" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight" style={{ textWrap: "balance" } as React.CSSProperties}>
            Let's build reliable systems — together.
          </h2>
          <p className="text-slate-300 mb-3 leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
            DevOps, cloud infrastructure, automation or platform work — let's talk.
          </p>
          <p className="text-xs text-slate-500 mb-10" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Expected response: within 24h • Bengaluru (IST) • Available for freelance & full-time discussions
          </p>

          {/* Email CTA — visible email per 5.6 */}
          <motion.a
            href={`mailto:${profile.email}?subject=Hello%20Sahil%20—%20from%20sahildevops.me`}
            whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 text-white font-semibold text-base hover:bg-sky-400 transition-colors duration-200 mb-8 group"
            aria-label={`Email Sahil at ${profile.email} — expect reply within 24 hours`}
          >
            <Mail size={18} />
            {profile.email}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>

          {/* Secondary — resume now opens popup, not new tab directly */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-slate-400 hover:text-white hover:border-white/25 active:scale-[0.97] text-sm transition-all duration-150"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <GithubIcon size={15} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-slate-400 hover:text-white hover:border-white/25 active:scale-[0.97] text-sm transition-all duration-150"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <button
              onClick={onResumeOpen}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:text-white hover:bg-sky-500/15 hover:border-sky-400 active:scale-[0.97] text-sm transition-all duration-150"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              aria-label="Preview and download resume — opens popup"
            >
              <FileText size={15} /> Preview & Download Resume
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Popup shows live PDF • Esc to close • open <a href="/resume" className="text-sky-400 hover:underline underline-offset-4">HTML mirror</a> (crawlable)
          </p>
        </motion.div>
      </div>
    </section>
  )
}

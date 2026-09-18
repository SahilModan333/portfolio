import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, ExternalLink, FileText } from "lucide-react"
import { profile } from "../data/profile"
import { siteConfig } from "../data/config"

// Emil: modal 200-500ms, enter ease-out custom, exit faster than enter, scale from 0.96 not 0, transform+opacity only
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: [0.32, 0, 0.67, 0] as const } },
}

const modalVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] as const },
  },
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Lock scroll, focus trap, Esc
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => closeRef.current?.focus(), 40)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — subtle, not pure black */}
          <motion.div
            className="fixed inset-0 z-[80] bg-[#080d1a]/70 backdrop-blur-[6px]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden
          />

          {/* Centered modal — stays centered, never origin from trigger */}
          <motion.div
            className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label="Resume preview and download"
          >
            {/* Panel — click inside doesn't close */}
            <motion.div
              ref={panelRef}
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[920px] max-h-[88vh] flex flex-col rounded-[20px] border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] overflow-hidden"
              // Emil: only transform+opacity animate — shadow/border is static
            >
              {/* Header — sticky, from tokens */}
              <div className="shrink-0 flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white grid place-items-center font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    S
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {siteConfig.name} — Resume
                    </div>
                    <div className="text-xs text-slate-500 truncate" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      4+ years • Azure DevOps • Terraform • Kubernetes • Updated 2026-09-19
                    </div>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="w-9 h-9 grid place-items-center rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04] hover:border-slate-300 active:scale-[0.97] transition-all duration-150"
                  aria-label="Close resume preview"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Preview — PDF embed with fallback */}
              <div className="flex-1 min-h-[320px] bg-slate-950 overflow-hidden relative">
                {/* Top signal accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-sky-500" />
                <iframe
                  src={`${profile.resumePath}#view=FitH`}
                  title="Sahil Modan Resume PDF preview"
                  className="w-full h-[62vh] sm:h-[64vh] border-0 bg-white"
                  loading="lazy"
                />
                {/* Fallback bar for browsers that block iframe PDF */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex items-center justify-between gap-3 bg-slate-950/90 backdrop-blur border-t border-white/10">
                  <span className="text-xs text-slate-400 hidden sm:inline" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    // preview — if blocked, open in new tab
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <a
                      href={profile.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/25 active:scale-[0.97] transition-all"
                    >
                      <ExternalLink size={12} /> Open in new tab
                    </a>
                    <a
                      href={profile.resumePath}
                      download={siteConfig.resume.canonicalFilename}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500 text-white text-xs font-semibold hover:bg-sky-400 active:scale-[0.97] transition-all"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      <Download size={13} /> Download PDF
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer actions — always reachable */}
              <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-white border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <FileText size={13} className="text-slate-400" />
                  <span style={{ fontFamily: "JetBrains Mono, monospace" }}>Sahil_Modan_DevOps_Engineer_Resume.pdf</span>
                  <span className="hidden sm:inline">•</span>
                  <a href="/resume" className="text-sky-600 hover:text-sky-700 hover:underline">
                    HTML mirror
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={profile.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.97] transition-all"
                  >
                    Open
                  </a>
                  <a
                    href={profile.resumePath}
                    download={siteConfig.resume.canonicalFilename}
                    className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 active:scale-[0.97] transition-all"
                  >
                    Download — new tab ready
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Convenience trigger button (optional) — emil: press feedback 100-160ms, transform scale 0.97
export function ResumeButton({
  children = "Resume",
  variant = "primary",
  onOpen,
}: {
  children?: React.ReactNode
  variant?: "primary" | "ghost"
  onOpen: () => void
}) {
  const base =
    "inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full border active:scale-[0.97] transition-all duration-150"
  const styles =
    variant === "primary"
      ? "border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:border-sky-400 bg-transparent"
      : "border-white/12 text-slate-400 hover:text-white hover:border-white/25 bg-transparent"
  return (
    <button onClick={onOpen} className={`${base} ${styles}`} style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <FileText size={13} /> {children}
    </button>
  )
}

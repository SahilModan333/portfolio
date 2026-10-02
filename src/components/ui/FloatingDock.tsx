import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { TerminalIcon, DocumentIcon, GitBranchIcon, CpuIcon, ShieldIcon, MailIcon, ActivityIcon, ServerIcon } from "./Icons"
import { profile } from "../../data/profile"

interface DockItem {
  id: string
  label: string
  href: string
  icon: typeof TerminalIcon
  external?: boolean
}

const dockItems: DockItem[] = [
  { id: "hero", label: "Top · Control Plane", href: "#about", icon: ActivityIcon },
  { id: "experience", label: "Work & Profile", href: "#experience", icon: GitBranchIcon },
  { id: "projects", label: "Engineered Builds", href: "#projects", icon: CpuIcon },
  { id: "pipeline", label: "DevOps Pipeline", href: "#pipeline", icon: ServerIcon },
  { id: "terminal", label: "Interactive Shell", href: "#terminal", icon: TerminalIcon },
  { id: "certifications", label: "Microsoft Badges", href: "#certifications", icon: ShieldIcon },
  { id: "hire", label: "Hire Me / Work With Me", href: "#contact", icon: MailIcon },
  { id: "resume", label: "Preview & Download Résumé", href: profile.resumePath, icon: DocumentIcon, external: true },
]

export default function FloatingDock() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#080d18]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
      >
        {dockItems.map((item) => {
          const isHovered = hoveredId === item.id
          const Icon = item.icon

          return (
            <div key={item.id} className="relative">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-slate-900/95 px-3 py-1.5 font-mono text-xs font-semibold text-slate-100 shadow-2xl backdrop-blur-md"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  item.id === "terminal"
                    ? "bg-sky-500/20 text-sky-400 hover:bg-sky-500/35 hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : item.id === "hire"
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/35 hover:shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                    : "text-slate-300 hover:bg-white/[0.1] hover:text-white"
                }`}
                aria-label={item.label}
              >
                <Icon size={17} />
              </motion.a>
            </div>
          )
        })}
      </motion.nav>
    </div>
  )
}

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { profile } from "../../data/profile"
import {
  TerminalIcon,
  DocumentIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  CloudIcon,
  CpuIcon,
  GitBranchIcon,
  ShieldIcon,
  ActivityIcon,
} from "./Icons"

interface CommandItem {
  id: string
  title: string
  category: "Navigation" | "Actions" | "Social"
  icon: typeof TerminalIcon
  action: () => void
  hint?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenTerminal?: () => void
}

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const navigateTo = (hash: string) => {
    onClose()
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1200)
  }

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      title: "Hero & Introduction",
      category: "Navigation",
      icon: ActivityIcon,
      action: () => navigateTo("#about"),
      hint: "Top",
    },
    {
      id: "nav-timeline",
      title: "Career & Systems Timeline",
      category: "Navigation",
      icon: GitBranchIcon,
      action: () => navigateTo("#timeline"),
      hint: "2016–2026",
    },
    {
      id: "nav-control-plane",
      title: "Control Plane Deploy Simulator",
      category: "Navigation",
      icon: CpuIcon,
      action: () => navigateTo("#control-plane"),
      hint: "Live Deploy",
    },
    {
      id: "nav-projects",
      title: "Engineered Builds (Garage Grid)",
      category: "Navigation",
      icon: CloudIcon,
      action: () => navigateTo("#projects"),
      hint: "4 Builds",
    },
    {
      id: "nav-pipeline",
      title: "9-Stage DevOps Pipeline",
      category: "Navigation",
      icon: GitBranchIcon,
      action: () => navigateTo("#pipeline"),
      hint: "01 to 09",
    },
    {
      id: "nav-terminal",
      title: "Interactive SRE Terminal Shell",
      category: "Navigation",
      icon: TerminalIcon,
      action: () => {
        onClose()
        if (onOpenTerminal) onOpenTerminal()
        else navigateTo("#terminal")
      },
      hint: "CLI",
    },
    {
      id: "nav-skills",
      title: "Technical Stack & Tools",
      category: "Navigation",
      icon: CpuIcon,
      action: () => navigateTo("#skills"),
      hint: "Tech",
    },
    {
      id: "nav-certifications",
      title: "Microsoft Certifications & Degrees",
      category: "Navigation",
      icon: ShieldIcon,
      action: () => navigateTo("#certifications"),
      hint: "AZ-400",
    },
    {
      id: "nav-contact",
      title: "Hire Me / Say Hi",
      category: "Navigation",
      icon: MailIcon,
      action: () => navigateTo("#contact"),
      hint: "Contact",
    },
    // Actions
    {
      id: "act-copy-email",
      title: copied ? "Email Copied to Clipboard!" : `Copy Email (${profile.email})`,
      category: "Actions",
      icon: copied ? CheckIcon : CopyIcon,
      action: copyEmail,
      hint: "Clipboard",
    },
    {
      id: "act-resume",
      title: "Preview & Download Résumé (PDF)",
      category: "Actions",
      icon: DocumentIcon,
      action: () => {
        window.open(profile.resumePath, "_blank")
        onClose()
      },
      hint: "PDF",
    },
    // Social
    {
      id: "soc-github",
      title: "GitHub Profile (@SahilModan333)",
      category: "Social",
      icon: GithubIcon,
      action: () => {
        window.open(profile.github, "_blank")
        onClose()
      },
      hint: "github.com",
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile (in/sahil-modan)",
      category: "Social",
      icon: LinkedinIcon,
      action: () => {
        window.open(profile.linkedin, "_blank")
        onClose()
      },
      hint: "linkedin.com",
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.hint && item.hint.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          const el = document.getElementById("cmd-trigger")
          if (el) el.click()
        }
      }

      if (!isOpen) return

      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-28">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0e17]/95 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <span className="font-mono text-sm text-sky-400">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, action, or social link..."
                className="w-full bg-transparent font-mono text-sm text-white placeholder-slate-500 outline-none"
              />
              <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-400">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 scrollbar-none">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center font-mono text-xs text-slate-500">
                  No matching destinations found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = selectedIndex === idx
                  const Icon = item.icon

                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-mono text-xs transition-colors ${
                        isSelected
                          ? "bg-sky-500/20 text-white"
                          : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                            isSelected
                              ? "border-sky-400/40 bg-sky-500/30 text-sky-200"
                              : "border-white/10 bg-white/[0.03] text-slate-400"
                          }`}
                        >
                          <Icon size={14} />
                        </span>
                        <div>
                          <span className="font-medium text-slate-100">{item.title}</span>
                          <span className="ml-2 text-[0.65rem] text-slate-500 uppercase">
                            · {item.category}
                          </span>
                        </div>
                      </div>

                      {item.hint && (
                        <span className="font-mono text-[0.65rem] text-slate-400">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-slate-950/80 px-4 py-2.5 text-[0.7rem] text-slate-400">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="rounded bg-white/10 px-1 py-0.5 text-[0.65rem]">↑</kbd>
                  <kbd className="ml-1 rounded bg-white/10 px-1 py-0.5 text-[0.65rem]">↓</kbd> navigate
                </span>
                <span>
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem]">↵</kbd> select
                </span>
              </div>
              <span className="font-mono text-[0.65rem] text-sky-400">sahildevops.me</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

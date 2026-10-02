import { useEffect, useState } from "react"
import { portfolioConfig } from "../data/portfolio.config"
import { DocumentIcon } from "./ui/Icons"
import { sound } from "../lib/sound"

interface NavProps {
  onOpenCommandPalette: () => void
  onOpenTerminal: () => void
}

export default function Nav({ onOpenCommandPalette, onOpenTerminal }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const p = portfolioConfig.personal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#0c0e12]/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "border-b border-transparent bg-[#111317]/80 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8"
      >
        {/* Brand with Live Status Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#about"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white transition-colors hover:text-sky-400"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
              &gt;
            </span>
            <span className="tracking-wider uppercase">{p.name}</span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-emerald-400 sm:flex">
            <span className="pulse-beacon bg-emerald-400" />
            <span className="font-mono">{p.statusBeacon}</span>
          </div>
        </div>

        {/* Bryan Garage Header Actions */}
        <div className="flex items-center gap-3">
          {/* Jump to (⌘K) Command Trigger */}
          <button
            id="cmd-trigger"
            type="button"
            onClick={() => {
              sound.playClick()
              onOpenCommandPalette()
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white"
            title="Jump to... (⌘K / Ctrl+K)"
          >
            <span>Jump to</span>
            <span className="flex items-center gap-0.5 rounded bg-white/10 px-1 py-0.2 text-[0.62rem] text-slate-300">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>

          {/* Signature Bryan Garage Orange Circle Terminal Button (>_) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick()
              onOpenTerminal()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/60 bg-orange-500/10 text-orange-400 font-mono text-xs font-bold shadow-md shadow-orange-500/20 hover:bg-orange-500 hover:text-black transition-all"
            title="Open CLI Terminal"
          >
            <span className="flex items-center gap-0.5">
              <span>&gt;</span>
              <span className="animate-pulse">_</span>
            </span>
          </button>

          {/* Download Resume Link */}
          <a
            href={p.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20 hover:text-sky-200"
          >
            <DocumentIcon size={13} />
            <span>Resume</span>
            <span className="text-[0.65rem] text-sky-400">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

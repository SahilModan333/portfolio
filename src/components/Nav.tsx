import { useEffect, useState } from "react"
import { profile } from "../data/profile"
import { DocumentIcon, TerminalIcon } from "./ui/Icons"

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Engineering", href: "#projects" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

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
          ? "border-b border-white/[0.08] bg-[#080b11]/90 backdrop-blur-md shadow-lg shadow-black/40"
          : "border-b border-transparent bg-[#080b11]/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8"
      >
        <div className="flex items-center gap-3">
          <a
            href="#about"
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white transition-colors hover:text-sky-400"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
              &gt;
            </span>
            <span className="tracking-wider uppercase">SAHIL MODAN</span>
          </a>

          {/* Live Platform Status Indicator */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[0.75rem] font-medium text-emerald-400 sm:flex">
            <span className="pulse-beacon bg-emerald-400" />
            <span className="font-mono">99.9% SLA · Operational</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pl-2">
            <a
              href="#terminal"
              className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-300 lg:inline-flex"
              title="Launch operations terminal"
            >
              <TerminalIcon size={13} />
              <span>Shell</span>
            </a>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20 hover:text-sky-200"
            >
              <DocumentIcon size={13} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Swipeable rail on narrow mobile viewports */}
      <div className="rail border-t border-white/[0.06] bg-[#090d16]/95 md:hidden">
        <ul className="flex w-max items-center gap-1 px-4 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-md px-2.5 py-1 font-mono text-xs whitespace-nowrap text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-slate-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

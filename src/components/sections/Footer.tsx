import { portfolioConfig } from "../../data/portfolio.config"
import { GithubIcon, LinkedinIcon, DocumentIcon, MailIcon } from "../ui/Icons"
import { sound } from "../../lib/sound"

export default function Footer() {
  const p = portfolioConfig.personal

  return (
    <footer className="border-t border-white/[0.08] bg-[#05080e] py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">
              &gt; {p.name}
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-xs text-sky-400">
              {p.badgeTitle || "Cloud Operations Engineer → DevOps Engineering"}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {p.company} · {p.location} · Enterprise Cloud &amp; DevOps Engineering
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="pulse-beacon bg-emerald-400" />
            <span>{p.statusBeacon || "All Systems 99.9% Operational"}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`mailto:${p.email}`}
              onClick={() => sound.playClick()}
              className="hover:text-sky-400 transition-colors"
              title={`Email ${p.name}`}
            >
              <MailIcon size={17} />
            </a>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={p.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-sky-400 transition-colors"
              title="Download Resume"
            >
              <DocumentIcon size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/[0.04] px-6 pt-6 text-center lg:px-8">
        <p className="font-mono text-xs text-slate-500">
          Designed with GSAP, ThreeUI, 21st.dev &amp; TasteSkill · © {new Date().getFullYear()} {p.name} · All rights reserved.
        </p>
      </div>
    </footer>
  )
}

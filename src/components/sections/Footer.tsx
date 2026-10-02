import { profile } from "../../data/profile"
import { GithubIcon, LinkedinIcon, DocumentIcon, MailIcon } from "../ui/Icons"

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05080e] py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">
              &gt; {profile.name}
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-xs text-sky-400">
              Cloud Operations Engineer → DevOps Engineering
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {profile.company} · {profile.location} · Enterprise Cloud &amp; DevOps Engineering
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="pulse-beacon bg-emerald-400" />
            <span>All Systems 99.9% Operational</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-sky-400 transition-colors"
              title="Email Sahil"
            >
              <MailIcon size={17} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
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
          Designed with GSAP, ThreeUI, 21st.dev &amp; TasteSkill · © {new Date().getFullYear()} Sahil Modan · All rights reserved.
        </p>
      </div>
    </footer>
  )
}

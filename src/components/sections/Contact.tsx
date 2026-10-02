import { useState } from "react"
import { profile } from "../../data/profile"
import { MailIcon, DocumentIcon, GithubIcon, LinkedinIcon, CopyIcon, CheckIcon, ArrowUpRightIcon } from "../ui/Icons"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative border-t border-white/[0.08] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="glass-card relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-[#070b14] p-8 sm:p-14">
          <div className="max-w-2xl">
            <div className="section-badge mb-4">Get in touch</div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Hiring for DevOps, Cloud, or Platform Engineering?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Four years running production Azure operations on 24x7 rotation with a proven track record:
              owning end-to-end delivery pipelines, architecting repeatable Terraform &amp; AKS infrastructure,
              and sustaining 99.9% uptime. Let&apos;s build resilient systems together.
            </p>

            {/* Direct Email Action with Copy Button */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-mono text-sm font-semibold text-slate-950 transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/25 active:translate-y-0.5"
              >
                <MailIcon size={18} />
                <span>{profile.email}</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 font-mono text-sm text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <CheckIcon size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-5 py-3 font-mono text-sm font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
              >
                <DocumentIcon size={16} />
                <span>Download Résumé (PDF)</span>
                <ArrowUpRightIcon size={13} className="text-sky-400" />
              </a>
            </div>

            {/* Direct Channels */}
            <div className="mt-10 border-t border-white/[0.08] pt-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Direct Channels &amp; Profiles
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-6 font-mono text-sm text-slate-300">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-sky-400 transition-colors"
                  >
                    <GithubIcon size={16} />
                    <span>github.com/SahilModan333</span>
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-sky-400 transition-colors"
                  >
                    <LinkedinIcon size={16} />
                    <span>linkedin.com/in/sahil-modan</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex items-center gap-2 hover:text-sky-400 transition-colors"
                  >
                    <span>📞 {profile.phone}</span>
                  </a>
                </li>
                <li className="text-slate-400">
                  <span>📍 {profile.location}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

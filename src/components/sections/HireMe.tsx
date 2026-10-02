import { useState } from "react"
import { profile } from "../../data/profile"
import { MailIcon, DocumentIcon, GithubIcon, LinkedinIcon, CopyIcon, CheckIcon, ArrowUpRightIcon, ShieldIcon } from "../ui/Icons"
import MagneticButton from "../ui/MagneticButton"
import SpotlightCard from "../ui/SpotlightCard"

export default function HireMe() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative border-t border-white/[0.08] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.2)"
          className="relative overflow-hidden rounded-3xl border border-white/[0.14] bg-gradient-to-br from-slate-900/95 via-[#0b101e] to-[#060a12] p-8 sm:p-14"
        >
          <div className="max-w-3xl">
            {/* High-Impact Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs text-sky-300 backdrop-blur-md">
              <span className="pulse-beacon bg-sky-400" />
              <span className="font-mono font-semibold uppercase tracking-wider">
                Work With Me · Hire Me
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Like my work? Let&apos;s build reliable cloud systems together.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              I specialize in <strong>Azure DevOps engineering, Infrastructure as Code with Terraform, container orchestration with AKS, and automated fleet configuration with Ansible</strong>.
              Whether you are looking for a dedicated full-time DevOps engineer, platform infrastructure ownership, or high-reliability cloud architecture, let&apos;s connect.
            </p>

            {/* Value Proposition Highlights */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.08] bg-slate-950/60 p-4">
                <span className="font-mono text-xs font-bold text-sky-400">01 · Proven Track Record</span>
                <p className="mt-1 text-xs text-slate-300">
                  4+ years operating enterprise Azure SaaS at 99.9% uptime with 20+ CI/CD pipelines.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-slate-950/60 p-4">
                <span className="font-mono text-xs font-bold text-emerald-400">02 · Triple Microsoft Certified</span>
                <p className="mt-1 text-xs text-slate-300">
                  DevOps Engineer Expert (AZ-400), Administrator (AZ-104), and Fundamentals (AZ-900).
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-slate-950/60 p-4">
                <span className="font-mono text-xs font-bold text-indigo-400">03 · Zero-Drift Automation</span>
                <p className="mt-1 text-xs text-slate-300">
                  Idempotent Terraform &amp; Ansible playbooks eliminating manual snowflake server administration.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons with Magnetic Pull */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href={`mailto:${profile.email}?subject=DevOps%20Opportunity%20%E2%80%94%20from%20sahildevops.me`}>
                <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 font-mono text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95">
                  <MailIcon size={18} />
                  <span>Hire Me · {profile.email}</span>
                </span>
              </MagneticButton>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3.5 font-mono text-sm text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <CheckIcon size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <MagneticButton href={profile.resumePath} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-5 py-3.5 font-mono text-sm font-semibold text-sky-300 transition-colors hover:bg-sky-500/20">
                  <DocumentIcon size={16} />
                  <span>Download Résumé (PDF)</span>
                  <ArrowUpRightIcon size={13} className="text-sky-400" />
                </span>
              </MagneticButton>
            </div>

            {/* Operational SLA & Availability Details */}
            <div className="mt-10 border-t border-white/[0.08] pt-6 text-xs text-slate-400">
              <p className="font-mono text-slate-300">
                Expected response: <strong className="text-sky-400">within 24 hours</strong> · Based in Bengaluru (IST) · Available for full-time engineering &amp; high-impact consulting
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-6 font-mono text-slate-300">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors"
                >
                  <GithubIcon size={15} />
                  <span>GitHub: SahilModan333</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn: in/sahil-modan</span>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors"
                >
                  <span>Direct: {profile.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}

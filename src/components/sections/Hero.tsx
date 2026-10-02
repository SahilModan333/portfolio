import { profile, productionResponsibilities, uptimeDays } from "../../data/profile"
import { MailIcon, DocumentIcon, ArrowUpRightIcon, GithubIcon, LinkedinIcon, ShieldIcon, CheckIcon } from "../ui/Icons"
import { AzureLogo } from "../devops/TechnologyLogos"
import { AuroraBackdrop } from "../motion/aurora-backdrop"
import DevOpsWorldCanvas from "../3d/DevOpsWorldCanvas"
import SpotlightCard from "../ui/SpotlightCard"
import TextDecrypt from "../ui/TextDecrypt"
import MagneticButton from "../ui/MagneticButton"
import ControlPlaneSimulator from "../interactive/ControlPlaneSimulator"

const certBadges = [
  {
    code: "AZ-400",
    tier: "Expert",
    name: "DevOps Engineer Expert",
    href: "https://learn.microsoft.com/en-gb/users/sahilmodan-8698/credentials/af1a90324c78e6dd",
    badgeSrc: "/badges/azure-expert.svg",
    color: "from-sky-500 to-indigo-500",
    border: "border-sky-500/30",
  },
  {
    code: "AZ-104",
    tier: "Associate",
    name: "Azure Administrator Associate",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    badgeSrc: "/badges/azure-associate.svg",
    color: "from-cyan-500 to-sky-500",
    border: "border-cyan-500/30",
  },
  {
    code: "AZ-900",
    tier: "Fundamentals",
    name: "Azure Fundamentals",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    badgeSrc: "/badges/azure-fundamentals.svg",
    color: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/30",
  },
]

export default function Hero() {
  return (
    <section id="about" className="relative min-h-[95vh] overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* 1. Ambient Motion Aurora Mesh */}
      <AuroraBackdrop
        colors={["rgba(56, 189, 248, 0.18)", "rgba(99, 102, 241, 0.15)", "rgba(16, 185, 129, 0.12)"]}
        blobs={4}
        speed={0.7}
        blur="stronger"
      />

      {/* 2. ThreeUI 3D Cloud Topology Canvas (Behind Hero / Right Align) */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-[700px] w-full max-w-[900px] opacity-75 lg:opacity-90">
        <DevOpsWorldCanvas />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Exact Kicker from User: Cloud Operations → DevOps Engineering */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/85 px-4 py-1.5 text-xs text-sky-300 backdrop-blur-md shadow-lg shadow-sky-500/10">
            <span className="pulse-beacon bg-sky-400" />
            <span className="font-mono font-semibold tracking-wide">
              <TextDecrypt text="Cloud Operations → DevOps Engineering" />
            </span>
          </div>

          {/* Headline matching user's site */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            Building reliable cloud infrastructure,{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              automation &amp; deployment systems.
            </span>
          </h1>

          {/* Subtitle from user's site & resume */}
          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            Azure Cloud Operations Engineer with <strong className="text-white font-bold">4+ years of experience</strong> supporting production Microsoft Azure environments and building Azure DevOps CI/CD pipelines. Skilled in Terraform, ARM Templates, Docker, Kubernetes (AKS), Ansible, and Linux infrastructure automation.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">
              <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-mono text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95">
                <span>Explore My Engineering Work</span>
                <span className="text-slate-900">→</span>
              </span>
            </MagneticButton>

            <MagneticButton href={profile.resumePath} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-5 py-3 font-mono text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-sky-500/50 hover:bg-white/10">
                <DocumentIcon size={16} />
                <span>Preview &amp; Download Resume</span>
                <ArrowUpRightIcon size={13} className="text-slate-400" />
              </span>
            </MagneticButton>

            <MagneticButton href="#contact">
              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-mono text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20">
                <MailIcon size={16} />
                <span>Hire Me / Work With Me</span>
              </span>
            </MagneticButton>

            <div className="flex items-center gap-2 pl-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 transition-colors hover:border-sky-400 hover:text-white"
                title="GitHub: SahilModan333"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 transition-colors hover:border-sky-400 hover:text-white"
                title="LinkedIn: in/sahil-modan"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Microsoft Azure Certified Bar */}
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-slate-950/70 p-4 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
              <div className="flex items-center gap-2">
                <AzureLogo size={16} className="text-sky-400 flex-none" />
                <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Microsoft Azure Certified
                </span>
              </div>
              <span className="font-mono text-[0.7rem] text-slate-400">
                // official badges • click to verify on Microsoft Learn
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2.5">
              {certBadges.map((cert) => (
                <a
                  key={cert.code}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Verify ${cert.code} (${cert.name}) on Microsoft Learn`}
                  className={`group inline-flex items-center gap-2.5 rounded-lg border ${cert.border} bg-slate-900/90 px-3 py-1.5 font-mono text-xs transition-all hover:scale-[1.02] hover:border-sky-400`}
                >
                  <img
                    src={cert.badgeSrc}
                    alt={`${cert.code} symbol`}
                    className="h-5 w-5 object-contain flex-none drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
                    width={20}
                    height={20}
                    loading="eager"
                  />
                  <span className="font-bold text-white">{cert.code}</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem] text-slate-300 group-hover:text-white">
                    {cert.tier}
                  </span>
                  <ArrowUpRightIcon size={12} className="text-slate-500 group-hover:text-sky-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── VISUALLY PROMINENT EXPERIENCE & SCALE HIERARCHY ─── */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.2)"
            className="p-4 sm:p-5 transition-all hover:border-sky-500/40"
          >
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-sky-400">
              EXPERIENCE
            </span>
            <div className="mt-1 font-mono text-2xl font-extrabold text-white sm:text-3xl">
              4+ Years
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Stibo Systems · Cloud Operations &amp; DevOps
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.2)"
            className="p-4 sm:p-5 transition-all hover:border-sky-500/40"
          >
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-sky-400">
              CI/CD PIPELINES
            </span>
            <div className="mt-1 font-mono text-2xl font-extrabold text-sky-300 sm:text-3xl">
              20+ Pipelines
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Across 4 environments (Dev, QA, UAT, Prod)
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(52, 211, 153, 0.2)"
            className="p-4 sm:p-5 transition-all hover:border-emerald-500/40"
          >
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-emerald-400">
              PLATFORM SLA
            </span>
            <div className="mt-1 font-mono text-2xl font-extrabold text-emerald-400 sm:text-3xl">
              99.9% Uptime
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Sustained across multi-tenant enterprise SaaS
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.2)"
            className="p-4 sm:p-5 transition-all hover:border-indigo-500/40"
          >
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-indigo-400">
              FLEET AUTOMATION
            </span>
            <div className="mt-1 font-mono text-2xl font-extrabold text-indigo-300 sm:text-3xl">
              50+ Servers
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Ansible managed · Zero configuration drift
            </p>
          </SpotlightCard>
        </div>

        {/* ─── COMPACT DEPLOYMENT SIMULATOR ─── */}
        <div className="mt-6">
          <ControlPlaneSimulator />
        </div>

        {/* ─── "WHAT I ACTUALLY DO IN PRODUCTION" ─── */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-slate-950/70 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <h2 className="font-mono text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                  What I Actually Do in Production
                </h2>
                <span className="rounded bg-sky-500/10 px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-sky-400 border border-sky-500/20">
                  Engineering Scope
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Core daily responsibilities &amp; operational systems ownership at Stibo Systems (May 2022 — Present)
              </p>
            </div>

            {/* 45-day uptime heatmap block */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                <span className="pulse-beacon bg-emerald-400" />
                <span>Production SLA: 99.9% Met</span>
              </div>
              <div className="flex items-center gap-1" title="45-day rolling platform uptime">
                {uptimeDays.map((d) => (
                  <div
                    key={d.day}
                    className={`h-4 w-1.5 rounded-xs transition-transform hover:scale-150 ${
                      d.uptime >= 99.9 ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                    title={`Day ${d.day}: ${d.uptime}% Uptime`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 5 Concrete Operational Responsibility Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productionResponsibilities.map((resp, idx) => (
              <SpotlightCard
                key={resp.title}
                spotlightColor="rgba(56, 189, 248, 0.15)"
                className="flex h-full flex-col justify-between p-5 transition-all hover:border-sky-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-sky-500/10 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-sky-400 border border-sky-500/20">
                      {resp.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {resp.metric}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">
                    {resp.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {resp.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-white/[0.06] pt-3">
                  <ul className="flex flex-wrap gap-1.5 font-mono text-[0.68rem] text-slate-400">
                    {resp.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-slate-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { profile, serviceRecord, uptimeDays, type RecordRow } from "../../data/profile"
import { MailIcon, DocumentIcon, ArrowUpRightIcon, GithubIcon, LinkedinIcon, ShieldIcon } from "../ui/Icons"
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
    color: "from-sky-500 to-indigo-500",
    border: "border-sky-500/30",
  },
  {
    code: "AZ-104",
    tier: "Associate",
    name: "Azure Administrator Associate",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    color: "from-cyan-500 to-sky-500",
    border: "border-cyan-500/30",
  },
  {
    code: "AZ-900",
    tier: "Fundamentals",
    name: "Azure Fundamentals",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    color: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/30",
  },
]

function MetricCard({ row }: { row: RecordRow }) {
  return (
    <SpotlightCard
      className="p-4 transition-all duration-300 hover:border-sky-500/40"
      spotlightColor="rgba(56, 189, 248, 0.2)"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          {row.label}
        </span>
        {row.badge && (
          <span className="rounded bg-sky-500/10 px-1.5 py-0.5 font-mono text-[0.65rem] font-medium text-sky-400 border border-sky-500/20">
            {row.badge}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="tnum font-mono text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          {row.value}
        </span>
        {row.state === "ok" && (
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        )}
      </div>

      {row.subvalue && (
        <span className="mt-1 font-mono text-xs text-sky-300/80">
          {row.subvalue}
        </span>
      )}

      {row.note && (
        <span className="mt-1 text-xs text-slate-400">
          {row.note}
        </span>
      )}

      {row.meter !== undefined && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-1000"
            style={{ width: `${row.meter * 100}%` }}
          />
        </div>
      )}
    </SpotlightCard>
  )
}

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
            Azure Cloud Operations Engineer with <strong className="text-white">4+ years of experience</strong> working with production Azure environments, CI/CD pipelines, infrastructure automation, containers, monitoring and production operations.
          </p>

          {/* Primary Action Buttons (TasteSkill / GSAP spring physics) */}
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
            <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldIcon size={15} className="text-sky-400" />
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
                  className={`group inline-flex items-center gap-2 rounded-lg border ${cert.border} bg-slate-900/90 px-3 py-1.5 font-mono text-xs transition-all hover:scale-[1.02] hover:border-sky-400`}
                >
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

        {/* 3. Interactive Control Plane Simulator Component (from user's older site) */}
        <div className="mt-10">
          <ControlPlaneSimulator />
        </div>

        {/* Real Production Service Record with 21st.dev Spotlight Cards */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-slate-950/70 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm font-semibold tracking-wide text-slate-100 uppercase">
                  Production Platform Reliability &amp; Telemetry
                </h2>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-emerald-400 border border-emerald-500/20">
                  LIVE SLI
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                Stibo Systems SaaS Platform · May 2022 — Present · High-Availability Infrastructure
              </p>
            </div>

            {/* 45-day uptime heatmap block */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                <span className="pulse-beacon bg-emerald-400" />
                <span>Current SLA: 99.9% Met</span>
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

          {/* 5-Column Metrics Grid */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceRecord.map((row) => (
              <MetricCard key={row.label} row={row} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { certifications } from "../../data/certifications"
import Section from "../ui/Section"
import SpotlightCard from "../ui/SpotlightCard"
import { ShieldIcon, ArrowUpRightIcon, CheckIcon } from "../ui/Icons"

// Official Microsoft Learn Badge SVG mappings in /public/badges/
const badgeMap: Record<string, { src: string; stars: number; auraColor: string; borderColor: string }> = {
  "AZ-400": {
    src: "/badges/azure-expert.svg",
    stars: 3,
    auraColor: "rgba(56, 189, 248, 0.25)",
    borderColor: "border-sky-500/40 hover:border-sky-400",
  },
  "AZ-104": {
    src: "/badges/azure-associate.svg",
    stars: 2,
    auraColor: "rgba(6, 182, 212, 0.22)",
    borderColor: "border-cyan-500/40 hover:border-cyan-400",
  },
  "AZ-900": {
    src: "/badges/azure-fundamentals.svg",
    stars: 1,
    auraColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
  },
}

export default function AzureCertifications() {
  return (
    <Section
      id="certifications"
      label="Verified Accreditation"
      title="Microsoft Azure Certifications"
      intro="Official Microsoft credentials validating enterprise DevOps engineering, cloud administration, and production infrastructure governance."
      sunk
    >
      {/* ─── Certification Progression Bar ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-slate-950/80 px-4 py-2.5 font-mono text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldIcon size={15} className="text-sky-400" />
          <span className="font-semibold uppercase tracking-wider text-white">
            Progression:
          </span>
          <span className="text-slate-400">Fundamentals (AZ-900) → Associate (AZ-104) → Expert (AZ-400)</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="pulse-beacon bg-emerald-400" />
          <span className="text-emerald-400 font-semibold">Official &amp; Verified on Microsoft Learn</span>
        </div>
      </div>

      {/* ─── 3-Column Official Badges Grid (Compact & High Impact) ─── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {certifications.map((cert) => {
          const badge = badgeMap[cert.code]
          const isExpert = cert.level === "Expert"

          return (
            <SpotlightCard
              key={cert.code}
              spotlightColor={badge?.auraColor || "rgba(56, 189, 248, 0.2)"}
              className={`group flex h-full flex-col justify-between p-5 sm:p-6 transition-all duration-300 ${
                badge?.borderColor || "border-white/10"
              } ${isExpert ? "bg-slate-900/90 shadow-2xl shadow-sky-500/10 ring-1 ring-sky-500/30" : "bg-slate-950/70"}`}
            >
              <div>
                {/* Header: Code & Tier Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-2xl font-black tracking-tight text-white group-hover:text-sky-300 transition-colors sm:text-3xl">
                      {cert.code}
                    </span>
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-sky-400">
                      {cert.issuer}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[0.72rem] font-semibold ${
                      isExpert
                        ? "border border-sky-400/40 bg-sky-400/15 text-sky-200"
                        : cert.level === "Associate"
                          ? "border border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                          : "border border-emerald-400/40 bg-emerald-400/15 text-emerald-200"
                    }`}
                  >
                    <span>{cert.level}</span>
                    <span className="text-amber-400">{"★".repeat(badge?.stars || 1)}</span>
                  </span>
                </div>

                {/* Real Official Microsoft Learn Certification Badge Image */}
                <div className="my-4 flex justify-center py-1">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {/* Soft ambient badge glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity group-hover:opacity-75"
                      style={{ backgroundColor: isExpert ? "#38bdf8" : "#06b6d4" }}
                    />
                    <img
                      src={badge?.src || "/badges/azure-expert.svg"}
                      alt={`${cert.code} ${cert.title} Official Microsoft Badge`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="relative z-10 h-28 w-28 sm:h-32 sm:w-32 drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Full Official Certification Title */}
                <h3 className="text-base font-bold tracking-tight text-white group-hover:text-slate-100">
                  {cert.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  {cert.description}
                </p>

                {/* Validated Competencies List - Compact 3 Bullets */}
                <div className="mt-4 border-t border-white/[0.08] pt-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-slate-400">
                    Validated Competencies:
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                    {cert.skillsCovered.slice(0, 3).map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckIcon size={12} className="mt-0.5 flex-none text-sky-400" />
                        <span className="text-[0.75rem] leading-snug">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer: Microsoft Learn Credential Verification Link */}
              <div className="mt-5 border-t border-white/[0.08] pt-3">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs font-semibold text-slate-100 transition-all hover:border-sky-400 hover:bg-sky-500/15 hover:text-white group-hover:border-sky-500/30"
                >
                  <ShieldIcon size={13} className="text-sky-400" />
                  <span>Verify on Microsoft Learn</span>
                  <ArrowUpRightIcon size={12} className="text-slate-400 group-hover:text-sky-300" />
                </a>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </Section>
  )
}

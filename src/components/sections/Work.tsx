import { roles, philosophies } from "../../data/experience"
import Section from "../ui/Section"
import { GitBranchIcon, CloudIcon, CpuIcon, ServerIcon, ActivityIcon, ShieldIcon, CheckIcon } from "../ui/Icons"
import SpotlightCard from "../ui/SpotlightCard"
import AnimatedBeam from "../ui/AnimatedBeam"

const dutyIcons: Record<string, typeof GitBranchIcon> = {
  "CI/CD Pipeline Engineering": GitBranchIcon,
  "Infrastructure as Code": CloudIcon,
  "Container Operations & Kubernetes": CpuIcon,
  "Configuration Automation": ServerIcon,
  "Monitoring & Observability": ActivityIcon,
  "Production Support & RCA": ShieldIcon,
  "Operational & SLA Reporting": ActivityIcon,
}

const coreExperienceAreas = [
  "Azure DevOps YAML pipeline design and maintenance",
  "Terraform and ARM Template infrastructure deployments",
  "Docker container management and Kubernetes operations",
  "Ansible-based configuration automation across 50+ hosts",
  "Prometheus and Grafana observability setup & alerting",
  "Production incident response and Root Cause Analysis (RCA)",
  "Linux systems administration (RHEL / Ubuntu)",
  "JIRA-based operational workflow and SLA reporting",
]

export default function Work() {
  return (
    <Section
      id="experience"
      label="Work History & Profile"
      title="Production Experience & Engineering Depth"
      intro="Moving from cloud operations support toward end-to-end DevOps engineering — designing systems, building automation, and owning infrastructure with greater depth."
    >
      {/* Engineering Profile Summary Banner */}
      <SpotlightCard
        spotlightColor="rgba(56, 189, 248, 0.15)"
        className="mb-12 overflow-hidden rounded-2xl border border-white/[0.1] bg-slate-900/80 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Engineering Profile
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300">Bengaluru, Karnataka, India</span>
          </div>
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-0.5 font-mono text-xs text-sky-300">
            Cloud Operations → DevOps Engineering
          </span>
        </div>

        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          Based in Bengaluru, I work as a Cloud Operations Engineer at <strong className="text-white">Stibo Systems</strong>, supporting production Microsoft Azure environments. Day-to-day work involves CI/CD pipelines, infrastructure operations, containerized workloads, and production incident response.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Over 4+ years in cloud operations, I&apos;ve developed deep working experience across the Azure ecosystem, infrastructure-as-code tooling, container orchestration, and configuration automation.
          The direction is clear: from cloud operations support toward end-to-end DevOps engineering — designing systems, building automation, and owning infrastructure with greater depth.
        </p>

        {/* Core Experience Areas Tags */}
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
            Core Experience Areas
          </span>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {coreExperienceAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <CheckIcon size={12} />
                </span>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>

      {/* 21st.dev Animated Beam Visualizing the Azure DevOps YAML Pipeline Flow */}
      <div className="mb-12">
        <AnimatedBeam />
      </div>

      {/* Engineering Philosophy Cards (AUTOMATE, DEPLOY, OBSERVE, TROUBLESHOOT) */}
      <div className="mb-14">
        <div className="mb-4">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-sky-400">
            Engineering Philosophy
          </span>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            How I Work
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {philosophies.map((phil) => (
            <SpotlightCard
              key={phil.title}
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className="p-5 transition-all duration-300 hover:border-sky-500/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold tracking-wider text-sky-400">
                  {phil.title}
                </span>
                <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] text-slate-400 border border-white/10">
                  PHILOSOPHY
                </span>
              </div>

              <div className="mt-2 font-mono text-xs font-medium text-slate-200">
                {phil.action}
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {phil.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Role & Specific Duties */}
      {roles.map((role) => (
        <article key={role.company} className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-sky-400">
                  Current Enterprise Role
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {role.company}
                </h3>
                <p className="mt-1 text-base font-medium text-slate-300">
                  {role.title}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                  <span className="pulse-beacon bg-emerald-400" />
                  Active · Cloud Operations &amp; DevOps
                </span>
                <p className="tnum mt-2 font-mono text-xs text-slate-400">
                  {role.from} — {role.to} · {role.location}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-300">
              {role.summary}
            </p>
          </div>

          {/* Bento Grid of Core Operational Duties with 21st.dev Spotlight Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {role.duties.map((duty) => {
              const IconComponent = dutyIcons[duty.heading] || GitBranchIcon
              return (
                <SpotlightCard
                  key={duty.heading}
                  spotlightColor="rgba(56, 189, 248, 0.18)"
                  className="p-6 transition-all duration-300 hover:border-sky-500/40"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400">
                          <IconComponent size={20} />
                        </div>
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate-400">
                          Production Scope
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-semibold tracking-tight text-slate-100">
                        {duty.heading}
                      </h4>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                        {duty.body}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/[0.06] pt-4">
                      <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {duty.stack.map((tool) => (
                          <li
                            key={tool}
                            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-slate-300"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        </article>
      ))}
    </Section>
  )
}

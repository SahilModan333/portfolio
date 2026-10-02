import { education } from "../../data/certifications"
import { profile } from "../../data/profile"
import Section from "../ui/Section"
import { ArrowUpRightIcon, GithubIcon } from "../ui/Icons"

export default function Credentials() {
  return (
    <Section
      id="education"
      label="Academic Foundation &amp; Open Source"
      title="Computer systems education &amp; open source engineering"
      intro="Formal Master's degree in Cloud Systems &amp; Infrastructure Management, coupled with foundational Computer Science study and active open-source contributions."
    >
      {/* Academic Education Section */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 backdrop-blur-md sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-0.5 font-mono text-xs text-sky-300 mb-4">
          Education &amp; Foundation
        </div>
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          Formal academic degrees in computer systems &amp; cloud technology
        </h3>

        <div className="mt-8 space-y-6 divide-y divide-white/[0.06]">
          {education.map((study) => (
            <div
              key={study.qualification}
              className="pt-6 first:pt-0 sm:flex sm:items-baseline sm:justify-between"
            >
              <div>
                <h4 className="text-base font-semibold text-slate-100">
                  {study.qualification}
                </h4>
                {study.specialization && (
                  <p className="mt-0.5 font-mono text-xs text-sky-400">
                    Specialization: {study.specialization}
                  </p>
                )}
                <p className="mt-1 text-sm text-slate-400">
                  {study.institution} · {study.location}
                </p>
                {study.details && (
                  <ul className="mt-2.5 flex flex-wrap gap-2 text-xs text-slate-300">
                    {study.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.72rem]"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="tnum mt-2 font-mono text-sm font-medium text-slate-400 sm:mt-0 sm:text-right">
                {study.from} — {study.to}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source & GitHub Repository Block */}
      <div className="mt-12 rounded-2xl border border-white/[0.08] bg-slate-950/70 p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Open Source &amp; GitHub
            </span>
            <p className="mt-1 text-sm text-slate-300">
              Only relevant, production-quality engineering repositories are featured here.
            </p>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-300"
          >
            <GithubIcon size={16} />
            <span>View GitHub Profile</span>
            <ArrowUpRightIcon size={12} className="text-slate-400" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4">
            <span className="font-mono text-xs font-bold text-sky-400">azure-devops-templates</span>
            <p className="mt-1 text-xs text-slate-400">
              Reusable YAML pipeline definitions with environment gates and multi-stage Docker deployment.
            </p>
            <span className="mt-3 inline-block rounded bg-sky-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-sky-300 border border-sky-500/20">
              Production Tested
            </span>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4">
            <span className="font-mono text-xs font-bold text-emerald-400">ansible-fleet-hardening</span>
            <p className="mt-1 text-xs text-slate-400">
              Ansible roles for baseline security, auditd, CIS benchmark compliance, and automatic patch cycle.
            </p>
            <span className="mt-3 inline-block rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-300 border border-emerald-500/20">
              50+ Hosts Tested
            </span>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4">
            <span className="font-mono text-xs font-bold text-indigo-400">terraform-azure-aks</span>
            <p className="mt-1 text-xs text-slate-400">
              Modular Infrastructure-as-Code for production AKS with azure-cni, Key Vault secrets provider, and RBAC.
            </p>
            <span className="mt-3 inline-block rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-indigo-300 border border-indigo-500/20">
              Multi-Region Ready
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}

import { useState } from "react"
import { audio } from "./AudioEngine"

export default function CapabilityTaxonomy() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const taxonomy = [
    {
      index: "01",
      domain: "CLOUD FABRIC & MULTI-REGION IAC",
      description:
        "Architecting declarative, immutable cloud fabrics with Terraform, Azure Bicep, and ARM templates. Zero manual drift, remote state locking, and multi-subscription isolation.",
      tooling: ["Microsoft Azure", "Terraform", "Bicep", "ARM Templates", "Virtual Networks", "Private Endpoints"],
      credential: "AZ-400 DevOps Expert Verified",
    },
    {
      index: "02",
      domain: "CONTAINER RESILIENCE & AKS",
      description:
        "Packaging microservice workloads into immutable OCI containers. Multi-node Azure Kubernetes Service (AKS) with HPA autoscaling, pod disruption budgets, and zero-downtime rolling upgrades.",
      tooling: ["Kubernetes (AKS)", "Docker", "Helm", "Azure Container Registry (ACR)", "Azure CNI"],
      credential: "AKS Production Operator",
    },
    {
      index: "03",
      domain: "AUTOMATED CI/CD ENGINES",
      description:
        "Authoring multi-stage deployment pipelines in Azure DevOps YAML and GitHub Actions. Automated unit tests, linting, policy enforcement gates, artifact publishing, and canary rollbacks.",
      tooling: ["Azure Pipelines YAML", "GitHub Actions", "Artifacts", "GitOps", "Bash", "Python"],
      credential: "65% Faster Release Velocity",
    },
    {
      index: "04",
      domain: "OBSERVABILITY & SRE TELEMETRY",
      description:
        "Engineering full-stack telemetry fabrics. Prometheus node exporters, kube-state-metrics, Grafana dashboards, and Alertmanager routing for proactive incident prevention.",
      tooling: ["Prometheus", "Grafana", "Alertmanager", "Azure Monitor", "Log Analytics"],
      credential: "MTTD cut from 45m to <3m",
    },
    {
      index: "05",
      domain: "ZERO-TRUST PLATFORM SECURITY",
      description:
        "Enforcing least-privilege role-based access control, cryptographic key rotation via Azure Key Vault, Managed Identities, and private network peering.",
      tooling: ["Azure Key Vault", "Azure Entra ID", "RBAC", "Network Security Groups", "TLS/SSL"],
      credential: "100% Security Patch Compliance",
    },
  ]

  return (
    <section
      id="taxonomy"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#090a0d" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-10">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest flex items-center gap-3">
            <span className="text-[#f0ece1] font-bold">[ 05 // TAXONOMY ]</span>
            <span className="text-slate-700">/</span>
            <span>CAPABILITY MATRIX</span>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span>DETERMINISTIC ARCHITECTURE</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-8 max-w-3xl">
          <h3
            className="text-3xl sm:text-5xl font-black text-[#f0ece1] leading-tight font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Engineering disciplines
            <br />
            <span className="text-slate-400">under continuous operation.</span>
          </h3>
        </div>

        {/* 5 Structural Taxonomy Rows with Elastic Tension Wire Dividers */}
        <div className="mt-16 divide-y divide-white/[0.08]">
          {taxonomy.map((item, idx) => (
            <div
              key={item.index}
              onMouseEnter={() => {
                audio.tick()
                setHoveredIdx(idx)
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group py-10 sm:py-12 transition-all hover:bg-white/[0.02] cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                {/* Index */}
                <div className="lg:col-span-1 font-mono text-xs text-slate-500 group-hover:text-[#d4ff00] transition-colors">
                  ({item.index})
                </div>

                {/* Domain Title */}
                <div className="lg:col-span-4">
                  <h4
                    className="text-xl sm:text-2xl font-black text-white group-hover:text-[#f0ece1] transition-colors font-sans"
                    style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                  >
                    {item.domain}
                  </h4>
                  <span className="font-mono text-[0.68rem] text-[#d4ff00] mt-1 block">
                    {item.credential}
                  </span>
                </div>

                {/* Description & Tooling */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 font-mono text-[0.68rem]">
                    {item.tooling.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-300 group-hover:border-white/25 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

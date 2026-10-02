import { FC } from "react"
import { motion } from "motion/react"
import { MetallicFoilStar, ChromeAsterisk } from "./TactileArtifacts"
import { sound } from "./SoundEngine"

export default function TaxonomySection() {
  const capabilities = [
    {
      title: "Cloud Infrastructure & IaC",
      desc: "Architecting multi-region, immutable cloud fabrics with Terraform, Azure Bicep, and ARM templates. Zero manual drift.",
      tools: ["Microsoft Azure", "Terraform", "Bicep", "ARM Templates", "Virtual Networks"],
    },
    {
      title: "Container Ecosystem & AKS",
      desc: "Packaging microservice workloads into immutable OCI containers. Multi-node Azure Kubernetes Service with HPA autoscaling.",
      tools: ["Kubernetes (AKS)", "Docker", "Helm", "Azure Container Registry", "Ingress"],
    },
    {
      title: "Automated CI/CD Engines",
      desc: "Building multi-stage deployment pipelines with automated quality gates, linting, policy enforcement, and canary rollbacks.",
      tools: ["Azure Pipelines YAML", "GitHub Actions", "Artifacts", "GitOps", "Bash"],
    },
    {
      title: "Observability & SRE",
      desc: "Full-stack telemetry fabrics. Real-time metric scraping, distributed tracing, proactive alerting, and 99.9% SLA enforcement.",
      tools: ["Prometheus", "Grafana", "Alertmanager", "Azure Monitor", "Log Analytics"],
    },
    {
      title: "Zero-Trust Cloud Security",
      desc: "Least-privilege role-based access control, cryptographic key rotation via Azure Key Vault, and private network peering.",
      tools: ["Azure Key Vault", "Azure Entra ID", "RBAC", "Network Security Groups", "TLS/SSL"],
    },
  ]

  return (
    <section
      id="taxonomy"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#060709" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
          <span className="text-white font-bold">( 04 )</span>
          <span className="text-slate-700">/</span>
          <span>CAPABILITY TAXONOMY</span>
        </div>

        {/* Monumental Title */}
        <h2
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-sans"
          style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
        >
          Forms follow
          <br />
          perspective.
        </h2>

        {/* Two-Column Editorial Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Sculpture & Subtext */}
          <div className="lg:col-span-4 space-y-8">
            <div className="font-mono text-xs text-slate-400 tracking-wider">
              WE ENGINEER &amp; ORCHESTRATE :
            </div>

            {/* Floating Tactile Metallic Foil Star */}
            <div className="py-6 flex justify-start">
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="cursor-pointer"
                onClick={() => sound.tick()}
              >
                <MetallicFoilStar size={140} />
              </motion.div>
            </div>

            <p className="font-mono text-xs leading-relaxed text-slate-400">
              Perspective is where operational discipline meets programmatic automation.
              Every pipeline is a deterministic function.
            </p>
          </div>

          {/* Right Column: Taxonomy Capabilities List */}
          <div className="lg:col-span-8 divide-y divide-white/[0.08]">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.title}
                onMouseEnter={() => sound.tick()}
                className="group py-8 sm:py-10 transition-colors hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                  <div className="flex-1">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-slate-200 transition-colors"
                      style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
                    >
                      {cap.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {cap.desc}
                    </p>

                    {/* Tool Badges */}
                    <div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.68rem]">
                      {cap.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-0.5 text-slate-300"
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
      </div>
    </section>
  )
}

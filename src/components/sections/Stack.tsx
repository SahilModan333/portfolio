import { stack } from "../../data/skills"
import Section from "../ui/Section"
import { GitBranchIcon, CloudIcon, CpuIcon, ServerIcon, ActivityIcon, ShieldIcon } from "../ui/Icons"
import SpotlightCard from "../ui/SpotlightCard"

const categoryIcons: Record<string, typeof GitBranchIcon> = {
  "git-branch": GitBranchIcon,
  cloud: CloudIcon,
  cpu: CpuIcon,
  server: ServerIcon,
  activity: ActivityIcon,
  shield: ShieldIcon,
}

export default function Stack() {
  return (
    <Section
      id="capabilities"
      label="Technical Capabilities"
      title="Tools &amp; technologies, organized by purpose"
      intro="No arbitrary percentage bars. Organized by the production operational job they perform, which is how senior engineering infrastructure is actually designed."
      sunk
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => {
          const Icon = categoryIcons[group.icon] || GitBranchIcon
          return (
            <SpotlightCard
              key={group.category}
              spotlightColor="rgba(56, 189, 248, 0.16)"
              className="p-6 transition-all duration-300 hover:border-sky-500/40"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {group.category}
                      </h3>
                      <p className="font-mono text-xs text-sky-400">
                        {group.purpose}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {group.description}
                  </p>

                  {/* Tool List with Badges */}
                  <div className="mt-5 space-y-2">
                    {group.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="group/tool rounded-lg border border-white/[0.06] bg-slate-950/60 p-2.5 transition-colors hover:border-white/15"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-xs font-semibold ${
                              tool.highlight ? "text-sky-300" : "text-slate-200"
                            }`}
                          >
                            {tool.name}
                          </span>
                          {tool.highlight && (
                            <span className="rounded bg-sky-500/10 px-1.5 py-0.2 font-mono text-[0.65rem] text-sky-400 border border-sky-500/20">
                              Core
                            </span>
                          )}
                        </div>
                        {tool.note && (
                          <p className="mt-0.5 text-[0.7rem] text-slate-400">
                            {tool.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </Section>
  )
}

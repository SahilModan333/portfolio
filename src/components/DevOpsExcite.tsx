import { useEffect, useState, useRef } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { Rocket, Boxes, Activity, ShieldCheck, GitBranch, Hammer, Cloud, Cpu } from "lucide-react"
import { getYearsLabel } from "../data/config"

// Count-up once on first view — tabular numerals, mono for data
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!active || reduce) {
      setVal(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration, reduce])
  return val
}

// Small sparkline using SVG — animates stroke-draw, not layout
function Sparkline({ active }: { active: boolean }) {
  const reduce = useReducedMotion()
  const path = "M0 28 L20 26 L40 22 L60 18 L80 20 L100 12 L120 10 L140 14 L160 6 L180 8"
  return (
    <svg viewBox="0 0 180 32" className="w-full h-[32px]" aria-hidden>
      <path
        d={path}
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          active && !reduce
            ? {
                strokeDasharray: 420,
                strokeDashoffset: 420,
                animation: "spark-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }
            : undefined
        }
      />
      {!reduce && (
        <style>{`@keyframes spark-draw{to{stroke-dashoffset:0}}`}</style>
      )}
      {/* dots */}
      {[20, 60, 100, 160].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={[26, 18, 12, 6][i]}
          r="2.5"
          fill="#38bdf8"
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  )
}

export default function DevOpsExcite() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.28 })
  const reduce = useReducedMotion()
  const [deploying, setDeploying] = useState(false)
  const [stage, setStage] = useState(0) // 0 idle, 1 triggered, 2 building, 3 deploying, 4 live

  // Trigger sequence on click
  const triggerDeploy = () => {
    if (deploying) return
    setDeploying(true)
    setStage(1)
    const timers = [
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1400),
      setTimeout(() => setStage(4), 2300),
      setTimeout(() => setDeploying(false), 4200),
    ]
    return () => timers.forEach(clearTimeout)
  }

  // Metrics count-up once
  const pods = useCountUp(12, inView || stage >= 3)
  const pipelines = useCountUp(20, inView)
  const servers = useCountUp(50, inView)

  const stages = [
    { icon: GitBranch, label: "commit", sub: "a1b2c3d", color: "#64748b" },
    { icon: Hammer, label: "build", sub: "az pipelines", color: "#0ea5e9" },
    { icon: Boxes, label: "image", sub: "acr: v42", color: "#8b5cf6" },
    { icon: Cloud, label: "apply", sub: "terraform", color: "#7c3aed" },
    { icon: Cpu, label: "rollout", sub: "aks prod", color: "#059669" },
    { icon: Activity, label: "observe", sub: "prom · grafana", color: "#dc2626" },
  ]

  return (
    <div
      ref={ref}
      className="relative rounded-[20px] border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden"
      style={{ boxShadow: "0 0 0 1px rgba(56,189,248,0.08), 0 16px 48px rgba(0,0,0,0.45)" }}
    >
      {/* Top bar — control-plane */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            control-plane • prod
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {getYearsLabel()} • Stibo Systems
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-xs font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
          </span>
        </div>
      </div>

      {/* Pipeline rail — the signature interaction */}
      <div className="px-4 sm:px-5 py-5">
        {/* Track */}
        <div className="relative flex items-center justify-between gap-1 sm:gap-2">
          {/* Rail line */}
          <div className="absolute left-[18px] right-[18px] top-[22px] h-px bg-white/10" aria-hidden />
          {/* Animated flow */}
          {!reduce && inView && (
            <motion.div
              className="absolute left-[18px] top-[22px] h-px bg-sky-400"
              initial={{ width: 0, opacity: 0.6 }}
              animate={deploying ? { width: "calc(100% - 36px)", opacity: [0.6, 1, 0.6] } : { width: "calc(100% - 36px)", opacity: 0.45 }}
              transition={deploying ? { duration: 1.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
            />
          )}
          {stages.map((s, i) => {
            const active = stage > 0 ? i <= stage : inView
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center gap-2 min-w-0"
              >
                <motion.div
                  className={`w-11 h-11 rounded-xl grid place-items-center border backdrop-blur ${active ? "bg-sky-500 text-white border-sky-400 shadow-[0_4px_16px_rgba(14,165,233,0.35)]" : "bg-white/5 text-slate-400 border-white/10"}`}
                  animate={stage === i + 1 ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "center" } as React.CSSProperties}
                >
                  <Icon size={16} />
                  {active && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />}
                </motion.div>
                <div className="text-center">
                  <div className={`text-xs font-semibold leading-none ${active ? "text-white" : "text-slate-500"}`} style={{ fontFamily: "JetBrains Mono, monospace", fontVariantNumeric: "tabular-nums" as const }}>
                    {s.label}
                  </div>
                  <div className="text-xs text-slate-600 leading-none mt-1 hidden sm:block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {s.sub}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Deploy trigger — the excitement */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={triggerDeploy}
            disabled={deploying}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "160ms" }}
          >
            <Rocket size={14} className={deploying ? "animate-pulse" : ""} />
            {deploying ? (stage < 4 ? "Deploying…" : "Live ✓") : "Trigger deploy"}
          </button>
          <span className="text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {stage === 0 ? "idle — click to run pipeline" : stage === 1 ? "commit picked → queue" : stage === 2 ? "building image: acr: v42" : stage === 3 ? "terraform apply → aks rollout" : "rollout complete • 0 failed"}
          </span>
          <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400/80" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            <ShieldCheck size={12} /> visual only • no real deploy
          </span>
        </div>
      </div>

      {/* Metrics + pods + sparkline — grid varies rhythm, not identical cards */}
      <div className="grid grid-cols-3 gap-3 px-4 sm:px-5 pb-5">
        <div className="col-span-1 rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            pipelines
          </div>
          <div className="text-xl font-bold text-white leading-none mt-1" style={{ fontFamily: "JetBrains Mono, monospace", fontVariantNumeric: "tabular-nums" as const }}>
            {pipelines}
            <span className="text-sky-400 text-base">+</span>
          </div>
          <div className="text-xs text-slate-600 mt-1">across 4 envs</div>
        </div>
        <div className="col-span-1 rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            servers
          </div>
          <div className="text-xl font-bold text-white leading-none mt-1" style={{ fontFamily: "JetBrains Mono, monospace", fontVariantNumeric: "tabular-nums" as const }}>
            {servers}
            <span className="text-sky-400 text-base">+</span>
          </div>
          <div className="text-xs text-slate-600 mt-1">Ansible managed</div>
        </div>
        <div className="col-span-1 rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-xs text-slate-500 flex items-center gap-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            <Activity size={10} className="text-emerald-400" /> p95
          </div>
          <div className="mt-1">
            <Sparkline active={inView} />
          </div>
          <div className="text-xs text-emerald-400 mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            99.9% uptime
          </div>
        </div>
      </div>

      {/* Pod grid — stagger 40-60ms, transform+opacity only */}
      <div className="px-4 sm:px-5 pb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            // aks • pods
          </span>
          <span className="text-xs text-slate-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {pods} running
          </span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.045, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={`h-8 rounded-lg border grid place-items-center text-xs font-medium ${
                i < pods ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300" : "bg-white/[0.03] border-white/10 text-slate-600"
              }`}
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {i < pods ? "✓" : "·"}
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-300"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              $ kubectl rollout status deploy/api — <span className="text-white">success</span> • {pods} pods ready • 0 restarts
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom log — monospace only for data, masked reveal */}
      <div className="border-t border-white/10 bg-black/20 px-4 sm:px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> live log
          <span className="ml-auto hidden sm:inline">tail -f /var/log/deploy.log</span>
        </div>
        <div className="mt-2 space-y-1 text-xs leading-5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          <div className="text-slate-500">$ terraform plan — <span className="text-slate-300">Plan: 3 to add, 0 to change, 0 to destroy</span></div>
          <div className="text-slate-500">$ ansible-playbook site.yml — <span className="text-emerald-400">ok=12 changed=4 failed=0</span></div>
          <div className="text-sky-400">$ az webapp log tail — <span className="text-slate-400">streaming…</span></div>
        </div>
      </div>
    </div>
  )
}

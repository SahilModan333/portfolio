import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { LiquidChromeTorus, PrismaticCube } from "./TactileArtifacts"
import { sound } from "./SoundEngine"

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yTorus = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const yCube = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rotateTorus = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#060709" }}
    >
      {/* Background Subtle Coordinate Lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
          <span className="text-white font-bold">( 02 )</span>
          <span className="text-slate-700">/</span>
          <span>THE STEP ASIDE // PHILOSOPHY</span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-5xl">
          <h2
            className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Most engineers configure servers.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
              We orchestrate invisible worlds.
            </span>
          </h2>
        </div>

        {/* Narrative Grid with Floating Tactile Artifacts */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Sculpture */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-10 min-h-[320px]">
            {/* Dynamic floating torus */}
            <motion.div
              style={{ y: yTorus, rotate: rotateTorus }}
              className="relative z-10 cursor-pointer"
              onClick={() => sound.tick()}
              whileHover={{ scale: 1.08 }}
            >
              <LiquidChromeTorus size={190} />
            </motion.div>

            {/* Background floating prismatic cube */}
            <motion.div
              style={{ y: yCube }}
              className="absolute -top-4 -right-2 z-0 opacity-70 cursor-pointer"
              onClick={() => sound.tick()}
              whileHover={{ scale: 1.1 }}
            >
              <PrismaticCube size={110} />
            </motion.div>
          </div>

          {/* Right Column: High-Density Manifesto Prose */}
          <div className="lg:col-span-7 space-y-8 font-mono text-sm leading-relaxed text-slate-300">
            <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
              In a cloud of infinite ephemeral microservices, the rare thing is{" "}
              <strong className="text-white font-semibold">absolute reliability</strong>.
              Automation eliminates human fatigue. Immutable infrastructure preserves engineering sanity.
              And self-healing mesh topologies turn production chaos into silence.
            </p>

            <div className="border-t border-white/[0.08] pt-8">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                PROVEN TELEMETRY METRICS
              </div>

              {/* 4 Telemetry Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-white">99.92%</div>
                  <div className="text-[0.7rem] text-slate-500 mt-1 uppercase">Platform SLA</div>
                </div>

                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-white">4+ Yrs</div>
                  <div className="text-[0.7rem] text-slate-500 mt-1 uppercase">Production Azure</div>
                </div>

                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-white">20+</div>
                  <div className="text-[0.7rem] text-slate-500 mt-1 uppercase">CI/CD Pipelines</div>
                </div>

                <div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-white">50+</div>
                  <div className="text-[0.7rem] text-slate-500 mt-1 uppercase">Fleet Nodes IaC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from "react"
import { motion } from "motion/react"
import { audio } from "./AudioEngine"

export default function ManifestoTension() {
  const [tensionLevel, setTensionLevel] = useState(85) // 0 to 100

  // Calculate dynamic telemetry based on tension level
  const latency = Math.max(0.8, (100 - tensionLevel) * 4.8).toFixed(1)
  const drift = Math.max(0, ((100 - tensionLevel) * 0.42)).toFixed(1)
  const availability = (94.0 + (tensionLevel / 100) * 5.95).toFixed(2)

  const handleSliderChange = (val: number) => {
    setTensionLevel(val)
    if (val % 8 === 0) {
      audio.tick()
    }
  }

  return (
    <section
      id="manifesto"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ backgroundColor: "#0c0e12" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Coordinate Marker */}
        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
          <span className="text-[#f0ece1] font-bold">[ 02 // MANIFESTO ]</span>
          <span className="text-slate-700">/</span>
          <span>THE CONVERGENCE PRINCIPLE</span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-5xl">
          <h2
            className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#f0ece1] leading-[1.08] font-sans"
            style={{ fontFamily: "var(--font-display, 'Syne', sans-serif)" }}
          >
            Static infrastructure is an illusion.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600">
              Reliability is active convergence.
            </span>
          </h2>
        </div>

        {/* The Interactive Tectonic Tension Bar */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#08090b]/80 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-slate-400 uppercase tracking-wider">
              INTERACTIVE TECTONIC CONTROL // SLIDE TO SHIFT SYSTEM EQUILIBRIUM
            </span>
            <span className="text-[#d4ff00] font-bold">
              CONVERGENCE: {tensionLevel}%
            </span>
          </div>

          {/* Range Slider */}
          <div className="mt-6">
            <input
              type="range"
              min="0"
              max="100"
              value={tensionLevel}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-[#d4ff00]"
            />
            <div className="mt-3 flex justify-between font-mono text-[0.68rem] text-slate-500">
              <span>0% // RAW CHAOS (UNMANAGED DRIFT)</span>
              <span>50% // SEMI-AUTOMATED</span>
              <span className="text-[#d4ff00]">100% // DETERMINISTIC (IAC + SRE)</span>
            </div>
          </div>

          {/* Real-time Dynamic Telemetry Readout */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/[0.06] pt-8 font-mono">
            <div>
              <span className="block text-2xl sm:text-4xl font-black text-white font-sans">
                {availability}%
              </span>
              <span className="block text-xs text-slate-400 uppercase mt-1">
                PLATFORM AVAILABILITY SLA
              </span>
            </div>

            <div>
              <span className="block text-2xl sm:text-4xl font-black text-white font-sans">
                {latency} ms
              </span>
              <span className="block text-xs text-slate-400 uppercase mt-1">
                EDGE INGRESS LATENCY
              </span>
            </div>

            <div>
              <span className="block text-2xl sm:text-4xl font-black text-white font-sans">
                {drift}%
              </span>
              <span className="block text-xs text-slate-400 uppercase mt-1">
                CONFIGURATION DRIFT
              </span>
            </div>
          </div>
        </div>

        {/* 4 Proven Telemetry Pillars */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 font-mono border-t border-white/[0.08] pt-12">
          <div>
            <div className="font-sans text-3xl sm:text-4xl font-black text-white">99.92%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-2">Sustained Azure SLA</div>
            <div className="text-[0.7rem] text-slate-600 mt-1">Stibo Systems Production</div>
          </div>

          <div>
            <div className="font-sans text-3xl sm:text-4xl font-black text-white">4+ Yrs</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-2">Azure Cloud Operations</div>
            <div className="text-[0.7rem] text-slate-600 mt-1">Enterprise scale platform</div>
          </div>

          <div>
            <div className="font-sans text-3xl sm:text-4xl font-black text-white">20+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-2">Automated CI/CD Pipelines</div>
            <div className="text-[0.7rem] text-slate-600 mt-1">Zero manual gate releases</div>
          </div>

          <div>
            <div className="font-sans text-3xl sm:text-4xl font-black text-white">50+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-2">Fleet Nodes Under IaC</div>
            <div className="text-[0.7rem] text-slate-600 mt-1">Terraform + Ansible State</div>
          </div>
        </div>
      </div>
    </section>
  )
}

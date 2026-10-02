import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useCustomization, THEMES, type ThemeId } from "../../context/CustomizationContext"
import {
  SettingsIcon,
  PaletteIcon,
  SlidersIcon,
  CheckIcon,
  CopyIcon,
  VolumeIcon,
  VolumeMuteIcon,
  SparklesIcon,
  RefreshCwIcon,
  ActivityIcon,
  TerminalIcon,
} from "./Icons"
import { sound } from "../../lib/sound"

export default function CustomizerModal() {
  const {
    config,
    theme,
    features,
    isCustomizerOpen,
    setIsCustomizerOpen,
    updatePersonal,
    setTheme,
    toggleFeature,
    resetDefaults,
    exportConfigAsCode,
  } = useCustomization()

  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "features">("profile")
  const [copied, setCopied] = useState(false)

  // Local form state initialized from config.personal
  const [form, setForm] = useState(config.personal)

  useEffect(() => {
    setForm(config.personal)
  }, [config.personal])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCustomizerOpen) {
        setIsCustomizerOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCustomizerOpen, setIsCustomizerOpen])

  if (!isCustomizerOpen) return null

  const handleInputChange = (field: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }))
    updatePersonal({ [field]: val })
  }

  const handleCopyCode = () => {
    const code = exportConfigAsCode()
    navigator.clipboard.writeText(code)
    sound.playSuccess()
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick()
            setIsCustomizerOpen(false)
          }}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#090e1a]/95 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 text-sky-400">
                <SettingsIcon size={18} />
              </span>
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Portfolio Customizer
                </h3>
                <p className="font-mono text-[0.72rem] text-slate-400">
                  Tailor identity, color accents, and interactive effects in real time
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick()
                setIsCustomizerOpen(false)
              }}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-400 hover:border-white/20 hover:text-white transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/[0.08] bg-slate-950/40 px-6">
            <button
              onClick={() => {
                sound.playClick()
                setActiveTab("profile")
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs font-semibold transition-colors ${
                activeTab === "profile"
                  ? "border-sky-400 text-sky-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ActivityIcon size={14} />
              <span>Identity &amp; Profile</span>
            </button>

            <button
              onClick={() => {
                sound.playClick()
                setActiveTab("theme")
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs font-semibold transition-colors ${
                activeTab === "theme"
                  ? "border-sky-400 text-sky-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <PaletteIcon size={14} />
              <span>Theme &amp; Colors</span>
            </button>

            <button
              onClick={() => {
                sound.playClick()
                setActiveTab("features")
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs font-semibold transition-colors ${
                activeTab === "features"
                  ? "border-sky-400 text-sky-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <SlidersIcon size={14} />
              <span>Features &amp; FX</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: Profile & Identity */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-3 text-xs text-sky-300 font-mono">
                  💡 Type below to update your website live on screen. All inputs persist locally.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Primary Role / Title
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Headline / Philosophy
                    </label>
                    <input
                      type="text"
                      value={form.headline}
                      onChange={(e) => handleInputChange("headline", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Live Status Beacon
                    </label>
                    <input
                      type="text"
                      value={form.statusBeacon}
                      onChange={(e) => handleInputChange("statusBeacon", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={form.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] uppercase tracking-wider text-slate-400 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={form.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-xs text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleCopyCode}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-500/10 py-2.5 font-mono text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-all"
                  >
                    {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                    <span>{copied ? "Exported Config Copied to Clipboard!" : "Copy Full Config to Clipboard"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Themes & Colors */}
            {activeTab === "theme" && (
              <div className="space-y-4">
                <p className="font-mono text-xs text-slate-400">
                  Select a tailored accent palette to transform lights, highlights, and borders:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEMES.map((opt) => {
                    const isSelected = theme === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setTheme(opt.id)}
                        className={`group flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-sky-400 bg-sky-500/10 ring-1 ring-sky-400/30"
                            : "border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-5 w-5 rounded-full shadow-lg"
                            style={{ backgroundColor: opt.color, boxShadow: `0 0 12px ${opt.glow}` }}
                          />
                          <div>
                            <span className="block font-mono text-xs font-bold text-white">
                              {opt.label}
                            </span>
                            <span className="font-mono text-[0.65rem] text-slate-400">
                              {opt.tag}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-sky-400">
                            <CheckIcon size={16} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Features & FX */}
            {activeTab === "features" && (
              <div className="space-y-4">
                <p className="font-mono text-xs text-slate-400">
                  Toggle dynamic interactive systems and audio feedback:
                </p>

                {/* 3D Canvas Switch */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-sky-400">
                      <SparklesIcon size={16} />
                    </span>
                    <div>
                      <span className="block font-mono text-xs font-bold text-white">
                        3D Cloud Topology Canvas
                      </span>
                      <span className="font-mono text-[0.68rem] text-slate-400">
                        Interactive Three.js particle sphere in hero background
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature("enable3D")}
                    className={`h-6 w-11 rounded-full p-1 transition-colors ${
                      features.enable3D ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        features.enable3D ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Glow Cursor Switch */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-sky-400">
                      <ActivityIcon size={16} />
                    </span>
                    <div>
                      <span className="block font-mono text-xs font-bold text-white">
                        Interactive Glow Cursor
                      </span>
                      <span className="font-mono text-[0.68rem] text-slate-400">
                        Dynamic ambient pointer spotlight with GSAP inertia
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature("enableGlow")}
                    className={`h-6 w-11 rounded-full p-1 transition-colors ${
                      features.enableGlow ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        features.enableGlow ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Tactile Sound FX Switch */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-sky-400">
                      {features.enableAudio ? <VolumeIcon size={16} /> : <VolumeMuteIcon size={16} />}
                    </span>
                    <div>
                      <span className="block font-mono text-xs font-bold text-white">
                        Tactile Synthesizer Audio
                      </span>
                      <span className="font-mono text-[0.68rem] text-slate-400">
                        Web Audio mechanical clicks, beeps, and success cues
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature("enableAudio")}
                    className={`h-6 w-11 rounded-full p-1 transition-colors ${
                      features.enableAudio ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        features.enableAudio ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* CRT Scanline Grid Switch */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-sky-400">
                      <TerminalIcon size={16} />
                    </span>
                    <div>
                      <span className="block font-mono text-xs font-bold text-white">
                        Phosphor Scanline CRT Overlay
                      </span>
                      <span className="font-mono text-[0.68rem] text-slate-400">
                        Subtle retro terminal scanlines effect across screen
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature("enableScanlines")}
                    className={`h-6 w-11 rounded-full p-1 transition-colors ${
                      features.enableScanlines ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        features.enableScanlines ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-white/[0.08] bg-slate-950/60 px-6 py-4">
            <button
              onClick={resetDefaults}
              className="flex items-center gap-1.5 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <RefreshCwIcon size={13} />
              <span>Reset to Defaults</span>
            </button>

            <button
              onClick={() => {
                sound.playClick()
                setIsCustomizerOpen(false)
              }}
              className="rounded-xl bg-sky-500 px-5 py-2 font-mono text-xs font-bold text-slate-950 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
            >
              Done / Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

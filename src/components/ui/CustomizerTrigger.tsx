import { useCustomization, THEMES } from "../../context/CustomizationContext"
import { SettingsIcon } from "./Icons"
import { sound } from "../../lib/sound"

export default function CustomizerTrigger() {
  const { theme, setIsCustomizerOpen } = useCustomization()
  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0]

  return (
    <button
      onClick={() => {
        sound.playClick()
        setIsCustomizerOpen(true)
      }}
      title="Customize Portfolio Profile & Theme"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/85 px-3.5 py-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 transition-all hover:border-sky-400/50 hover:bg-slate-900 hover:scale-105 active:scale-95"
    >
      <span
        className="h-2.5 w-2.5 rounded-full animate-pulse shadow-md"
        style={{
          backgroundColor: currentTheme.color,
          boxShadow: `0 0 8px ${currentTheme.glow}`,
        }}
      />
      <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-white transition-colors flex items-center gap-1.5">
        <SettingsIcon size={13} className="text-sky-400" />
        <span>Customize</span>
      </span>
      <span className="hidden sm:inline-block rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.62rem] text-slate-400">
        LIVE
      </span>
    </button>
  )
}

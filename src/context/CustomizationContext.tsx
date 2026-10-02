import React, { createContext, useContext, useState, useEffect } from "react"
import { portfolioConfig, type PortfolioConfig, type PersonalConfig, type HeroConfig } from "../data/portfolio.config"
import { sound } from "../lib/sound"

export type ThemeId = "azure" | "emerald" | "violet" | "amber" | "monochrome"

export interface ThemeOption {
  id: ThemeId
  label: string
  color: string
  glow: string
  tag: string
}

export const THEMES: ThemeOption[] = [
  { id: "azure", label: "Azure Cyan", color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", tag: "Default Cloud" },
  { id: "emerald", label: "SRE Emerald", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)", tag: "99.9% Uptime" },
  { id: "violet", label: "Cyber Violet", color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", tag: "Futuristic" },
  { id: "amber", label: "Amber Rust", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)", tag: "Industrial" },
  { id: "monochrome", label: "Bryan Monochrome", color: "#e2e8f0", glow: "rgba(226, 232, 240, 0.3)", tag: "Minimalist" },
]

export interface FeaturesConfig {
  enable3D: boolean
  enableGlow: boolean
  enableAudio: boolean
  enableScanlines: boolean
}

interface CustomizationContextType {
  config: PortfolioConfig
  theme: ThemeId
  features: FeaturesConfig
  isCustomizerOpen: boolean
  setIsCustomizerOpen: (open: boolean) => void
  updatePersonal: (fields: Partial<PersonalConfig>) => void
  updateHero: (fields: Partial<HeroConfig>) => void
  setTheme: (theme: ThemeId) => void
  toggleFeature: (feature: keyof FeaturesConfig) => void
  resetDefaults: () => void
  exportConfigAsCode: () => string
}

const STORAGE_KEY_CONFIG = "devops_portfolio_config_v1"
const STORAGE_KEY_THEME = "devops_portfolio_theme_v1"
const STORAGE_KEY_FEATURES = "devops_portfolio_features_v1"

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined)

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<PortfolioConfig>(portfolioConfig)
  const [theme, setThemeState] = useState<ThemeId>("azure")
  const [features, setFeatures] = useState<FeaturesConfig>({
    enable3D: true,
    enableGlow: true,
    enableAudio: true,
    enableScanlines: false,
  })
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as ThemeId | null
      if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
        setThemeState(savedTheme)
        document.documentElement.setAttribute("data-theme", savedTheme)
      } else {
        document.documentElement.setAttribute("data-theme", "azure")
      }

      const savedFeatures = localStorage.getItem(STORAGE_KEY_FEATURES)
      if (savedFeatures) {
        const parsed = JSON.parse(savedFeatures)
        setFeatures((prev) => ({ ...prev, ...parsed }))
        if (typeof parsed.enableAudio === "boolean") {
          sound.setEnabled(parsed.enableAudio)
        }
      }

      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG)
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        setConfig((prev) => ({
          ...prev,
          personal: { ...prev.personal, ...parsed.personal },
          hero: { ...prev.hero, ...parsed.hero },
        }))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    try {
      localStorage.setItem(STORAGE_KEY_THEME, newTheme)
    } catch {
      // Ignore
    }
    sound.playSwitch()
  }

  const toggleFeature = (key: keyof FeaturesConfig) => {
    setFeatures((prev) => {
      const updated = { ...prev, [key]: !prev[key] }
      if (key === "enableAudio") {
        sound.setEnabled(updated.enableAudio)
      }
      try {
        localStorage.setItem(STORAGE_KEY_FEATURES, JSON.stringify(updated))
      } catch {
        // Ignore
      }
      return updated
    })
    sound.playSwitch()
  }

  const updatePersonal = (fields: Partial<PersonalConfig>) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        personal: { ...prev.personal, ...fields },
      }
      try {
        localStorage.setItem(
          STORAGE_KEY_CONFIG,
          JSON.stringify({ personal: updated.personal, hero: updated.hero })
        )
      } catch {
        // Ignore
      }
      return updated
    })
  }

  const updateHero = (fields: Partial<HeroConfig>) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        hero: { ...prev.hero, ...fields },
      }
      try {
        localStorage.setItem(
          STORAGE_KEY_CONFIG,
          JSON.stringify({ personal: updated.personal, hero: updated.hero })
        )
      } catch {
        // Ignore
      }
      return updated
    })
  }

  const resetDefaults = () => {
    setConfig(portfolioConfig)
    setThemeState("azure")
    document.documentElement.setAttribute("data-theme", "azure")
    setFeatures({
      enable3D: true,
      enableGlow: true,
      enableAudio: true,
      enableScanlines: false,
    })
    sound.setEnabled(true)
    try {
      localStorage.removeItem(STORAGE_KEY_CONFIG)
      localStorage.removeItem(STORAGE_KEY_THEME)
      localStorage.removeItem(STORAGE_KEY_FEATURES)
    } catch {
      // Ignore
    }
    sound.playSuccess()
  }

  const exportConfigAsCode = (): string => {
    return `// Updated portfolio configuration export
export const portfolioConfig = ${JSON.stringify(config, null, 2)} as const;
`
  }

  return (
    <CustomizationContext.Provider
      value={{
        config,
        theme,
        features,
        isCustomizerOpen,
        setIsCustomizerOpen,
        updatePersonal,
        updateHero,
        setTheme,
        toggleFeature,
        resetDefaults,
        exportConfigAsCode,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  )
}

export function useCustomization() {
  const ctx = useContext(CustomizationContext)
  if (!ctx) {
    throw new Error("useCustomization must be used within a CustomizationProvider")
  }
  return ctx
}

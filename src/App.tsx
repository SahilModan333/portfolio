import { useState } from "react"
import Nav from "./components/Nav"
import GarageHero from "./components/sections/GarageHero"
import CareerTimeline from "./components/sections/CareerTimeline"
import ControlPlaneSimulator from "./components/interactive/ControlPlaneSimulator"
import GarageGrid from "./components/sections/GarageGrid"
import DevOpsPipeline from "./components/sections/DevOpsPipeline"
import Terminal from "./components/sections/Terminal"
import Incidents from "./components/sections/Incidents"
import Stack from "./components/sections/Stack"
import Credentials from "./components/sections/Credentials"
import HireMe from "./components/sections/HireMe"
import Footer from "./components/sections/Footer"
import FloatingDock from "./components/ui/FloatingDock"
import GlowCursor from "./components/ui/GlowCursor"
import CommandPalette from "./components/ui/CommandPalette"

export default function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false)

  const scrollToTerminal = () => {
    const el = document.getElementById("terminal")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* GSAP Ambient Glow Cursor */}
      <GlowCursor />

      {/* Bryan Garage Style Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onOpenTerminal={scrollToTerminal}
      />

      {/* Skip to Content for Accessibility */}
      <a
        href="#about"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-sky-500 px-4 py-2 font-mono text-xs font-semibold text-slate-950 transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Minimal Top Header with ⌘K & Orange Terminal Triggers */}
      <Nav
        onOpenCommandPalette={() => setIsCmdOpen(true)}
        onOpenTerminal={scrollToTerminal}
      />

      {/* Main Content Sections (100% Scrollable, Continuous Flow — Zero Pagination) */}
      <main id="main">
        {/* 1. Bryan Garage Style Narrative Hero with Vintage Macintosh CRT Monitor Centerpiece */}
        <GarageHero
          onOpenTerminal={scrollToTerminal}
          onOpenCommandPalette={() => setIsCmdOpen(true)}
        />

        {/* 2. Visual Timeline Track (2016–2027 Ruler Scale) */}
        <CareerTimeline />

        {/* 3. Live Control Plane Deploy Simulator */}
        <section id="control-plane" className="relative mx-auto max-w-6xl px-6 lg:px-8 py-10">
          <div className="mb-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Interactive Execution Stage
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Live Control Plane &amp; Rolling Deploy Simulator
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Visual simulation of the multi-stage Azure DevOps to AKS pipeline.
            </p>
          </div>
          <ControlPlaneSimulator />
        </section>

        {/* 4. The Garage Grid: 4 Core Architectural Builds in Bento Cells */}
        <GarageGrid />

        {/* 5. 9-Stage DevOps Pipeline (Code to Infrastructure) */}
        <DevOpsPipeline />

        {/* 6. Interactive SRE Terminal Shell */}
        <Terminal />

        {/* 7. Incident Triage & Runbook Simulator */}
        <Incidents />

        {/* 8. Technology Stack & Tools */}
        <Stack />

        {/* 9. Microsoft Certifications & Academic Education */}
        <Credentials />

        {/* 10. Tactile Hire Me / Work With Me */}
        <HireMe />
      </main>

      {/* Fluid Floating Dock Navigation */}
      <FloatingDock />

      {/* Footer */}
      <Footer />
    </div>
  )
}

import Nav from "./components/Nav"
import Hero from "./components/sections/Hero"
import Work from "./components/sections/Work"
import Build from "./components/sections/Build"
import DevOpsPipeline from "./components/sections/DevOpsPipeline"
import Terminal from "./components/sections/Terminal"
import Incidents from "./components/sections/Incidents"
import Stack from "./components/sections/Stack"
import Credentials from "./components/sections/Credentials"
import HireMe from "./components/sections/HireMe"
import Footer from "./components/sections/Footer"
import FloatingDock from "./components/ui/FloatingDock"
import GlowCursor from "./components/ui/GlowCursor"

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#080b11] text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* GSAP Ambient Glow Cursor */}
      <GlowCursor />

      {/* Skip to Content for Accessibility */}
      <a
        href="#about"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-sky-500 px-4 py-2 font-mono text-xs font-semibold text-slate-950 transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Top Sticky Header */}
      <Nav />

      {/* Main Content Sections */}
      <main id="main">
        {/* 1. Hero & Control Plane Deploy Simulator */}
        <Hero />

        {/* 2. Production Experience & Engineering Profile */}
        <Work />

        {/* 3. Engineered Builds & Portfolio Projects */}
        <Build />

        {/* 4. 9-Stage DevOps Pipeline (Code to Infrastructure) */}
        <DevOpsPipeline />

        {/* 5. Interactive SRE Terminal Shell */}
        <Terminal />

        {/* 6. Incident Triage & Runbook Simulator */}
        <Incidents />

        {/* 7. Technology Stack & Tools */}
        <Stack />

        {/* 8. Microsoft Certifications & Academic Education */}
        <Credentials />

        {/* 9. Hire Me / Work With Me */}
        <HireMe />
      </main>

      {/* TasteSkill-style Fluid Floating Dock Navigation */}
      <FloatingDock />

      {/* Footer */}
      <Footer />
    </div>
  )
}

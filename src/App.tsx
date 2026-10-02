import { useEffect } from "react"
import Nav from "./components/Nav"
import Hero from "./components/sections/Hero"
import TechStackSection from "./components/sections/TechStackSection"
import AzureCertifications from "./components/sections/AzureCertifications"
import Work from "./components/sections/Work"
import Build from "./components/sections/Build"
import DevOpsPipeline from "./components/sections/DevOpsPipeline"
import Incidents from "./components/sections/Incidents"
import Terminal from "./components/sections/Terminal"
import Credentials from "./components/sections/Credentials"
import HireMe from "./components/sections/HireMe"
import Footer from "./components/sections/Footer"
import FloatingDock from "./components/ui/FloatingDock"
import GlowCursor from "./components/ui/GlowCursor"

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])

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
        {/* 1. Hero, Metrics, Control Plane Deploy Simulator & What I Do in Production */}
        <Hero />

        {/* 2. Interactive Tech Stack & Tools Lifecycle (At the top!) */}
        <TechStackSection />

        {/* 3. Verified Microsoft Azure Certifications (Official Badges) */}
        <AzureCertifications />

        {/* 4. Production Experience at Stibo Systems, CI/CD Flow & Engineering Principles */}
        <Work />

        {/* 5. Engineered Builds & Architectural Projects */}
        <Build />

        {/* 6. DevOps Delivery Pipeline (Code to Infrastructure) */}
        <DevOpsPipeline />

        {/* 7. Incident Triage & Post-Mortem Runbooks */}
        <Incidents />

        {/* 8. Interactive SRE Terminal Shell */}
        <Terminal />

        {/* 9. Academic Education in Cloud Systems & Open Source */}
        <Credentials />

        {/* 10. Hire Me / Work With Me */}
        <HireMe />
      </main>

      {/* Fluid Floating Dock Navigation */}
      <FloatingDock />

      {/* Footer */}
      <Footer />
    </div>
  )
}

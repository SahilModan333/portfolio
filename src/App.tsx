import { useState } from "react"
import Preloader from "./nothin/Preloader"
import Navigation from "./nothin/Navigation"
import MonolithHero from "./nothin/MonolithHero"
import ManifestoSection from "./nothin/ManifestoSection"
import WorksShowcase from "./nothin/WorksShowcase"
import TaxonomySection from "./nothin/TaxonomySection"
import GlitchManifesto from "./nothin/GlitchManifesto"
import ContactZero from "./nothin/ContactZero"

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#08090b] text-slate-100 selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      {/* 00 // Luxury Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* Top Editorial Navigation HUD */}
      <Navigation />

      {/* Skip to Content for Accessibility */}
      <a
        href="#hero"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-white px-4 py-2 font-mono text-xs font-bold text-black transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Main Experience Stream */}
      <main id="main">
        {/* 01 // The Monolith Hero */}
        <MonolithHero />

        {/* 02 // The Manifesto (The Step Aside) */}
        <ManifestoSection />

        {/* 03 // Works: The Case Odysseys */}
        <WorksShowcase />

        {/* 04 // Capability Taxonomy */}
        <TaxonomySection />

        {/* 05 // The Kinetic Collision */}
        <GlitchManifesto />

        {/* 06 // Engagement: Let's Start From Zero */}
        <ContactZero />
      </main>
    </div>
  )
}

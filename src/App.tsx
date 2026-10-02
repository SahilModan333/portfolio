import TectonicHUD from "./tectonic/TectonicHUD"
import TectonicHero from "./tectonic/TectonicHero"
import ManifestoTension from "./tectonic/ManifestoTension"
import CaseOdysseys from "./tectonic/CaseOdysseys"
import ChaosLaboratory from "./tectonic/ChaosLaboratory"
import CapabilityTaxonomy from "./tectonic/CapabilityTaxonomy"
import GroundZero from "./tectonic/GroundZero"

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#f0ece1] selection:bg-[#d4ff00] selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Top Editorial HUD */}
      <TectonicHUD />

      {/* Skip to Content for Accessibility */}
      <a
        href="#hero"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-[#d4ff00] px-4 py-2 font-mono text-xs font-bold text-black transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Main Experience Stream */}
      <main id="main">
        {/* 01 // The Emergence: Monumental Hero with Interactive Physics */}
        <TectonicHero />

        {/* 02 // The Manifesto: Interactive Tension & Telemetry Convergence */}
        <ManifestoTension />

        {/* 03 // Selected Work: 4 Production Odysseys (Anti-Card Architecture) */}
        <CaseOdysseys />

        {/* 04 // The Chaos Lab: Interactive Physics & Resilience Playground */}
        <ChaosLaboratory />

        {/* 05 // Capability Taxonomy: Disciplines with Elastic Tension Dividers */}
        <CapabilityTaxonomy />

        {/* 06 // Ground Zero: Engagement Finale & Direct Telephony */}
        <GroundZero />
      </main>
    </div>
  )
}

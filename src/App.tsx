import { useState } from "react"
import Nav from "./components/Nav"
import Hero from "./components/sections/Hero"
import Snapshot from "./components/sections/Snapshot"
import About from "./components/sections/About"
import HowIWork from "./components/sections/HowIWork"
import Experience from "./components/sections/Experience"
import Projects from "./components/sections/Projects"
import Architecture from "./components/sections/Architecture"
import Skills from "./components/sections/Skills"
import Certifications from "./components/sections/Certifications"
import Education from "./components/sections/Education"
import GitHubSection from "./components/sections/GitHubSection"
import Contact from "./components/sections/Contact"
import Footer from "./components/sections/Footer"
import { ResumeModal } from "./components/ResumeModal"

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav onResumeOpen={() => setResumeOpen(true)} />
      <main id="main-content">
        <Hero onResumeOpen={() => setResumeOpen(true)} />
        <Snapshot />
        <About />
        <HowIWork />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <Certifications />
        <Education />
        <GitHubSection />
        <Contact onResumeOpen={() => setResumeOpen(true)} />
      </main>
      <Footer onResumeOpen={() => setResumeOpen(true)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}

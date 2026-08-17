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

export default function App() {
  return (
    <>
      {/* SEO meta via title */}
      <title>Sahil Modan | Azure Cloud Operations & DevOps Engineer</title>

      <Nav />

      <main>
        <Hero />
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
        <Contact />
      </main>

      <Footer />
    </>
  )
}

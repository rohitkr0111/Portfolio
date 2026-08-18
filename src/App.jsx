import { useState } from 'react'
import './App.css'
import './theme.css'
import Navbar from './components/navbar/navbar'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import About from './components/About/About'
import Services from './components/Services/Services'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import ResumeModal from './components/ResumeModal/ResumeModal'
import GrainOverlay from './components/GrainOverlay/GrainOverlay'

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div>
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      <Hero onOpenResume={() => setResumeOpen(true)} />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Contact />
      <Footer />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  )
}

export default App

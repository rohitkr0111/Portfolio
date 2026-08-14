import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import ResumeModal from './components/ResumeModal/ResumeModal'

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div>
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      <Hero onOpenResume={() => setResumeOpen(true)} />
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

import './App.css'
import './theme.css'
import Navbar from './components/navbar/navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import TechSkills from './components/TechSkills/TechSkills'
import Services from './components/Services/Services'
import Work from './components/Work/Work'
import Certificates from './components/Certificates/Certificates'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import GrainOverlay from './components/GrainOverlay/GrainOverlay'

const App = () => {
  return (
    <div>
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <TechSkills />
      <Services />
      <Work />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

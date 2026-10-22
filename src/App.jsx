import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

const TECH_STACK = [
  'HTML',
  'Tailwind CSS',
  'JavaScript',
  'React',
  'Vite',
  'Git',
  'EmailJS',
]

export default function App() {
  useLenis()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={TECH_STACK} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

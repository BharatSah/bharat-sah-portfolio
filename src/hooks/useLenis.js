import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { setLenis } from '../utils/scroll'
import { prefersReducedMotion } from '../utils/motion'

// Initializes Lenis smooth scrolling and keeps it in sync with GSAP
// ScrollTrigger. Disabled entirely under prefers-reduced-motion (native
// scroll is used instead). Cleans up its ticker + instance on unmount.
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis' rAF loop from GSAP's ticker so the two never fight.
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Re-measure once webfonts settle so split-text/scroll triggers align.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(onTick)
      setLenis(null)
      lenis.destroy()
    }
  }, [])
}

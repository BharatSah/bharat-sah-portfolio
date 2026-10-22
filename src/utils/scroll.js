// Centralized scrolling so every anchor/CTA behaves the same way.
// When Lenis is active it drives the scroll; otherwise we fall back to the
// browser's native smooth scroll. This keeps anchor links, browser back/forward,
// and ScrollTrigger all in sync.

let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

// Scroll to a target (element, selector, or number) smoothly.
export function scrollToTarget(target, { offset = 0, behavior = 'smooth' } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) el.scrollIntoView({ behavior, block: 'start' })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior })
}

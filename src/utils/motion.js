// Shared motion helpers used across the portfolio.

// True when the user has asked the OS to minimize non-essential motion.
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Easing curves (cubic-bezier arrays) kept in one place for consistency.
export const EASE = {
  // Fast-out, slow-in — good for entrances.
  outExpo: 'expo.out',
  outQuart: 'power4.out',
  // Gentle, continuous — good for parallax / scrubbed motion.
  linear: 'none',
}

// Standard reveal timing (ms) so entrances feel coordinated.
export const REVEAL = {
  duration: 0.9,
  stagger: 0.08,
  y: 28,
}

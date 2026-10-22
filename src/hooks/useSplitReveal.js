import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '../utils/gsap'
import { prefersReducedMotion } from '../utils/motion'

// Splits the referenced heading into words and reveals them with a staggered
// mask-rise when scrolled into view (Sheryians-style split-text reveal).
// Skipped under prefers-reduced-motion. Returns the ref for the heading.
export function useSplitReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const split = new SplitText(el, {
      type: 'words lines',
      linesClass: 'split-line',
      wordsClass: 'split-word',
    })

    // Wrap each line in an overflow-hidden mask so words rise into place.
    const masks = []
    split.lines.forEach((line) => {
      const mask = document.createElement('span')
      mask.className = 'split-mask'
      line.parentNode.insertBefore(mask, line)
      mask.appendChild(line)
      masks.push({ mask, line })
    })

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    }, el)

    return () => {
      ctx.revert()
      // Unwrap the mask spans we added before SplitText reverts itself.
      masks.forEach(({ mask, line }) => {
        mask.parentNode?.insertBefore(line, mask)
        mask.remove()
      })
      split.revert()
    }
  }, [])

  return ref
}

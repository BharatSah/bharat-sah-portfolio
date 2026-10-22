import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

// Reveal-on-scroll wrapper. Respects prefers-reduced-motion (the global CSS
// disables transitions in that mode, so the element simply shows immediately).
// The entry transition-delay is applied only while animating in and cleared
// afterwards so it can't delay later (hover) transitions on the same node.
// `will-change` is removed after the reveal to free GPU memory.
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      setEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Drop the temporary entry styles shortly after the reveal completes.
  useEffect(() => {
    if (!visible || entered) return
    const t = setTimeout(() => setEntered(true), 1200 + delay)
    return () => clearTimeout(t)
  }, [visible, entered, delay])

  const style = {}
  if (visible && !entered && delay) {
    style.transitionDelay = `${delay}ms`
  }
  if (!entered) {
    style.willChange = 'transform, opacity'
  }

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

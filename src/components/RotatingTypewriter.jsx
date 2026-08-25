import { useEffect, useRef, useState } from 'react'

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Continuously types, pauses, deletes, then types the next phrase — looping
// forever. No blinking cursor. Reserves the widest phrase's width so the
// centered heading doesn't jitter. Honors prefers-reduced-motion (shows the
// first phrase statically).
export default function RotatingTypewriter({
  phrases,
  typeSpeed = 75,
  deleteSpeed = 40,
  pause = 1600,
  className = '',
}) {
  const [text, setText] = useState(() => (reducedMotion() ? phrases[0] : ''))
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timer = useRef(null)

  const widest = phrases.reduce((a, b) => (b.length > a.length ? b : a), phrases[0])

  useEffect(() => {
    if (reducedMotion()) {
      setText(phrases[0])
      return
    }
    const current = phrases[phraseIdx]

    if (!deleting && text === current) {
      timer.current = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(timer.current)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
      return
    }
    timer.current = setTimeout(() => {
      setText((t) =>
        deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
      )
    }, deleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(timer.current)
  }, [text, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pause])

  return (
    <span className={`relative inline-block text-left ${className}`}>
      {/* Invisible sizer = widest phrase keeps layout stable */}
      <span className="invisible" aria-hidden="true">
        {widest}
      </span>
      {/* Visible, typed portion (no cursor) */}
      <span className="absolute inset-0" aria-hidden="true">
        {text}
      </span>
      {/* Real text for assistive tech */}
      <span className="sr-only">{phrases.join('. ')}</span>
    </span>
  )
}

import { useEffect, useRef, useState } from 'react'

// Lazy section: renders a lightweight placeholder until it scrolls into view,
// so the page doesn't load every section up front. Once shown, it stays.
export default function Section({ id, className = '', minHeight = 480, children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section id={id} ref={ref} className={className}>
      {shown ? (
        children
      ) : (
        <div
          className="container-page"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </section>
  )
}

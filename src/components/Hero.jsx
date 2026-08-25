import { useRef } from 'react'
import { profile } from '../data/portfolio'
import RotatingTypewriter from './RotatingTypewriter'

const HEADING_PHRASES = [
  "Hi, I'm Bharat Sah",
  "I'm a Software Developer",
  "I'm a React Developer",
  "I'm a Frontend Developer",
  'I build useful web experiences',
]

export default function Hero() {
  const bgRef = useRef(null)
  const glowRef = useRef(null)
  const reduceRef = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const handleMove = (e) => {
    if (reduceRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    if (bgRef.current) {
      bgRef.current.style.transform =
        `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) ` +
        `rotateY(${(x * 6).toFixed(2)}deg) scale(1.04)`
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '1'
      glowRef.current.style.left = `${e.clientX - rect.left}px`
      glowRef.current.style.top = `${e.clientY - rect.top}px`
    }
  }

  const handleLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1.04)'
    }
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center"
    >
      {/* Creative 3D background (mouse-reactive) */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-center transition-transform duration-300 ease-out"
        style={{
          transform:
            'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1.04)',
        }}
      >
        {/* Soft depth glow */}
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        {/* Perspective grid floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 origin-bottom animate-grid-scroll"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            transform: 'perspective(420px) rotateX(62deg)',
            maskImage: 'linear-gradient(to top, black, transparent 78%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 78%)',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute left-[16%] top-[24%] h-44 w-44 rounded-full bg-white/10 blur-3xl animate-orb-float" />
        <div
          className="absolute right-[14%] top-[32%] h-28 w-28 rounded-full bg-white/[0.08] blur-3xl animate-orb-float"
          style={{ animationDelay: '1.6s' }}
        />

        {/* Faint dot texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.16) 1px, transparent 1.6px)',
            backgroundSize: '26px 26px',
          }}
        />
      </div>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.12), transparent 60%)',
        }}
      />

      <div className="container-page relative flex flex-col items-center pb-24">
        {/* Eyebrow — above the image */}
        <p className="label flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-paper/60" />
          {profile.eyebrow}
          <span className="h-px w-8 bg-paper/60" />
        </p>

        {/* Profile photo (centered) */}
        <div className="relative my-10">
          <span className="absolute -inset-4 rounded-full border border-dashed border-white/15" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/15 bg-ink-card shadow-[0_0_60px_-15px_rgba(255,255,255,0.35)]">
            <img
              src="/profile.png"
              alt="Bharat Sah"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full border border-paper bg-ink" />
          <span className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-paper" />
        </div>

        {/* Rotating, cursorless typing heading — centered */}
        <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-chalk text-balance sm:text-6xl">
          <RotatingTypewriter phrases={HEADING_PHRASES} />
        </h1>

        {/* Animated accent line */}
        <span className="mt-6 block h-px w-24 origin-center bg-paper/70 animate-accent-grow" />

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-chalk-muted">
          {profile.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="btn-primary"
          >
            View My Projects
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="btn-ghost"
          >
            Contact Me
          </button>
        </div>

        <dl className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="label">Focus</dt>
            <dd className="mt-1 text-chalk">Front-end Development</dd>
          </div>
          <div>
            <dt className="label">Stack</dt>
            <dd className="mt-1 text-chalk">HTML · Tailwind · JS · React</dd>
          </div>
          <div>
            <dt className="label">Status</dt>
            <dd className="mt-1 text-chalk">Open to junior roles</dd>
          </div>
        </dl>
      </div>

      {/* Scroll-down indicator (clear of content) */}
      <button
        type="button"
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-chalk-faint hover:text-paper sm:flex"
        aria-label="Scroll to next section"
      >
        <span className="font-mono text-[10px] uppercase tracking-label">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 rounded-full bg-paper animate-scroll-bounce" />
        </span>
      </button>
    </section>
  )
}

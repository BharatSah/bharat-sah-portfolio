import { useRef } from 'react'
import { education } from '../data/portfolio'
import { prefersReducedMotion } from '../utils/motion'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const CapIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M2 8l10-4 10 4-10 4-10-4z" />
    <path d="M6 10v4.5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5V10" />
    <path d="M22 8v4.5" />
  </svg>
)

function EducationCard({ item, index }) {
  const ref = useRef(null)
  const reduceRef = useRef(prefersReducedMotion())

  const handleMove = (e) => {
    const node = ref.current
    if (!node || reduceRef.current) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--x', `${e.clientX - rect.left}px`)
    node.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <Reveal
      as="li"
      delay={index * 120}
      className="group relative ml-6 pb-10 last:pb-0"
    >
      {/* Clean node dot on the line */}
      <span className="absolute -left-[1.95rem] top-2 grid h-4 w-4 place-items-center rounded-full border border-paper bg-ink transition-transform duration-300 group-hover:scale-125">
        <span className="h-1.5 w-1.5 rounded-full bg-paper" />
      </span>

      {/* Card */}
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-paper/50 hover:shadow-[0_24px_60px_-28px_rgba(255,255,255,0.55)]"
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(300px circle at var(--x, 50%) var(--y, 0%), rgba(255,255,255,0.10), transparent 60%)',
          }}
        />

        {/* Animated gradient top accent */}
        <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-paper to-transparent transition-transform duration-500 group-hover:scale-x-100" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="label">
              {String(index + 1).padStart(2, '0')} — Education
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-chalk transition-colors group-hover:text-paper">
              {item.level}
            </h3>
            <p className="mt-1 text-chalk-muted">
              {item.institution}
              {item.location ? `, ${item.location}` : ''}
            </p>
          </div>

          <span className="grid h-11 w-11 flex-none items-center justify-center rounded-xl border border-ink-line bg-transparent text-paper transition-all duration-300 group-hover:scale-110 group-hover:border-paper/50 group-hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.7)]">
            {CapIcon}
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export default function Education() {
  return (
    <Section id="education" className="py-24">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Education"
          title="Education"
          description="My academic background — listed honestly, without fabricated dates or grades."
        />

        <div className="mt-12 max-w-3xl">
          {/* Clean static vertical timeline line */}
          <ol className="relative border-l border-ink-line">
            {education.map((item, i) => (
              <EducationCard key={item.level} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

import Reveal from './Reveal'
import SectionBadge from './SectionBadge'
import { useSplitReveal } from '../hooks/useSplitReveal'

// Standardized, attractive section header used across the page.
// The title uses a split-text reveal; the label and description fade in via
// Reveal (kept separate so the title isn't double-faded).
export default function SectionHeading({ label, title, description }) {
  const titleRef = useSplitReveal()

  return (
    <div className="text-center">
      <Reveal>
        <p className="label flex justify-center">
          <SectionBadge>{label}</SectionBadge>
        </p>
      </Reveal>

      <h2 ref={titleRef} className="section-title mx-auto mt-2 max-w-5xl text-balance text-center">
        {title}
      </h2>

      <Reveal delay={80}>
        {description && (
          <p className="mx-auto mt-2 max-w-2xl text-center text-chalk-muted">{description}</p>
        )}
      </Reveal>
    </div>
  )
}

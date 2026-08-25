import Reveal from './Reveal'

// Standardized, attractive section header used across the page.
export default function SectionHeading({ index, label, title, description }) {
  return (
    <Reveal>
      <p className="label flex items-center gap-3">
        <span className="h-px w-8 bg-paper/50" />
        <span className="text-paper">{index}</span>
        <span className="text-chalk-faint">—</span>
        <span>{label}</span>
      </p>
      <h2 className="section-title mt-3">{title}</h2>
      {/* Animated accent line */}
      <span className="mt-5 block h-px w-16 origin-left bg-paper/70 animate-accent-grow" />
      {description && (
        <p className="mt-5 max-w-2xl text-chalk-muted">{description}</p>
      )}
    </Reveal>
  )
}

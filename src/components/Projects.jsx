import { useRef } from 'react'
import { projects } from '../data/portfolio'
import { prefersReducedMotion } from '../utils/motion'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ProjectThumbnail({ title, index, image }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-line bg-ink-soft">
      {image ? (
        <img
          src={image}
          alt={`${title} preview`}
          width={1888}
          height={916}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <>
          {/* Grid backdrop (zooms gently on hover) */}
          <div className="absolute inset-0 grid-bg opacity-40 transition-transform duration-700 ease-out group-hover:scale-110" />

          {/* Window chrome */}
          <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-ink-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
            <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
            <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
            <span className="ml-3 truncate font-mono text-[11px] text-chalk-faint">
              {`project-${String(index + 1).padStart(2, '0')}.dev`}
            </span>
          </div>

          {/* Abstract content blocks (zoom on hover) */}
          <div className="absolute inset-x-0 top-14 flex flex-col gap-3 px-5 transition-transform duration-700 ease-out group-hover:scale-110">
            <div className="h-3 w-2/3 rounded bg-paper/15" />
            <div className="h-3 w-5/6 rounded bg-paper/10" />
            <div className="h-3 w-1/2 rounded bg-paper/10" />
            <div className="mt-3 h-16 w-full rounded-lg border border-paper/10 bg-white/[0.03]" />
          </div>
        </>
      )}

      {/* Hover sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.10), transparent 60%)',
        }}
      />
    </div>
  )
}

function ProjectCard({ project, index }) {
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
      delay={index * 90}
      className="group relative"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="card relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-paper/50 hover:shadow-[0_24px_60px_-28px_rgba(255,255,255,0.55)]"
      >
        {/* Cursor-following spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(320px circle at var(--x, 50%) var(--y, 0%), rgba(255,255,255,0.10), transparent 60%)',
          }}
        />

        {/* Animated gradient top accent */}
        <span className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-paper to-transparent transition-transform duration-500 group-hover:scale-x-100" />

        <ProjectThumbnail title={project.title} image={project.image} index={index} />

        <div className="relative z-20 flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-chalk transition-colors group-hover:text-paper">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-chalk-muted">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ink-line px-2.5 py-1 font-mono text-[11px] text-chalk-muted transition-colors group-hover:border-paper/30"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* Show both destinations, but never activate a missing or placeholder URL. */}
          <div className="mt-6 flex items-center gap-3">
            {project.demoUrl && project.demoUrl !== '#' ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary group/demo !rounded-lg flex-1 text-xs"
              >
                Live Demo
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform duration-300 group-hover/demo:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M14 4h6v6" />
                  <path d="M20 4l-8 8" />
                  <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                </svg>
              </a>
            ) : (
              <button type="button" disabled title="Live demo URL not added yet" className="btn-primary !rounded-lg flex-1 cursor-not-allowed text-xs opacity-40">
                Live Demo
              </button>
            )}
            {project.codeUrl && project.codeUrl !== '#' ? (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost group/code !rounded-lg flex-1 text-xs"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            ) : (
              <button type="button" disabled title="GitHub repository URL not added yet" className="btn-ghost !rounded-lg flex-1 cursor-not-allowed text-xs opacity-40">
                GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects" className="py-24">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Projects"
          title="Selected work"
          description="A small, honest snapshot of what I’m building now. I’ll add more work as projects are ready to share."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

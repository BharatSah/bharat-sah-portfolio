import { projects } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ProjectThumbnail({ title, index }) {
  // Abstract, on-theme window mockup (no fake screenshots).
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-line bg-ink-soft">
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Window chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-ink-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-paper/40" />
        <span className="ml-3 truncate font-mono text-[11px] text-chalk-faint">
          {`project-${String(index + 1).padStart(2, '0')}.dev`}
        </span>
      </div>

      {/* Abstract content blocks */}
      <div className="absolute inset-x-0 top-14 flex flex-col gap-3 px-5">
        <div className="h-3 w-2/3 rounded bg-paper/15" />
        <div className="h-3 w-5/6 rounded bg-paper/10" />
        <div className="h-3 w-1/2 rounded bg-paper/10" />
        <div className="mt-3 h-16 w-full rounded-lg border border-paper/10 bg-white/[0.03]" />
      </div>

      <span className="absolute bottom-4 right-4 font-mono text-[11px] uppercase tracking-label text-paper/70">
        {title}
      </span>
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" className="border-t border-ink-line py-24">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Projects"
          title="Selected work"
          description="A growing collection of builds. Links are editable placeholders — swap in your real repositories and demos when ready."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 90}
              className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-paper/50 hover:shadow-[0_0_50px_-25px_rgba(255,255,255,0.5)]"
            >
              <ProjectThumbnail title={project.title} index={i} />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-chalk">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-chalk-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink-line px-2.5 py-1 font-mono text-[11px] text-chalk-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost flex-1 text-xs"
                  >
                    View Code
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary flex-1 text-xs"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

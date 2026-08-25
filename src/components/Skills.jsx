import { skillGroups } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const ICONS = {
  HTML: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h12a3 3 0 1 0-3-3M3 16h14a3 3 0 1 1-3 3" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7c-2 0-3 1-3 3v4c0 2-1 3-3 3M16 7c2 0 3 1 3 3v4c0 2 1 3 3 3" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  EmailJS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
}

export default function Skills() {
  return (
    <Section id="skills" className="border-t border-ink-line py-24">
      <div className="container-page">
        <SectionHeading
          index="02"
          label="Skills"
          title="What I work with"
          description="A focused front-end toolkit. Each tool is something I’ve used in real practice — described by what it does, not by a fake score."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.category}
              delay={gi * 80}
              className="card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-paper/40 hover:shadow-[0_0_40px_-20px_rgba(255,255,255,0.4)]"
            >
              <span className="label">{group.category}</span>
              <ul className="mt-4 flex flex-col gap-5">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex gap-4">
                    <span className="grid h-11 w-11 flex-none items-center justify-center rounded-xl border border-ink-line bg-ink-soft text-paper">
                      {ICONS[skill.name] || ICONS.JavaScript}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-chalk">
                        {skill.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-chalk-muted">
                        {skill.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

import { education } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <Section id="education" className="border-t border-ink-line py-24">
      <div className="container-page">
        <SectionHeading index="04" label="Education" title="Education" />

        <div className="mt-12 max-w-3xl">
          <ol className="relative border-l border-ink-line">
            {education.map((item, i) => (
              <Reveal
                key={item.level}
                delay={i * 100}
                as="li"
                className="relative ml-6 pb-12 last:pb-0"
              >
                <span className="absolute -left-[1.95rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-paper bg-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                </span>
                {/* Year-less, honest card */}
                <div className="card p-6 transition-colors hover:border-paper/40">
                  <h3 className="font-display text-xl font-semibold text-chalk">
                    {item.level}
                  </h3>
                  <p className="mt-1 text-chalk-muted">
                    {item.institution}
                    {item.location ? `, ${item.location}` : ''}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

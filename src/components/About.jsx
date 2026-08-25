import { profile } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <Section id="about" className="border-t border-ink-line py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          index="01"
          label="About"
          title="A bit about me"
        />

        <Reveal delay={100}>
          <p className="text-lg leading-relaxed text-chalk-muted">
            {profile.about}
          </p>

          <p className="mt-5 leading-relaxed text-chalk-muted">
            I’m currently focused on strengthening my front-end fundamentals and
            building small, real projects with{' '}
            <span className="text-chalk">React</span> and{' '}
            <span className="text-chalk">Tailwind CSS</span>. I care about
            writing clean, accessible markup and interfaces that feel calm and
            easy to use.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-3">
            {[
              ['+2 CS', 'Graduate'],
              ['React', 'Learning daily'],
              ['Responsive', 'By default'],
            ].map(([k, v]) => (
              <div key={k} className="group bg-ink-card p-5 transition-colors hover:bg-ink-soft">
                <div className="font-display text-xl font-semibold text-chalk">
                  {k}
                </div>
                <div className="mt-1 text-sm text-chalk-muted">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

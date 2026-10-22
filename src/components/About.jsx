import { education, profile } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const PRINCIPLES = [
  {
    title: 'Clear interfaces',
    text: 'Keep the page easy to understand and straightforward to use.',
  },
  {
    title: 'Responsive by default',
    text: 'Make layouts work across small screens and desktop.',
  },
  {
    title: 'Learn by building',
    text: 'Improve fundamentals through practical, finished projects.',
  },
]

export default function About() {
  const latestEducation = education[0]

  return (
    <Section id="about" className="py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-paper/10 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center gap-2 border-b border-ink-line pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-paper" />
                <span className="font-mono text-xs text-chalk-faint">bharat.profile</span>
              </div>

              <p className="label mt-8 text-paper">Current focus</p>
              <h3 className="mt-3 max-w-sm font-display text-2xl font-semibold leading-snug text-chalk sm:text-3xl">
                Building practical web interfaces with React.
              </h3>

              <dl className="mt-8 divide-y divide-ink-line border-y border-ink-line">
                <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-chalk-faint">Role</dt>
                  <dd className="text-sm text-chalk">{profile.role}</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-chalk-faint">Education</dt>
                  <dd className="text-sm text-chalk">
                    {latestEducation?.level} · {latestEducation?.institution}
                  </dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-chalk-faint">Approach</dt>
                  <dd className="text-sm text-chalk">Learn, build, improve</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Development focus">
                {['React', 'JavaScript', 'Tailwind CSS'].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink-line bg-ink-soft px-3 py-1.5 font-mono text-xs text-chalk-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            index="01"
            label="About"
            title="A bit about me"
            description="A computer science graduate growing into front-end development one practical build at a time."
          />

          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-chalk-muted">
              {profile.about}
            </p>
            <p className="mt-5 leading-relaxed text-chalk-muted">
              I’m currently strengthening my React and front-end fundamentals. I
              care about semantic HTML, accessible interactions, and layouts
              that stay useful on both mobile and desktop.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 80}>
                <article className="h-full rounded-2xl border border-ink-line bg-ink-soft/60 p-4">
                  <span className="font-mono text-xs text-paper">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-sm font-semibold text-chalk">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-chalk-muted">
                    {principle.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

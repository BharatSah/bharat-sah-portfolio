import { profile } from '../data/portfolio'
import { scrollToTarget } from '../utils/scroll'
import RotatingTypewriter from './RotatingTypewriter'
import SectionBadge from './SectionBadge'

const FOCUS_TECH = ['React', 'JavaScript', 'Tailwind CSS']
const HERO_PHRASES = [
  'Bharat Sah',
  'React Developer',
  'Web Developer',
]

export default function Hero() {
  const scrollTo = (id) => scrollToTarget(`#${id}`)

  return (
    <section id="home" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full bg-paper/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <SectionBadge className="mt-6">Welcome to my portfolio</SectionBadge>

          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-chalk text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Hi, I’m</span>
            <span className="mt-1 block min-h-[1.15em] text-paper">
              <RotatingTypewriter
                phrases={HERO_PHRASES}
                typeSpeed={85}
                deleteSpeed={42}
                pause={1500}
                className="text-left"
              />
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-chalk-muted sm:text-lg sm:leading-8">
            {profile.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap justify-start gap-3">
            <a
              href="#projects"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('projects')
              }}
              className="btn-primary !rounded-xl px-7 py-4 text-base font-semibold"
            >
              Explore my work
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('contact')
              }}
              className="btn-ghost !rounded-xl px-7 py-4 text-base"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-8 pt-2">
            <p className="label">Currently building with</p>
            <ul className="mt-3 flex flex-wrap justify-start gap-2" aria-label="Current technology focus">
              {FOCUS_TECH.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-ink-line bg-ink-card/60 px-3 py-1.5 font-mono text-xs text-chalk-muted"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="relative isolate mx-auto flex w-full max-w-md flex-col items-center lg:justify-self-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:h-[23rem] sm:w-[23rem] lg:h-[28rem] lg:w-[28rem]"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(210,210,210,0.08) 45%, transparent 72%)',
            }}
          />
          <div className="absolute left-1 top-[18%] z-10 rounded-full border border-ink-line bg-ink-card px-3 py-2 font-mono text-xs text-chalk shadow-lg sm:left-0">
            React
          </div>
          <div className="absolute bottom-[24%] right-0 z-10 rounded-full border border-ink-line bg-ink-card px-3 py-2 font-mono text-xs text-chalk shadow-lg sm:right-1">
            UI that adapts
          </div>
          <div className="relative z-[1] h-64 w-64 overflow-hidden rounded-full border border-white/15 bg-ink-card shadow-[0_0_90px_-35px_rgba(255,255,255,0.14)] sm:h-80 sm:w-80 lg:h-[25rem] lg:w-[25rem]">
            <img
              src="/profile.png"
              alt="Portrait of Bharat Sah"
              width="480"
              height="480"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}

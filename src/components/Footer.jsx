import { profile, social, navLinks } from '../data/portfolio'
import { generateResume } from '../utils/generateResume'

const socials = [
  {
    label: 'GitHub',
    href: social.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: social.email ? `mailto:${social.email}` : '',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
].filter((socialLink) => Boolean(socialLink.href))

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="container-page pb-10 pt-16">
        {/* Brand, useful navigation and direct contact options. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">
              Bharat Sah
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-chalk-muted">
              {profile.subtitle}
            </p>
            <ul className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink-line bg-ink-card text-chalk-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/50 hover:text-paper"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="label text-chalk-muted">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-chalk-muted transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="More">
            <h3 className="label text-chalk-muted">More</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-chalk-muted transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={generateResume}
                  className="text-left text-chalk-muted transition-colors hover:text-paper"
                >
                  Download Resume
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="label text-chalk-muted">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {social.email ? (
                <li>
                  <a
                    href={`mailto:${social.email}`}
                    className="break-all text-chalk-muted transition-colors hover:text-paper"
                  >
                    {social.email}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-chalk-muted transition-colors hover:text-paper"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-chalk-muted transition-colors hover:text-paper"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex justify-center text-center">
          <p className="inline-flex items-center gap-1.5 text-sm text-chalk-muted">
            Made with love by Bharat Sah
            <span role="img" aria-label="red heart" className="text-red-500">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

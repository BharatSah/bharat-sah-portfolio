import { profile, social } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-line py-12">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-ink-line font-display text-xs font-bold text-paper">
            BS
          </span>
          <span className="text-sm text-chalk-muted">
            © {year} {profile.name}
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm">
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="text-chalk-muted hover:text-paper"
          >
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-chalk-muted hover:text-paper"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${social.email}`}
            className="text-chalk-muted hover:text-paper"
          >
            Email
          </a>
        </nav>

        <a
          href={profile.resumeUrl}
          download
          className="text-sm text-chalk-muted hover:text-paper"
        >
          Download Resume
        </a>
      </div>
    </footer>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'
import useScrollSpy from './useScrollSpy'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const ids = useMemo(() => navLinks.map((l) => l.id), [])
  const active = useScrollSpy(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-ink-line bg-ink/80 backdrop-blur'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, 'home')}
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink-line font-display text-sm font-bold text-paper">
            BS
          </span>
          <span className="font-display text-sm font-semibold tracking-wide text-chalk">
            Bharat<span className="text-paper">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === link.id
                    ? 'text-chalk'
                    : 'text-chalk-muted hover:text-chalk'
                }`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-paper transition-transform duration-300 ${
                    active === link.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop resume button */}
        <a
          href={profile.resumeUrl}
          download
          className="btn-primary hidden md:inline-flex"
        >
          Download Resume
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink-line text-chalk md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-line bg-ink/95 backdrop-blur md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-[max-height] duration-300`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className={`block rounded-lg px-3 py-3 text-base ${
                  active === link.id
                    ? 'bg-ink-card text-paper'
                    : 'text-chalk-muted'
                }`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={profile.resumeUrl}
              download
              className="btn-primary w-full"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

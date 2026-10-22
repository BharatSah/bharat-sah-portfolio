import { useEffect, useMemo, useState } from 'react'
import { navLinks } from '../data/portfolio'
import useScrollSpy from './useScrollSpy'
import { generateResume } from '../utils/generateResume'
import { scrollToTarget } from '../utils/scroll'

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
    scrollToTarget(`#${id}`)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-ink-line bg-ink/80 backdrop-blur'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        {/* Desktop links centered in the middle grid column */}
        <ul className="hidden items-center justify-center gap-1 lg:col-start-2 lg:flex">
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
        <div className="hidden justify-self-end lg:col-start-3 lg:block">
          <button
            type="button"
            onClick={generateResume}
            className="btn-primary !rounded-lg"
          >
            Download Resume
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="col-start-3 grid h-10 w-10 justify-self-end place-items-center rounded-lg border border-ink-line text-chalk lg:hidden"
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
          className={`overflow-hidden border-t border-ink-line bg-ink/95 backdrop-blur lg:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-[max-height] duration-300`}
      >
        <ul className="container-page flex flex-col items-center gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className={`block w-full rounded-lg px-3 py-3 text-center text-base ${
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
            <button
              type="button"
              onClick={generateResume}
              className="btn-primary !rounded-lg w-full"
            >
              Download Resume
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

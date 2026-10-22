import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { emailjsConfig, social } from '../data/portfolio'
import { prefersReducedMotion } from '../utils/motion'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY = { name: '', email: '', message: '' }

const EmailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

const GitHubIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const CONTACTS = [
  {
    label: 'Email',
    hint: 'Drop me a line',
    href: `mailto:${social.email}`,
    value: social.email,
    icon: EmailIcon,
  },
  {
    label: 'GitHub',
    hint: 'Follow my code',
    href: social.github,
    value: social.github.replace('https://', ''),
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    hint: 'Let’s connect',
    href: social.linkedin,
    value: social.linkedin.replace('https://', ''),
    icon: LinkedInIcon,
  },
].filter((contact) => Boolean(contact.value))

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const formRef = useRef(null)
  const reduceRef = useRef(prefersReducedMotion())

  const handleFormMove = (e) => {
    const node = formRef.current
    if (!node || reduceRef.current) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--x', `${e.clientX - rect.left}px`)
    node.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    else if (form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters.'
    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${social.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // Graceful fallback when EmailJS isn't configured.
    if (!emailjsConfig.isConfigured) {
      if (!social.email) {
        setStatus('unavailable')
        return
      }
      mailtoFallback()
      return
    }

    setStatus('loading')
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: emailjsConfig.publicKey }
      )
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  return (
    <Section id="contact" className="py-24">
      <div className="container-page">
        <div className="mb-12">
          <SectionHeading
            index="05"
            label="Contact"
            title="Let’s build something useful."
            description="Have a project in mind, or just want to say hi? Send a message and I’ll get back to you."
          />
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Contact methods */}
        <div className="flex flex-col">
          {/* Contact methods — refined list with dividers */}
          <ul className="mt-10 divide-y divide-ink-line border-y border-ink-line">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5 transition-colors"
                >
                  <span className="grid h-11 w-11 flex-none items-center justify-center rounded-xl border border-ink-line bg-ink-card text-paper transition-all duration-300 group-hover:scale-110 group-hover:border-paper/60 group-hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.6)]">
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label text-chalk-muted transition-colors group-hover:text-paper">
                      {c.label}
                    </span>
                    <span className="block text-sm text-chalk-muted group-hover:text-chalk">
                      {c.hint}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[13px] text-chalk-faint transition-colors group-hover:text-paper">
                      {c.value}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 flex-none text-chalk-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <Reveal delay={100} className="lg:pt-14">
          <form
            ref={formRef}
            onMouseMove={handleFormMove}
            onSubmit={handleSubmit}
            noValidate
            className="card group relative overflow-hidden p-6 transition-all duration-300 hover:border-paper/40 sm:p-8"
          >
            {/* Cursor spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgba(255,255,255,0.07), transparent 60%)',
              }}
            />

            {/* Animated gradient top accent */}
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-paper to-transparent transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-chalk">
                  Send a message
                </h3>
                <p className="mt-1 text-sm text-chalk-muted">
                  I usually reply within a day or two.
                </p>
              </div>

              <div className="space-y-5">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your name"
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-chalk">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea…"
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full resize-none rounded-xl border bg-ink-soft px-4 py-3 text-sm text-chalk placeholder:text-chalk-faint transition-colors focus:border-paper focus:ring-0 focus-visible:ring-0 ${
                      errors.message ? 'border-white/40' : 'border-ink-line'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-chalk-muted">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group/submit btn-primary !rounded-lg relative mx-auto mt-6 flex justify-center overflow-hidden disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover/submit:translate-x-1"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {status === 'success' && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-paper/40 bg-paper/10 px-4 py-3 text-sm text-paper"
                >
                  Thanks! Your message has been sent. I’ll reply soon.
                </p>
              )}
              {status === 'error' && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-chalk"
                >
                  Something went wrong sending your message. Please try again or
                  connect through GitHub or LinkedIn.
                </p>
              )}

              {status === 'unavailable' && (
                <p role="status" className="mt-4 rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-chalk-muted">
                  Direct messaging is not configured yet. Please use the social links for now.
                </p>
              )}

              {!emailjsConfig.isConfigured && (
                <p className="mt-4 text-xs text-chalk-faint">
                  Email sending is not connected yet. Add a real public email or configure EmailJS in{' '}
                  <code className="font-mono">.env</code> to enable direct sending.
                </p>
              )}
            </div>
          </form>
        </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-chalk">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-ink-soft px-4 py-3 text-sm text-chalk placeholder:text-chalk-faint transition-colors focus:border-paper focus:ring-0 focus-visible:ring-0 ${
          error ? 'border-white/40' : 'border-ink-line'
        }`}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-chalk-muted">{error}</p>}
    </div>
  )
}

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { emailjsConfig, social } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

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
    <Section id="contact" className="border-t border-ink-line py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            index="05"
            label="Contact"
            title="Let’s build something useful."
            description="Have a project in mind, or just want to say hi? Send a message and I’ll get back to you."
          />

          <ul className="mt-8 space-y-5 text-sm">
            <li>
              <span className="label">Email</span>
              <a
                href={`mailto:${social.email}`}
                className="mt-1 block text-chalk transition-colors hover:text-paper"
              >
                {social.email}
              </a>
            </li>
            <li>
              <span className="label">GitHub</span>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-chalk transition-colors hover:text-paper"
              >
                {social.github.replace('https://', '')}
              </a>
            </li>
            <li>
              <span className="label">LinkedIn</span>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-chalk transition-colors hover:text-paper"
              >
                {social.linkedin.replace('https://', '')}
              </a>
            </li>
          </ul>
        </div>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
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
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-chalk"
                >
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
                  className={`w-full rounded-xl border bg-ink-soft px-4 py-3 text-sm text-chalk placeholder:text-chalk-faint focus:border-paper ${
                    errors.message ? 'border-red-500/60' : 'border-ink-line'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
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
                className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                Something went wrong sending your message. Please try the email
                link instead.
              </p>
            )}

            {!emailjsConfig.isConfigured && (
              <p className="mt-4 text-xs text-chalk-faint">
                EmailJS isn’t configured yet — submitting will open your email
                app as a fallback. Add your keys to{' '}
                <code className="font-mono">.env</code> to enable direct sending.
              </p>
            )}
          </form>
        </Reveal>
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
        className={`w-full rounded-xl border bg-ink-soft px-4 py-3 text-sm text-chalk placeholder:text-chalk-faint focus:border-paper ${
          error ? 'border-red-500/60' : 'border-ink-line'
        }`}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

# Bharat Sah — Single-Page Portfolio

A modern, responsive, single-page portfolio for **Bharat Sah**, a +2 Computer
Science graduate and aspiring Junior React Developer. Built with **React +
Vite**, **Tailwind CSS**, and **EmailJS** for the contact form.

## Features

- Premium dark theme (near-black background, charcoal cards, electric-lime accent)
- Sticky nav with scroll-spy active highlighting + mobile hamburger menu
- Sections: Home, About, Skills, Projects, Education, Contact, Footer
- Download Resume button (top-right on desktop)
- EmailJS contact form with client-side validation, loading / success / error states, and a `mailto` fallback
- Smooth scrolling, reveal-on-scroll animations, thin scroll-progress bar
- Fully responsive, accessible (focus states, alt text, semantic HTML), and `prefers-reduced-motion` aware
- All personal data, links, and config centralized in `src/data/portfolio.js`

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

> Requires Node.js 18+ (or 20+). Install it from https://nodejs.org if needed.

## Configuration

1. **Resume:** edit `resumeUrl` in `src/data/portfolio.js` (or set
   `VITE_RESUME_URL` in a `.env` file). Drop a `resume.pdf` into `/public` and
   point to `/resume.pdf`.
2. **EmailJS:** copy `.env.example` to `.env` and fill in:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   
   Until these are set, the contact form falls back to opening the visitor's
   email client.
3. **Content:** edit your name, about copy, skills, projects, and education in
   `src/data/portfolio.js`. Replace project placeholders (`Project One`, etc.)
   and their `codeUrl` / `demoUrl` with real links.

## Project structure

```
.
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .env.example
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── portfolio.js        # central place to edit everything
    └── components/
        ├── Navbar.jsx
        ├── ScrollProgress.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Education.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        ├── Reveal.jsx
        └── useScrollSpy.js
```

## Notes

- No employment history, certifications, awards, or grades were invented — edit
  the copy honestly in `src/data/portfolio.js`.
- Private secrets are never hard-coded; only public EmailJS IDs/keys are used
  via `import.meta.env`.

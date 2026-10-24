# Bharat Sah — Portfolio Source

A responsive React portfolio built with Vite and Tailwind CSS. The project includes the monochrome interface, portfolio sections and assets, contact form integration, and client-side PDF resume generator.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Create a local `.env` by copying `.env.example`, then fill in the EmailJS service ID, template ID, and public key from your EmailJS dashboard. The real `.env` file and its values are intentionally not included in this archive. Configure the EmailJS template to accept `from_name`, `from_email`, and `message`.

```bash
npm run build
npm run preview
```

## Editing the portfolio

- Update the profile, skills, projects, education, and links in `src/data/portfolio.js`.
- App code and UI components are under `src/`.
- Public image and icon assets are under `public/`.
- `.env.example` documents the expected environment variable names; keep real local environment values out of source control.

The archive excludes `node_modules`, `dist`, Git history, local task artifacts, and generated audit/resume files. Run `npm install` and `npm run build` to recreate the local dependencies and production build.
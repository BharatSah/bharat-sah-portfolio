# Bharat Sah — Portfolio

A responsive single-page portfolio built with React, Vite, and Tailwind CSS.

## Important: Run with Vite, not Live Server

This is a React/Vite project, not a plain static HTML page. Do **not** open `index.html` directly or use VS Code’s **Go Live / Live Server** button. The HTML entrypoint imports `/src/main.jsx`; Vite must transform that JSX and resolve the React modules. Live Server (often `http://127.0.0.1:5500`) serves the raw files, so the dark fallback background may appear with no portfolio content.

### Run it from VS Code

1. Open the project folder in VS Code. If you are using the ZIP, extract it first and open the extracted `portfolio-source-code` folder.
2. Open **Terminal → New Terminal** in VS Code and make sure the terminal is in the project folder.
3. Install dependencies once for that folder:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the URL printed by Vite, usually `http://localhost:5173/`. Do not use the Live Server URL on port `5500`.

Press **Ctrl+C** in the terminal to stop Vite. After extracting the ZIP into a different folder, run `npm install` there too; `node_modules` is intentionally not included.

## Production build

```bash
npm run build
npm run preview
```

Vite prints the local preview URL after the build.

## Features

- Monochrome black, white, and gray visual theme
- Responsive navigation and portfolio sections
- Reduced-motion-aware typewriter and reveal effects
- Individual logo-backed skill cards and project actions
- EmailJS contact form
- In-browser one-page PDF resume generator

## Configuration and content

- Edit the profile, skills, projects, education, and links in `src/data/portfolio.js`.
- Public images and SVG assets are under `public/`.
- Copy `.env.example` to `.env` and fill in the EmailJS service ID, template ID, and public key if you need to configure the contact form. The real `.env` file is ignored by Git and is not included in the source ZIP; `.env.example` contains placeholders only.
- Vite exposes variables prefixed with `VITE_` to the browser bundle. Use only EmailJS client-side public identifiers there—never put passwords or private API keys in them.

## Troubleshooting

If the address bar shows `127.0.0.1:5500`, stop Live Server and run `npm run dev` in the project folder instead. If the page is still blank at the Vite URL, open the browser developer tools (**F12 → Console**) and check the first red error.

// ============================================================================
//  CENTRALIZED PORTFOLIO DATA
//  Edit everything about Bharat here: identity, links, projects, education,
//  accent color, EmailJS config, and the resume URL.
// ============================================================================

export const profile = {
  name: 'Bharat Sah',
  role: 'Aspiring Junior React Developer',
  eyebrow: 'Welcome to my portfolio',
  headline: "Hi, I'm Bharat Sah",
  subtitle:
    'I build practical, responsive web experiences with HTML, Tailwind CSS, JavaScript, and React.',
  about:
    'I’m a motivated computer science graduate who enjoys creating useful websites and learning through practical projects. I like turning ideas into clean, responsive interfaces and getting better at front-end development one build at a time.',
  // Replace with a real resume link or a file placed in /public (e.g. /resume.pdf)
  resumeUrl: import.meta.env.VITE_RESUME_URL || '#resume-download',
}

// ----------------------------------------------------------------------------
//  Social / contact links (edit placeholders)
// ----------------------------------------------------------------------------
export const social = {
  email: 'bharat.sah@example.com',
  github: 'https://github.com/bharatsah',
  linkedin: 'https://www.linkedin.com/in/bharatsah',
}

// ----------------------------------------------------------------------------
//  Navigation (order defines the menu and scroll-spy targets)
// ----------------------------------------------------------------------------
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact Me' },
]

// ----------------------------------------------------------------------------
//  Skills (grouped by category — no fake proficiency percentages)
// ----------------------------------------------------------------------------
export const skillGroups = [
  {
    category: 'Frontend',
    items: [
      {
        name: 'HTML',
        description: 'Semantic, accessible markup as the foundation of every page.',
      },
    ],
  },
  {
    category: 'Styling',
    items: [
      {
        name: 'Tailwind CSS',
        description: 'Utility-first styling for fast, consistent, responsive layouts.',
      },
    ],
  },
  {
    category: 'JavaScript',
    items: [
      {
        name: 'JavaScript',
        description: 'Core language for interactive, client-side behavior.',
      },
    ],
  },
  {
    category: 'JavaScript Framework',
    items: [
      {
        name: 'React',
        description: 'Component-based UI building with hooks and reusable views.',
      },
    ],
  },
  {
    category: 'Communication & Forms',
    items: [
      {
        name: 'EmailJS',
        description: 'Wiring contact forms to email without a custom backend.',
      },
    ],
  },
]

// ----------------------------------------------------------------------------
//  Projects (clearly labeled placeholders — edit with real work)
// ----------------------------------------------------------------------------
export const projects = [
  {
    title: 'Project One',
    description:
      'A short problem/solution description goes here. Replace this with what the project does and the problem it solves.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Project Two',
    description:
      'A short problem/solution description goes here. Replace this with what the project does and the problem it solves.',
    tags: ['React', 'Tailwind CSS'],
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Project Three',
    description:
      'A short problem/solution description goes here. Replace this with what the project does and the problem it solves.',
    tags: ['React', 'EmailJS'],
    codeUrl: '#',
    demoUrl: '#',
  },
]

// ----------------------------------------------------------------------------
//  Education (exact information — do not fabricate dates or grades)
// ----------------------------------------------------------------------------
export const education = [
  {
    level: '+2 Computer Science',
    institution: 'Advance Academy',
    location: 'Kumaripati, Lalitpur',
  },
  {
    level: 'Grade 10',
    institution: 'B.Y.M. Model Boarding School',
    location: 'Dhangadhimai-10',
  },
]

// ----------------------------------------------------------------------------
//  EmailJS configuration placeholders (never hard-code private secrets)
// ----------------------------------------------------------------------------
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  // Convenience flag for the form to gracefully fall back to mailto.
  isConfigured: Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  ),
}

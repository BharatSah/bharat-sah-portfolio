// ============================================================================
//  CENTRALIZED PORTFOLIO DATA
//  Edit everything about Bharat here: identity, links, projects, education,
//  accent color, EmailJS config, and the resume URL.
// ============================================================================

export const profile = {
  name: 'Bharat Sah',
  role: 'React Developer',
  eyebrow: 'React Developer',
  headline: "Hi, I'm Bharat Kumar Sah.",
  subtitle:
    'I’m a +2 Computer Science graduate building practical, responsive web experiences with React, JavaScript, and Tailwind CSS.',
  about:
    'I’m a +2 Computer Science graduate and React Developer. I learn by building practical web projects, with a focus on clear interfaces, responsive layouts, and accessible fundamentals.',
  // Replace with a real resume link or a file placed in /public (e.g. /resume.pdf)
  resumeUrl: import.meta.env.VITE_RESUME_URL || '#resume-download',
}

// ----------------------------------------------------------------------------
//  Social / contact links (edit placeholders)
// ----------------------------------------------------------------------------
export const social = {
  // Add a real public address here to enable the mailto fallback.
  email: '',
  github: 'https://github.com/bharatsah',
  linkedin: 'https://www.linkedin.com/in/bharatsah',
  instagram: 'https://www.instagram.com/bharatsah',
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
    category: 'Programming Languages',
    items: [
      {
        name: 'Python',
        description: 'A general-purpose language for scripting and problem solving.',
      },
      {
        name: 'PHP',
        description: 'A server-side language used to build dynamic web applications.',
      },
      {
        name: 'C',
        description: 'A foundational programming language for core coding concepts.',
      },
    ],
  },
  {
    category: 'Databases',
    items: [
      {
        name: 'MySQL',
        description: 'A relational database for storing and querying application data.',
      },
      {
        name: 'PostgreSQL',
        description: 'An open-source relational database with SQL support.',
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
    title: 'Personal Portfolio',
    description:
      'A responsive single-page portfolio built with React, Vite, and Tailwind CSS. It brings together my background, skills, education, and current work in one place.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    codeUrl: social.github,
    demoUrl: 'https://bharatsah.com.np/',
    image: '',
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

/**
 * skills.js (data)
 *
 * The 12 technologies for the Skills grid, grouped into three categories.
 * `iconSlug` maps to a named export in the `simple-icons` package,
 * resolved at render time in src/components/SkillCard.jsx.
 */

export const skills = [
  // Frontend
  { id: 'css', label: 'CSS', category: 'Frontend', iconSlug: 'siCss3' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend', iconSlug: 'siTailwindcss' },
  { id: 'javascript', label: 'JavaScript', category: 'Frontend', iconSlug: 'siJavascript' },
  { id: 'react', label: 'React', category: 'Frontend', iconSlug: 'siReact' },
  { id: 'typescript', label: 'TypeScript', category: 'Frontend', iconSlug: 'siTypescript' },

  // Backend
  { id: 'python', label: 'Python', category: 'Backend', iconSlug: 'siPython' },
  { id: 'django', label: 'Django', category: 'Backend', iconSlug: 'siDjango' },
  { id: 'nodejs', label: 'Node.js', category: 'Backend', iconSlug: 'siNodedotjs' },
  { id: 'php', label: 'PHP', category: 'Backend', iconSlug: 'siPhp' },

  // Tools / Deployment
  { id: 'github', label: 'GitHub', category: 'Tools', iconSlug: 'siGithub' },
  { id: 'vercel', label: 'Vercel', category: 'Tools', iconSlug: 'siVercel' },
  { id: 'vite', label: 'Vite', category: 'Tools', iconSlug: 'siVite' }
];

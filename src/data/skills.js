/**
 * skills.js (data)
 *
 * Exactly the 12 technologies specified for the Skills grid, grouped into
 * the three requested categories. `iconSlug` maps to a named export in the
 * `simple-icons` package (e.g. 'css' -> siCss), resolved at render time in
 * src/js/skills.js — real, recognizable brand icons, not text abbreviations.
 */

export const skills = [
  // Frontend
  { id: 'css', label: 'CSS', category: 'Frontend', iconSlug: 'css' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend', iconSlug: 'tailwindcss' },
  { id: 'javascript', label: 'JavaScript', category: 'Frontend', iconSlug: 'javascript' },
  { id: 'react', label: 'React', category: 'Frontend', iconSlug: 'react' },
  { id: 'typescript', label: 'TypeScript', category: 'Frontend', iconSlug: 'typescript' },

  // Backend
  { id: 'python', label: 'Python', category: 'Backend', iconSlug: 'python' },
  { id: 'django', label: 'Django', category: 'Backend', iconSlug: 'django' },
  { id: 'nodejs', label: 'Node.js', category: 'Backend', iconSlug: 'nodedotjs' },
  { id: 'php', label: 'PHP', category: 'Backend', iconSlug: 'php' },

  // Tools / Deployment
  { id: 'github', label: 'GitHub', category: 'Tools', iconSlug: 'github' },
  { id: 'vercel', label: 'Vercel', category: 'Tools', iconSlug: 'vercel' },
  { id: 'vite', label: 'Vite', category: 'Tools', iconSlug: 'vite' }
];

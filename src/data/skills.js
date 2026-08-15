/**
 * skills.js (data)
 *
 * Structured as a connection graph to drive the node-visualization in the
 * Skills section: focusing/hovering a node highlights it and animates
 * lines to everything in its `connections`. Technology names themselves
 * are drawn from the project's own declared stack — not invented.
 *
 * `proficiency` and `description` are left as explicit placeholders — no
 * skill level or narrative is assumed on your behalf.
 */

export const skills = [
  {
    id: 'php',
    label: 'PHP',
    category: 'language',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['javascript', 'contact-api']
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'language',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['php', 'gsap', 'vite', 'html']
  },
  {
    id: 'html',
    label: 'HTML',
    category: 'language',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['css', 'javascript']
  },
  {
    id: 'css',
    label: 'CSS',
    category: 'language',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['html', 'tailwind']
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'framework',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['css', 'vite']
  },
  {
    id: 'gsap',
    label: 'GSAP',
    category: 'tool',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['javascript']
  },
  {
    id: 'vite',
    label: 'Vite',
    category: 'tool',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['javascript', 'tailwind']
  },
  {
    id: 'contact-api',
    label: 'REST / APIs',
    category: 'concept',
    proficiency: '[PROFICIENCY LEVEL]',
    description: '[SKILL DESCRIPTION]',
    connections: ['php']
  }
  // Additional real skills added here as they're provided.
];

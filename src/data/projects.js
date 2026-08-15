/**
 * projects.js (data)
 *
 * Single source of truth for the Projects section — the portfolio's
 * centerpiece. Every bracketed field is unconfirmed and must be replaced
 * with real information before launch. `category` values are structural
 * taxonomy (not a personal fact about Daniel) so filtering has something
 * real to operate on while content stays placeholder.
 *
 * caseStudy: set to `null` when case-study detail isn't ready — the detail
 * overlay renders an explicit "case study coming soon" placeholder rather
 * than inventing content.
 */

export const projects = [
  {
    id: 'project-one',
    title: '[PROJECT TITLE]',
    description: '[PROJECT DESCRIPTION]',
    category: 'fullstack',
    technologies: ['[TECHNOLOGY]', '[TECHNOLOGY]'],
    image: '/public/images/projects/project-one/cover.jpg',
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      overview: '[OVERVIEW]',
      problem: '[PROBLEM]',
      solution: '[SOLUTION]',
      role: '[ROLE]',
      keyFeatures: ['[FEATURE]', '[FEATURE]'],
      gallery: ['/public/images/projects/project-one/1.jpg']
    }
  },
  {
    id: 'project-two',
    title: '[PROJECT TITLE]',
    description: '[PROJECT DESCRIPTION]',
    category: 'web',
    technologies: ['[TECHNOLOGY]', '[TECHNOLOGY]'],
    image: '/public/images/projects/project-two/cover.jpg',
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: null
  },
  {
    id: 'project-three',
    title: '[PROJECT TITLE]',
    description: '[PROJECT DESCRIPTION]',
    category: 'design',
    technologies: ['[TECHNOLOGY]'],
    image: '/public/images/projects/project-three/cover.jpg',
    liveUrl: null,
    githubUrl: null,
    featured: false,
    caseStudy: null
  }
  // Additional real projects added here as they're provided.
];

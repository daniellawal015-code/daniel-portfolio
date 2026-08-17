/**
 * projects.js (data)
 *
 * Single source of truth for the Projects section.
 * Content reflects Daniel's actual projects and current work.
 */

export const projects = [
  {
    id: 'prestige-beauty',
    title: 'Prestige Beauty',
    description:
      'A luxury beauty and salon experience designed to bring hair, nails, barbering, spa services, and appointment booking together in one polished digital platform.',
    category: 'fullstack',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    image: '/images/projects/prestige-beauty/cover.png',
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      overview:
        'A luxury beauty platform focused on creating a premium digital experience for salon and beauty services.',
      problem:
        'Beauty businesses need a digital presence that feels as polished and organised as the experience they provide in person.',
      solution:
        'I designed and developed a structured experience for presenting services, showcasing work, and guiding visitors toward booking an appointment.',
      role: 'Designer & Full-Stack Developer',
      keyFeatures: [
        'Luxury-focused visual design',
        'Beauty service presentation',
        'Gallery and category filtering',
        'Appointment booking experience'
      ],
      gallery: [
        '/public/images/projects/prestige-beauty/1.png'
      ]
    }
  },

  {
    id: 'r-rise-foundation',
    title: 'R-Rise Foundation',
    description:
      'One of my first websites, built as an early step in my journey of learning how to turn ideas into real digital experiences.',
    category: 'web',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/public/images/projects/r-rise-foundation/cover.png',
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      overview:
        'An early web project that represents one of the first stages of my development journey.',
      problem:
        'The goal was to create a clear and accessible web presence for the foundation.',
      solution:
        'I built the website while developing my understanding of layout, styling, responsive design, and front-end development.',
      role: 'Web Developer',
      keyFeatures: [
        'Responsive website layout',
        'Structured content sections',
        'Custom styling and page design'
      ],
      gallery: [
        '/public/images/projects/r-rise-foundation/1.png'
      ]
    }
  },

  {
    id: 'restaurant-website',
    title: 'Restaurant Website',
    description:
      'A restaurant website currently in development, focused on creating a modern digital experience for discovering the restaurant, exploring its menu, and connecting with customers.',
    category: 'web',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/restaurant/cover.jpg',
    liveUrl: null,
    githubUrl: null,
    featured: false,
    caseStudy: null
  }
];
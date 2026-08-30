import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectOverlay from '../components/ProjectOverlay.jsx';
import Logo from '../components/Logo.jsx';
import { projects } from '../data/projects.js';
import { useSiteState } from '../hooks/useSiteState.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

/**
 * playTransition — the short (300–800ms) brand-anchored beat used for the
 * project-card → case-study overlay handoff. Collapses to a plain state
 * swap under reduced motion.
 */
function playTransition(reducedMotion, overlayRef, onMid) {
  const overlay = overlayRef.current;
  if (reducedMotion || !overlay) {
    onMid();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });
    tl.to(overlay, { opacity: 1, duration: 0.22, ease: 'power2.in' })
      .add(onMid)
      .to(overlay, { opacity: 0, duration: 0.28, ease: 'power2.out', delay: 0.08 });
  });
}

export default function Projects() {
  const { reducedMotion } = useSiteState();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const transitionOverlayRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openProject, setOpenProject] = useState(null);

  useScrollReveal(gridRef, '[data-project-card]', { y: 32, stagger: 0.08 });

  const categories = useMemo(() => ['all', ...new Set(projects.map((p) => p.category))], []);
  const visibleProjects = activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  function handleOpen(project, trigger) {
    triggerRef.current = trigger;
    playTransition(reducedMotion, transitionOverlayRef, () => setOpenProject(project));
  }

  function handleClose() {
    playTransition(reducedMotion, transitionOverlayRef, () => setOpenProject(null));
  }

  return (
    <section ref={sectionRef} id="projects" aria-label="Projects" className="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
      <p className="font-mono text-eyebrow uppercase tracking-widest text-muted">04 // Projects</p>
      <h2 className="mt-4 max-w-2xl font-display text-display-1 text-paper">Things I&apos;ve built.</h2>

      <div role="tablist" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={cat === activeCategory}
            data-cursor="hover"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
              cat === activeCategory ? 'border-signal text-paper' : 'border-depth-2 text-muted hover:text-paper'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={gridRef} role="list" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={handleOpen} />
        ))}
      </div>

      <div
        ref={transitionOverlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-void opacity-0"
      >
        <Logo className="h-10 w-10 text-paper" />
      </div>

      {openProject && <ProjectOverlay project={openProject} onClose={handleClose} triggerRef={triggerRef} />}
    </section>
  );
}

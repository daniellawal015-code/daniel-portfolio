import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSiteState } from '../hooks/useSiteState.jsx';

/**
 * The "VIEW" label used to be driven by a document-wide custom cursor
 * system (a dot + ring that followed the pointer everywhere, changing
 * shape near interactive elements). That's the kind of constant,
 * everywhere-you-look animation that reads as a template flourish
 * rather than something purposeful.
 *
 * This keeps only the one piece of that system that was actually
 * functional — a label that tells you what a hover will do — and scopes
 * it locally to this card instead of running a global pointer tracker.
 * The native system cursor is used everywhere else on the site.
 */
export default function ProjectCard({ project, onOpen }) {
  const { isTouch, reducedMotion } = useSiteState();
  const btnRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [labelPos, setLabelPos] = useState(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || isTouch) return undefined;

    const strength = reducedMotion ? 0 : 6;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setLabelPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (strength) {
        gsap.to(el, { rotateX: py * -strength, rotateY: px * strength, transformPerspective: 600, duration: 0.4, ease: 'power2.out' });
      }
    };
    const onLeave = () => {
      setLabelPos(null);
      if (strength) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
    };
    const onFocus = () => {
      const rect = el.getBoundingClientRect();
      setLabelPos({ x: rect.width / 2, y: rect.height / 2 });
    };
    const onBlur = () => setLabelPos(null);

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focus', onFocus);
      el.removeEventListener('blur', onBlur);
    };
  }, [isTouch, reducedMotion]);

  return (
    <article data-project-card data-category={project.category} className="group relative overflow-hidden rounded-2xl border border-depth-2 bg-depth-1">
      <button
        ref={btnRef}
        type="button"
        onClick={() => onOpen(project, btnRef.current)}
        className="relative block w-full text-left"
        aria-haspopup="dialog"
        aria-label={`View project: ${project.title}`}
      >
        {labelPos && !isTouch && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-void"
            style={{ left: labelPos.x, top: labelPos.y }}
          >
            View
          </span>
        )}

        <div className="relative aspect-[4/3] overflow-hidden bg-depth-2">
          {!imgFailed && (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition-[transform,opacity] duration-700 ease-signal group-hover:scale-105"
              style={{ opacity: imgLoaded ? 1 : 0 }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-xs uppercase tracking-widest text-muted">
            {project.title}
          </div>
        </div>
        <div className="p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal">{project.category}</p>
          <h3 className="mt-2 font-display text-xl text-paper">{project.title}</h3>
          <p className="mt-2 line-clamp-2 font-body text-sm text-paper/60">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full border border-depth-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  );
}

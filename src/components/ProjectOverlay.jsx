import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ProjectOverlay({ project, onClose, triggerRef }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const overlay = overlayRef.current;
      const focusables = overlay?.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeydown);
    document.body.style.overflow = 'hidden';

    const trigger = triggerRef?.current;
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = '';
      trigger?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return null;
  const cs = project.caseStudy;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      className="fixed inset-0 z-[95] overflow-y-auto bg-void"
    >
      <div className="relative mx-auto flex h-full max-w-4xl flex-col overflow-y-auto px-6 py-16 sm:px-10">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          data-cursor="hover"
          aria-label="Close project detail"
          className="absolute right-6 top-6 flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper"
        >
          Close <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <p className="font-mono text-eyebrow uppercase tracking-widest text-signal">{project.category}</p>
        <h2 className="mt-3 font-display text-display-1 text-paper">{project.title}</h2>
        <p className="mt-4 max-w-2xl font-body text-paper/70">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-full border border-depth-2 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-signal px-5 py-2 font-mono text-xs uppercase tracking-widest text-void"
            >
              Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-paper/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper"
            >
              Source
            </a>
          )}
        </div>

        {cs ? (
          <>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Overview</h3>
                <p className="mt-2 font-body text-paper/75">{cs.overview}</p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Role</h3>
                <p className="mt-2 font-body text-paper/75">{cs.role}</p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Problem</h3>
                <p className="mt-2 font-body text-paper/75">{cs.problem}</p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Solution</h3>
                <p className="mt-2 font-body text-paper/75">{cs.solution}</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Key features</h3>
              <ul className="mt-2 space-y-1">
                {cs.keyFeatures.map((f) => (
                  <li key={f} className="font-body text-paper/75">
                    — {f}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="mt-12 rounded-xl border border-dashed border-depth-2 p-6 font-mono text-xs uppercase tracking-widest text-muted">
            Case study coming soon.
          </p>
        )}
      </div>
    </div>
  );
}

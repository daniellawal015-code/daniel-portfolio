import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience.js';
import { useSiteState } from '../hooks/useSiteState.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

gsap.registerPlugin(ScrollTrigger);

const TYPE_LABELS = { work: 'Work', education: 'Education', project: 'Project' };

/**
 * Experience — renders as a vertical, scroll-revealed timeline on all
 * breakpoints, with a progress line that draws in as you scroll, rather
 * than a pinned/scrubbed horizontal timeline. A pinned horizontal
 * timeline is worth building, but it's fragile to get right (viewport-
 * height mapping, resize handling) without live-browser verification —
 * shipping a version that's actually confirmed working is better than an
 * unverified pin. Carried over from the original build as a deliberate,
 * documented simplification.
 */
export default function Experience() {
  const { reducedMotion } = useSiteState();
  const sectionRef = useRef(null);
  const hostRef = useRef(null);
  const progressRef = useRef(null);

  useScrollReveal(hostRef, '[data-experience-item]', { x: -24, stagger: 0.15 });

  useEffect(() => {
    const host = hostRef.current;
    const progress = progressRef.current;
    if (!host || !progress) return undefined;

    if (reducedMotion) {
      progress.style.transform = 'scaleY(1)';
      return undefined;
    }

    const tween = gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: host, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience"
      className="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16"
    >
      <p className="font-mono text-eyebrow uppercase tracking-widest text-muted">05 // Experience</p>
      <h2 className="mt-4 max-w-2xl font-display text-display-1 text-paper">The journey so far.</h2>

      <div ref={hostRef} className="relative mt-16 max-w-2xl">
        <div className="absolute left-[7px] top-0 h-full w-px bg-depth-2 sm:left-[9px]" />
        <div
          ref={progressRef}
          className="absolute left-[7px] top-0 h-full w-px origin-top bg-signal sm:left-[9px]"
          style={{ transform: 'scaleY(0)' }}
        />

        {experience.map((entry) => (
          <article key={entry.id} data-experience-item className="relative mb-14 pl-8 sm:pl-10">
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-signal bg-void sm:h-4 sm:w-4" />
            <p className="font-mono text-eyebrow uppercase tracking-widest text-muted">
              {entry.period} — {TYPE_LABELS[entry.type] || entry.type}
            </p>
            <h3 className="mt-2 font-display text-display-2 text-paper">{entry.role}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-signal">{entry.organization}</p>
            <p className="mt-4 max-w-xl font-body text-paper/75">{entry.summary}</p>
            <ul className="mt-4 space-y-2">
              {entry.highlights.map((h) => (
                <li key={h} className="flex gap-2 font-body text-sm text-paper/60">
                  <span aria-hidden="true" className="text-signal">
                    →
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

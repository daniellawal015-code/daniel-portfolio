import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from '../components/HeroCanvas.jsx';
import { useSiteState } from '../hooks/useSiteState.jsx';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { splitText } from '../utils/splitText.js';

/**
 * Hero — the one section with no dedicated data source (content is
 * static), so its one-time entrance choreography lives here, gated on
 * the loader finishing.
 */
export default function Hero({ loaderComplete }) {
  const { reducedMotion } = useSiteState();
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const statementRef = useRef(null);
  const ctaRef = useRef(null);
  const photoRef = useRef(null);
  const firedRef = useRef(false);

  useMagnetic(sectionRef);

  useEffect(() => {
    if (!loaderComplete || firedRef.current) return;
    firedRef.current = true;

    const eyebrowEl = eyebrowRef.current;
    const nameEl = nameRef.current;
    const statementEl = statementRef.current;
    const ctaWrap = ctaRef.current;
    const photoEl = photoRef.current;
    if (!nameEl) return;

    if (reducedMotion) {
      gsap.set([eyebrowEl, nameEl, statementEl, ctaWrap, photoEl].filter(Boolean), {
        opacity: 1,
        y: 0
      });
      return;
    }

    const chars = splitText(nameEl, { type: 'chars' });
    const tl = gsap.timeline({ delay: 0.05 });

    if (eyebrowEl) tl.from(eyebrowEl, { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
    tl.from(chars, { yPercent: 120, opacity: 0, stagger: 0.018, duration: 0.75, ease: 'power4.out' }, eyebrowEl ? '-=0.25' : 0);
    if (statementEl) {
      tl.from(statementEl, { yPercent: 100, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    }
    if (ctaWrap) {
      tl.from(ctaWrap.children, { opacity: 0, y: 16, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    }
    if (photoEl) {
      tl.from(photoEl, { y: -70, opacity: 0, duration: 0.9, ease: 'power3.out' }, eyebrowEl ? '-=0.5' : '-=0.2');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderComplete]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16"
    >
      <HeroCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p ref={eyebrowRef} className="mb-6 font-mono text-eyebrow uppercase tracking-[0.2em] text-muted">
            COMPUTER SCIENCE STUDENT // FRONTEND DEVELOPER // EARTH
          </p>

          <h1 ref={nameRef} className="mb-8 font-display text-hero text-paper">
            ĐAMi™ | Dev
          </h1>

          <div className="mb-10 max-w-2xl overflow-hidden">
            <p ref={statementRef} className="font-body text-lg leading-relaxed text-paper/80 sm:text-xl">
              I BUILD DIGITAL EXPERIENCES THAT TURN IDEAS INTO REAL PRODUCTS.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-transform duration-300"
            >
              VIEW MY WORK
            </a>
            <a
              href="#contact"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:border-paper"
            >
              LET&apos;S CONNECT
            </a>
            <a
  href="/resume/Daniel_Lawal_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  data-magnetic
  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70 underline decoration-signal/60 underline-offset-4"
>
  View résumé
</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm">
          <div
            ref={photoRef}
            className="relative mx-auto aspect-[4/5] w-64 overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 sm:w-72 lg:ml-auto lg:mr-4 lg:w-80"
          >
            <img src="/images/profile/pic.jpg" alt="Lawal Daniel" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

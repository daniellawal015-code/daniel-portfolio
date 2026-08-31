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
  const codeCardRef = useRef(null);
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
    const codeCardEl = codeCardRef.current;
    if (!nameEl) return;

    if (reducedMotion) {
      gsap.set([eyebrowEl, nameEl, statementEl, ctaWrap, photoEl, codeCardEl].filter(Boolean), {
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
    if (codeCardEl) {
      tl.from(codeCardEl, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35');
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
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-transform duration-300"
            >
              VIEW MY WORK
            </a>
            <a
              href="#contact"
              data-magnetic
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:border-paper"
            >
              LET&apos;S CONNECT
            </a>
            <a
              href="/resume/Daniel-Lawal-Resume.pdf"
              download
              data-magnetic
              data-cursor="hover"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70 underline decoration-signal/60 underline-offset-4 transition-colors duration-300 hover:text-paper"
            >
              Download résumé
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm">
          <div
            ref={photoRef}
            className="relative z-10 mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 sm:w-64 lg:ml-auto lg:mr-4"
          >
            <img src="/images/profile/pic.jpg" alt="Lawal Daniel" className="h-full w-full object-cover" />
          </div>

          <div
            ref={codeCardRef}
            className="relative z-20 -mt-10 w-64 rounded-xl border border-depth-2 bg-depth-1 p-5 shadow-2xl sm:w-72 lg:ml-0 lg:mr-auto"
          >
            <div className="mb-3 flex items-center gap-2 border-b border-depth-2 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-signal/70" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted">daniel.js</span>
            </div>
            <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-paper/80">
              <code>
                <span className="text-signal">const</span> developer = {'{'}
                {'\n'}  name: <span className="text-paper">&quot;Lawal Daniel&quot;</span>,{'\n'}  role:{' '}
                <span className="text-paper">&quot;Full-Stack Dev&quot;</span>,{'\n'}  stack: [{'\n'}
                {'    '}
                <span className="text-paper">&quot;HTML&quot;</span>, <span className="text-paper">&quot;CSS&quot;</span>,
                {'\n'}
                {'    '}
                <span className="text-paper">&quot;JavaScript&quot;</span>,{' '}
                <span className="text-paper">&quot;Python&quot;</span>,{'\n'}
                {'    '}
                <span className="text-paper">&quot;Node.js&quot;</span>
                {'\n'}  ],{'\n'}  status: <span className="text-signal">&quot;open to work&quot;</span>,{'\n'}  build: () =&gt;{' '}
                <span className="text-paper">&quot;great products&quot;</span>
                {'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from './Logo.jsx';
import { useSiteState } from '../hooks/useSiteState.jsx';

const SESSION_KEY = 'dp_loader_seen';
const MIN_DURATION = 1.1;
const MAX_WAIT = 3.5;

/**
 * Loader — cinematic boot sequence, gated on real readiness (fonts + a
 * minimum floor so it never feels like a flash, capped by a maximum so
 * slow connections never stall). Draws the logo mark stroke-by-stroke.
 *
 * First visit this session → full sequence. Repeat load within the same
 * session (refresh) → abbreviated fade. prefers-reduced-motion → same
 * abbreviated fade, no stroke drawing. Fires `onComplete` once finished,
 * which the rest of the app (nav reveal, hero entrance) waits on.
 */
export default function Loader({ onComplete }) {
  const { reducedMotion } = useSiteState();
  const loaderRef = useRef(null);
  const cornerRef = useRef(null);
  const arcRef = useRef(null);
  const nodeRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statusRef = useRef(null);
  const progressRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const loaderEl = loaderRef.current;
    if (!loaderEl) return undefined;

    const corner = cornerRef.current;
    const arc = arcRef.current;
    const node = nodeRef.current;
    const eyebrow = eyebrowRef.current;
    const status = statusRef.current;
    const progressEl = progressRef.current;

    const seenThisSession = sessionStorage.getItem(SESSION_KEY) === '1';

    function finish() {
      if (firedRef.current) return;
      firedRef.current = true;
      sessionStorage.setItem(SESSION_KEY, '1');
      onComplete?.();
      window.setTimeout(() => setHidden(true), 700);
    }

    if (reducedMotion || seenThisSession) {
      if (corner) gsap.set(corner, { strokeDasharray: 'none', strokeDashoffset: 0 });
      if (arc) gsap.set(arc, { strokeDasharray: 'none', strokeDashoffset: 0 });
      if (node) gsap.set(node, { opacity: 1, scale: 1 });

      gsap.to(loaderEl, {
        autoAlpha: 0,
        duration: reducedMotion ? 0.01 : 0.4,
        ease: 'power1.out',
        onComplete: finish
      });
      return undefined;
    }

    const cornerLength = corner ? corner.getTotalLength() : 0;
    const arcLength = arc ? arc.getTotalLength() : 0;

    if (corner) gsap.set(corner, { strokeDasharray: cornerLength, strokeDashoffset: cornerLength });
    if (arc) gsap.set(arc, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
    if (node) gsap.set(node, { opacity: 0, scale: 0.4, transformOrigin: '78px 45px' });
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 8 });
    if (status) gsap.set(status, { opacity: 0, y: 8 });

    const fontsReady = document.fonts?.ready ? document.fonts.ready : Promise.resolve();
    const minTimePassed = new Promise((resolve) => setTimeout(resolve, MIN_DURATION * 1000));
    const maxWaitReached = new Promise((resolve) => setTimeout(resolve, MAX_WAIT * 1000));

    let tl;
    Promise.race([Promise.all([fontsReady, minTimePassed]), maxWaitReached]).then(() => {
      tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onUpdate: () => {
          if (progressEl) progressEl.textContent = `${Math.round(tl.progress() * 100)}%`;
        },
        onComplete: finish
      });

      if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0);
      if (corner) tl.to(corner, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.3);
      if (arc) tl.to(arc, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 0.75);
      if (node) tl.to(node, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, 1.1);
      if (status) tl.to(status, { opacity: 1, y: 0, duration: 0.4 }, 1.2);
      tl.to(loaderEl, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' }, 1.7);
    });

    return () => tl?.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
    >
      <div className="flex flex-col items-center gap-6">
        <p ref={eyebrowRef} className="font-mono text-eyebrow uppercase tracking-[0.2em] text-muted">
          System // Initializing
        </p>

        <svg viewBox="0 0 100 100" className="h-16 w-16 text-paper" role="img" aria-hidden="true">
          <path
            ref={cornerRef}
            d="M32,24 L32,68 L64,68"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path ref={arcRef} d="M32,24 Q58,14 78,45" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          <circle ref={nodeRef} cx="78" cy="45" r="9" fill="#FF5E2E" />
        </svg>

        <div className="flex items-center gap-3 font-mono text-eyebrow text-muted">
          <p ref={statusRef} className="tracking-[0.15em] uppercase">
            Daniel Lawal
          </p>
          <span aria-hidden="true">/</span>
          <p ref={progressRef} aria-live="off">
            0%
          </p>
        </div>
      </div>
    </div>
  );
}

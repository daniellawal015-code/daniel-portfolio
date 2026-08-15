import gsap from 'gsap';

/**
 * loader.js — cinematic boot sequence, gated on real readiness (fonts +
 * a minimum floor so it never feels like a flash, capped by a maximum so
 * slow connections never stall). Draws the Trajectory mark stroke-by-stroke
 * using stroke-dasharray/offset rather than treating it as a static image.
 *
 * Two-tier behavior:
 *  - First visit this session → full sequence below.
 *  - Repeat load within the same session (refresh) → abbreviated fade,
 *    since replaying the full identity sequence on every refresh would be
 *    exactly the "annoying loader" the brief explicitly warns against.
 *  - prefers-reduced-motion → same abbreviated fade, no stroke drawing.
 */

const SESSION_KEY = 'dp_loader_seen';
const MIN_DURATION = 1.1;
const MAX_WAIT = 3.5;

export function initLoader(siteState) {
  const loaderEl = document.querySelector('[data-loader]');
  if (!loaderEl) return;

  const nav = document.querySelector('[data-nav]');
  const corner = loaderEl.querySelector('[data-logo-corner]');
  const arc = loaderEl.querySelector('[data-logo-arc]');
  const node = loaderEl.querySelector('[data-logo-mark-node]');
  const eyebrow = loaderEl.querySelector('[data-loader-eyebrow]');
  const status = loaderEl.querySelector('[data-loader-status]');
  const progressEl = loaderEl.querySelector('[data-loader-progress]');

  const seenThisSession = sessionStorage.getItem(SESSION_KEY) === '1';

  function finish() {
    loaderEl.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem(SESSION_KEY, '1');
    document.dispatchEvent(new CustomEvent('portfolio:loaderComplete'));
    window.setTimeout(() => {
      loaderEl.style.display = 'none';
    }, 700);
  }

  // Abbreviated path: reduced motion, or already seen this session
  if (siteState.reducedMotion || seenThisSession) {
    if (corner) gsap.set(corner, { strokeDasharray: 'none', strokeDashoffset: 0 });
    if (arc) gsap.set(arc, { strokeDasharray: 'none', strokeDashoffset: 0 });
    if (node) gsap.set(node, { opacity: 1, scale: 1 });

    gsap.to(loaderEl, {
      autoAlpha: 0,
      duration: siteState.reducedMotion ? 0.01 : 0.4,
      ease: 'power1.out',
      onComplete: finish
    });
    return;
  }

  // Full cinematic sequence
  if (nav) nav.setAttribute('data-nav-hidden', '');

  const cornerLength = corner ? corner.getTotalLength() : 0;
  const arcLength = arc ? arc.getTotalLength() : 0;

  if (corner) gsap.set(corner, { strokeDasharray: cornerLength, strokeDashoffset: cornerLength });
  if (arc) gsap.set(arc, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
  if (node) gsap.set(node, { opacity: 0, scale: 0.4, transformOrigin: '78px 45px' });
  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 8 });
  if (status) gsap.set(status, { opacity: 0, y: 8 });

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const minTimePassed = new Promise((resolve) => setTimeout(resolve, MIN_DURATION * 1000));
  const maxWaitReached = new Promise((resolve) => setTimeout(resolve, MAX_WAIT * 1000));

  Promise.race([Promise.all([fontsReady, minTimePassed]), maxWaitReached]).then(runSequence);

  function runSequence() {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onUpdate: () => {
        if (progressEl) {
          progressEl.textContent = `${Math.round(tl.progress() * 100)}%`;
        }
      },
      onComplete: finish
    });

    if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0);
    if (corner) tl.to(corner, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.3);
    if (arc) tl.to(arc, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 0.75);
    if (node) tl.to(node, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, 1.1);
    if (status) tl.to(status, { opacity: 1, y: 0, duration: 0.4 }, 1.2);
    tl.to(loaderEl, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' }, 1.7);
  }
}

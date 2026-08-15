import gsap from 'gsap';

/**
 * transitions.js — the short (300–800ms) counterpart to loader.js.
 * Used for the project-card → case-study overlay handoff (projects.js
 * calls into this), and reserved for any future page-level navigation.
 * Never replays the full identity sequence — just a quick brand-anchored
 * beat, collapsing to a plain opacity swap under reduced motion.
 */

let markTemplate = null;

function getMarkTemplate() {
  if (markTemplate) return markTemplate;
  const source = document.querySelector('[data-logo-mark-loader]');
  markTemplate = source
    ? source.outerHTML
    : '<svg viewBox="0 0 100 100"><path d="M32,24 L32,68 L64,68" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/><path d="M32,24 Q58,14 78,45" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/><circle cx="78" cy="45" r="9" fill="#FF5E2E"/></svg>';
  return markTemplate;
}

let overlayEl = null;

function getOverlay() {
  if (overlayEl) return overlayEl;
  overlayEl = document.createElement('div');
  overlayEl.setAttribute('aria-hidden', 'true');
  overlayEl.className =
    'pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-void opacity-0';
  overlayEl.innerHTML = `<div class="h-10 w-10 text-paper">${getMarkTemplate()}</div>`;
  document.body.appendChild(overlayEl);
  return overlayEl;
}

/**
 * Plays a brief brand-anchored transition, then calls `onMid` once the
 * screen is fully covered (the right moment to swap content underneath),
 * then resolves once the overlay has cleared.
 */
export function playTransition(siteState, onMid = () => {}) {
  const overlay = getOverlay();

  if (siteState.reducedMotion) {
    onMid();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve
    });
    tl.to(overlay, { opacity: 1, duration: 0.22, ease: 'power2.in' })
      .add(onMid)
      .to(overlay, { opacity: 0, duration: 0.28, ease: 'power2.out', delay: 0.08 });
  });
}

import gsap from 'gsap';

/**
 * cursor.js — custom cursor system. Desktop-only (never runs on touch).
 * Single delegated listener pair drives a small state machine via
 * `data-cursor="hover|link|project|drag"` attributes rather than binding
 * a listener per interactive element.
 */

export function initCursor(siteState) {
  if (siteState.isTouch) {
    siteState.cursorEnabled = false;
    return;
  }

  siteState.cursorEnabled = true;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let rafId = null;

  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    },
    { passive: true }
  );

  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    gsap.set(ring, { x: ringX, y: ringY });
    rafId = requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      loop();
    }
  });

  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest('[data-cursor]');
    if (!target) return;
    const state = target.getAttribute('data-cursor');
    ring.className = `cursor-ring ${state ? `is-${state}` : ''}`;
    ring.textContent = state === 'project' ? target.getAttribute('data-cursor-label') || 'VIEW' : '';
  });

  document.addEventListener('pointerout', (e) => {
    const target = e.target.closest('[data-cursor]');
    if (!target) return;
    ring.className = 'cursor-ring';
    ring.textContent = '';
  });

  siteState.cursor = { dot, ring };
}

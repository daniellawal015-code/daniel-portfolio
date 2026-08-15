/**
 * interactions.js — general-purpose micro-interactions applied
 * declaratively via data-attributes, plus the System Mode Easter egg.
 */

export function initInteractions(siteState) {
  initMagnetic(siteState);
  initSystemMode(siteState);
  initConsoleSignature();
}

function initMagnetic(siteState) {
  const magneticEls = document.querySelectorAll('[data-magnetic]');
  if (siteState.isTouch || siteState.reducedMotion || !magneticEls.length) return;

  magneticEls.forEach((el) => {
    el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    const strength = 0.3;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  });
}

/**
 * System Mode — hidden intensification of the telemetry motif.
 * Trigger: press "s" then "m" within 600ms (a small deliberate sequence,
 * not a single accidental keypress), or Konami-style arrow sequence as a
 * secondary path. Tasteful: toggles a CSS class only, no new visual
 * language, no performance cost when inactive. Exit: same shortcut again,
 * or Escape.
 */
function initSystemMode(siteState) {
  const sequence = ['s', 'm'];
  let progress = 0;
  let resetTimer = null;

  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  let konamiProgress = 0;

  function toggle() {
    siteState.systemMode = !siteState.systemMode;
    document.documentElement.classList.toggle('system-mode', siteState.systemMode);
    if (siteState.systemMode) {
      console.log('%cSYSTEM MODE // ACTIVE', 'color:#FF5E2E;font-family:monospace;');
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    clearTimeout(resetTimer);
    const key = e.key.toLowerCase();
    if (key === sequence[progress]) {
      progress += 1;
      if (progress === sequence.length) {
        toggle();
        progress = 0;
      } else {
        resetTimer = setTimeout(() => { progress = 0; }, 600);
      }
    } else {
      progress = key === sequence[0] ? 1 : 0;
    }

    if (e.key === konami[konamiProgress]) {
      konamiProgress += 1;
      if (konamiProgress === konami.length) {
        toggle();
        konamiProgress = 0;
      }
    } else {
      konamiProgress = e.key === konami[0] ? 1 : 0;
    }

    if (e.key === 'Escape' && siteState.systemMode) toggle();
  });
}

function initConsoleSignature() {
  console.log(
    '%cDaniel Lawal%c — built by hand, not a template.\nSay hi: daniellawal015@gmail.com',
    'color:#FF5E2E;font-family:monospace;font-size:14px;font-weight:bold;',
    'color:#EDEBE4;font-family:monospace;font-size:12px;'
  );
}

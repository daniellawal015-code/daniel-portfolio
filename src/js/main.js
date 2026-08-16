import '../css/input.css';
import gsap from 'gsap';

import { initAnimations, splitText } from './animations.js';
import { initCursor } from './cursor.js';
import { initNavigation } from './navigation.js';
import { initLoader } from './loader.js';
import { initProjects } from './projects.js';
import { initSkills } from './skills.js';
import { initExperience } from './experience.js';
import { initEffects } from './effects.js';
import { initInteractions } from './interactions.js';
import { initContact } from './contact.js';
import { initAbout } from './about.js';

/**
 * siteState is the single shared source of truth for cross-module context.
 * Every module reads from this instead of re-detecting things independently.
 */
const siteState = {
  reducedMotion: false,
  isTouch: false,
  tier: 'full',
  cursorEnabled: false,
  systemMode: false
};

function detectCapabilities() {
  siteState.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  siteState.isTouch = window.matchMedia('(pointer: coarse)').matches;

  const cores = navigator.hardwareConcurrency || 4;
  const connection = navigator.connection;
  const isSlowConnection =
    connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));

  if (siteState.reducedMotion) {
    siteState.tier = 'minimal';
  } else if (cores <= 4 || isSlowConnection || window.innerWidth < 768) {
    siteState.tier = 'reduced';
  } else {
    siteState.tier = 'full';
  }

  document.documentElement.classList.toggle('reduced-motion', siteState.reducedMotion);
  document.documentElement.classList.toggle('is-touch', siteState.isTouch);
  document.body.classList.add('grain');
}

/**
 * The hero is the one section with no dedicated module (it's not
 * data-driven like projects/skills/experience), so its one-time entrance
 * choreography lives here, gated on the loader finishing.
 */
function initHeroEntrance(siteState) {
  const nameEl = document.querySelector('[data-hero-name]');
  if (!nameEl) return;

  const eyebrowEl = document.querySelector('[data-hero-eyebrow]');
  const statementEl = document.querySelector('[data-hero-statement]');
  const ctaWrap = document.querySelector('[data-hero-ctas]');
  const photoEl = document.querySelector('[data-hero-photo]');
  const codeCardEl = document.querySelector('[data-hero-code-card]');

  document.addEventListener(
    'portfolio:loaderComplete',
    () => {
      if (siteState.reducedMotion) {
        gsap.set(
          [eyebrowEl, nameEl, statementEl, ctaWrap, photoEl, codeCardEl].filter(Boolean),
          { opacity: 1, y: 0 }
        );
        return;
      }

      const chars = splitText(nameEl, { type: 'chars' });
      const tl = gsap.timeline({ delay: 0.05 });

      if (eyebrowEl) tl.from(eyebrowEl, { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
      tl.from(
        chars,
        { yPercent: 120, opacity: 0, stagger: 0.018, duration: 0.75, ease: 'power4.out' },
        eyebrowEl ? '-=0.25' : 0
      );
      if (statementEl) {
        tl.from(statementEl, { yPercent: 100, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      }
      if (ctaWrap) {
        tl.from(
          ctaWrap.children,
          { opacity: 0, y: 16, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // Developer-card composition: photo drops gently from above and
      // settles into place, then the code card follows from just beneath
      // it — a single deliberate sequence, not several things moving at
      // once.
      if (photoEl) {
        tl.from(
          photoEl,
          { y: -70, opacity: 0, duration: 0.9, ease: 'power3.out' },
          eyebrowEl ? '-=0.5' : '-=0.2'
        );
      }
      if (codeCardEl) {
        tl.from(codeCardEl, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35');
      }
    },
    { once: true }
  );
}

/**
 * Runs an init function in isolation — a failure in one module (a bad
 * selector, a missing dependency, a thrown error mid-animation-setup)
 * must never prevent every module after it from running. Without this,
 * one broken section could silently blank out everything downstream of
 * it in the list below (e.g. a bug in About could take Skills and
 * Projects down with it, even though neither is actually broken).
 */
function safeInit(name, fn, siteState) {
  try {
    fn(siteState);
  } catch (err) {
    console.error(`[daniel-portfolio] "${name}" failed to initialize — continuing without it.`, err);
  }
}

function init() {
  detectCapabilities();

  safeInit('animations', initAnimations, siteState);
  safeInit('cursor', initCursor, siteState);
  safeInit('navigation', initNavigation, siteState);
  safeInit('loader', initLoader, siteState);
  safeInit('heroEntrance', initHeroEntrance, siteState);
  safeInit('about', initAbout, siteState);
  safeInit('skills', initSkills, siteState);
  safeInit('projects', initProjects, siteState);
  safeInit('experience', initExperience, siteState);
  safeInit('effects', initEffects, siteState);
  safeInit('interactions', initInteractions, siteState);
  safeInit('contact', initContact, siteState);

  if (import.meta.env.DEV) {
    console.log('[daniel-portfolio] siteState:', siteState);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

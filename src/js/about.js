import { createScrollReveal, animateCounter } from './animations.js';

/**
 * about.js — About section reveals + animated stat counters. Small enough
 * not to warrant data.js of its own (content is static placeholder copy,
 * only the counters are dynamic), but kept as a dedicated module rather
 * than crammed into main.js, matching the one-module-per-responsibility
 * rule for anything with real animation logic.
 */

export function initAbout(siteState) {
  const section = document.querySelector('#about');
  if (!section) return;

  createScrollReveal(siteState, section.querySelectorAll('[data-about-reveal]'), {
    y: 28,
    stagger: 0.12
  });

  section.querySelectorAll('[data-stat-value]').forEach((el) => {
    animateCounter(el, siteState);
  });
}

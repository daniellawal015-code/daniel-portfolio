import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * animations.js — shared, section-agnostic GSAP utility layer.
 * Section modules call into these rather than each inventing their own
 * tween boilerplate. Every utility is reduced-motion aware via siteState.
 */

export function initAnimations(siteState) {
  gsap.defaults({ ease: 'power3.out' });

  if (siteState.reducedMotion) {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
}

/**
 * Lightweight, dependency-free text splitter (no paid SplitText plugin).
 * Wraps each character or word in a span for stagger animation, while
 * keeping the element screen-reader-friendly via aria-label + aria-hidden
 * on the generated fragments.
 */
export function splitText(element, { type = 'chars' } = {}) {
  if (!element) return [];

  const fullText = element.textContent.trim();
  element.setAttribute('aria-label', fullText);
  element.innerHTML = '';

  const units = type === 'words' ? fullText.split(/(\s+)/) : fullText.split('');
  const fragments = [];

  units.forEach((unit) => {
    if (unit === '') return;
    const span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    span.textContent = unit === ' ' ? '\u00A0' : unit;
    element.appendChild(span);
    if (unit.trim() !== '') fragments.push(span);
  });

  return fragments;
}

/**
 * Generic scroll-triggered reveal factory. Every section uses this same
 * function with different `from` values rather than hand-rolling
 * ScrollTrigger boilerplate per section — keeps the motion rhythm
 * consistent while still letting each section feel distinct via `from`.
 */
export function createScrollReveal(siteState, targets, from = {}, opts = {}) {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return null;

  if (siteState.reducedMotion) {
    gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' });
    return null;
  }

  return gsap.from(targets, {
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    ...from,
    scrollTrigger: {
      trigger: opts.trigger || targets,
      start: opts.start || 'top 82%',
      once: true
    }
  });
}

/**
 * Animated counter (0 → target) for About stats. Uses a plain object tween
 * rather than animating textContent directly, so easing applies to the
 * number itself, not just visibility.
 */
export function animateCounter(el, siteState, opts = {}) {
  if (!el) return;
  const target = Number(el.getAttribute('data-stat-target') || 0);
  const suffix = el.getAttribute('data-stat-suffix') || '';

  if (siteState.reducedMotion) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const counter = { value: 0 };
  gsap.to(counter, {
    value: target,
    duration: opts.duration || 1.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    },
    onUpdate: () => {
      el.textContent = `${Math.round(counter.value)}${suffix}`;
    }
  });
}

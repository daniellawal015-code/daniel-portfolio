import {
  siCss,
  siTailwindcss,
  siJavascript,
  siReact,
  siTypescript,
  siPython,
  siDjango,
  siNodedotjs,
  siPhp,
  siGithub,
  siVercel,
  siVite
} from 'simple-icons';
import { skills } from '../data/skills.js';
import { createScrollReveal } from './animations.js';

/**
 * skills.js — data-driven technology grid. Desktop: 6 columns × 2 rows.
 * Mobile: 1 column × 12 rows (no horizontal scroll). Real brand icons via
 * the `simple-icons` package.
 *
 * Icons are imported individually by name (not `import * as`) so Rollup
 * can tree-shake the unused ~3000 other icons out of the bundle — a
 * wildcard import previously pulled in the entire package and inflated
 * the production bundle from ~140KB to over 5MB.
 *
 * Replaces the earlier radial connection-graph implementation entirely —
 * this is the only Skills rendering path now.
 */

const ICONS = {
  css: siCss,
  tailwindcss: siTailwindcss,
  javascript: siJavascript,
  react: siReact,
  typescript: siTypescript,
  python: siPython,
  django: siDjango,
  nodedotjs: siNodedotjs,
  php: siPhp,
  github: siGithub,
  vercel: siVercel,
  vite: siVite
};

function resolveIcon(slug) {
  return ICONS[slug] || null;
}

export function initSkills(siteState) {
  const grid = document.querySelector('[data-skills-grid]');
  if (!grid) return;

  grid.innerHTML = '';

  skills.forEach((skill) => {
    const icon = resolveIcon(skill.iconSlug);

    const card = document.createElement('button');
    card.type = 'button';
    card.dataset.skillCard = '';
    card.setAttribute('data-cursor', 'hover');
    card.setAttribute('aria-label', `${skill.label} — ${skill.category}`);
    card.className =
      'group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 p-4 text-center transition-colors duration-300 hover:border-signal focus-visible:border-signal';

    card.innerHTML = `
      <span class="flex h-10 w-10 items-center justify-center text-paper transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1" aria-hidden="true">
        ${icon ? `<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="${icon.path}"></path></svg>` : ''}
      </span>
      <span class="font-mono text-[11px] uppercase tracking-widest text-paper transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        ${escapeHtml(skill.label)}
      </span>
      <span class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-signal px-3 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-void transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        ${escapeHtml(skill.category)}
      </span>
    `;

    // Touch devices have no hover — tap toggles the category reveal
    // directly, since :hover never fires there.
    if (siteState.isTouch) {
      card.addEventListener('click', () => {
        const isRevealed = card.classList.contains('is-revealed');
        grid.querySelectorAll('[data-skill-card]').forEach((c) => c.classList.remove('is-revealed'));
        if (!isRevealed) card.classList.add('is-revealed');
      });
    }

    grid.appendChild(card);
  });

  createScrollReveal(siteState, grid.querySelectorAll('[data-skill-card]'), { y: 24, stagger: 0.04 });
}

function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

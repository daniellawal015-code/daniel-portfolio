import gsap from 'gsap';
import { projects } from '../data/projects.js';
import { createScrollReveal, resolveAssetPath } from './animations.js';
import { playTransition } from './transitions.js';

/**
 * projects.js — the portfolio's centerpiece. Renders the grid from
 * src/data/projects.js, handles category filtering, hover tilt, and the
 * card → immersive case-study overlay transition (via transitions.js,
 * shared with any future page-level navigation rather than owning its
 * own transition logic).
 */

export function initProjects(siteState) {
  const grid = document.querySelector('[data-projects-grid]');
  const filterHost = document.querySelector('[data-projects-filter]');
  const overlay = document.querySelector('[data-project-overlay]');
  if (!grid) return;

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  let activeCategory = 'all';
  let lastFocusedTrigger = null;

  if (filterHost) renderFilters();
  renderGrid();
  applyFilter();

  if (overlay) {
    overlay.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeOverlay();
    });
  }

  function renderFilters() {
    filterHost.innerHTML = '';
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = cat;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(cat === activeCategory));
      btn.dataset.cursor = 'hover';
      btn.className =
        'rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ' +
        (cat === activeCategory ? 'border-signal text-paper' : 'border-depth-2 text-muted hover:text-paper');
      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderFilters();
        applyFilter();
      });
      filterHost.appendChild(btn);
    });
  }

  function applyFilter() {
    grid.querySelectorAll('[data-project-card]').forEach((card) => {
      const matches = activeCategory === 'all' || card.dataset.category === activeCategory;
      if (siteState.reducedMotion) {
        card.style.display = matches ? '' : 'none';
        return;
      }
      if (matches) {
        card.style.display = '';
        gsap.fromTo(card, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(card, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            card.style.display = 'none';
          }
        });
      }
    });
  }

  function renderGrid() {
    grid.innerHTML = '';
    projects.forEach((project) => {
      const card = document.createElement('article');
      card.dataset.projectCard = '';
      card.dataset.category = project.category;
      card.className = 'group relative overflow-hidden rounded-2xl border border-depth-2 bg-depth-1';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'block w-full text-left';
      button.setAttribute('data-cursor', 'project');
      button.setAttribute('data-cursor-label', 'VIEW');
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-label', `View project: ${project.title}`);

      button.innerHTML = `
        <div class="relative aspect-[4/3] overflow-hidden bg-depth-2">
          <img src="${escapeAttr(resolveAssetPath(project.image))}" alt="" loading="lazy" data-project-img
               class="h-full w-full object-cover opacity-0 transition-[transform,opacity] duration-700 ease-signal group-hover:scale-105" />
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-xs uppercase tracking-widest text-muted">
            ${escapeHtml(project.title)}
          </div>
        </div>
        <div class="p-5">
          <p class="font-mono text-[11px] uppercase tracking-widest text-signal">${escapeHtml(project.category)}</p>
          <h3 class="mt-2 font-display text-xl text-paper">${escapeHtml(project.title)}</h3>
          <p class="mt-2 line-clamp-2 font-body text-sm text-paper/60">${escapeHtml(project.description)}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            ${project.technologies.map((t) => `<li class="rounded-full border border-depth-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
      `;

      const img = button.querySelector('[data-project-img]');
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });

      button.addEventListener('click', () => openOverlay(project, button));

      if (!siteState.isTouch && !siteState.reducedMotion) attachTilt(button);

      card.appendChild(button);
      grid.appendChild(card);
    });

    createScrollReveal(siteState, grid.querySelectorAll('[data-project-card]'), { y: 32, stagger: 0.08 });
  }

  function attachTilt(el) {
    const strength = 6;
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateX: py * -strength,
        rotateY: px * strength,
        transformPerspective: 600,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
    });
  }

  function openOverlay(project, trigger) {
    if (!overlay) return;
    lastFocusedTrigger = trigger;

    playTransition(siteState, () => {
      populateOverlay(project);
      overlay.hidden = false;
      overlay.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
    }).then(() => {
      const closeBtn = overlay.querySelector('[data-overlay-close]');
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeOverlay() {
    playTransition(siteState, () => {
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }).then(() => {
      if (lastFocusedTrigger) lastFocusedTrigger.focus();
    });
  }

  function trapFocus(e) {
    if (e.key !== 'Tab' || overlay.hidden) return;
    const focusables = overlay.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function populateOverlay(project) {
    const cs = project.caseStudy;
    overlay.innerHTML = `
      <div class="relative mx-auto flex h-full max-w-4xl flex-col overflow-y-auto px-6 py-16 sm:px-10">
        <button type="button" data-overlay-close data-cursor="hover" aria-label="Close project detail"
                class="absolute right-6 top-6 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper">
          Close ✕
        </button>

        <p class="font-mono text-eyebrow uppercase tracking-widest text-signal">${escapeHtml(project.category)}</p>
        <h2 class="mt-3 font-display text-display-1 text-paper">${escapeHtml(project.title)}</h2>
        <p class="mt-4 max-w-2xl font-body text-paper/70">${escapeHtml(project.description)}</p>

        <ul class="mt-4 flex flex-wrap gap-2">
          ${project.technologies.map((t) => `<li class="rounded-full border border-depth-2 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">${escapeHtml(t)}</li>`).join('')}
        </ul>

        <div class="mt-6 flex gap-4">
          ${project.liveUrl ? `<a href="${escapeAttr(project.liveUrl)}" target="_blank" rel="noopener" class="rounded-full bg-signal px-5 py-2 font-mono text-xs uppercase tracking-widest text-void">Live site</a>` : ''}
          ${project.githubUrl ? `<a href="${escapeAttr(project.githubUrl)}" target="_blank" rel="noopener" class="rounded-full border border-paper/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper">Source</a>` : ''}
        </div>

        ${
          cs
            ? `
          <div class="mt-12 grid gap-8 sm:grid-cols-2">
            <div><h3 class="font-mono text-[11px] uppercase tracking-widest text-muted">Overview</h3><p class="mt-2 font-body text-paper/75">${escapeHtml(cs.overview)}</p></div>
            <div><h3 class="font-mono text-[11px] uppercase tracking-widest text-muted">Role</h3><p class="mt-2 font-body text-paper/75">${escapeHtml(cs.role)}</p></div>
            <div><h3 class="font-mono text-[11px] uppercase tracking-widest text-muted">Problem</h3><p class="mt-2 font-body text-paper/75">${escapeHtml(cs.problem)}</p></div>
            <div><h3 class="font-mono text-[11px] uppercase tracking-widest text-muted">Solution</h3><p class="mt-2 font-body text-paper/75">${escapeHtml(cs.solution)}</p></div>
          </div>
          <div class="mt-8">
            <h3 class="font-mono text-[11px] uppercase tracking-widest text-muted">Key features</h3>
            <ul class="mt-2 space-y-1">${cs.keyFeatures.map((f) => `<li class="font-body text-paper/75">— ${escapeHtml(f)}</li>`).join('')}</ul>
          </div>
        `
            : `
          <p class="mt-12 rounded-xl border border-dashed border-depth-2 p-6 font-mono text-xs uppercase tracking-widest text-muted">
            Case study coming soon.
          </p>
        `
        }
      </div>
    `;

    overlay.querySelector('[data-overlay-close]').addEventListener('click', closeOverlay);
  }
}

function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str = '') {
  return String(str).replace(/"/g, '&quot;');
}

import gsap from 'gsap';
import { skills } from '../data/skills.js';
import { createScrollReveal } from './animations.js';

/**
 * skills.js — data-driven connection-graph visualization. Desktop renders
 * a radial node graph (SVG lines + real <button> nodes, so it stays
 * keyboard-operable rather than being pointer-only SVG hit-testing).
 * Mobile/tablet gets a simpler stacked list from the same data — per the
 * brief, the graph shouldn't be forced onto touch screens where it loses
 * usability.
 */

export function initSkills(siteState) {
  const graphHost = document.querySelector('[data-skills-graph]');
  const listHost = document.querySelector('[data-skills-list]');
  const panel = document.querySelector('[data-skills-panel]');
  if (!graphHost && !listHost) return;

  if (graphHost) renderGraph(graphHost, panel, siteState);
  if (listHost) renderList(listHost, panel, siteState);
}

function computePositions(count) {
  const radius = 38; // percent of container
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    };
  });
}

function renderGraph(host, panel, siteState) {
  const positions = computePositions(skills.length);
  const indexById = new Map(skills.map((s, i) => [s.id, i]));

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'absolute inset-0 h-full w-full');
  svg.setAttribute('aria-hidden', 'true');

  const drawnPairs = new Set();
  const lineEls = new Map();

  skills.forEach((skill, i) => {
    skill.connections.forEach((targetId) => {
      const j = indexById.get(targetId);
      if (j === undefined) return;
      const pairKey = [i, j].sort().join('-');
      if (drawnPairs.has(pairKey)) return;
      drawnPairs.add(pairKey);

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', positions[i].x);
      line.setAttribute('y1', positions[i].y);
      line.setAttribute('x2', positions[j].x);
      line.setAttribute('y2', positions[j].y);
      line.setAttribute('stroke', '#232328');
      line.setAttribute('stroke-width', '0.3');
      svg.appendChild(line);

      if (!lineEls.has(i)) lineEls.set(i, []);
      if (!lineEls.has(j)) lineEls.set(j, []);
      lineEls.get(i).push(line);
      lineEls.get(j).push(line);
    });
  });

  host.appendChild(svg);

  const nodeButtons = skills.map((skill, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.skillId = skill.id;
    btn.setAttribute('data-cursor', 'hover');
    btn.className =
      'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-depth-2 bg-depth-1 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors duration-300 hover:text-paper focus-visible:text-paper';
    btn.style.left = `${positions[i].x}%`;
    btn.style.top = `${positions[i].y}%`;
    btn.textContent = skill.label;

    const activate = () => setActiveSkill(skill, i);
    btn.addEventListener('pointerenter', activate);
    btn.addEventListener('focus', activate);
    btn.addEventListener('pointerleave', clearActive);
    btn.addEventListener('blur', clearActive);

    host.appendChild(btn);
    return btn;
  });

  function setActiveSkill(skill, i) {
    const connectedIds = new Set(skill.connections);
    skills.forEach((s, idx) => {
      const isRelated = idx === i || connectedIds.has(s.id);
      nodeButtons[idx].classList.toggle('text-paper', isRelated);
      nodeButtons[idx].classList.toggle('border-signal', idx === i);
      nodeButtons[idx].style.opacity = isRelated ? '1' : '0.35';
    });
    (lineEls.get(i) || []).forEach((line) => {
      line.setAttribute('stroke', '#FF5E2E');
      line.setAttribute('stroke-width', '0.6');
    });
    if (panel) {
      panel.hidden = false;
      panel.querySelector('[data-skills-panel-label]').textContent = skill.label;
      panel.querySelector('[data-skills-panel-category]').textContent = skill.category;
      panel.querySelector('[data-skills-panel-proficiency]').textContent = skill.proficiency;
      panel.querySelector('[data-skills-panel-description]').textContent = skill.description;
    }
  }

  function clearActive() {
    nodeButtons.forEach((btn) => {
      btn.classList.remove('text-paper', 'border-signal');
      btn.style.opacity = '1';
    });
    svg.querySelectorAll('line').forEach((line) => {
      line.setAttribute('stroke', '#232328');
      line.setAttribute('stroke-width', '0.3');
    });
    if (panel) panel.hidden = true;
  }

  createScrollReveal(siteState, [svg, ...nodeButtons], { scale: 0.9, stagger: 0.03 }, { trigger: host });
}

function renderList(host, panel, siteState) {
  skills.forEach((skill) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className =
      'flex w-full items-center justify-between border-b border-depth-2 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 aria-expanded:text-paper';
    item.setAttribute('aria-expanded', 'false');
    item.innerHTML = `<span>${skill.label}</span><span aria-hidden="true">+</span>`;

    const desc = document.createElement('p');
    desc.className = 'font-body text-sm text-paper/70 pb-4 hidden';
    desc.textContent = skill.description;

    item.addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      item.setAttribute('aria-expanded', String(!isOpen));
      desc.classList.toggle('hidden', isOpen);
    });

    host.appendChild(item);
    host.appendChild(desc);
  });

  createScrollReveal(siteState, host.children, { y: 16, stagger: 0.05 });
}

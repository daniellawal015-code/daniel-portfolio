/**
 * effects.js — hero's cursor-reactive canvas background. Isolated so it
 * can be skipped entirely on siteState.tier === 'minimal'. Canvas 2D only
 * (no WebGL — unjustified for a subtle particle/glow field at this scale).
 */

export function initEffects(siteState) {
  if (siteState.tier === 'minimal') return;

  const canvas = document.querySelector('[data-hero-canvas]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return; // canvas unsupported/unavailable — fail quietly, hero still works without the background

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let pointer = { x: 0.5, y: 0.5 };
  let rafId = null;

  function buildParticles() {
    const count = siteState.tier === 'full' ? 70 : 34;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  }

  function onPointerMove(e) {
    pointer.x = e.clientX / window.innerWidth;
    pointer.y = e.clientY / window.innerHeight;
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const glowX = pointer.x * width;
    const glowY = pointer.y * height;
    const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(width, height) * 0.35);
    gradient.addColorStop(0, 'rgba(255,94,46,0.06)');
    gradient.addColorStop(1, 'rgba(255,94,46,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(237,235,228,0.35)';
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    rafId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', debounce(resize, 200));
  if (!siteState.isTouch) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      draw();
    }
  });

  draw();
}

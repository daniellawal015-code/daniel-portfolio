import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteState } from '../hooks/useSiteState.jsx';

gsap.registerPlugin(ScrollTrigger);

const STOPS = [
  { id: 'about', label: 'Idea' },
  { id: 'skills', label: 'Build' },
  { id: 'projects', label: 'Shipped' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Say hello' }
];

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * RouteLine — the monogram's arc, extended into a route that runs down
 * the left edge of the page. It draws itself as you scroll, a dot
 * travels its tip, and every section is a stop that lights up when the
 * route reaches it.
 *
 * Geometry is measured from the real section positions, so it is
 * rebuilt whenever the page height changes (images loading, resize).
 * The SVG is built imperatively from that measurement, then driven by
 * a single scrubbed ScrollTrigger inside a gsap.context (see
 * useScrollReveal for why cleanup uses revert rather than kill).
 *
 * Decorative only: aria-hidden, no pointer events. Under reduced motion
 * the finished route is shown statically.
 */
export default function RouteLine() {
  const { reducedMotion } = useSiteState();
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const main = svg?.parentElement;
    if (!svg || !main) return undefined;

    let ctx;
    let rebuildTimer;
    let lastHeight = 0;
    let lastWidth = 0;

    function build() {
      ctx?.revert();
      svg.replaceChildren();

      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const height = main.offsetHeight;
      const wide = window.innerWidth >= 1024;
      const x = wide ? 44 : 11;
      const jog = wide ? 14 : 4;
      const width = wide ? 150 : 28;

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);

      const hero = document.getElementById('hero');
      const startY = hero ? hero.offsetHeight * 0.72 : 400;

      const points = [{ x, y: startY }];
      STOPS.forEach((stop, i) => {
        const el = document.getElementById(stop.id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - mainTop + 34;
        points.push({ x: x + (i % 2 === 0 ? jog : 0), y, stop });
      });
      if (points.length < 2) return;

      // S-curves between stops: leaves each point vertically, arrives vertically.
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i += 1) {
        const a = points[i - 1];
        const b = points[i];
        const mid = (a.y + b.y) / 2;
        d += ` C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}`;
      }

      const track = document.createElementNS(SVG_NS, 'path');
      track.setAttribute('d', d);
      track.setAttribute('fill', 'none');
      track.setAttribute('stroke', '#232328');
      track.setAttribute('stroke-width', '1.5');
      svg.appendChild(track);

      const route = document.createElementNS(SVG_NS, 'path');
      route.setAttribute('d', d);
      route.setAttribute('fill', 'none');
      route.setAttribute('stroke', '#FF5E2E');
      route.setAttribute('stroke-width', '2');
      route.setAttribute('stroke-linecap', 'round');
      svg.appendChild(route);

      const nodes = points.slice(1).map((p) => {
        const g = document.createElementNS(SVG_NS, 'g');
        const ring = document.createElementNS(SVG_NS, 'circle');
        ring.setAttribute('cx', p.x);
        ring.setAttribute('cy', p.y);
        ring.setAttribute('r', '5');
        ring.setAttribute('fill', '#0A0A0C');
        ring.setAttribute('stroke', '#3a3a42');
        ring.setAttribute('stroke-width', '1.5');
        g.appendChild(ring);

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('x', p.x + 16);
        label.setAttribute('y', p.y + 4);
        label.setAttribute('fill', '#8A8A92');
        label.setAttribute('font-size', '10');
        label.setAttribute('letter-spacing', '2');
        label.setAttribute('font-family', 'JetBrains Mono, monospace');
        label.textContent = p.stop.label.toUpperCase();
        if (!wide) label.setAttribute('display', 'none');
        g.appendChild(label);

        svg.appendChild(g);
        return { y: p.y, ring, label };
      });

      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '5.5');
      dot.setAttribute('fill', '#FF5E2E');
      svg.appendChild(dot);

      const length = route.getTotalLength();

      function paint(progress) {
        const point = route.getPointAtLength(length * progress);
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
        route.style.strokeDasharray = `${length}`;
        route.style.strokeDashoffset = `${length * (1 - progress)}`;
        nodes.forEach((n) => {
          const reached = point.y >= n.y - 1;
          n.ring.setAttribute('fill', reached ? '#FF5E2E' : '#0A0A0C');
          n.ring.setAttribute('stroke', reached ? '#FF5E2E' : '#3a3a42');
          n.label.setAttribute('fill', reached ? '#EDEBE4' : '#8A8A92');
        });
      }

      if (reducedMotion) {
        paint(1);
        return;
      }

      paint(0);
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: main,
          start: () => `top+=${startY} 60%`,
          end: 'bottom 75%',
          scrub: 0.6,
          onUpdate: (self) => paint(self.progress)
        });
      });
    }

    function scheduleBuild() {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(() => {
        const h = main.offsetHeight;
        const w = window.innerWidth;
        // Only rebuild when the layout actually changed meaningfully.
        if (Math.abs(h - lastHeight) < 2 && w === lastWidth) return;
        lastHeight = h;
        lastWidth = w;
        build();
      }, 150);
    }

    lastHeight = main.offsetHeight;
    lastWidth = window.innerWidth;
    build();

    const observer = new ResizeObserver(scheduleBuild);
    observer.observe(main);
    window.addEventListener('resize', scheduleBuild);

    return () => {
      window.clearTimeout(rebuildTimer);
      observer.disconnect();
      window.removeEventListener('resize', scheduleBuild);
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute left-0 top-0 z-[5] overflow-visible"
    />
  );
}

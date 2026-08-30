import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSiteState } from '../hooks/useSiteState.jsx';

/**
 * CustomCursor — desktop-only custom cursor. A single delegated listener
 * pair drives a small state machine via `data-cursor="hover|link|project"`
 * attributes on any element in the document, rather than binding a
 * listener per interactive element.
 */
export default function CustomCursor() {
  const { isTouch } = useSiteState();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (isTouch) {
      document.documentElement.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.documentElement.classList.add('has-custom-cursor');
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = null;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    }
    loop();

    const onVisibility = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onPointerOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      const state = target.getAttribute('data-cursor');
      ring.className = `cursor-ring ${state ? `is-${state}` : ''}`;
      ring.textContent = state === 'project' ? target.getAttribute('data-cursor-label') || 'VIEW' : '';
    };
    const onPointerOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      ring.className = 'cursor-ring';
      ring.textContent = '';
    };
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

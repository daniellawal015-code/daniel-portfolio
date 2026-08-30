import { useEffect } from 'react';
import { useSiteState } from './useSiteState.jsx';

/**
 * useMagnetic — attaches a gentle pointer-follow effect to every element
 * matching `[data-magnetic]` inside the given container. Skipped on touch
 * devices and under reduced motion.
 */
export function useMagnetic(containerRef) {
  const { isTouch, reducedMotion } = useSiteState();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isTouch || reducedMotion) return undefined;

    const els = container.querySelectorAll('[data-magnetic]');
    if (!els.length) return undefined;

    const strength = 0.3;
    const cleanups = [];

    els.forEach((el) => {
      el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

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
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, isTouch, reducedMotion]);
}

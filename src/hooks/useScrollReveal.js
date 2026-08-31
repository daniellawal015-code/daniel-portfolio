import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteState } from './useSiteState.jsx';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — attach to a container ref; every descendant matching
 * `selector` gets a scroll-triggered reveal.
 */
export function useScrollReveal(containerRef, selector, from = {}, opts = {}) {
  const { reducedMotion } = useSiteState();

  const fromRef = useRef(from);
  const optsRef = useRef(opts);

  fromRef.current = from;
  optsRef.current = opts;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const targets = selector
      ? container.querySelectorAll(selector)
      : container;

    if (selector && targets.length === 0) {
      return undefined;
    }

    if (reducedMotion) {
      gsap.set(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform'
      });

      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        ...fromRef.current,
        scrollTrigger: {
          trigger: optsRef.current.trigger || container,
          start: optsRef.current.start || 'top 82%',
          once: true
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, selector]);
}
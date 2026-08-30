import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteState } from '../hooks/useSiteState.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { target: 20, suffix: '+', label: 'PROJECT BUILT+' },
  { target: 2, suffix: '', label: 'EXPERIENCE' },
  { target: 12, suffix: '', label: 'TECHNOLOGIES' },
  { target: 3, suffix: '', label: 'FEATURED PROJECTS' }
];

function StatCounter({ target, suffix, label }) {
  const { reducedMotion } = useSiteState();
  const valueRef = useRef(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return undefined;

    if (reducedMotion) {
      el.textContent = `${target}${suffix}`;
      return undefined;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.value)}${suffix}`;
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, suffix, reducedMotion]);

  return (
    <li data-about-reveal>
      <span ref={valueRef} className="block font-display text-display-1 text-signal">
        {target}
      </span>
      <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
    </li>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, '[data-about-reveal]', { y: 28, stagger: 0.12 });

  return (
    <section ref={sectionRef} id="about" aria-label="About" className="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
      <div className="max-w-4xl">
        <p data-about-reveal className="font-mono text-eyebrow uppercase tracking-widest text-muted">
          02 // About
        </p>

        <p data-about-reveal className="mt-6 font-display text-display-2 text-signal">
          Hello, I&rsquo;m Daniel Lawal 🙂
        </p>

        <p data-about-reveal className="mt-4 whitespace-pre-line font-display text-display-1 text-paper">
          {'BUILDING WITH\nPURPOSE,\nPRECISION &\nCURIOSITY'}
        </p>

        <p data-about-reveal className="mt-8 max-w-2xl font-body text-paper/70">
          I build with curiosity, pay attention to the details, and turn ideas into digital experiences that
          people can actually use.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}

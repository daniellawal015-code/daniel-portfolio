import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { useSiteState } from '../hooks/useSiteState.jsx';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
];

export default function Navbar({ loaderComplete }) {
  const { reducedMotion } = useSiteState();
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Reveal the nav once the loader finishes, so its entrance never
  // competes with the boot sequence.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !loaderComplete) return;

    gsap.to(nav, {
      opacity: 1,
      y: 0,
      duration: reducedMotion ? 0.01 : 0.7,
      ease: 'power3.out',
      onStart: () => {
        nav.style.pointerEvents = 'auto';
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderComplete]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active-section tracking via IntersectionObserver
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeydown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main-content"
        data-cursor="hover"
        className="fixed left-6 top-6 z-[200] -translate-y-16 rounded-full bg-signal px-5 py-2 font-mono text-xs uppercase tracking-widest text-void opacity-0 transition-transform duration-200 focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>

      <nav
        ref={navRef}
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 opacity-0 -translate-y-3 pointer-events-none lg:px-10 ${
          isScrolled ? 'is-scrolled' : ''
        }`}
      >
        <a href="#" aria-label="Daniel Lawal — home" data-cursor="link" className="text-paper">
          <Logo className="h-8 w-8" />
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="hover"
                aria-current={activeHref === link.href ? 'true' : undefined}
                className={`nav-link transition-colors duration-300 hover:text-paper ${
                  activeHref === link.href ? 'is-active' : ''
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/resume/Daniel_Lawal_Resume.pdf"
            download
            data-magnetic
            data-cursor="hover"
            className="hidden rounded-full border border-paper/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:border-paper md:inline-flex"
          >
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-cursor="hover"
            aria-label="Open menu"
            className="inline-flex text-paper md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        data-mobile-menu
        id="mobile-menu"
        hidden={!menuOpen}
        className={`fixed inset-0 z-[60] flex flex-col bg-void px-6 py-6 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="relative h-6 w-6 text-paper"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-16 flex flex-1 flex-col gap-8 font-display text-4xl text-paper">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume/Daniel_Lawal_Resume.pdf"
          download
          className="font-mono text-xs uppercase tracking-widest text-paper/70 underline underline-offset-4"
        >
          Download résumé
        </a>
      </div>
    </>
  );
}

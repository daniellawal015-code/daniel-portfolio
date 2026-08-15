import gsap from 'gsap';

/**
 * navigation.js — desktop nav state, active-section indicator, mobile
 * overlay choreography, and the instrumentation-rail sync (section number
 * + scroll percentage). Waits for the loader to finish before revealing
 * itself, so its entrance never competes with the boot sequence.
 */

export function initNavigation(siteState) {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  document.addEventListener(
    'portfolio:loaderComplete',
    () => {
      nav.removeAttribute('data-nav-hidden');
      gsap.to(nav, {
        opacity: 1,
        y: 0,
        duration: siteState.reducedMotion ? 0.01 : 0.7,
        ease: 'power3.out',
        onStart: () => {
          nav.style.pointerEvents = 'auto';
        }
      });
    },
    { once: true }
  );

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = nav.querySelectorAll('a[href^="#"]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((link) => {
            const isActive = link.getAttribute('href') === id;
            link.classList.toggle('is-active', isActive);
            if (isActive) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    // Instrumentation rail: section number + scroll percentage
    const railSection = document.querySelector('[data-rail-section]');
    if (railSection) {
      const sectionNumbers = new Map(sections.map((s, i) => [s.id, String(i + 1).padStart(2, '0')]));
      const railObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            railSection.textContent = sectionNumbers.get(entry.target.id) || '00';
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      sections.forEach((s) => railObserver.observe(s));
    }
  }

  const railScroll = document.querySelector('[data-rail-scroll]');
  if (railScroll) {
    const updateScrollPct = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
      railScroll.textContent = `${pct}%`;
    };
    window.addEventListener('scroll', updateScrollPct, { passive: true });
    updateScrollPct();
  }

  // Mobile overlay menu
  const toggle = nav.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    const menuLinks = menu.querySelectorAll('a');
    const closeBtn = menu.querySelector('[data-mobile-menu-close]');

    function openMenu() {
      menu.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      if (siteState.reducedMotion) {
        gsap.set(menu, { autoAlpha: 1 });
        return;
      }
      gsap.set(menu, { autoAlpha: 0 });
      gsap.to(menu, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.from(menuLinks, {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: 'power3.out',
        delay: 0.12
      });
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      const done = () => {
        menu.setAttribute('hidden', '');
        document.body.style.overflow = '';
      };
      if (siteState.reducedMotion) {
        gsap.set(menu, { autoAlpha: 0 });
        done();
        return;
      }
      gsap.to(menu, { autoAlpha: 0, duration: 0.25, ease: 'power2.in', onComplete: done });
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    });
  }
}

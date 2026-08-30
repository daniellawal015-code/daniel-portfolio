import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * SiteStateContext — the React equivalent of the original vanilla build's
 * shared `siteState` object. Every component reads capability flags from
 * here instead of re-detecting them independently.
 */
const SiteStateContext = createContext({
  reducedMotion: false,
  isTouch: false,
  tier: 'full',
  systemMode: false
});

export function SiteStateProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [tier, setTier] = useState('full');
  const [systemMode, setSystemMode] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchQuery = window.matchMedia('(pointer: coarse)');

    function detect() {
      const reduced = motionQuery.matches;
      const touch = touchQuery.matches;
      setReducedMotion(reduced);
      setIsTouch(touch);

      const cores = navigator.hardwareConcurrency || 4;
      const connection = navigator.connection;
      const isSlowConnection =
        connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));

      if (reduced) {
        setTier('minimal');
      } else if (cores <= 4 || isSlowConnection || window.innerWidth < 768) {
        setTier('reduced');
      } else {
        setTier('full');
      }

      document.documentElement.classList.toggle('reduced-motion', reduced);
      document.documentElement.classList.toggle('is-touch', touch);
      document.body.classList.add('grain');
    }

    detect();
    motionQuery.addEventListener('change', detect);
    touchQuery.addEventListener('change', detect);
    window.addEventListener('resize', detect);

    return () => {
      motionQuery.removeEventListener('change', detect);
      touchQuery.removeEventListener('change', detect);
      window.removeEventListener('resize', detect);
    };
  }, []);

  // System Mode Easter egg — "s" then "m" within 600ms, or a Konami-style
  // arrow sequence. Toggles a CSS class only; no new visual language.
  useEffect(() => {
    const sequence = ['s', 'm'];
    let progress = 0;
    let resetTimer = null;

    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let konamiProgress = 0;

    function toggle() {
      setSystemMode((prev) => {
        const next = !prev;
        document.documentElement.classList.toggle('system-mode', next);
        if (next) {
          console.log('%cSYSTEM MODE // ACTIVE', 'color:#FF5E2E;font-family:monospace;');
        }
        return next;
      });
    }

    function onKeydown(e) {
      if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      clearTimeout(resetTimer);
      const key = e.key.toLowerCase();
      if (key === sequence[progress]) {
        progress += 1;
        if (progress === sequence.length) {
          toggle();
          progress = 0;
        } else {
          resetTimer = setTimeout(() => {
            progress = 0;
          }, 600);
        }
      } else {
        progress = key === sequence[0] ? 1 : 0;
      }

      if (e.key === konami[konamiProgress]) {
        konamiProgress += 1;
        if (konamiProgress === konami.length) {
          toggle();
          konamiProgress = 0;
        }
      } else {
        konamiProgress = e.key === konami[0] ? 1 : 0;
      }

      if (e.key === 'Escape') {
        setSystemMode((prev) => {
          if (!prev) return prev;
          document.documentElement.classList.remove('system-mode');
          return false;
        });
      }
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  useEffect(() => {
    console.log(
      '%cDaniel Lawal%c — built by hand, not a template.\nSay hi: daniellawal015@gmail.com',
      'color:#FF5E2E;font-family:monospace;font-size:14px;font-weight:bold;',
      'color:#EDEBE4;font-family:monospace;font-size:12px;'
    );
  }, []);

  const value = useMemo(
    () => ({ reducedMotion, isTouch, tier, systemMode }),
    [reducedMotion, isTouch, tier, systemMode]
  );

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState() {
  return useContext(SiteStateContext);
}

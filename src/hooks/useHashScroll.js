import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useHashScroll — the browser's native "scroll to #hash on load" only
 * works when the target element already exists in the DOM at initial
 * parse time. This is a client-rendered SPA shell (`index.html` has an
 * empty `#root`), so on a direct link or a page refresh at `/#projects`
 * the target section doesn't exist yet when the browser looks for it —
 * the native scroll silently no-ops, the page stays at scrollY 0, and
 * every section's scroll-triggered reveal (including the one you
 * actually navigated to) never gets a scroll event to fire on.
 *
 * This scrolls to the hash target itself once sections have mounted.
 * A separate `ScrollTrigger.refresh()` still runs on fonts/images
 * settling, to correct trigger positions against any layout shift —
 * see note 3 below for why that refresh deliberately does *not* also
 * run immediately after the hash scroll itself.
 *
 * Three React/browser-specific traps, all confirmed by testing, shaped
 * the final shape of this hook:
 *
 * 1. Some browsers keep retrying their own native "scroll to fragment"
 *    behavior for a short window after load, since the target didn't
 *    exist at parse time — and that retry can silently override a
 *    JS-driven scroll that lands first. Deferring our own scroll by a
 *    beat (rather than firing on the very first frame) sidesteps this.
 * 2. StrictMode runs this effect twice on mount (setup → cleanup →
 *    setup). An earlier version read `window.location.hash` fresh
 *    *inside* the effect and also stripped it via `replaceState` before
 *    scrolling; the first pass's strip left the second (surviving)
 *    pass reading an already-empty hash. Capturing the hash once in a
 *    ref — evaluated only on this hook's first render — avoids that.
 *    The replaceState dance turned out to be unnecessary once the
 *    scroll itself was reliable, so it's gone.
 * 3. Calling `ScrollTrigger.refresh()` *immediately* after the manual
 *    scroll — in the same synchronous tick — reliably snapped the
 *    scroll position back to 0 (confirmed by testing with and without
 *    it back to back). ScrollTrigger's refresh briefly re-measures
 *    trigger offsets and did not settle cleanly on top of a scroll
 *    position it hadn't yet had a frame to register as the new
 *    baseline. Separating the two — scroll now, refresh on the next
 *    frame — fixes it.
 */
export function useHashScroll() {
  const hashRef = useRef(window.location.hash.slice(1));

  useEffect(() => {
    function refresh() {
      ScrollTrigger.refresh();
    }

    // Recalculate trigger positions once fonts/images have settled, so
    // "top 82%" etc. are measured against final layout, not a
    // still-reflowing one.
    document.fonts?.ready?.then(refresh);
    window.addEventListener('load', refresh);

    const hash = hashRef.current;
    let scrollTimeoutId = null;

    if (hash) {
      // Defer briefly so this runs after layout from this same commit
      // has settled, rather than racing the browser's own fragment
      // handling.
      scrollTimeoutId = setTimeout(() => {
        const target = document.getElementById(hash);
        if (!target) return;

        const { top } = target.getBoundingClientRect();
        window.scrollTo(0, window.scrollY + top);
        // Deliberately no ScrollTrigger.refresh() here — the scroll
        // itself dispatches a native 'scroll' event, which is all
        // ScrollTrigger needs to evaluate already-registered triggers
        // against the new position. Calling refresh() in the same
        // beat re-measures trigger offsets before the browser has
        // settled on this as the new scroll baseline and reliably
        // snapped the position back to 0 (see note 3 above) — the
        // load/fonts-ready refresh above already covers the layout-
        // shift case this would otherwise have been for.
      }, 300);
    }

    return () => {
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
      window.removeEventListener('load', refresh);
    };
  }, []);
}

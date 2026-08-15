# Daniel Lawal — Portfolio

Interactive developer portfolio. PHP + Vite + Tailwind + GSAP, JavaScript-first, no framework.

## Setup

```bash
npm install
```

## Development

Two servers run side by side:

**Terminal 1 — Vite (JS/CSS, HMR):**
```bash
npm run dev
```
Leave `config.php` set to `define('APP_ENV', 'development');` while doing this.

**Terminal 2 — PHP:**
```bash
php -S localhost:8000
```
Then visit `http://localhost:8000`.

## Production build

```bash
npm run build
```
This writes hashed, optimized assets + a manifest to `public/build/`. Before deploying, change `config.php` to:
```php
define('APP_ENV', 'production');
```
`includes/vite.php` will then read the manifest and output the correct built asset tags automatically.

## Project structure

See `portfolio-architecture.md` (shared separately) for the full architecture, design system, and phase plan. The short version:

- `components/*.php` — semantic markup shells only, no hardcoded repeated content
- `src/js/*.js` — one module per responsibility (cursor, navigation, loader, projects, effects, interactions, contact), orchestrated by `main.js`
- `src/data/*.js` — single source of truth for projects/skills/experience, consumed by the JS modules that render them
- `src/css/input.css` — Tailwind entry point; design tokens land in Phase 2

## Logo / brand mark

Final mark: a fused corner-and-trajectory monogram — an angular corner stroke breaking into a departing arc, landing on a signal-colored waypoint dot. Lives in `public/icons/`:

- `mark-primary.svg` — off-white strokes + orange accent dot, for dark/void surfaces (navbar, footer, loader, cursor states)
- `mark-mono-dark.svg` — single dark-ink color (accent dot included), for light/print surfaces — this is what belongs on the resume header if you add one
- `mark-mono-light.svg` — single off-white color (no accent), for contexts needing one flat color on a dark surface
- `favicon.svg` / `favicon.ico` / `favicon-16.png` / `favicon-32.png` / `apple-touch-icon.png` / `icon-192.png` / `icon-512.png` — browser and platform favicon set, already wired into `index.php`'s `<head>`

The mark is inlined as raw `<svg>` (not `<img>`) in `components/navigation.php`, `components/footer.php`, and `components/loader.php`, with the two strokes kept as separate `<path>` elements deliberately — Phase 6 animates them independently (corner draws in, then the arc sweeps out to the dot) rather than treating the mark as a static image. Strokes use `currentColor` so `color` on the parent controls them; the accent dot stays fixed orange (`#FF5E2E`) regardless of context.

## Phase 1 — what to test

1. `npm install && npm run dev` — Vite dev server should start cleanly on port 5173 with no errors.
2. `php -S localhost:8000` in a second terminal, then load `http://localhost:8000`.
3. Confirm the page loads unstyled-but-structured (Tailwind has no tokens yet — that's Phase 2) with no console errors.
4. Open devtools console — you should see a `[daniel-portfolio] siteState: {...}` log with `reducedMotion`, `isTouch`, and `tier` populated correctly for your device.
5. You should also see a `[projects.js] 1 project(s) loaded from data source.` log, confirming the data-import contract works end-to-end.
6. Try `npm run build` — should complete with no errors and produce `public/build/manifest.json` plus hashed JS/CSS files.
7. Switch `config.php` to `'production'`, reload without the Vite dev server running — page should still load correctly using the built assets.
8. Add your real `resume/Daniel-Lawal-Resume.pdf` — the placeholder `.gitkeep` file in that folder can be deleted once it's there.

## What's next

Phase 2 — Tailwind design tokens (the approved color/type system), applied to `tailwind.config.js` and `src/css/input.css`, plus base typography and grain/noise texture.

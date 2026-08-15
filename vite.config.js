import { defineConfig } from 'vite';

/**
 * Vite config for a PHP-served site.
 *
 * Dev:   `npm run dev` starts the Vite dev server (default http://localhost:5173)
 *        with HMR. index.php detects dev mode via config.php and points asset
 *        tags at this server (see includes/vite.php).
 *
 * Build: `npm run build` compiles src/js/main.js (which imports src/css/input.css)
 *        into public/build/, alongside a manifest.json that includes/vite.php
 *        reads to output the correct hashed filenames in production.
 */
export default defineConfig({
  root: '.',
  base: '/public/build/',
  // public/ holds static assets (images, icons) served directly by PHP —
  // Vite doesn't need to process or copy them, and doing so would conflict
  // with outDir living inside the same folder.
  publicDir: false,
  build: {
    outDir: 'public/build',
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/js/main.js'
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5173'
  }
});

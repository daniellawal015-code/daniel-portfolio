<?php
/**
 * Minimal Vite <-> PHP integration.
 *
 * Development: outputs a script tag pointing at the running Vite dev server
 * (npm run dev, default http://localhost:5173) plus the HMR client, so
 * edits to src/js/* and src/css/* hot-reload in the browser.
 *
 * Production: reads public/build/manifest.json (written by `npm run build`)
 * and outputs the correct hashed <script>/<link> tags.
 *
 * Usage in index.php: <?php vite_assets('src/js/main.js'); ?>
 */

function vite_assets(string $entry): void
{
    if (APP_ENV === 'development') {
        $devServer = 'http://localhost:5173';
        echo "<script type=\"module\" src=\"{$devServer}/@vite/client\"></script>\n";
        echo "<script type=\"module\" src=\"{$devServer}/{$entry}\"></script>\n";
        return;
    }

    // Vite 5 writes the manifest to outDir/.vite/manifest.json by default.
    $manifestPath = __DIR__ . '/../public/build/.vite/manifest.json';

    if (!file_exists($manifestPath)) {
        echo "<!-- Vite manifest not found. Run `npm run build` first. -->\n";
        return;
    }

    $manifest = json_decode(file_get_contents($manifestPath), true);

    if (!isset($manifest[$entry])) {
        echo "<!-- Entry '{$entry}' not found in Vite manifest. -->\n";
        return;
    }

    $entryData = $manifest[$entry];

    if (!empty($entryData['css'])) {
        foreach ($entryData['css'] as $cssFile) {
            echo "<link rel=\"stylesheet\" href=\"/public/build/{$cssFile}\">\n";
        }
    }

    echo "<script type=\"module\" src=\"/public/build/{$entryData['file']}\"></script>\n";
}

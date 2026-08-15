<?php
/**
 * Minimal Vite <-> PHP integration.
 *
 * Whenever a completed build exists (public/build/.vite/manifest.json),
 * it is used — regardless of APP_ENV — since that's what makes the app
 * work under plain PHP hosting like XAMPP without a Node process running.
 * APP_ENV === 'development' only takes effect when no build exists yet,
 * pointing at the Vite dev server (npm run dev) for HMR during active work.
 *
 * If neither a build nor a dev server applies, a visible on-page message
 * is rendered instead of silently failing — a blank/stuck page with no
 * explanation is exactly the failure mode this replaces.
 *
 * Usage in index.php: <?php vite_assets('src/js/main.js'); ?>
 */

function vite_assets(string $entry): void
{
    $manifestPath = __DIR__ . '/../public/build/.vite/manifest.json';
    $manifestExists = file_exists($manifestPath);

    if (APP_ENV === 'development' && !$manifestExists) {
        $devServer = 'http://localhost:5173';
        echo "<script type=\"module\" src=\"{$devServer}/@vite/client\"></script>\n";
        echo "<script type=\"module\" src=\"{$devServer}/{$entry}\"></script>\n";
        return;
    }

    if (!$manifestExists) {
        render_build_missing_notice();
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
            echo "<link rel=\"stylesheet\" href=\"" . BASE_PATH . "/public/build/{$cssFile}\">\n";
        }
    }

    echo "<script type=\"module\" src=\"" . BASE_PATH . "/public/build/{$entryData['file']}\"></script>\n";
}

function render_build_missing_notice(): void
{
    echo "<style>body{background:#0A0A0C;color:#EDEBE4;font-family:monospace;padding:3rem;}"
        . "code,pre{background:#16161A;border-radius:6px;}"
        . "pre{padding:1rem;}code{padding:2px 6px;}</style>\n";
    echo "<div style=\"max-width:640px;margin:0 auto;line-height:1.6;\">"
        . "<h1 style=\"color:#FF5E2E;\">Build not found</h1>"
        . "<p>No compiled assets at <code>public/build/</code>. From the project root, run:</p>"
        . "<pre>npm install\nnpm run build</pre>"
        . "<p>Then reload this page.</p>"
        . "</div>\n";
}

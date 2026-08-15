<?php
/**
 * Single environment toggle. Default is 'production' so the site works
 * out of the box under plain PHP hosting (XAMPP, shared hosting, etc.)
 * once `npm run build` has produced public/build/ — that's the common
 * case for opening this via http://localhost/daniel-portfolio/. Set to
 * 'development' only while actively running `npm run dev` for hot-reload;
 * includes/vite.php still prefers a completed build over this flag
 * whenever public/build/ actually exists, so leaving this on
 * 'development' after building won't break anything.
 */
define('APP_ENV', 'production');

/**
 * Base path the app is served from, computed from the current request
 * rather than hardcoded. This is what makes asset and link paths correct
 * whether the app lives at the domain root or in a subdirectory like
 * /daniel-portfolio/ under XAMPP — a hardcoded "/public/..." path only
 * works at the domain root and silently 404s in a subdirectory.
 */
function app_base_path(): string
{
    $scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));
    return rtrim($scriptDir, '/');
}
define('BASE_PATH', app_base_path());

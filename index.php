<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/vite.php';
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth motion-reduce:scroll-auto">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daniel Lawal — Full-Stack Developer</title>
    <meta name="description" content="[SITE DESCRIPTION]">

    <link rel="icon" type="image/svg+xml" href="/public/icons/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/public/icons/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/public/icons/favicon-16.png">
    <link rel="icon" href="/public/icons/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/public/icons/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <?php vite_assets('src/js/main.js'); ?>
</head>
<body class="bg-void font-body text-paper antialiased">

    <?php include __DIR__ . '/components/loader.php'; ?>
    <?php include __DIR__ . '/components/navigation.php'; ?>

    <div data-rail aria-hidden="true"
         class="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-16 flex-col items-center justify-between py-10 lg:flex">
        <span class="font-mono text-[10px] tracking-widest text-muted">DL</span>
        <span data-rail-section class="font-mono text-[10px] text-signal">01</span>
        <span data-rail-scroll class="font-mono text-[10px] text-muted">0%</span>
    </div>

    <main id="main-content">
        <?php include __DIR__ . '/components/hero.php'; ?>
        <?php include __DIR__ . '/components/about.php'; ?>
        <?php include __DIR__ . '/components/skills.php'; ?>
        <?php include __DIR__ . '/components/projects.php'; ?>
        <?php include __DIR__ . '/components/experience.php'; ?>
        <?php include __DIR__ . '/components/contact.php'; ?>
    </main>

    <?php include __DIR__ . '/components/footer.php'; ?>

</body>
</html>

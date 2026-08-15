<a href="#main-content" data-cursor="hover"
   class="fixed left-6 top-6 z-[200] -translate-y-16 rounded-full bg-signal px-5 py-2 font-mono text-xs uppercase tracking-widest text-void opacity-0 transition-transform duration-200 focus:translate-y-0 focus:opacity-100">
    Skip to content
</a>

<nav data-nav data-nav-hidden aria-label="Primary"
     class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 opacity-0 -translate-y-3 lg:px-10">

    <a href="<?php echo BASE_PATH; ?>/" aria-label="Daniel Lawal — home" data-cursor="link" class="text-paper">
        <svg viewBox="0 0 100 100" role="img" aria-hidden="true" class="h-8 w-8">
            <path d="M32,24 L32,68 L64,68" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/>
            <path d="M32,24 Q58,14 78,45" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
            <circle cx="78" cy="45" r="9" fill="#FF5E2E"/>
        </svg>
    </a>

    <ul class="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted md:flex">
        <li><a href="#about" data-cursor="hover" class="nav-link transition-colors duration-300 hover:text-paper">About</a></li>
        <li><a href="#skills" data-cursor="hover" class="nav-link transition-colors duration-300 hover:text-paper">Skills</a></li>
        <li><a href="#projects" data-cursor="hover" class="nav-link transition-colors duration-300 hover:text-paper">Projects</a></li>
        <li><a href="#experience" data-cursor="hover" class="nav-link transition-colors duration-300 hover:text-paper">Experience</a></li>
        <li><a href="#contact" data-cursor="hover" class="nav-link transition-colors duration-300 hover:text-paper">Contact</a></li>
    </ul>

    <div class="flex items-center gap-4">
        <a href="<?php echo BASE_PATH; ?>/resume/Daniel-Lawal-Resume.pdf" download data-magnetic data-cursor="hover"
           class="hidden rounded-full border border-paper/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:border-paper md:inline-flex">
            Résumé
        </a>

        <button type="button" data-mobile-menu-toggle aria-expanded="false" aria-controls="mobile-menu" data-cursor="hover"
                aria-label="Open menu" class="inline-flex flex-col gap-1.5 md:hidden">
            <span class="block h-px w-6 bg-paper"></span>
            <span class="block h-px w-6 bg-paper"></span>
        </button>
    </div>
</nav>

<div data-mobile-menu id="mobile-menu" hidden class="fixed inset-0 z-[60] flex flex-col bg-void px-6 py-6 opacity-0 md:hidden">
    <div class="flex items-center justify-between">
        <span class="font-mono text-xs uppercase tracking-widest text-muted">Menu</span>
        <button type="button" data-mobile-menu-close aria-label="Close menu" class="relative h-6 w-6 text-paper">
            <span class="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 rotate-45 bg-paper"></span>
            <span class="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 -rotate-45 bg-paper"></span>
        </button>
    </div>

    <ul class="mt-16 flex flex-1 flex-col gap-8 font-display text-4xl text-paper">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>

    <a href="<?php echo BASE_PATH; ?>/resume/Daniel-Lawal-Resume.pdf" download
       class="font-mono text-xs uppercase tracking-widest text-paper/70 underline underline-offset-4">
        Download résumé
    </a>
</div>

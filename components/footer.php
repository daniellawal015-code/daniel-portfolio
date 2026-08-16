<footer class="border-t border-depth-2 px-6 py-12 sm:px-10 lg:pl-32 lg:pr-16">
    <div class="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

        <a href="<?php echo BASE_PATH; ?>/" aria-label="Daniel Lawal — home" data-cursor="link"
           class="flex items-center gap-2 text-paper">
            <svg viewBox="0 0 100 100" role="img" aria-hidden="true" class="h-7 w-7">
                <path d="M32,24 L32,68 L64,68" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/>
                <path d="M32,24 Q58,14 78,45" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                <circle cx="78" cy="45" r="9" fill="#FF5E2E"/>
            </svg>
            <span class="font-display text-lg">LD.</span>
        </a>

        <ul class="flex gap-8 font-mono text-xs uppercase tracking-widest text-muted">
            <li><a href="#about" data-cursor="hover" class="transition-colors hover:text-paper">About</a></li>
            <li><a href="#projects" data-cursor="hover" class="transition-colors hover:text-paper">Projects</a></li>
            <li><a href="#contact" data-cursor="hover" class="transition-colors hover:text-paper">Contact</a></li>
        </ul>

        <p class="font-mono text-[11px] uppercase tracking-widest text-muted">
            &copy; <?php echo date('Y'); ?> Lawal Daniel. Designed &amp; built by me.
        </p>
    </div>
</footer>

<footer class="border-t border-depth-2 px-6 py-16 sm:px-10 lg:pl-32 lg:pr-16">
    <div class="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <a href="<?php echo BASE_PATH; ?>/" aria-label="Daniel Lawal — home" data-cursor="link" class="text-paper">
            <svg viewBox="0 0 100 100" role="img" aria-hidden="true" class="h-10 w-10">
                <path d="M32,24 L32,68 L64,68" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/>
                <path d="M32,24 Q58,14 78,45" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                <circle cx="78" cy="45" r="9" fill="#FF5E2E"/>
            </svg>
        </a>

        <a href="<?php echo BASE_PATH; ?>/resume/Daniel-Lawal-Resume.pdf" download data-magnetic data-cursor="hover"
           class="font-mono text-xs uppercase tracking-widest text-paper/70 underline decoration-signal/60 underline-offset-4 hover:text-paper">
            Download résumé
        </a>

        <ul class="flex gap-6 font-mono text-xs uppercase tracking-widest text-muted">
            <li><a href="[GITHUB URL]" data-cursor="hover" class="hover:text-paper">GitHub</a></li>
            <li><a href="[LINKEDIN URL]" data-cursor="hover" class="hover:text-paper">LinkedIn</a></li>
            <li><a href="mailto:daniellawal015@gmail.com" data-cursor="hover" class="hover:text-paper">Email</a></li>
        </ul>
    </div>

    <p class="mt-10 font-mono text-[11px] uppercase tracking-widest text-muted">
        &copy; <?php echo date('Y'); ?> Daniel Lawal
    </p>
</footer>

<section id="contact" aria-label="Contact" class="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
    <p class="font-mono text-eyebrow uppercase tracking-widest text-muted">06 // Contact</p>
    <h2 data-contact-headline class="mt-4 max-w-3xl font-display text-display-1 text-paper">
        Let&rsquo;s build something impossible.
    </h2>

    <div class="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">

        <!-- Left: contact form -->
        <form data-contact-form action="<?php echo BASE_PATH; ?>/api/contact.php" method="POST" novalidate class="space-y-6">
            <div class="hidden" aria-hidden="true">
                <label for="contact-website">Leave this field empty</label>
                <input type="text" id="contact-website" name="website" tabindex="-1" autocomplete="off">
            </div>

            <div>
                <label for="contact-name" class="font-mono text-[11px] uppercase tracking-widest text-muted">Name</label>
                <input type="text" id="contact-name" name="name" required autocomplete="name"
                       class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal">
                <p data-field-error class="mt-1 font-mono text-[11px] text-signal" role="alert"></p>
            </div>

            <div>
                <label for="contact-email" class="font-mono text-[11px] uppercase tracking-widest text-muted">Email address</label>
                <input type="email" id="contact-email" name="email" required autocomplete="email"
                       class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal">
                <p data-field-error class="mt-1 font-mono text-[11px] text-signal" role="alert"></p>
            </div>

            <div>
                <label for="contact-phone" class="font-mono text-[11px] uppercase tracking-widest text-muted">Phone number <span class="normal-case text-muted/60">(optional)</span></label>
                <input type="tel" id="contact-phone" name="phone" autocomplete="tel"
                       class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal">
            </div>

            <div>
                <label for="contact-message" class="font-mono text-[11px] uppercase tracking-widest text-muted">Tell me about your project</label>
                <textarea id="contact-message" name="message" rows="5" required
                          class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"></textarea>
                <p data-field-error class="mt-1 font-mono text-[11px] text-signal" role="alert"></p>
            </div>

            <button type="submit" data-cursor="hover"
                    class="w-full rounded-full bg-signal px-6 py-4 font-mono text-xs uppercase tracking-widest text-void transition-opacity duration-300 disabled:opacity-50 sm:w-auto">
                Send message
            </button>

            <p data-form-status role="status" aria-live="polite" class="font-mono text-xs uppercase tracking-widest text-muted"></p>
        </form>

        <!-- Right: contact info + social + closing statement -->
        <div class="flex flex-col gap-6">
            <div class="rounded-2xl border border-depth-2 bg-depth-1 p-6">
                <p class="font-mono text-[11px] uppercase tracking-widest text-signal">Email me</p>
                <a href="mailto:daniellawal015@gmail.com" data-cursor="hover"
                   class="mt-2 block font-display text-xl text-paper transition-colors hover:text-signal">
                    daniellawal015@gmail.com
                </a>
            </div>

            <div class="rounded-2xl border border-depth-2 bg-depth-1 p-6">
                <p class="font-mono text-[11px] uppercase tracking-widest text-signal">Location</p>
                <p class="mt-2 font-display text-xl text-paper">Lagos, Nigeria</p>
            </div>

            <div class="rounded-2xl border border-depth-2 bg-depth-1 p-6">
                <p class="font-mono text-[11px] uppercase tracking-widest text-muted">DIGITAL FOOTPRINT</p>
                <div class="mt-4 flex gap-3">
                    <a href="https://github.com/daniellawal015-code" data-cursor="hover" aria-label="GitHub"
                       class="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/daniel-lawal-135b54418" data-cursor="hover" aria-label="LinkedIn"
                       class="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"/></svg>
                    </a>
                    <a href="https://x.com/DanielLawa35431" data-cursor="hover" aria-label="X (Twitter)"
           class="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
                </div>
            </div>

            <div class="mt-2 rounded-2xl border border-signal/40 bg-depth-1 p-6">
                <p class="font-display text-2xl text-paper">Let&rsquo;s turn ideas into digital reality.</p>
            </div>
        </div>
    </div>
</section>

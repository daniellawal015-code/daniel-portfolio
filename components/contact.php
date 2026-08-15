<section id="contact" aria-label="Contact" class="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
    <p class="font-mono text-eyebrow uppercase tracking-widest text-muted">06 // Contact</p>
    <h2 data-contact-headline class="mt-4 max-w-3xl font-display text-display-1 text-paper">
        Let&rsquo;s build something impossible.
    </h2>

    <form data-contact-form action="<?php echo BASE_PATH; ?>/api/contact.php" method="POST" novalidate class="mt-12 max-w-lg space-y-6">
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
            <label for="contact-email" class="font-mono text-[11px] uppercase tracking-widest text-muted">Email</label>
            <input type="email" id="contact-email" name="email" required autocomplete="email"
                   class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal">
            <p data-field-error class="mt-1 font-mono text-[11px] text-signal" role="alert"></p>
        </div>

        <div>
            <label for="contact-message" class="font-mono text-[11px] uppercase tracking-widest text-muted">Message</label>
            <textarea id="contact-message" name="message" rows="5" required
                      class="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"></textarea>
            <p data-field-error class="mt-1 font-mono text-[11px] text-signal" role="alert"></p>
        </div>

        <button type="submit" data-cursor="hover"
                class="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-opacity duration-300 disabled:opacity-50">
            Send
        </button>

        <p data-form-status role="status" aria-live="polite" class="font-mono text-xs uppercase tracking-widest text-muted"></p>
    </form>
</section>

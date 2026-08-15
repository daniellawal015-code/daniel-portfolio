<section id="hero" aria-label="Introduction"
         class="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-10 lg:pl-32 lg:pr-16">

    <canvas data-hero-canvas class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>

    <div class="relative z-10 max-w-5xl">
        <p data-hero-eyebrow class="mb-6 font-mono text-eyebrow uppercase tracking-[0.2em] text-muted">
            COMPUTER SCIENCE STUDENT // FULL-STACK DEVELOPER // EARTH
        </p>

        <h1 data-hero-name class="mb-8 font-display text-hero text-paper">
            ĐAMi™ | DEV
        </h1>

        <div class="mb-10 max-w-2xl overflow-hidden">
            <p data-hero-statement class="font-body text-lg text-paper/80 sm:text-xl leading-relaxed">
                I BUILD DIGITAL EXPERIENCES THAT TURN IDEAS INTO REAL PRODUCTS.
            </p>
        </div>

        <div data-hero-ctas class="flex flex-wrap items-center gap-4">
            <a href="#projects" data-magnetic data-cursor="hover"
               class="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-transform duration-300">
                VIEW MY WORK
            </a>
            <a href="#contact" data-magnetic data-cursor="hover"
               class="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:border-paper">
                LET'S CONNECT
            </a>
            <a href="<?php echo BASE_PATH; ?>/resume/Daniel-Lawal-Resume.pdf" download data-magnetic data-cursor="hover"
               class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70 underline decoration-signal/60 underline-offset-4 transition-colors duration-300 hover:text-paper">
                Download résumé
            </a>
        </div>
    </div>
</section>

<section id="hero" aria-label="Introduction"
         class="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">

    <canvas data-hero-canvas class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>

    <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">

        <!-- Left: original hero content, unchanged -->
        <div class="max-w-2xl">
            <p data-hero-eyebrow class="mb-6 font-mono text-eyebrow uppercase tracking-[0.2em] text-muted">
            COMPUTER SCIENCE STUDENT // FULL-STACK DEVELOPER // EARTH
            </p>

            <h1 data-hero-name class="mb-8 font-display text-hero text-paper">
                ĐAMi™ | Dev
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

        <!-- Right: developer-card composition (photo placeholder + daniel.js code card) -->
        <div class="relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm">

            <div data-hero-photo
                 class="relative z-10 mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 sm:w-64 lg:ml-auto lg:mr-4">
                <div class="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4"
                         class="text-muted" aria-hidden="true">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/>
                    </svg>
                    <span class="font-mono text-[10px] uppercase tracking-widest text-muted">[Photo — add later]</span>
                </div>
            </div>

            <div data-hero-code-card
                 class="relative z-20 -mt-10 w-64 rounded-xl border border-depth-2 bg-depth-1 p-5 shadow-2xl sm:w-72 lg:ml-0 lg:mr-auto">
                <div class="mb-3 flex items-center gap-2 border-b border-depth-2 pb-3">
                    <span class="h-2.5 w-2.5 rounded-full bg-signal/70" aria-hidden="true"></span>
                    <span class="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true"></span>
                    <span class="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true"></span>
                    <span class="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted">daniel.js</span>
                </div>
                <pre class="overflow-x-auto font-mono text-[11px] leading-relaxed text-paper/80"><code><span class="text-signal">const</span> developer = {
  name: <span class="text-paper">"Lawal Daniel"</span>,
  role: <span class="text-paper">"Full-Stack Dev"</span>,
  stack: [
    <span class="text-paper">"HTML"</span>, <span class="text-paper">"CSS"</span>,
    <span class="text-paper">"JavaScript"</span>, <span class="text-paper">"Python"</span>,
    <span class="text-paper">"Node.js"</span>
  ],
  status: <span class="text-signal">"open to work"</span>,
  build: () => <span class="text-paper">"great products"</span>
};</code></pre>
            </div>
        </div>
    </div>
</section>

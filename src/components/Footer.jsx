import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-depth-2 px-6 py-12 sm:px-10 lg:pl-32 lg:pr-16">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <a href="#" aria-label="Daniel Lawal — home" className="flex items-center gap-2 text-paper">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg">LD.</span>
        </a>

        <ul className="flex gap-8 font-mono text-xs uppercase tracking-widest text-muted">
          <li>
            <a href="#about" className="transition-colors hover:text-paper">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="transition-colors hover:text-paper">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="transition-colors hover:text-paper">
              Contact
            </a>
          </li>
        </ul>

        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          &copy; {new Date().getFullYear()} Lawal Daniel. Designed &amp; built by me.
        </p>
      </div>
    </footer>
  );
}

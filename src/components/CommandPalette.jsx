import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { projects } from '../data/projects.js';
import { useSiteState } from '../hooks/useSiteState.jsx';
import { useBuildLog } from '../hooks/useBuildLog.js';

const SECTION_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

/**
 * CommandPalette — Cmd/Ctrl+K (or the search icon in the nav on mobile,
 * where there's no keyboard) opens a searchable list of everything the
 * site can do: jump to a section, open a specific project, copy the
 * email, open GitHub/LinkedIn, download the résumé, toggle System Mode,
 * or pull up the live build log.
 *
 * This is the one piece of "extra" functionality on the site that's
 * actually functional rather than decorative — it does something,
 * rather than just looking like something. Sections and other
 * components hear about a few of these actions (open a project, focus
 * the contact form) via plain `window` CustomEvents rather than prop
 * drilling, since this palette can be triggered from anywhere and
 * doesn't otherwise need to know about those components' internals.
 */
export default function CommandPalette() {
  const { toggleSystemMode, reducedMotion } = useSiteState();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState('list'); // 'list' | 'changelog'
  const [copyStatus, setCopyStatus] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);

  const buildLog = useBuildLog(view === 'changelog');

  const commands = useMemo(() => {
    const nav = SECTION_LINKS.map((s) => ({
      id: `nav-${s.id}`,
      category: 'Navigate',
      label: s.label,
      run: () => scrollToId(s.id)
    }));

    const projectCommands = projects.map((p) => ({
      id: `project-${p.id}`,
      category: 'Projects',
      label: p.title,
      hint: p.category,
      run: () => window.dispatchEvent(new CustomEvent('cmdk:open-project', { detail: { id: p.id } }))
    }));

    const actions = [
      {
        id: 'action-email',
        category: 'Actions',
        label: 'Email me',
        run: () => window.dispatchEvent(new CustomEvent('cmdk:focus-contact'))
      },
      {
        id: 'action-copy-email',
        category: 'Actions',
        label: 'Copy email address',
        run: async () => {
          await navigator.clipboard.writeText('daniellawal015@gmail.com');
          setCopyStatus('Email copied.');
          window.setTimeout(() => setCopyStatus(''), 2000);
        },
        keepOpen: true
      },
      {
        id: 'action-resume',
        category: 'Actions',
        label: 'Download résumé',
        run: () => {
          const a = document.createElement('a');
          a.href = '/resume/Daniel_Lawal_Resume.pdf';
          a.download = '';
          a.click();
        }
      },
      {
        id: 'action-github',
        category: 'Actions',
        label: 'Open GitHub',
        run: () => window.open('https://github.com/daniellawal015-code', '_blank', 'noopener')
      },
      {
        id: 'action-linkedin',
        category: 'Actions',
        label: 'Open LinkedIn',
        run: () => window.open('https://www.linkedin.com/in/daniel-lawal-135b54418', '_blank', 'noopener')
      }
    ];

    const view_ = [
      {
        id: 'view-system-mode',
        category: 'View',
        label: 'Toggle System Mode',
        run: () => toggleSystemMode()
      },
      {
        id: 'view-changelog',
        category: 'Info',
        label: 'View build log',
        hint: 'Live from GitHub',
        run: () => setView('changelog'),
        keepOpen: true
      }
    ];

    return [...nav, ...projectCommands, ...actions, ...view_];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [commands, query]);

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function close() {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    setView('list');
    previouslyFocusedRef.current?.focus();
  }

  function openPalette() {
    previouslyFocusedRef.current = document.activeElement;
    setOpen(true);
  }

  function runCommand(cmd) {
    cmd.run();
    if (!cmd.keepOpen) close();
  }

  // Global open shortcut + external open event (for the mobile trigger
  // button, which has no keyboard shortcut to hook into).
  useEffect(() => {
    function onKeydown(e) {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) return prev;
          previouslyFocusedRef.current = document.activeElement;
          return true;
        });
      }
    }
    function onOpenEvent() {
      openPalette();
    }
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('cmdk:open', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('cmdk:open', onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power1.out' });
      gsap.from(panelRef.current, { opacity: 0, y: -12, scale: 0.98, duration: 0.25, ease: 'power3.out' });
    });

    return () => ctx.revert();
  }, [open, reducedMotion]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, view]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape needs to work from the changelog view too, which has no
  // input element to attach a keydown handler to (unlike arrow/enter
  // navigation, which only ever applies to the list view's input) — so
  // it's handled at the document level instead, independent of view.
  useEffect(() => {
    if (!open) return undefined;
    function onKeydown(e) {
      if (e.key !== 'Escape') return;
      if (view === 'changelog') {
        setView('list');
      } else {
        close();
      }
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open, view]);

  function onInputKeydown(e) {
    if (e.key === 'Escape') return; // handled at document level above
    if (view !== 'list') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runCommand(cmd);
    }
  }

  if (!open) return null;

  let lastCategory = null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-24 sm:pt-32">
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="fixed inset-0 bg-void/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 shadow-2xl"
      >
        {view === 'list' ? (
          <>
            <div className="flex items-center gap-3 border-b border-depth-2 px-4 py-3">
              <Terminal className="h-4 w-4 text-signal" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-listbox"
                aria-activedescendant={filtered[activeIndex]?.id}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeydown}
                placeholder="Type a command or search…"
                className="w-full bg-transparent font-mono text-sm text-paper outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-depth-2 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
                esc
              </kbd>
            </div>

            <ul id="cmdk-listbox" role="listbox" ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs uppercase tracking-widest text-muted">
                  No matches.
                </li>
              )}
              {filtered.map((cmd, i) => {
                const showHeader = cmd.category !== lastCategory;
                lastCategory = cmd.category;
                return (
                  <li key={cmd.id}>
                    {showHeader && (
                      <p className="mt-2 px-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted first:mt-0">
                        {cmd.category}
                      </p>
                    )}
                    <button
                      id={cmd.id}
                      role="option"
                      aria-selected={i === activeIndex}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => runCommand(cmd)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors ${
                        i === activeIndex ? 'bg-signal text-void' : 'text-paper hover:bg-depth-2'
                      }`}
                    >
                      <span>{cmd.label}</span>
                      {cmd.hint && (
                        <span className={`text-[10px] uppercase tracking-widest ${i === activeIndex ? 'text-void/70' : 'text-muted'}`}>
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-depth-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>{copyStatus || '↑↓ navigate · ↵ select'}</span>
              <span className="flex items-center gap-3">
                <a href="mailto:daniellawal015@gmail.com" className="flex items-center gap-1 hover:text-paper">
                  <Mail className="h-3 w-3" aria-hidden="true" />
                </a>
                <a href="https://github.com/daniellawal015-code" className="flex items-center gap-1 hover:text-paper">
                  <Github className="h-3 w-3" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/daniel-lawal-135b54418" className="flex items-center gap-1 hover:text-paper">
                  <Linkedin className="h-3 w-3" aria-hidden="true" />
                </a>
              </span>
            </div>
          </>
        ) : (
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Build log · live from GitHub</p>
              <button
                type="button"
                onClick={() => setView('list')}
                className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-paper"
              >
                ← back
              </button>
            </div>

            {buildLog.status === 'loading' && (
              <p className="py-8 text-center font-mono text-xs text-muted">Fetching commits…</p>
            )}
            {buildLog.status === 'error' && (
              <p className="py-8 text-center font-mono text-xs text-muted">{buildLog.error}</p>
            )}
            {buildLog.status === 'ready' && (
              <ul className="max-h-72 space-y-1 overflow-y-auto font-mono text-xs">
                {buildLog.commits.map((c) => (
                  <li key={c.sha} className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-depth-2">
                    <span className="text-signal">{c.sha}</span>
                    <span className="flex-1 text-paper/80">{c.message}</span>
                    <span className="shrink-0 text-muted">{c.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

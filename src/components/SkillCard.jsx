import {
  siCss3,
  siTailwindcss,
  siJavascript,
  siReact,
  siTypescript,
  siPython,
  siDjango,
  siNodedotjs,
  siPhp,
  siGithub,
  siVercel,
  siVite
} from 'simple-icons';
import { useSiteState } from '../hooks/useSiteState.jsx';

/**
 * Icons imported individually by name (not `import * as`) so Rollup can
 * tree-shake the unused ~3000 other icons out of the bundle — a wildcard
 * import previously inflated the production bundle from ~140KB to 5MB+.
 */
const ICONS = {
  siCss3,
  siTailwindcss,
  siJavascript,
  siReact,
  siTypescript,
  siPython,
  siDjango,
  siNodedotjs,
  siPhp,
  siGithub,
  siVercel,
  siVite
};

export default function SkillCard({ skill, isRevealed, onTap }) {
  const { isTouch } = useSiteState();
  const icon = ICONS[skill.iconSlug];

  const content = (
    <>
      <span
        className="flex h-10 w-10 items-center justify-center text-paper transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
        aria-hidden="true"
      >
        {icon ? (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d={icon.path} />
          </svg>
        ) : null}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-paper transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        {skill.label}
      </span>
      <span className="skill-card-category pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-signal px-3 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-void transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        {skill.category}
      </span>
    </>
  );

  return (
    <button
      type="button"
      data-skill-card
      data-cursor="hover"
      aria-label={`${skill.label} — ${skill.category}`}
      onClick={isTouch ? onTap : undefined}
      className={`skill-card group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-depth-2 bg-depth-1 p-4 text-center transition-colors duration-300 hover:border-signal focus-visible:border-signal ${
        isRevealed ? 'is-revealed' : ''
      }`}
    >
      {content}
    </button>
  );
}

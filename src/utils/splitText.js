/**
 * splitText — lightweight, dependency-free text splitter (no paid GSAP
 * SplitText plugin). Wraps each character in a span for stagger
 * animation, while keeping the element screen-reader-friendly via
 * aria-label on the parent + aria-hidden on the generated fragments.
 */
export function splitText(element, { type = 'chars' } = {}) {
  if (!element) return [];

  const fullText = element.textContent.trim();
  element.setAttribute('aria-label', fullText);
  element.innerHTML = '';

  const units = type === 'words' ? fullText.split(/(\s+)/) : fullText.split('');
  const fragments = [];

  units.forEach((unit) => {
    if (unit === '') return;
    const span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    span.textContent = unit === ' ' ? '\u00A0' : unit;
    element.appendChild(span);
    if (unit.trim() !== '') fragments.push(span);
  });

  return fragments;
}

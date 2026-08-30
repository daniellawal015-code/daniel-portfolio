/**
 * Logo — the custom angular-L + departing-arc + waypoint-dot monogram.
 * `mark` variant exposes the individual strokes as refs for the loader's
 * stroke-drawing animation; the plain variant is a static icon.
 */
export default function Logo({ className = 'h-8 w-8', markRefs }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-hidden="true" className={className}>
      <path
        ref={markRefs?.corner}
        d="M32,24 L32,68 L64,68"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        ref={markRefs?.arc}
        d="M32,24 Q58,14 78,45"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle ref={markRefs?.node} cx="78" cy="45" r="9" fill="#FF5E2E" />
    </svg>
  );
}

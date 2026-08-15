/** Design tokens for the "Terminal Becomes the Interface" system. */
export default {
  content: [
    './index.php',
    './components/**/*.php',
    './src/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0C',
        paper: '#EDEBE4',
        signal: '#FF5E2E',
        'depth-1': '#16161A',
        'depth-2': '#232328',
        muted: '#8A8A92'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        hero: ['clamp(3.25rem, 8.5vw, 8rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-1': ['clamp(2.25rem, 5.5vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
        eyebrow: ['0.75rem', { letterSpacing: '0.18em' }]
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))'
      },
      transitionTimingFunction: {
        signal: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};

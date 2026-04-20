import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-subtle': 'var(--fg-subtle)',
        'accent-amber': 'var(--accent-amber)',
        'accent-amber-dk': 'var(--accent-amber-dk)',
        'accent-terra': 'var(--accent-terra)',
        'accent-olive': 'var(--accent-olive)',
        'accent-cobalt': 'var(--accent-cobalt)',
      },
      fontFamily: {
        serif: ['var(--font-prata)', 'serif'],
        italic: ['var(--font-eb-garamond)', 'serif'],
        sans: ['var(--font-switzer)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fragment-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['102px', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-l':  ['77px',  { lineHeight: '1',    letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-m':  ['58px',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'heading-l':  ['38px',  { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '400' }],
        'heading-m':  ['28px',  { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-l':     ['19px',  { lineHeight: '1.5',  fontWeight: '400' }],
        body:         ['16px',  { lineHeight: '1.6',  fontWeight: '400' }],
        caption:      ['12px',  { lineHeight: '1.4',  letterSpacing: '0.12em', fontWeight: '400' }],
      },
      maxWidth: {
        container: '1440px',
      },
      spacing: {
        section: '180px',
        'section-mobile': '80px',
      },
    },
  },
  plugins: [],
};

export default config;

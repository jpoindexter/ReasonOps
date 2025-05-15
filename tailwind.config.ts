import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './frontend/app/**/*.{ts,tsx}',
    './frontend/shared/**/*.{ts,tsx}',
    './frontend/components/**/*.{ts,tsx}',
    './frontend/tests/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        foreground: 'rgb(var(--color-fg) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;

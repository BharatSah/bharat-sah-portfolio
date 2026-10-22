/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Monochrome surfaces and text: black, white, and neutral grays only.
        ink: {
          DEFAULT: '#0a0a0b', // near-black background
          soft: '#0f0f11', // raised background
          card: '#151517', // charcoal cards
          line: '#26262a', // thin borders
        },
        chalk: {
          DEFAULT: '#ededed', // off-white text
          muted: '#a3a3a8', // muted gray descriptions
          faint: '#6b6b72', // very muted labels
        },
        // White accent against the near-black interface.
        paper: {
          DEFAULT: '#ffffff',
          soft: '#e5e5e5',
          dim: '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      keyframes: {
        'accent-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        'grid-scroll': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 44px' },
        },
        'orb-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accent-grow': 'accent-grow 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'scroll-bounce': 'scroll-bounce 1.8s ease-in-out infinite',
        'grid-scroll': 'grid-scroll 3.5s linear infinite',
        'orb-float': 'orb-float 7s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}

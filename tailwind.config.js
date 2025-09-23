/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'particle-sparkle': 'particle-sparkle 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'glow-hover': 'glow-hover 0.3s ease-out forwards',
      },
      keyframes: {
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '0.6' },
        },
        'particle-sparkle': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' },
        },
        'glow-hover': {
          'to': { boxShadow: '0 0 25px rgba(255, 255, 255, 0.9)' },
        },
      },
    },
  },
  plugins: [],
};
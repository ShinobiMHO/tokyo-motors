import type { Config } from 'tailwindcss'

// Configuration Tailwind CSS pour Tokyo Motors
// Palette dark luxury : noir profond + or chaud
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales du site
        black: {
          DEFAULT: '#0a0a0a',
          light: '#111111',
          card: '#141414',
          border: '#1a1a1a',
        },
        gold: {
          DEFAULT: '#c9a96e',
          light: '#d4b97e',
          dark: '#b8924a',
          muted: 'rgba(201, 169, 110, 0.15)',
        },
        gray: {
          primary: '#a0a0a0',
          secondary: '#666666',
          light: '#e0e0e0',
        },
      },
      fontFamily: {
        // Inter pour le texte courant, Playfair Display pour les titres
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #c9a96e 0%, #b8924a 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

export default config

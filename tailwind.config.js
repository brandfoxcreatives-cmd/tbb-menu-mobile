/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8EECB',
        paper: '#FFFFFF',
        ink: '#3A3A3B',
        line: '#E8DCB8',
        forest: {
          DEFAULT: '#31603D',
          light: '#447A52',
          dark: '#1F3F28',
          surface: '#5C8567',
        },
        terracotta: {
          DEFAULT: '#E4281F',
          light: '#F9D9D5',
          dark: '#B31E17',
        },
        gold: {
          DEFAULT: '#F5C065',
          light: '#FBE8C5',
          dark: '#D89F3D',
        },
        ready: {
          DEFAULT: '#3F7D52',
          light: '#D7EAD9',
        },
        clay: {
          DEFAULT: '#6E433D',
          light: '#E6D8D4',
          dark: '#4F302B',
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 10px rgba(43, 33, 23, 0.06)',
        card: '0 4px 16px rgba(43, 33, 23, 0.08)',
      },
    },
  },
  plugins: [],
}

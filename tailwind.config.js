/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          orange: '#f59e0b',
          darkOrange: '#ea580c',
          cream: '#fffbf5',
          creamCard: '#fff8ee',
          chocolate: '#451a03',
          charcoal: '#18181b'
        }
      },
      fontFamily: {
        heading: ['Fredoka', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}

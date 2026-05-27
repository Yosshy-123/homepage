/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        gradientMove: 'gradientMove 12s ease infinite',
      },
    },
  },
  plugins: [],
}

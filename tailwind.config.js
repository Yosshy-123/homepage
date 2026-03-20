/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        gradientMove: 'gradientMove 12s ease infinite',
      },
    },
  },
  plugins: [],
}

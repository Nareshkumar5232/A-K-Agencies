/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode via class
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e8f5e9', // very light green
          DEFAULT: '#2e7d32', // green
          dark: '#1b5e20', // dark green
          gray: '#f5f5f5', // subtle gray
          darkbg: '#121212', // dark mode background
          carddark: '#1e1e1e', // dark mode card
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}

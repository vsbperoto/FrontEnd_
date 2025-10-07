/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boho': {
          'cream': '#FAF8F5',
          'off-white': '#F5E6D3',
          'sage': '#8B6F47',
          'terracotta': '#C65D00',
          'coral': '#E97451',
          'lavender': '#8B4789',
          'purple': '#C154C1',
          'green': '#87A96B',
          'text-primary': '#6B5B45',
          'text-secondary': '#8B7355'
        }
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
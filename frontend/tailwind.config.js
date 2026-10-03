/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E53935',
          hover: '#c62828',
          light: 'rgba(229, 57, 53, 0.1)',
        },
        secondary: {
          DEFAULT: '#1565C0',
          hover: '#0d47a1',
          light: 'rgba(21, 101, 192, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': {
          50: '#f0f4f0',
          100: '#d9e4d9',
          200: '#b8ceb8',
          300: '#8fb08f',
          400: '#6a8f6a',
          500: '#4d6f4d',
          600: '#3d5a3d',
          700: '#344a34',
          800: '#2d3e2d',
          900: '#273527',
        },
        'warm-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
}

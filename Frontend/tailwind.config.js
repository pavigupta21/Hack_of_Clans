/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-45': 'linear-gradient(45deg, #0FFFFF, #000000)',
        'from-gradient-45': 'linear-gradient(45deg, #000000,  #0FFFFF)',

      },
    },
  },
  plugins: [],
}
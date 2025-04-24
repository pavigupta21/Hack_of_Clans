/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        stencil: ['"Stardos Stencil"', 'sans-serif'],
        'black-ops': ['"Black Ops One"', 'cursive'],
        'doto': ['"DotGothic16"', 'sans-serif'],
        'dancing': ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}


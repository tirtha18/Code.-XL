/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {fontFamily: {
      'sans': ['Roboto', 'sans-serif'], // Body text
      'heading': ['Poppins', 'sans-serif'], // Headings
    },},
  },
  plugins: [daisyui,],
}


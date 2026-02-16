/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#E63946', // Rojo Bonafide
          600: '#D62828',
          700: '#9D0208',
        }
      }
    },
  },
  plugins: [],
}
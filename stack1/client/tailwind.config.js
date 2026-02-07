/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          verde: '#0d9488',
          'verde-escuro': '#0f766e',
          azul: '#0284c7',
          'azul-escuro': '#0369a1',
        }
      }
    },
  },
  plugins: [],
}

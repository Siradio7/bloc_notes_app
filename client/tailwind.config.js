/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      margin: {
        '1/2': '50%',
      }
    },
  },
  plugins: [],
}
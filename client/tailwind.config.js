/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ['Futura BT', 'sans-serif'], // Add Futura BT to the font family
      },
    },
  },
  plugins: [],
}


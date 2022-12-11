/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'
  ],  
  theme: {
    extend: {
      fontSize: {
        xxs: ['8px', '10px'],
      },
    },
  },
  plugins: [require("daisyui")],
}

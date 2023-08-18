/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        'primary': ['Roboto Condensed', 'sans-serif'],
        'secondary': ['Fjalla One', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive']
      },

      colors: {
        'c-green': '#2AC195',
        'c-blue': '#2C73D2',
        'c-red': '#CA4362',
        'c-blue-light': '#009CE9',
        'c-dark': '#424656',
        'c-gray': '#A6ABBD',
      }
    },


  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '380px',
        'tablet': '920px',
      },
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
        'c-primary': '#2C73D2',
        'c-primary-light': '#009CE9'
      }
    },
  },
  darkMode: "class",

  plugins: [
    require('@tailwindcss/container-queries'),
    nextui(
      {
        prefix: "nextui", // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: "light", // default theme from the themes object
        defaultExtendTheme: "light", // default theme to extend on custom themes
        layout: {}, // common layout tokens (applied to all themes)
        themes: {
          light: {
            layout: {}, // light theme layout tokens
            colors: {
              primary: {
                50: "#e6f1fe",
                100: "#cce3fd",
                200: "#99c7fb",
                300: "#66aaf9",
                400: "#338ef7",
                500: "#006FEE",
                600: "#005bc4",
                700: "#004493",
                800: "#002e62",
                900: "#001731",
              },
            }, // light theme colors
          },
          dark: {
            layout: {}, // dark theme layout tokens
            colors: {
              background: "#222222", // or DEFAULT
              foreground: "#ECEDEE", // or 50 to 900 DEFAULT
              primary: {
                //... 50 to 900
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#e5e5e5",
                300: "#d4d4d4",
                400: "#a3a3a3",
                500: "#737373",
                600: "#525252",
                700: "#404040",
                800: "#262626",
                900: "#171717",
                950: "#0a0a0a",
              }
            }, // dark theme colors
          },
          // ... custom themes
        },
      }
    ),
  ],
}

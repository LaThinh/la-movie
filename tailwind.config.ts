const defaultTheme = require("tailwindcss/defaultTheme");

const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

import { nextui } from "@nextui-org/react";

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				mobile: "380px",
				tablet: "920px",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			fontFamily: {
				primary: ["Roboto Condensed", "sans-serif"],
				secondary: ["Fjalla One", "sans-serif"],
				pacifico: ["Pacifico", "cursive"],
			},

			colors: {
				"c-green": "#2AC195",
				"c-blue": "#2C73D2",
				"c-red": "#CA4362",
				"c-blue-light": "#009CE9",
				"c-dark": "#424656",
				"c-gray": "#A6ABBD",
				"c-primary": "#2C73D2",
				"c-primary-light": "#009CE9",
				"c-secondary": "#bc6c25",
			},

			animation: {
				"text-gradient": "text 2.5s linear infinite",
				text: "text2 3s ease infinite",
			},
			keyframes: {
				text: {
					to: {
						backgroundPosition: "-200% center",
					},
				},

				text2: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
		},
	},
	darkMode: "class",

	plugins: [
		require("@tailwindcss/container-queries"),
		nextui({
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
						},
					}, // dark theme colors
				},
				// ... custom themes
			},
		}), //End nextui

		addVariablesForColors,
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			);
		},
	],
};

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

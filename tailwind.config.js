/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
 content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
			fontFamily: {
    sans: ["var(--roboto)", ...defaultTheme.fontFamily.sans],
    display: ["var(--bebas)", "var(--roboto)", ...defaultTheme.fontFamily.sans],
   },
			screens: {
    "xs": "475px",
				...defaultTheme.screens
			},
			spacing: {
				"136": "34rem"
			},
   colors: {
    discord: "#5865f2",
    twitter: "#1DA1F2",
    google: "#de5246",
    "primary": colors.red[500],
    "secondary": colors.blue[500],
    "lotion": "#fcfcfc",
    "lotion-semi-opaque": "rgb(252 252 252 / 0.75)",
    "lotion-translucent": "rgb(252 252 252 / 0.15)",
    "smoky-black": "#0c0c0c",
    "smoky-black-translucent": "rgb(12 12 12 / 0.05)",
    "smoky-black-semi-opaque": "rgb(12 12 12 / 0.70)",
   },
			backgroundImage: {
    "gradient-primary": `linear-gradient(to right, ${colors.red[500]}, ${colors.red[900]})`,
				"gradient-secondary": `linear-gradient(to right, ${colors.blue[500]}, ${colors.blue[900]})`
			}
  },
 },

 plugins: [require("@headlessui/tailwindcss")],
};

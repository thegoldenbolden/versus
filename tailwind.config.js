/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/layouts/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
   fontFamily: {
    sans: ["var(--roboto)", ...defaultTheme.fontFamily.sans],
    display: ["var(--bebas)"],
   },
   screens: {
    xs: "480px",
    ...defaultTheme.screens,
   },
   spacing: {
    vh: "min(100vh, 100dvh)",
    vw: "min(100vw, 100dvw)",
   },
   colors: {
    discord: "#5865f2",
    twitter: "#1DA1F2",
    google: "#de5246",
    dark: "#0c0c0c",
    light: "#fcfcfc",
    primary: "#59E6F9",
    secondary: "#FD0D0D",
   },
   gridTemplateColumns: {
    explore: "repeat(auto-fit, minmax(min(100%, 300px), 300px))",
   },
  },
 },
 plugins: [],
};

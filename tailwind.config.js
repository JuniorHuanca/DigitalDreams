/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bell-swing': 'bell-swing 2s ease-in-out infinite',
        'bell-swing-scale': 'bell-swing 2s ease-in-out infinite',
      },
      keyframes: {
        'bell-swing': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        'bell-swing-scale': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(10deg) scale(1.2)' },
          '50%': { transform: 'rotate(0deg) scale(1)' },
          '75%': { transform: 'rotate(-10deg) scale(1.2)' },
        }
      },
      colors: {
        grey: {
          0: "#ffffff", // manually adjusted
          10: "#f6f6f6", // manually adjusted
          50: "#f0f0f0", // manually adjusted
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
          1000: "#000000", // manually adjusted
        },
        primary: {
          // blue
          100: "#d3d4de",
          200: "#a6a9be",
          300: "#7a7f9d",
          400: "#4d547d",
          500: "#21295c",
          600: "#191F45", // manually adjusted
          700: "#141937",
          800: "#0d1025",
          900: "#070812",
        },
        secondary: {
          // yellow
          50: "#f0f0f0", // manually adjusted
          100: "#fff6e0",
          200: "#ffedc2",
          300: "#ffe3a3",
          400: "#ffda85",
          500: "#ffd166",
          600: "#cca752",
          700: "#997d3d",
          800: "#665429",
          900: "#332a14",
        },
      },
      backgroundImage: (theme) => ({
        "gradient-rainbow":
          "linear-gradient(81.66deg, #00B5EE 7.21%, #FF45A4 45.05%, #FFBA00 78.07%)",

        "gradient-rainblue":
          "linear-gradient(90deg, #24CBFF 14.53%, #FC59FF 69.36%, #FFBD0C 117.73%)",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  darkMode: 'class',
}
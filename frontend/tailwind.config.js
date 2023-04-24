const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  mode: "jit", // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or "media" or "class"
  theme: {
    fontFamily: {
      sans: ['Satoshi', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.indigo,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "1.25rem",
        },
      },
    },
    screens: {
      sm: "1320px",
      md: "1320px",
      lg: "1320px",
      xl: "1320px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["22px", "30px"],
      xl: ["26px", "34px"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};

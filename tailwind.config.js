module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      primary: "#1505BD",
      hover: "#0D046E",
      secondary: "#FBDA06",
      danger: "#FE8F1F",
      darkGray: "#868584",
      lightGray: "#E7E7E7",
      white: "#FFFFFF",
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["22px", "30px"],
      xl: ["26px", "34px"],
    },
    backgroundColor: (theme) => ({
      primary: "#1505BD",
      hover: "#0D046E",
      secondary: "#FBDA06",
      danger: "#FE8F1F",
    }),
    customForms: (theme) => ({
      default: {
        input: {
          borderRadius: theme("borderRadius.lg"),
          borderColor: theme("colors.blue.900"),
          "&:focus": {
            borderColor: theme("colors.gray.900"),
          },
        },
        select: {
          borderRadius: theme("borderRadius.lg"),
          boxShadow: theme("boxShadow.default"),
        },
        checkbox: {
          width: theme("spacing.6"),
          height: theme("spacing.6"),
        },
      },
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};

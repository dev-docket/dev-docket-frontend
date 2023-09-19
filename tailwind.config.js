import flowbitePlugin from "flowbite/plugin";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#161819",
        },

        "dark-background": "#161819",
        "secondary-background": "#383838",
        "header-background": "#292929",

        "border-dark-primary": "#30363d",
        "button-hover-dark": "#21262c",

        button: {
          primary: "#5437DC",
        },

        icon: {
          gray: "#7d8590",
        },
      },

      typography: {
        DEFAULT: {
          css: {
            color: "#fff",
            h1: {
              color: "#fff",
            },
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
          },
        },
      },
    },
  },
  plugins: [flowbitePlugin, typography],
};

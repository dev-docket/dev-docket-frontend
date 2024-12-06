import flowbitePlugin from "flowbite/plugin";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#0f1219",
          surface: "#1a1f2e",
          input: "#141824",
        },

        background: {
          primary: "#161819",
          secondary: "#383838",
        },

        highlight: {
          primary: "#5437DC",
          secondary: "#2f81f7d9",
        },

        link: {
          primary: "#292929",
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
          "dark-gray": "#646A73",
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

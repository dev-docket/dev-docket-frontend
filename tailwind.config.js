/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-background": "#212121",
        "secondary-background": "#383838",
        "header-background": "#292929",
      },
    },
  },
  plugins: [],
};

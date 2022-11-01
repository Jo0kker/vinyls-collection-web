/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          100: "#F8E1F2",
          200: "#F1C3E5",
          300: "#EAA5D8",
          400: "#E386CB",
          500: "#DC68BE",
          600: "#D54AB1",
          700: "#7e1b68",
          800: "#701455",
          900: "#331040",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      tablet: "735px",
      laptop: "1069px",
      tablet_inner: "692px",
      laptop_inner: "980px",
    },
    extend: {
      width: {
        87.5: "87.5%",
      },
      aspectRatio: {
        1.77: "1.77",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{mdx}",
    // TODO: components 위치 옮길때 수정
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      phone: "414px",
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

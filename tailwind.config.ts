import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: "415px",
      tablet: "735px",
      laptop: "1069px",
      tablet_inner: "692px",
      laptop_inner: "980px",
    },
    extend: {
      width: {
        87.5: "87.5%",
      },
      inset: {
        "45%": "45%",
        "43%": "43%",
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
} satisfies Config;

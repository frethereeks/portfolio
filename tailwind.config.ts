import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/antd/dist/reset.css',
  ],
  // darkMode: ["class", "selector"],
  darkMode: "class",
  theme: {
    extend: {
      screen: {
        'xs': '512px'
      },
      colors: {
        dark: "#2a2a28",
        primary: "#382a33",
        // primary: "#3e3a2d",
        // secondary: "#ee791d",
        // secondary: "#2563eb",
        secondary: "#aba695",
        "light-secondary": "#ffe8ca",
        background: "#fcf9f6",
        // background: "#f4f1e7",
        danger: "#f66",
        text: "#584455",
        milk: "#dad7d0",
      },
      fontFamily: {
        eugusto: "var(--eugusto)",
        urbanist: "var(--urbanist)",
        inspiration: "var(--inspiration)",
      }
    },
  },
  plugins: [],
} satisfies Config;

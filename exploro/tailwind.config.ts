import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Define your custom colors here
        primary: {
          100: "#3853b8", // Lighter shade of primary
          200: "#344ca9", // Light shade of primary
          300: "#2f469a", // Light shade of primary
          400: "#2b3f8b", // Normal shade of primary
          500: "#26387C", // Normal primary color
          600: "#21316d", // Medium shade of primary
          700: "#1d2a5e", // Dark shade of primary
          800: "#18244f", // Darker shade of primary
          900: "#141d40", // Darkest shade of primary
        },
        secondary: {
          100: "#fbca7b", // Lighter shade of secondary
          200: "#fbc268", // Light shade of secondary
          300: "#faba55", // Light shade of secondary
          400: "#fab342", // Normal shade of secondary
          500: "#f9ab2f", // Normal secondary color
          600: "#f8a31c", // Medium shade of secondary
          700: "#f89c09", // Dark shade of secondary
          800: "#e79007", // Darker shade of secondary
          900: "#d38406", // Darkest shade of secondary
        },
        tertiary: {
          100: "#e7f4ff",
          200: "#d3eaff",
          300: "#c0e1fe",
          400: "#acd8fe",
          500: "#99CFFE",
          600: "#86c6fe",
          700: "#72bdfe",
          800: "#5fb4fd",
          900: "#4baafd",
        },
        quarternary: {
          100: "#fafafa",
          200: "#f0f0f0",
          300: "#e7e7e7",
          400: "#dddddd",
          500: "#EEEBEB",
          600: "#d3d3d3",
          700: "#c9c9c9",
          800: "#bfbfbf",
          900: "#b6b6b6",
        },
      },
    },
  },
  plugins: [],
};
export default config;

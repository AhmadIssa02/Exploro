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
        secondary: "#F9AB2F",
        tertiary: "#99CFFE",
      },
    },
  },
  plugins: [],
};
export default config;

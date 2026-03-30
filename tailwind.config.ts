import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
};

export default config;

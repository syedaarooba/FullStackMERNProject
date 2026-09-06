/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      colors: {
        primary: {
          DEFAULT: "#059669", // Emerald 600
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#10B981", // Emerald 500
          600: "#059669", // Emerald 600
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        accent: {
          teal: "#0D9488",
          cyan: "#14B8A6",
          mint: "#34D399",
          emerald: "#10B981",
          lime: "#84CC16",
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(5, 150, 105, 0.35)",
        "glow-lg": "0 0 35px -5px rgba(5, 150, 105, 0.45)",
      },
    },
  },
  plugins: [],
};

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
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        accent: {
          cyan: "#06B6D4",
          teal: "#0D9488",
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(79, 70, 229, 0.3)",
        "glow-lg": "0 0 35px -5px rgba(79, 70, 229, 0.4)",
      },
    },
  },
  plugins: [],
};

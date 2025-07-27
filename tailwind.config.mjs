/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-red-hat-display)", "sans-serif"],
        nanumSquareNeo: ["var(--font-nanum-square)", "sans-serif"],
        stylish: ["var(--font-stylish)", "sans-serif"],
        serif: ["Georgia", "serif"], // Added a generic serif font
      },
    },
  },
  plugins: [],
};

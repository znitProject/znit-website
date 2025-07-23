/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-red-hat-display)", "sans-serif"],
        nanumSquareNeo: ["var(--font-nanum-square)", "sans-serif"],
        serif: ["Georgia", "serif"], // Added a generic serif font
      },
    },
  },
  plugins: [],
};
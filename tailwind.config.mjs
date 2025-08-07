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
        "red-hat-display": ["var(--font-red-hat-display)", "sans-serif"],
        "roboto-flex": ["var(--font-roboto-flex)", "sans-serif"],
        "zen-kurenaido": ["var(--font-zen-kurenaido)", "sans-serif"],
        righteous: ["var(--font-righteous)", "cursive"],
        "song-myung": ["var(--font-song-myung)", "serif"],
      },
    },
  },
  plugins: [],
};

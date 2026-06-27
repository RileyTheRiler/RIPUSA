import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette from the design doc
        parchment: {
          DEFAULT: "#F4EAD4",
          deep: "#E9DBBC",
          light: "#FBF5E6",
        },
        navy: {
          DEFAULT: "#1B2A4A",
          soft: "#27395f",
        },
        barn: {
          DEFAULT: "#7B1E1E",
          bright: "#9c2a2a",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        stamp: ["var(--font-stamp)", "Impact", "sans-serif"],
      },
      keyframes: {
        stampIn: {
          "0%": { opacity: "0", transform: "scale(2.6) rotate(-18deg)" },
          "55%": { opacity: "1", transform: "scale(0.92) rotate(-11deg)" },
          "75%": { transform: "scale(1.04) rotate(-13deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-12deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        stampIn: "stampIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        fadeUp: "fadeUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;

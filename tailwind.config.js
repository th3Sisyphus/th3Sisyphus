/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0a0a0c",
          card: "#121218",
          border: "#23232f",
          muted: "#181822",
        },
        paper: {
          DEFAULT: "#f4f1ea",
          muted: "#c8c4b9",
          dark: "#a39f94",
        },
        crimson: {
          DEFAULT: "#e62429",
          hover: "#ff3338",
          dark: "#b81418",
        },
        gold: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#b45309",
        },
        neon: {
          cyan: "#00e5ff",
          green: "#22c55e",
          purple: "#a855f7",
        }
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        pixel: ["Silkscreen", "monospace"],
        comic: ["'Bebas Neue'", "Impact", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      boxShadow: {
        'comic': '5px 5px 0px #e62429',
        'comic-paper': '5px 5px 0px #f4f1ea',
        'comic-gold': '5px 5px 0px #f59e0b',
        'comic-sm': '3px 3px 0px #e62429',
        'comic-lg': '8px 8px 0px #e62429',
      }
    },
  },
  plugins: [],
}

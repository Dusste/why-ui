/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{elm,html,js,ts}", "./examples/**/*.{elm,html,js,ts}"],
  theme: {
    extend: {
      colors: {
        // Venkelt primary — replaces former sky-* accent usage
        brand: {
          DEFAULT: "#5B2A86",
          50: "#E6DFED",
          100: "#CEBFDB",
          200: "#A58ABC",
          300: "#753aa8",
          400: "#5B2A86",
          500: "#502576",
          600: "#421E60",
          700: "#35184E",
          800: "#29133C",
          900: "#1D0D2B",
        },
      },
      animation: {
        "move-left": "move-left 500ms ease-in-out 4s forwards",
        "move-right": "move-right 500ms ease-in-out 4s forwards",
        "fade-out": "fade-out 500ms ease-in-out 4s forwards",
        "loader-dash": "loader-dash 1.4s ease-in-out infinite",
      },
      keyframes: {
        "move-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100vw)" },
        },
        "move-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "loader-dash": {
          "0%": { "stroke-dasharray": "1, 100", "stroke-dashoffset": "0" },
          "50%": { "stroke-dasharray": "72, 100", "stroke-dashoffset": "-18" },
          "100%": { "stroke-dasharray": "1, 100", "stroke-dashoffset": "-90" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /^bg-(red|green|yellow|sky)-200$/ },
    { pattern: /^border-(red|green|yellow|sky)-(500|300)$/ },
    { pattern: /^text-(red|green|yellow|sky)-500$/ },
    { pattern: /^h-(10|20|40)$/ },
    { pattern: /^w-(10|20|40)$/ },
  ],
};

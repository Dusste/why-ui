/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{elm,html,js,ts}", "./examples/**/*.{elm,html,js,ts}"],
  theme: {
    extend: {
      animation: {
        "move-left": "move-left 500ms ease-in-out 4s forwards",
        "move-right": "move-right 500ms ease-in-out 4s forwards",
        "fade-out": "fade-out 500ms ease-in-out 4s forwards",
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

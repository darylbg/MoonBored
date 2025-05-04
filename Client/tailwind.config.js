// tailwind.config.js
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("win95", ".win95 &"); // this enables `win95:bg-win95-grey`
    }),
  ],
};

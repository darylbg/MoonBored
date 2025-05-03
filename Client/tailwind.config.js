// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        win95: {
          teal: '#008080',
          blue: '#000080',
          black: '#000000',
          white: '#FFFFFF',
          grey: '#C0C0C0',
          darkGrey: '#7F7F7F',
          lightGrey: '#DFDFDF',
        },
      },
      fontFamily: {
        sans: ['"Tahoma"', 'Geneva', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#8ACDEA",
        "dark-blue": "#368CB0",
        "primary": "#7D53DE",
      },
      boxShadow: {
        'inline': "inset 0 0 0 2px white"
      }
    },
  },
  plugins: [],
};

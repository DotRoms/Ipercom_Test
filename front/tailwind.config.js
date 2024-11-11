/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#ccff00",
        "secondary": "#002642",
        "tertiary": "#333333",
        "danger": "#ef233c",
      },
      colors:{
        "primary": "#ccff00",
        "secondary": "#002642",
        "tertiary": "#333333",
        "danger": "#ef233c",
      }
    },
  },
  plugins: [],
}


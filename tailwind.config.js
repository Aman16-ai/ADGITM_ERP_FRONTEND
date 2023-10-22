/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "college-img" : "url('/assets/img.jpg')",
        "hero-primary" : "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}


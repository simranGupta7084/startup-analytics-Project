/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 45px rgba(15, 23, 42, 0.35)",
      },
      colors: {
        accent: {
          400: "#38bdf8",
          500: "#0ea5e9",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
      colors: {
        purple: "rgba(67, 56, 202, 1)",
        "purple-dark": "rgba(79, 70, 229, 1)",
        black: "rgba(17, 24, 39, 1)",
        "white-100": "rgba(229, 231, 235, 1)",
      },
    },
  },
  plugins: [],
};

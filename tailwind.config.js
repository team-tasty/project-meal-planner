/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserratMedium: ["Montserrat-Medium", "sans-serif"],
        montserratRegular: ["Montserrat-Regular", "sans-serif"],
        bitterRegular: ["Bitter-Regular", "serif"]
      },
      colors: {
        // Green for line elements
        lineGreen: "#529100",
        // Green for buttons
        buttonGreen: "#68B800",
      }
    },
  },
  plugins: [],
};

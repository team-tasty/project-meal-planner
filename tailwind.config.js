/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "landing-pic": "url('https://images.unsplash.com/photo-1470549813517-2fa741d25c92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      },
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

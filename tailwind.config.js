/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // Include jsx files
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Lora', 'serif'],
    },
    extend: {
      colors: {
        orange: "#F89223",
        jet: "#2e2f31",
        gray: "#7D7F82",
        "battleship-gray": "#8c8e91",
        green: "#6fb43f",
        danger: "#dc3545",
      },
    },
  },
  plugins: [],
};

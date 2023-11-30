/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "usa-red": "#B22233",
        "usa-blue": "#052344",
        "usa-white": "#F8F9FE",
        "usa-grey": "#2E363F",
      },
    },
    fontFamily: {
      redhat: ["Red Hat Display", "sans-serif"],
    },
  },
  plugins: [],
};

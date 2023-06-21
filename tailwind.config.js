/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "rgb(var(--primary-color-500) / <alpha-value>)",
        "primary-300": "rgb(var(--primary-color-300) / <alpha-value>)",
        "secondary-300": "rgb(var(--secondary-color-500) / <alpha-value>)",
        danger: "rgb(var(--danger-color) / <alpha-value>)",
        success: "rgb(var(--success-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

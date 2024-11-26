/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}", // Add this line to include Flowbite's content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Use the Flowbite plugin directly
  ],
};

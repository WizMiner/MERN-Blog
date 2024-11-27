// tailwind.config.js
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}", // Add Flowbite React content path
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};

/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    // ...
    flowbite.content(),
  ],
  corePlugins: {
    outline: false, // Disable outline globally
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};

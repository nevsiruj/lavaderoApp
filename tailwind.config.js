/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
   plugins: [
    require('flowbite/plugin')
   ],
 }


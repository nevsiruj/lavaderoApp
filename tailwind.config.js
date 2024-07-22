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
    "./node_modules/flowbite/**/*.js",
    //'node_modules/flowbite/**/*.{js,jsx,ts,tsx,vue}',
    //'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
   plugins: [
    require('flowbite/plugin')
   ],
 }


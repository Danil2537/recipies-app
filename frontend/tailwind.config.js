
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  
    "./public/index.html",          
  ],

  plugins: [require("daisyui")],
    
  daisyui: {
    themes: ["light", "dark"], 
    // other options: https://daisyui.com/docs/config/
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // UPDATED: Deep Navy Blue (Matches the Hilton look)
        primary: '#101828', 
        
        // NEW: Lighter Navy for hover states (Buttons/Links)
        'primary-hover': '#1e3a8a', 
        
        // Gray background for sections
        secondary: '#F3F4F6', 
      },
    },
  },
  plugins: [],
}
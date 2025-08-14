/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",       // your app directory
      "./pages/**/*.{js,ts,jsx,tsx}",     // only if using pages/
      "./components/**/*.{js,ts,jsx,tsx}",// your components
    ],
    safelist: [
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "overflow-x-hidden",
      "overflow-hidden",
      "w-full",
      "h-auto",
    ],
    theme: {
      extend: {
        fontFamily: {
          exo2: ['Exo 2', 'sans-serif'],
          playfair: ['"Playfair Display"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  };
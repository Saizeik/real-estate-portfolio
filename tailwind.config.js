/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "overflow-x-hidden",
    "overflow-hidden",
    "w-full",
    "h-auto",
    {
      pattern: /bg-(red|blue|green)-(100|200|500)/, // Safelist patterns using regex
      variants: ['hover', 'focus'], // Include variants for the pattern
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        exo2: ['Exo 2', 'sans-serif'],
        playfair: ['"Playfair Display"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          600: "#4b5563",
          800: "#1f2937",
        },
      },
    },
  },
  plugins: [],
};

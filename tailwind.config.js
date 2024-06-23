/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#E50914',
      },
      boxShadow: {
        'innerColor': '0 0 0px 1000px #000435 inset',
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'color': '#fff'
      }

    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4b3274',
        'primary-light': '#00c9a8',
        'secondary-light': '#c4fcef',
        'secondary-dark': '#4d8076',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      fontSize: {
        'tiny': '0.65rem',
        'huge': '10rem',
      }
    },
  },
  plugins: [],
}

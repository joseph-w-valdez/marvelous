/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/public/*.{html,js}', './client/*.jsx', './client/components/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Impact: ['Impact', 'sans-serif']
      }
    }
  },
  plugins: []
};

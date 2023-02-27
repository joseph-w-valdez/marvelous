/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/public/*.{html,js}', './client/*.jsx', './client/**/*.jsx'],
  theme: {
    extend: {
      borderWidth: {
        18: '18px'
      },
      linearBorderGradients: {
        colors: {
          'red-border': ['linear-gradient(to right, #FF0033, #D50000)']
        }
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Impact: ['Impact', 'sans-serif'],
        Audiowide: ['Audiowide', 'sans-serif']
      }
    }
  },
  variants: {
    linearBorderGradients: ['responsive']
  },
  plugins: []
};

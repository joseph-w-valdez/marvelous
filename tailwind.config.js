/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/public/*.{html,js}', './client/*.jsx', './client/**/*.jsx'],
  theme: {
    borderWidth: {
      18: '18px'
    },
    extend: {
      gradientColorStops: {
        'red-border-start': '#FF0033',
        'red-border-end': '#D50000'
      },
      linearBorderGradients: {
        directions: {
          // defaults to these values
          t: 'to top',
          r: 'to right',
          b: 'to bottom',
          l: 'to left'
        },
        colors: {
          'red-border': ['#FF0033', '#D50000']
        }
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Impact: ['Impact', 'sans-serif'],
        Audiowide: ['Audiowide', 'sans-serif']
      }
    }
  },
  plugins: []
};

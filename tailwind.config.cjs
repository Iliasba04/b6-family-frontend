/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    screens: {
      xs: '280px',
      sm: '640px',
      md: '768px',
      bmd:'810px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        navBg: "#5DADAA",
        itemColorActive : "#FF7468",
        grayColor:"#a8a8a8",
        greenColor: "#5aaca8",
        thinGray: "#83858a",
        green2:"#eff7f6",
        red2:"#fff1ee",
        darkBlue : '#1e1d4c',
        thinBlue:'#eae6ff',
        blueText:'#5243aa',
        thinOrange:'#fff1b4',
        orangeText:'#ff8b00',
        thinGreen:'#abf5d2',
        greenText:'#036846',
        cancelBg:'#ffeeef',
        cancelText:'#e17a7c'
      },
      fontFamily :{
        'barlow': ['Barlow Condensed', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}



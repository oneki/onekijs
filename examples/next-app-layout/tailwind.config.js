/* eslint-disable no-undef */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '2px': '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

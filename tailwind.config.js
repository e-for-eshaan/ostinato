module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { width: 0 },
          '100%': { width: '150px' },
        }, disappear: {
          '0%': { width: '150px' },
          '100%': { width: 0 },
        }
      },
      animation: {
        appear: 'appear 0.1s ease-in 1',
        'disappear-anim': 'appear 0.1s ease-in 1 reverse',
      }
    },
  },
  plugins: [],
}
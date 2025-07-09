module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        righteous: ['Righteous', 'cursive'],
      },
      colors: {
        primary: '#000000',
        secondary: '#EAEAEA',
        tertiary: '#252A34',
        tone: {
          1: '#08D9D6',
          2: '#FF2E63',
        },
      },
      keyframes: {
        appear: {
          '0%': { width: 0 },
          '100%': { width: '150px' },
        },
        disappear: {
          '0%': { width: '150px' },
          '100%': { width: 0 },
        },
        spinner: {
          '0%': { width: '150px' },
          '100%': { width: 0 },
        },
      },
      animation: {
        appear: 'appear 0.1s ease-in 1',
        'disappear-anim': 'appear 0.1s ease-in 1 reverse',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

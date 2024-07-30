export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1.5s infinite ease-in-out',
        blinkTitle: 'blinkTitle 1.5s infinite ease-in-out',
        blinkSpan: 'blinkSpan 1.5s infinite ease-in-out'
      },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: '#A9A9A9' },
          '50%': { backgroundColor: '#DCDCDC' },
        },
        blinkTitle: {
          '0%, 100%': { backgroundColor: '#D3D3D3' },
          '50%': { backgroundColor: '#616161' },
        },
        blinkSpan: {
          '0%, 100%': { backgroundColor: '#E8E9EB' },
          '50%': { backgroundColor: '#9e9e9e' },
        },
      },
    },
  },
  plugins: [],
};

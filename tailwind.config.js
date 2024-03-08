/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // white: '#F3F3F3',
        messageColor: '#615EF0',
        previewMessageColor:'rgba(0,0,0,0.4)',
        blank: '#D8D8D8',
        chatColor: 'rgba(97,94,240,0.1)',
        help: '#F3F3F3',
        bug: '#F3F3F3',
        neutral: '#F3F3F3',
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
};

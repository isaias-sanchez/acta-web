export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acta: {
          beige: '#E7E3D8',
          gold: '#C5A065',
          dark: '#2A2A2A',
          light: '#F9F9F9',
          gray: '#86868B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

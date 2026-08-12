module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6EE7FF',
        accent: '#8B5CF6',
      },
      boxShadow: {
        glass: '0 6px 30px rgba(50,60,90,0.35)',
      }
    },
  },
  plugins: [],
}

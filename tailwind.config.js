/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#121212',
          card: '#161616',
          line: '#262626',
        },
        bone: '#f5f5f0',
        neon: {
          DEFAULT: '#ccff00',
          lime: '#ccff00',
          pink: '#ff2db1',
          blue: '#19e6ff',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        heading: ['"Archivo"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        'fade-up': 'fade-up 0.7s ease forwards',
        glitch: 'glitch 0.4s steps(2) infinite',
      },
    },
  },
  plugins: [],
}

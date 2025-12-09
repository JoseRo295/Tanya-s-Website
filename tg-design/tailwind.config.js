/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6B7280', 
          DEFAULT: '#111827', 
          dark: '#000000',
        },
        accent: {
          light: '#FCA5A5',
          DEFAULT: '#FF5A5F', 
          dark: '#E11D48',
        },
        sand: {
          50: '#F9FAFB', 
          100: '#F3F4F6',
          200: '#E5E7EB',
        },
        darkbg: {
          DEFAULT: '#ffffff',
          paper: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}


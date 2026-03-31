import animations from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
      },
      colors: {
        primary: '#C8831A',
        'primary-light': '#E8A84D',
        surface: '#1C1C1C',
        stone: '#6B6B6B',
      },
    },
  },
  plugins: [
    animations,
    ({ addComponents }) => {
      addComponents({
        '.cp-v': {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 50% 100%, 0 85%)',
        },
      })
    },
  ],
}

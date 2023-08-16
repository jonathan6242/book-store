import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing': "url('/landing.jpg')"
      },
      screens: {
        'xxs': '320px',
        'xs': '480px'
      },
      colors: {
        dark: '#242424'
      }
    },
  },
  plugins: [
  ],
}
export default config

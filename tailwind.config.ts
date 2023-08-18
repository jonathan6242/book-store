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
        'landing': "url('/landing.jpg')",
        'selected': "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
      },
      screens: {
        'xxs': '320px',
        'xs': '480px'
      },
      colors: {
        dark: '#242424',
        lightgray: 'rgba(255,255,255,0.8)'
      }
    },
  },
  plugins: [
  ],
}
export default config
